export const dynamic = 'force-static';
export async function GET() {
  return new Response('53b047a5-0678-4a54-8708-c74ded2b62b5', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}