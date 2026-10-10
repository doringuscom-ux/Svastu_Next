import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const gallery = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(gallery);
  } catch (error) {
    console.error('API /gallery error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
