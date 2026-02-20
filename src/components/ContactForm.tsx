import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Auto-dismiss toast after 4 seconds
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
      const response = await fetch("https://formspree.io/f/jouw_id", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setToast({ message: 'Message sent successfully!', type: 'success' });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('ERROR');
        setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch {
      setStatus('ERROR');
      setToast({ message: 'Network error. Please check your connection.', type: 'error' });
    }
  };

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <i className={toast.type === 'success' ? 'fa-solid fa-check' : 'fa-solid fa-xmark'}></i>
          <span>{toast.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form-island">
        {/* Honeypot field for Formspree bot detection */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div className="form-row">
          <div className="input-group">
            <label>NAME</label>
            <input type="text" name="name" placeholder="John Doe" required />
          </div>
          <div className="input-group">
            <label>EMAIL</label>
            <input type="email" name="email" placeholder="john@example.com" required />
          </div>
        </div>

        <div className="input-group">
          <label>MESSAGE</label>
          <textarea name="message" rows={6} placeholder="Tell me about your project..." required></textarea>
        </div>

        <button type="submit" disabled={status === 'SENDING'} className="submit-btn">
          {status === 'SENDING' ? 'SENDING...' : 'Send Message →'}
        </button>
      </form>
    </>
  );
};

export default ContactForm;