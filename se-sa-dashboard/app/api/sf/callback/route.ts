import { NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/sf';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.redirect('/?sf=error');
  const auth = await exchangeCodeForToken(code);
  // TODO: persist refresh_token securely
  return NextResponse.redirect(`/?sf=ok&inst=${encodeURIComponent(auth.instance_url)}`);
}
