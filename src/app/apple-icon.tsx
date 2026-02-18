import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '8px',
          padding: '24px',
          borderRadius: '32px',
        }}
      >
        {/* Taller figure */}
        <div
          style={{
            width: '50px',
            height: '110px',
            background: 'white',
            borderRadius: '25px 25px 0 0',
          }}
        />
        {/* Shorter figure */}
        <div
          style={{
            width: '50px',
            height: '75px',
            background: '#10B981',
            borderRadius: '25px 25px 0 0',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
