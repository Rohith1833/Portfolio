import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, RefreshCw } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Please specify a brief subject (at least 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject.trim()} — from ${formData.name.trim()}`);
    const mailBody = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}\n\n---\nSent via Portfolio Contact Form`
    );

    const mailtoUrl = `mailto:${PORTFOLIO_CONFIG.contactEmail}?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus('success');
    }, 400);
  };

  const handleCopy = async () => {
    const fullText = `To: ${PORTFOLIO_CONFIG.contactEmail}\nSubject: [Portfolio Inquiry] ${formData.subject}\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setStatus('idle');
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 w-full shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold block mb-1">
            DIRECT TRANSMISSION // DISPATCH
          </span>
          <h4 className="text-lg font-bold text-fdf3f2">Send a Message</h4>
        </div>
        <span className="font-mono text-[10px] text-muted-grey bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
          Direct to Email
        </span>
      </div>

      {status === 'success' ? (
        <div className="bg-black/60 border border-green-500/30 rounded-2xl p-6 flex flex-col items-center text-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-base font-bold text-fdf3f2">Transmission Prepared!</h5>
            <p className="text-xs text-muted-grey leading-relaxed max-w-sm mx-auto mt-1">
              Your default email client has been launched with the message pre-filled for <strong className="text-fdf3f2">{PORTFOLIO_CONFIG.contactEmail}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={handleCopy}
              className="bg-white/10 hover:bg-white/15 text-fdf3f2 px-4 py-2.5 rounded-full border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Message' : 'Copy Message Text'}</span>
            </button>

            <button
              onClick={handleReset}
              className="bg-primary-red text-near-black px-5 py-2.5 rounded-full font-bold transition-all hover:bg-primary-red/90 cursor-pointer"
            >
              Write Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 font-mono text-xs">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-[10px] uppercase tracking-wider text-muted-grey">
                Your Name <span className="text-primary-red">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Bruce Wayne"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`bg-black/60 border rounded-xl px-4 py-3 text-fdf3f2 font-sans text-xs focus:outline-none focus:border-primary-red transition-colors placeholder:text-muted-grey/40 ${
                  errors.name ? 'border-primary-red' : 'border-white/10'
                }`}
              />
              {errors.name && (
                <span id="name-error" className="text-[10px] text-primary-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-[10px] uppercase tracking-wider text-muted-grey">
                Your Email Address <span className="text-primary-red">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`bg-black/60 border rounded-xl px-4 py-3 text-fdf3f2 font-sans text-xs focus:outline-none focus:border-primary-red transition-colors placeholder:text-muted-grey/40 ${
                  errors.email ? 'border-primary-red' : 'border-white/10'
                }`}
              />
              {errors.email && (
                <span id="email-error" className="text-[10px] text-primary-red flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-subject" className="text-[10px] uppercase tracking-wider text-muted-grey">
              Subject Scope <span className="text-primary-red">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Full-Stack Role / Project Collaboration / Inquiry"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`bg-black/60 border rounded-xl px-4 py-3 text-fdf3f2 font-sans text-xs focus:outline-none focus:border-primary-red transition-colors placeholder:text-muted-grey/40 ${
                errors.subject ? 'border-primary-red' : 'border-white/10'
              }`}
            />
            {errors.subject && (
              <span id="subject-error" className="text-[10px] text-primary-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.subject}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-[10px] uppercase tracking-wider text-muted-grey">
              Transmission Message <span className="text-primary-red">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your note or technical inquiry..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`bg-black/60 border rounded-xl p-4 text-fdf3f2 font-sans text-xs focus:outline-none focus:border-primary-red transition-colors placeholder:text-muted-grey/40 resize-none ${
                errors.message ? 'border-primary-red' : 'border-white/10'
              }`}
            />
            {errors.message && (
              <span id="message-error" className="text-[10px] text-primary-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <span className="text-[10px] text-muted-grey/70">
              Direct dispatch to <strong className="text-fdf3f2">{PORTFOLIO_CONFIG.contactEmail}</strong>
            </span>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-primary-red text-near-black px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(235,74,66,0.3)] hover:bg-primary-red/90 cursor-pointer disabled:opacity-50 select-none uppercase tracking-wider w-full sm:w-auto justify-center"
            >
              {status === 'submitting' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing Dispatch...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

