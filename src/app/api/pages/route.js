import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    let filter = {};
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await Admin.findById(decoded.id);
        if (adminUser && adminUser.role === 'subadmin') {
          filter.createdBy = adminUser._id;
        }
      } catch (err) {
        // ignore
      }
    }
    const pages = await Page.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('API /pages error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
