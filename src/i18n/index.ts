import en from './en.json';
import nl from './nl.json';
import type { Locale } from '../stores/languageStore';

const translations: Record<Locale, Record<string, any>> = { en, nl };

/**
 * Resolve a dot-notated key from the translation files.
 * e.g. t('nav.about', 'en') → "About Me"
 *      t('about.whyCards.0.title', 'nl') → "Security-First Aanpak"
 */
export function t(key: string, lang: Locale): string {
  const parts = key.split('.');
  let value: any = translations[lang];
  for (const part of parts) {
    if (value == null) return key;
    value = value[part];
  }
  return typeof value === 'string' ? value : key;
}

/** Return the entire sub-object for a given key path (useful for arrays). */
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
