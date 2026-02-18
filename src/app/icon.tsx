import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
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
          gap: '2px',
          padding: '4px',
          borderRadius: '6px',
        }}
      >
        {/* Taller figure */}
        <div
          style={{
            width: '10px',
            height: '20px',
            background: 'white',
            borderRadius: '5px 5px 0 0',
          }}
        />
        {/* Shorter figure */}
        <div
          style={{
            width: '10px',
            height: '14px',
            background: '#10B981',
            borderRadius: '5px 5px 0 0',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
