import { NextResponse } from 'next/server';

export async function GET() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const manifest = {
    name: 'Beehave - Family Chore Manager',
    short_name: 'Beehave',
    description: 'Family chore management with honey rewards',
    start_url: `${basePath || '/'}`,
    scope: `${basePath || '/'}`,
    display: 'standalone',
    background_color: '#fbbf24',
    theme_color: '#f59e0b',
    orientation: 'portrait',
    icons: [
      { src: `${basePath}/icons/icon-72x72.png`, sizes: '72x72', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-96x96.png`, sizes: '96x96', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-128x128.png`, sizes: '128x128', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-144x144.png`, sizes: '144x144', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-152x152.png`, sizes: '152x152', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-192x192.png`, sizes: '192x192', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-384x384.png`, sizes: '384x384', type: 'image/png', purpose: 'maskable any' },
      { src: `${basePath}/icons/icon-512x512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable any' },
    ],
    categories: ['productivity', 'family', 'lifestyle'],
  };

  return NextResponse.json(manifest, {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}



