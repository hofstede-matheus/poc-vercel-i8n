'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => 
    import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    // Initialize with load: 'languageOnly' to ensure fallback works correctly
    load: 'languageOnly',
    // Prefer client-side language detection
    detection: { order: ['path', 'htmlTag'] }
  });

export function useTranslation(lng: string, ns: string = 'common', options = {}) {
  return useTranslationOrg(ns, {
    ...options,
    lng,
  });
} 