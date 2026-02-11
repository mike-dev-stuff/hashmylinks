import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'HashMyLinks — Free Link-in-Bio, No Account Required';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f14 0%, #111827 50%, #0a0f14 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: '#22c55e',
            marginBottom: 8,
            display: 'flex',
          }}
        >
          H#shMyLinks
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#9ca3af',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
            display: 'flex',
          }}
        >
          Free link-in-bio. No accounts, no servers, no limits.
        </div>
      </div>
    ),
    { ...size }
  );
}
