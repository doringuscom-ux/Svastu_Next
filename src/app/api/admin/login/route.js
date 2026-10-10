import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

export async function POST(request) {
  try {
    await dbConnect();
    const { username, password } = await request.json();

    const admin = await Admin.findOne({
      $or: [{ username: username }, { email: username }]
    });

    if (!admin) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    if (admin.isLocked) {
      return NextResponse.json(
        { message: 'Account locked due to multiple failed attempts.', locked: true },
        { status: 403 }
      );
    }

    const isMatch = await admin.matchPassword(password);

    if (isMatch) {
      admin.failedLoginAttempts = 0;
      await admin.save();

      return NextResponse.json({
        _id: admin._id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
        token: generateAccessToken(admin._id),
        refreshToken: generateRefreshToken(admin._id),
      });
    } else {
      admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;
      if (admin.failedLoginAttempts >= 5) {
        admin.isLocked = true;
      }
      await admin.save();

      const remainingAttempts = 5 - admin.failedLoginAttempts;
      if (admin.isLocked) {
        return NextResponse.json(
          { message: 'Account locked due to 5 consecutive failed attempts.', locked: true },
          { status: 403 }
        );
      } else {
        return NextResponse.json(
          { message: `Invalid credentials. ${remainingAttempts} attempts remaining before account lock.` },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error('Admin Login error:', error);
    return NextResponse.json({ message: 'Server error during login' }, { status: 500 });
  }
}
