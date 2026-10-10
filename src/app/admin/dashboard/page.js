import AdminShell from '@/components/AdminShell';
import AdminDashboard from '@/legacy-pages/Admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}
