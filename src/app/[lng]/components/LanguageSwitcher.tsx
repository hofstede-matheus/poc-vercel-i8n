'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages } from '@/i18n/settings';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];

  return (
    <div className="flex gap-4 p-4 justify-center">
      {languages.map((lng) => {
        // Skip the current language
        if (lng === currentLang) return null;

        // Replace the language segment in the path
        const href = pathname.replace(`/${currentLang}`, `/${lng}`);
        
        return (
          <Link 
            key={lng} 
            href={href}
            className="text-blue-500 hover:underline"
          >
            {lng === 'en' ? 'English' : 'Português'}
          </Link>
        );
      }).filter(Boolean)}
    </div>
  );
} 