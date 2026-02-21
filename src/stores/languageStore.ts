import { atom } from 'nanostores';

export type Locale = 'en' | 'nl';

// Active language atom, initialized from localStorage or defaulting to 'en'
export const locale = atom<Locale>(getInitialLocale());

// Read the persisted language preference (returns 'en' during SSR)
function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('lang');
    if (saved === 'nl' || saved === 'en') return saved;
  }
  return 'en';
}

// Switch language, persist to localStorage, and notify non-React listeners
export function setLocale(lang: Locale) {
  locale.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    // Dispatch event for scripts that don't subscribe to the nanostore
    window.dispatchEvent(new CustomEvent('locale-changed', { detail: lang }));
  }
}
