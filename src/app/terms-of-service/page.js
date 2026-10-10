import PublicLayout from '@/components/PublicLayout';
import TermsOfServicePage from '@/legacy-pages/TermsOfServicePage';

export const metadata = {
  title: 'Terms of Service - S Vastu Solution',
  description: 'Terms and conditions for using services from S Vastu Solution.',
  alternates: { canonical: 'https://svastusolution.com/terms-of-service' },
};

export default function Page() {
  return (
    <PublicLayout>
      <TermsOfServicePage />
    </PublicLayout>
  );
}
