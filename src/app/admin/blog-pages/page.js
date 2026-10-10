import AdminShell from '@/components/AdminShell';
import AdminBlogPages from '@/legacy-pages/Admin/AdminBlogPages';

export const metadata = {
  title: 'Blog Management - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminBlogPages />
    </AdminShell>
  );
}
