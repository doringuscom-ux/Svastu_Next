import PublicLayout from '@/components/PublicLayout';
import NotFoundPage from '@/legacy-pages/NotFoundPage';

export const metadata = {
  title: 'Page Not Found - S Vastu Solution',
  robots: 'noindex, follow',
};

export default function NotFound() {
  return (
    <PublicLayout>
      <NotFoundPage />
    </PublicLayout>
  );
}
