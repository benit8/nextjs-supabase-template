import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { unauthenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  return NextResponse.redirect(new URL(unauthenticatedUrl, request.url));
}
