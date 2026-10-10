import PublicLayout from '@/components/PublicLayout';
import PrivacyPolicyPage from '@/legacy-pages/PrivacyPolicyPage';

export const metadata = {
  title: 'Privacy Policy - S Vastu Solution',
  description: 'Privacy Policy and data protection terms for S Vastu Solution.',
  alternates: { canonical: 'https://svastusolution.com/privacy-policy' },
};

export default function Page() {
  return (
    <PublicLayout>
      <PrivacyPolicyPage />
    </PublicLayout>
  );
}
