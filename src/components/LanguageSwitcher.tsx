import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { locale, setLocale, type Locale } from '../stores/languageStore';

const LanguageSwitcher: React.FC = () => {
  const storeLang = useStore(locale);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Hydrate the store from localStorage to correct SSR default ('en')
    const saved = localStorage.getItem('lang') as Locale | null;
    if (saved === 'en' || saved === 'nl') {
      if (locale.get() !== saved) {
        setLocale(saved);
      }
    }
    setHasMounted(true);
  }, []);

  // Use SSR default before mount; switch to real store value after hydration
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
