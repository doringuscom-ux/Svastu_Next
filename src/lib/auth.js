import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';
import dbConnect from '@/lib/db';

export async function verifyAdmin(request) {
  try {
    await dbConnect();
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    return admin;
  } catch (error) {
    return null;
  }
}
