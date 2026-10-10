import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const updated = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ message: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ message: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ message: 'Failed to delete contact' }, { status: 500 });
  }
}
