import React from 'react';
import { useStore } from '@nanostores/react';
import { locale, setLocale } from '../stores/languageStore';

const LanguageSwitcher: React.FC = () => {
  const lang = useStore(locale);

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
