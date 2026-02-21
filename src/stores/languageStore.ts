import { atom } from 'nanostores';

export type Locale = 'en' | 'nl';

/** Holds the active language — defaults to 'en' or whatever was saved before. */
export const locale = atom<Locale>(getInitialLocale());

/** Read the saved language from localStorage (SSR-safe). */
function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('lang');
    if (saved === 'nl' || saved === 'en') return saved;
  }
  return 'en';
}

/** Switch language + persist the choice. */
export function setLocale(lang: Locale) {
  locale.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    // Dispatch a custom event so plain (non-React) scripts can react
    window.dispatchEvent(new CustomEvent('locale-changed', { detail: lang }));
  }
}
