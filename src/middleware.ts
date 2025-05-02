import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng } from './i18n/settings';

// Map country codes to locales
const countryLocaleMap: Record<string, string> = {
  'BR': 'pt-BR',
  // Add more country mappings here as needed
};

export default function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = languages.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Get country from Vercel's header
  const country = request.headers.get('x-vercel-ip-country') || '';
  
  // Set locale based on country map or fallback to default
  const locale = countryLocaleMap[country] || fallbackLng;
  
  // Redirect if there is no locale
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
}; 