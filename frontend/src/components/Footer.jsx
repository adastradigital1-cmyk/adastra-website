import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { submitNewsletter } from '../services/supabaseService';
import { toast } from 'sonner';
import { WorldMap } from './WorldMap';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Leadership', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  services: [
    { label: 'Executive Search', href: '#' },
    { label: 'Contingent Search', href: '#' },
    { label: 'RPO', href: '#' },
    { label: 'Temporary Staffing', href: '#' },
  ],
  offices: ['Bangalore', 'Hyderabad', 'Kolkata', 'Mumbai', 'New Delhi', 'Coimbatore', 'Singapore', 'London', 'Amsterdam'],
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await submitNewsletter(email);
      toast.success('Subscribed successfully');
      setEmail('');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSending(false);
    }
  };

  const FooterLink = ({ item }) => {
    if (item.href.startsWith('/')) {
      return <Link to={item.href} className="font-body text-[0.875rem] text-[var(--text-on-dark-muted)] hover:text-[var(--orange-core)] transition-colors duration-300 no-underline block py-1">{item.label}</Link>;
    }
    return <a href={item.href} className="font-body text-[0.875rem] text-[var(--text-on-dark-muted)] hover:text-[var(--orange-core)] transition-colors duration-300 no-underline block py-1">{item.label}</a>;
  };

  return (
    <footer style={{ backgroundColor: '#080808' }} data-testid="footer">
      {/* Newsletter Band */}
      <div className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <h3 className="font-display text-[1.75rem] lg:text-[2rem] font-600" style={{ color: 'var(--white-pure)' }}>
                Stay ahead in talent strategy
              </h3>
              <p className="font-body text-[0.9375rem] mt-2" style={{ color: 'var(--text-on-dark-muted)' }}>
                Insights, reports, and perspectives — delivered monthly.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-3" data-testid="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="font-body text-[0.875rem] px-5 py-3 rounded-full border bg-transparent outline-none transition-all duration-300 focus:border-[var(--orange-core)] w-[280px]"
                style={{ borderColor: 'var(--border-dark)', color: 'var(--text-on-dark)' }}
                data-testid="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={sending}
                className="btn-primary !py-3 !px-6 !text-[0.8125rem]"
                data-testid="newsletter-submit-btn"
              >
                {sending ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* World Map — Global Presence */}
      <div className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] uppercase mb-6 text-center" style={{ color: 'var(--text-on-dark-muted)' }}>
            Our Global Presence
          </p>
          <WorldMap />
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo-white.png" alt="Ad Astra" className="h-8 w-auto mb-4" />
            <p className="font-body text-[0.8125rem] leading-[1.7] max-w-[240px]" style={{ color: 'var(--text-on-dark-muted)' }}>
              Building leadership pipelines and scalable workforce models for organisations worldwide.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[0.6875rem] mb-5" style={{ color: 'var(--text-on-dark-muted)' }}>Company</h4>
            {footerLinks.company.map((item) => <FooterLink key={item.label} item={item} />)}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[0.6875rem] mb-5" style={{ color: 'var(--text-on-dark-muted)' }}>Services</h4>
            {footerLinks.services.map((item) => <FooterLink key={item.label} item={item} />)}
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-mono text-[0.6875rem] mb-5" style={{ color: 'var(--text-on-dark-muted)' }}>Global Offices</h4>
            {footerLinks.offices.map((city) => (
              <p key={city} className="font-body text-[0.875rem] py-1" style={{ color: 'var(--text-on-dark-muted)' }}>{city}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[0.6875rem] mb-5" style={{ color: 'var(--text-on-dark-muted)' }}>Get in Touch</h4>
            <a href="mailto:info@adastraconsultants.com" className="font-body text-[0.875rem] no-underline block py-1 hover:text-[var(--orange-core)] transition-colors duration-300" style={{ color: 'var(--text-on-dark-muted)' }}>
              info@adastraconsultants.com
            </a>
            <a href="tel:+918040928888" className="font-body text-[0.875rem] no-underline block py-1 hover:text-[var(--orange-core)] transition-colors duration-300" style={{ color: 'var(--text-on-dark-muted)' }}>
              +91 80 4092 8888
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--border-dark)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[0.75rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
            &copy; {new Date().getFullYear()} Ad Astra Consultants. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Instagram, href: '#' },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} className="text-[var(--text-on-dark-muted)] hover:text-[var(--orange-core)] opacity-50 hover:opacity-100 transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
