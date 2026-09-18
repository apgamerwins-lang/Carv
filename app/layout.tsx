import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apex Automotive Studio — High-End Modification & Bespoke Detailing',
  description: 'Ultra-exclusive automotive tuning, widebody engineering, titanium exhaust fabrication, and surgical multi-stage paint protection film & ceramic detailing.',
  keywords: [
    'car modification',
    'car detailing',
    'ceramic coating',
    'PPF',
    'paint correction',
    'performance tuning',
    'widebody kits',
    'custom cars',
    'automotive studio',
  ],
  openGraph: {
    title: 'Apex Automotive Studio — Built Beyond Stock',
    description: 'High-performance automotive engineering, bespoke widebody builds, and surgical paint protection studio.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Apex Automotive Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Automotive Studio — Built Beyond Stock',
    description: 'Performance. Precision. Presence. High-end vehicle engineering & detailing studio.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Apex Automotive Studio',
    description: 'High-end automotive modification, performance engineering, and bespoke detailing studio.',
    telephone: '+15550192834',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '742 Performance Way, Hangar 4B',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90021',
      addressCountry: 'US',
    },
    openingHours: 'Mo-Sa 08:00-19:00',
    priceRange: '$$$$',
    currenciesAccepted: 'USD',
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-[#F5F5F5] antialiased selection:bg-[#C9A66B] selection:text-black font-['Plus_Jakarta_Sans',sans-serif]">
        {children}
      </body>
    </html>
  );
}

