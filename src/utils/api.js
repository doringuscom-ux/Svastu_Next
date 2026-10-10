// In Next.js unified full-stack app, local API routes are on the same domain (/api)
export const BASE_URL = typeof window !== 'undefined' ? '' : (process.env.NEXT_PUBLIC_SITE_URL || '');

// API Endpoints
export const API = '/api';

export const PAGES_API = `${API}/pages`;
export const BLOGS_API = `${API}/blogs`;
export const ADMIN_API = `${API}/admin`;
export const GALLERY_API = `${API}/gallery`;
export const CONTACT_API = `${API}/contact`;
export const SEO_API = `${API}/seo`;
export const YOUTUBE_API = `${API}/youtube`;
