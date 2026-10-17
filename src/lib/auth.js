import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

// Sliding session: every admin page load calls /api/admin/me, which issues a fresh token.
// An admin who keeps using the panel stays logged in; 7 days of inactivity logs them out.
export const SESSION_TTL = '7d';

export const signAdminToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: SESSION_TTL });

export const isValidPassword = (password = '') =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[!@#$%^&*(),.?":{}|<>]/.test(password);

export const sessionPayload = (admin) => ({
  _id: admin._id,
  username: admin.username,
  name: admin.name,
  role: admin.role,
  token: signAdminToken(admin._id),
});

// Returns the admin for a valid Bearer token, or null if the token is missing/invalid/expired.
// Database errors are thrown (not turned into null) so a DB hiccup gives a 500 instead of a
// 401 that would log the admin out.
export async function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  let decoded;
  try {
    decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }

  await dbConnect();
  return Admin.findById(decoded.id).select('-password');
}

// For admin-only routes: returns { admin } or { response } with the 401/403 to send back.
export async function requireAdmin(request, { adminOnly = false } = {}) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return { response: NextResponse.json({ message: 'Not authorized' }, { status: 401 }) };
  }
  if (adminOnly && admin.role !== 'admin') {
    return { response: NextResponse.json({ message: 'Not authorized as an admin' }, { status: 403 }) };
  }
  return { admin };
}

export async function sendEmail(to, subject, message) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    throw new Error('Email configuration missing');
  }
  const formData = new URLSearchParams();
  formData.append('to', to);
  formData.append('subject', subject);
  formData.append('message', message);
  const res = await fetch(scriptUrl, { method: 'POST', body: formData });
  if (!res.ok) {
    throw new Error(`Email send failed (${res.status})`);
  }
}

export const generateOtp = () => crypto.randomInt(100000, 1000000).toString();
