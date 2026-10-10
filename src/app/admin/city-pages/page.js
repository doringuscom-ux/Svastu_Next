import AdminShell from '@/components/AdminShell';
import AdminCityPages from '@/legacy-pages/Admin/AdminCityPages';

export const metadata = {
  title: 'City Pages Management - S Vastu Solution',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return (
    <AdminShell>
      <AdminCityPages />
    </AdminShell>
  );
}
