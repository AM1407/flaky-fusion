import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { locale } from '../stores/languageStore';
import { t } from '../i18n/index';

const ContactForm = () => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const lang = useStore(locale);

  // Automatically hide toast after 4.2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING');

    const formData = new FormData(e.currentTarget);
    try {
      // SECURITY FIX: Replace placeholder Formspree ID with your real form ID
      const response = await fetch("https://formspree.io/f/YOUR_REAL_FORM_ID", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setToast({ message: t('contact.toastSuccess', lang), type: 'success' });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('ERROR');
        setToast({ message: t('contact.toastError', lang), type: 'error' });
      }
    } catch {
      setStatus('ERROR');
      setToast({ message: t('contact.toastNetwork', lang), type: 'error' });
    }
  };

  return (
    <>
      {/* Toast notification banner */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <i className={toast.type === 'success' ? 'fa-solid fa-check' : 'fa-solid fa-xmark'}></i>
          <span>{toast.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form-island">
        {/* Hidden honeypot field to prevent spam bots */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        {/* SECURITY FIX: Added maxLength constraints to prevent oversized payloads */}
        <div className="form-row">
          <div className="input-group">
            <label>{t('contact.formName', lang)}</label>
            <input type="text" name="name" placeholder={t('contact.formNamePlaceholder', lang)} required maxLength={100} />
          </div>
          <div className="input-group">
            <label>{t('contact.formEmail', lang)}</label>
            <input type="email" name="email" placeholder={t('contact.formEmailPlaceholder', lang)} required maxLength={254} />
          </div>
        </div>

        <div className="input-group">
          <label>{t('contact.formMessage', lang)}</label>
          <textarea name="message" rows={6} placeholder={t('contact.formMessagePlaceholder', lang)} required maxLength={5000}></textarea>
        </div>

        <button type="submit" disabled={status === 'SENDING'} className="submit-btn">
          {status === 'SENDING' ? t('contact.formSending', lang) : t('contact.formSubmit', lang)}
        </button>
      </form>
    </>
  );
};

export default ContactForm;