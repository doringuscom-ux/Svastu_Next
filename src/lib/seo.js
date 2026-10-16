export const SITE_URL = 'https://svastusolution.com';

// Normalizes an admin-entered canonical: resolves relative values against the
// site, forces https + apex host, and strips the trailing slash (Next.js
// redirects "/path/" -> "/path", and Google ignores canonicals that redirect).
export function canonicalUrl(value, path = '') {
  const fallback = `${SITE_URL}${path}`;
  const raw = (value || '').trim();
  if (!raw) return fallback;

  let url;
  try {
    url = new URL(raw, `${SITE_URL}/`);
  } catch {
    return fallback;
  }

  const host = url.hostname.replace(/^www\./, '');
  if (host !== 'svastusolution.com') return url.toString();

  const pathname = url.pathname.replace(/\/+$/, '');
  return `${SITE_URL}${pathname}${url.search}`;
}
