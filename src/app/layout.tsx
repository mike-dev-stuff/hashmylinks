import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hashmylinks.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HashMyLinks — Free Link-in-Bio, No Account Required',
    template: '%s | HashMyLinks',
  },
  description:
    'Create a personalized link-in-bio page and share it with a single URL. No accounts, no servers, no limits — your entire profile lives in the link.',
  keywords: [
    'link in bio',
    'linktree alternative',
    'free link page',
    'bio link',
    'social links',
    'no signup',
    'serverless',
    'link sharing',
  ],
  authors: [{ name: 'HashMyLinks' }],
  creator: 'HashMyLinks',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'HashMyLinks',
    title: 'HashMyLinks — Free Link-in-Bio, No Account Required',
    description:
      'Create a personalized link-in-bio page and share it with a single URL. No accounts, no servers, no limits.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HashMyLinks — Free Link-in-Bio, No Account Required',
    description:
      'Create a personalized link-in-bio page and share it with a single URL. No accounts, no servers, no limits.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
