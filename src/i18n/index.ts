import en from './en.json';
import nl from './nl.json';
import type { Locale } from '../stores/languageStore';

const translations: Record<Locale, Record<string, any>> = { en, nl };

// Resolve a dot-notated key (e.g. 'nav.about') from the translation files
export function t(key: string, lang: Locale): string {
  const parts = key.split('.');
  let value: any = translations[lang];
  for (const part of parts) {
    if (value == null) return key;
    value = value[part];
  }
  return typeof value === 'string' ? value : key;
}

// Return the raw sub-object at a key path (useful for arrays of items)
export function tObj(key: string, lang: Locale): any {
  const parts = key.split('.');
  let value: any = translations[lang];
  for (const part of parts) {
    if (value == null) return undefined;
    value = value[part];
  }
  return value;
}

export { en, nl };
