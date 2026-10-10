import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';
import dbConnect from '@/lib/db';

export async function verifyAdmin(request) {
  try {
    await dbConnect();
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('verifyAdmin: No valid Bearer token provided in header');
      return null;
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      console.log('verifyAdmin: User not found in DB with decoded id:', decoded.id);
    }
    return admin;
  } catch (error) {
    console.error('verifyAdmin error:', error.message);
    return null;
  }
}
