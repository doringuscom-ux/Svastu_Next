import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { isValidPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, otp, newPassword } = await request.json();
    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: 'Email, OTP, and new password are required' }, { status: 400 });
    }
    if (!isValidPassword(newPassword)) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long, and include a number, a capital letter, and a special character.' }, { status: 400 });
    }

    const user = await Admin.findOne({ email, resetOtpExpire: { $gt: Date.now() } });
    if (!user || !user.resetOtp) {
      return NextResponse.json({ message: 'OTP has expired or user not found. Request a new one.' }, { status: 400 });
    }

    if (user.resetOtp !== String(otp).trim()) {
      user.failedOtpAttempts = (user.failedOtpAttempts || 0) + 1;
      if (user.failedOtpAttempts >= 3) {
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;
        user.failedOtpAttempts = 0;
        await user.save();
        return NextResponse.json({ message: 'Too many invalid attempts. OTP invalidated. Please request a new one.' }, { status: 400 });
      }
      await user.save();
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    user.password = newPassword;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.failedOtpAttempts = 0;
    // A password reset also clears a lockout.
    user.isLocked = false;
    user.failedLoginAttempts = 0;
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
