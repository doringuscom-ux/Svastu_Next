import { revalidatePath } from 'next/cache';

// Call from the catch block of a DB read in an ISR page. At runtime it rethrows, so Next keeps
// serving the last good page instead of caching a fallback/empty render for an hour. During
// `next build` it swallows the error so a DB hiccup doesn't fail the deploy.
export function keepStaleOnError(error) {
  console.error('ISR data error:', error);
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    throw error;
  }
}

// After an admin change, drop every cached page so it shows up on the site right away.
export function revalidateSite() {
  revalidatePath('/', 'layout');
}
