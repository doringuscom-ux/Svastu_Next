import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.youtube.com/@Svastusolution/shorts', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      next: { revalidate: 3600 }
    });
    const html = await response.text();
    
    const videoIdMatches = [...html.matchAll(/"videoId":"([^"]{11})"/g)].map(m => m[1]);
    const uniqueIds = [...new Set(videoIdMatches)].slice(0, 15);
    
    if (uniqueIds.length > 0) {
      return NextResponse.json({ success: true, data: uniqueIds });
    } else {
      return NextResponse.json({ success: false, message: 'No shorts found', data: [] });
    }
  } catch (error) {
    console.error('YouTube Fetch Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch from YouTube', data: [] });
  }
}
