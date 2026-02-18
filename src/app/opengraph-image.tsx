import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'TallerThan - Celebrity Height Comparison';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #3B82F6 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo and figures */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {/* Taller figure */}
          <div
            style={{
              width: '80px',
              height: '200px',
              background: 'white',
              borderRadius: '40px 40px 0 0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          />
          {/* Shorter figure */}
          <div
            style={{
              width: '80px',
              height: '140px',
              background: '#10B981',
              borderRadius: '40px 40px 0 0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          />
        </div>

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            marginBottom: '16px',
            textShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          Taller
          <span style={{ color: '#93C5FD' }}>Than</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '24px',
          }}
        >
          Celebrity Height Comparison
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.15)',
            padding: '16px 32px',
            borderRadius: '50px',
            fontSize: 24,
            color: 'white',
          }}
        >
          <span>📏</span>
          <span>Compare your height to 130+ celebrities</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
