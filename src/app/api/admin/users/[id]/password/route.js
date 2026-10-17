import Admin from '@/models/Admin';
import { requireAdmin, isValidPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin(request, { adminOnly: true });
    if (response) return response;

    const { id } = await params;
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }
    if (!isValidPassword(password)) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long, and include a number, a capital letter, and a special character.' }, { status: 400 });
    }

    const user = await Admin.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    user.password = password;
    user.isLocked = false;
    user.failedLoginAttempts = 0;
    await user.save();
    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
