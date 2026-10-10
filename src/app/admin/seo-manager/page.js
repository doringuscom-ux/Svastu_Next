import AdminShell from '@/components/AdminShell';
import AdminSeoManager from '@/legacy-pages/Admin/AdminSeoManager';

export const metadata = {
  title: 'SEO Manager - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminSeoManager />
    </AdminShell>
  );
}
