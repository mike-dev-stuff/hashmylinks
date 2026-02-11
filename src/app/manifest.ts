import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HashMyLinks',
    short_name: 'HashMyLinks',
    description:
      'Create a personalized link-in-bio page and share it with a single URL. No accounts, no servers, no limits.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f14',
    theme_color: '#22c55e',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
