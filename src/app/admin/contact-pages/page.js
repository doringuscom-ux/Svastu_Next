import AdminShell from '@/components/AdminShell';
import AdminContactPages from '@/legacy-pages/Admin/AdminContactPages';

export const metadata = {
  title: 'Contact Leads - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminContactPages />
    </AdminShell>
  );
}
