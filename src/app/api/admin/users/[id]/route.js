import Admin from '@/models/Admin';
import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin(request, { adminOnly: true });
    if (response) return response;

    const { id } = await params;
    const { name, email, phone, username } = await request.json();
    const user = await Admin.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (username && username !== user.username) {
      if (await Admin.findOne({ username })) {
        return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
      }
      user.username = username;
    }
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;

    const updated = await user.save();
    return NextResponse.json({
      _id: updated._id,
      username: updated.username,
      role: updated.role,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { admin, response } = await requireAdmin(request, { adminOnly: true });
    if (response) return response;

    const { id } = await params;
    const user = await Admin.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (admin._id.toString() === user._id.toString()) {
      return NextResponse.json({ message: 'Cannot delete yourself' }, { status: 400 });
    }

    await user.deleteOne();
    return NextResponse.json({ message: 'User removed' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
