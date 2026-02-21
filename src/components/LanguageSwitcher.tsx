import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { locale, setLocale, type Locale } from '../stores/languageStore';

const LanguageSwitcher: React.FC = () => {
  const storeLang = useStore(locale);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Sync atom from localStorage after mount to fix SSR hydration mismatch.
    // During SSR, the atom defaults to 'en' because localStorage isn't available.
    // After hydration, we read the real persisted value and correct the store.
    const saved = localStorage.getItem('lang') as Locale | null;
    if (saved === 'en' || saved === 'nl') {
      if (locale.get() !== saved) {
        setLocale(saved);
      }
    }
    setHasMounted(true);
  }, []);

  // Before mount, match the SSR output ('en') to avoid hydration warnings.
  // After mount, use the real store value.
  const lang = hasMounted ? storeLang : 'en';

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`lang-btn ${lang === 'nl' ? 'active' : ''}`}
        onClick={() => setLocale('nl')}
        aria-label="Schakel over naar Nederlands"
      >
        NL
      </button>
    </div>
  );
};

export default LanguageSwitcher;
