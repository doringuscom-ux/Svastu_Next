import dbConnect from '@/lib/db';
import Seo from '@/models/Seo';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { pageName } = await params;
    const seo = await Seo.findOne({ pageName }).lean();
    return NextResponse.json(seo || {});
  } catch (error) {
    console.error('API /seo/[pageName] error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
