import Admin from '@/models/Admin';
import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin(request, { adminOnly: true });
    if (response) return response;

    const { id } = await params;
    const { role } = await request.json();
    if (!['admin', 'subadmin'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const user = await Admin.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    user.role = role;
    const updated = await user.save();
    return NextResponse.json({ _id: updated._id, username: updated.username, role: updated.role });
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
