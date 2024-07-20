import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { authenticatedUrl, unauthenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? unauthenticatedUrl;
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.search = '';

  if (token_hash && type) {
    const supabase = createClient();

    const { error, data } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      console.log('Verified', data.session);
      // Redirect user to specified redirect URL or root of app.
      return NextResponse.redirect(redirectTo);
    }
  }

  // Redirect the user to an error page with some instructions.
  redirectTo.pathname = authenticatedUrl;
  return NextResponse.redirect(redirectTo);
}
