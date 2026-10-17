import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { generateOtp, sendEmail } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Sends an OTP that unlocks a locked account and logs the admin in.
export async function POST(request) {
  try {
    await dbConnect();
    const { username } = await request.json();
    const user = await Admin.findOne({ $or: [{ username }, { email: username }] });

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    if (!user.email) {
      return NextResponse.json({ message: 'No email associated with this account. Contact super admin.' }, { status: 400 });
    }

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    user.failedOtpAttempts = 0;
    await user.save();

    await sendEmail(
      user.email,
      'Account Unlock OTP - S Vastu',
      `<h2>Account Unlock OTP</h2>
        <p>Dear ${user.name},</p>
        <p>Your OTP to unlock your account and securely login is: <strong style="font-size:24px;">${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>`
    );
    return NextResponse.json({ message: 'OTP sent to your registered email address' });
  } catch (error) {
    console.error('Login OTP send error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
