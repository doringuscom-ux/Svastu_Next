import AdminShell from '@/components/AdminShell';
import AdminUsers from '@/legacy-pages/Admin/AdminUsers';

export const metadata = {
  title: 'User Management - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminUsers />
    </AdminShell>
  );
}
