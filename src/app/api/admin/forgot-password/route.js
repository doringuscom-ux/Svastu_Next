import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { generateOtp, sendEmail } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { email } = await request.json();
    if (!email) return NextResponse.json({ message: 'Email is required' }, { status: 400 });

    const user = await Admin.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found with this email' }, { status: 404 });
    }

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    user.failedOtpAttempts = 0;
    await user.save();

    await sendEmail(
      user.email,
      'Password Reset OTP - S Vastu',
      `<h2>Password Reset OTP</h2>
        <p>Dear ${user.name},</p>
        <p>Your OTP to reset your S-Vastu dashboard password is: <strong style="font-size:24px;">${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>`
    );
    return NextResponse.json({ message: 'OTP sent to email successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
