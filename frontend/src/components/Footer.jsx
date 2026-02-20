import React, { useState } from 'react';
import { footerLinks, contactInfo } from '../data/mock';
import { Linkedin, Twitter, Facebook, Instagram, Send, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { submitNewsletter } from '../services/supabaseService';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      await submitNewsletter(email.trim());
      setStatus('success');
      setMessage('Subscribed!');
      setEmail('');
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 3000);
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 4000);
    }
  };

  return (
    <footer style={{ backgroundColor: '#2B2B2B' }} className="pt-20 pb-8">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/logo-white.png"
              alt="Ad Astra Consultants"
              className="h-12 w-auto mb-5"
              style={{ mixBlendMode: 'screen' }}
            />
            <p
              className="text-[13px] text-[#999] leading-[1.8] mb-6 max-w-[280px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Building leadership pipelines and scalable workforce models for
              organisations worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#666]" />
                <span className="text-[12px] text-[#999]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {contactInfo.email}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#666]" />
                <span className="text-[12px] text-[#999]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {contactInfo.phone}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#666]" />
                <span className="text-[12px] text-[#999]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {contactInfo.location}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-md flex items-center justify-center bg-white/[0.06] text-[#888] hover:bg-[#F26522] hover:text-white transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-white font-semibold text-[12px] uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#999] text-[13px] hover:text-[#F26522] transition-colors duration-300 no-underline"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="text-[#666] text-[11px] tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            &copy; 2025 Ad Astra Consultants. All rights reserved.
          </p>

          {/* Newsletter */}
          <div className="flex flex-col items-end gap-1.5">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder={status === 'success' ? 'Subscribed!' : 'Subscribe to insights'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-60 px-4 py-2.5 rounded-md bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder-[#666] focus:outline-none focus:border-[#F26522]/50 transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="p-2.5 rounded-md transition-all duration-300 hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60"
                style={{ backgroundColor: '#F26522' }}
              >
                {status === 'loading' ? (
                  <Loader2 size={15} className="text-white animate-spin" />
                ) : (
                  <Send size={15} className="text-white" />
                )}
              </button>
            </form>
            {message && (
              <p className={`text-[11px] ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
