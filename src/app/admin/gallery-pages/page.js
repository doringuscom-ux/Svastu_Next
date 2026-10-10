import AdminShell from '@/components/AdminShell';
import AdminGalleryPages from '@/legacy-pages/Admin/AdminGalleryPages';

export const metadata = {
  title: 'Gallery Management - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminGalleryPages />
    </AdminShell>
  );
}
