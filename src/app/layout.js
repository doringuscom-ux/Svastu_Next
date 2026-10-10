import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'S Vastu Solution - Expert Vastu Consultant',
  description: 'Trusted Vastu Consultant in Zirakpur, Chandigarh. Expert in Residential, Commercial, and Industrial Vastu.',
  metadataBase: new URL('https://svastusolution.com'),
  alternates: {
    canonical: 'https://svastusolution.com',
  },
  verification: {
    google: 'ecaQh6cKsOoEBAMkPPKawhczrceYpzjalS2rUBvS8sw',
  },
  openGraph: {
    title: 'S Vastu Solution - Expert Vastu Consultant',
    description: 'Trusted Vastu Consultant in Zirakpur, Chandigarh. Expert in Residential, Commercial, and Industrial Vastu.',
    url: 'https://svastusolution.com',
    siteName: 'S-Vastu Solution',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'S-Vastu Solution',
  url: 'https://svastusolution.com',
  logo: 'https://svastusolution.com/assets/S.Vastu-logo.webp',
  image: 'https://svastusolution.com/assets/S.Vastu-logo.webp',
  telephone: '+919817755699',
  email: 'svastunumerology@gmail.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'VIP Road',
    addressLocality: 'Zirakpur',
    addressRegion: 'Punjab',
    postalCode: '140603',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '30.6425',
    longitude: '76.8173'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:00'
    }
  ],
  sameAs: [
    'https://www.facebook.com/Svastusolution',
    'https://www.youtube.com/@Svastusolution',
    'https://www.instagram.com/svastusolution'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2PR1ZCYC0M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2PR1ZCYC0M');
          `}
        </Script>
      </body>
    </html>
  );
}
