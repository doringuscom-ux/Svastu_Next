import { requireAdmin, sessionPayload } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Validates the current session and hands back a renewed token (sliding expiry).
export async function GET(request) {
  try {
    const { admin, response } = await requireAdmin(request);
    if (response) return response;
    return NextResponse.json(sessionPayload(admin));
  } catch (error) {
    console.error('API /admin/me error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
