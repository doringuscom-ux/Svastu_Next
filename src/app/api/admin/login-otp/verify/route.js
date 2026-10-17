import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { sessionPayload } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { username, otp } = await request.json();
    const user = await Admin.findOne({
      $or: [{ username }, { email: username }],
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user || !user.resetOtp) {
      return NextResponse.json({ message: 'OTP has expired or user not found. Request a new one.' }, { status: 400 });
    }

    if (user.resetOtp !== String(otp || '').trim()) {
      user.failedOtpAttempts = (user.failedOtpAttempts || 0) + 1;
      if (user.failedOtpAttempts >= 5) {
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;
        user.failedOtpAttempts = 0;
        await user.save();
        return NextResponse.json({ message: 'Too many invalid attempts. OTP invalidated. Please request a new one.' }, { status: 400 });
      }
      await user.save();
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    user.isLocked = false;
    user.failedLoginAttempts = 0;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.failedOtpAttempts = 0;
    await user.save();

    return NextResponse.json(sessionPayload(user));
  } catch (error) {
    console.error('Login OTP verify error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
