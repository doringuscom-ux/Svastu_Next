import Admin from '@/models/Admin';
import { requireAdmin, isValidPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

const PUBLIC_FIELDS = '-password -resetOtp -resetOtpExpire';

export async function GET(request) {
  try {
    const { response } = await requireAdmin(request, { adminOnly: true });
    if (response) return response;
    const users = await Admin.find({}).select(PUBLIC_FIELDS).lean();
    return NextResponse.json(users);
  } catch (error) {
    console.error('API /admin/users error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { response } = await requireAdmin(request, { adminOnly: true });
    if (response) return response;

    const { username, password, role, name, email, phone } = await request.json();
    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }
    if (!isValidPassword(password)) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long, and include a number, a capital letter, and a special character.' }, { status: 400 });
    }
    if (await Admin.findOne({ username })) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const user = await Admin.create({
      username,
      password,
      role: role === 'admin' ? 'admin' : 'subadmin',
      name: name || '',
      email: email || '',
      phone: phone || '',
    });

    return NextResponse.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }, { status: 201 });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
