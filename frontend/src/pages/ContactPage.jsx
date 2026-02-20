import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ParticleField } from '../components/ParticleField';
import { submitContactForm, submitConsultation } from '../services/supabaseService';
import { offices } from '../data/mock';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, ArrowRight, Building2, User, Briefcase } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const inquiryTypes = [
  { id: 'employer', label: 'I\'m Hiring', icon: Building2, desc: 'Find exceptional talent for your organisation' },
  { id: 'candidate', label: 'I\'m a Candidate', icon: User, desc: 'Explore career opportunities worldwide' },
  { id: 'general', label: 'General Inquiry', icon: Briefcase, desc: 'Partnership, media, or other questions' },
];

const WordReveal = ({ text, className, style, startDelay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.3em]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: startDelay + i * 0.08, ease }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const ContactForm = () => {
  const [activeType, setActiveType] = useState('employer');
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      if (activeType === 'employer') {
        await submitConsultation({ name: form.name, email: form.email, company: form.company, job_title: 'Employer Inquiry' });
      } else {
        await submitContactForm({ name: form.name, email: form.email, company: form.company || 'N/A', message: `[${activeType.toUpperCase()}] ${form.message}` });
      }
      toast.success('Thank you! We\'ll respond within 24 hours.');
      setForm({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full font-body text-[0.9375rem] px-5 py-3.5 rounded-2xl border bg-transparent outline-none transition-all duration-300 focus:border-[var(--orange-core)]";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card-light !rounded-3xl !p-8 lg:!p-10"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} transition={{ duration: 0.8, delay: 0.2, ease }}
      data-testid="contact-form"
    >
      {/* Inquiry type selector */}
      <div className="mb-8">
        <p className="font-mono text-[0.6875rem] mb-4" style={{ color: 'var(--text-on-light-muted)' }}>I'm reaching out as</p>
        <div className="grid grid-cols-3 gap-3">
          {inquiryTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setActiveType(type.id)}
              data-testid={`inquiry-type-${type.id}`}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                activeType === type.id
                  ? 'border-[var(--orange-core)] bg-[var(--orange-ghost)]'
                  : 'border-[var(--border-light)] hover:border-[var(--orange-core)]/30'
              }`}
            >
              <type.icon size={18} style={{ color: activeType === type.id ? 'var(--orange-core)' : 'var(--text-on-light-muted)' }} />
              <p className="font-body font-600 text-[0.8125rem] mt-2" style={{ color: 'var(--text-on-light)' }}>{type.label}</p>
              <p className="font-body text-[0.6875rem] mt-0.5 leading-[1.5]" style={{ color: 'var(--text-on-light-muted)' }}>{type.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder="Full Name *" required value={form.name} onChange={set('name')} className={inputClass} style={{ borderColor: 'var(--border-light)', color: 'var(--text-on-light)' }} data-testid="contact-name-input" />
        <input type="email" placeholder="Email Address *" required value={form.email} onChange={set('email')} className={inputClass} style={{ borderColor: 'var(--border-light)', color: 'var(--text-on-light)' }} data-testid="contact-email-input" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder={activeType === 'candidate' ? 'Current Company' : 'Company Name *'} required={activeType !== 'candidate'} value={form.company} onChange={set('company')} className={inputClass} style={{ borderColor: 'var(--border-light)', color: 'var(--text-on-light)' }} data-testid="contact-company-input" />
        <input type="tel" placeholder="Phone (Optional)" value={form.phone} onChange={set('phone')} className={inputClass} style={{ borderColor: 'var(--border-light)', color: 'var(--text-on-light)' }} data-testid="contact-phone-input" />
      </div>
      <textarea
        placeholder="Tell us about your needs..."
        rows={4}
        value={form.message}
        onChange={set('message')}
        className={`${inputClass} resize-none`}
        style={{ borderColor: 'var(--border-light)', color: 'var(--text-on-light)' }}
        data-testid="contact-message-input"
      />

      <div className="mt-6 flex items-center justify-between">
        <button type="submit" disabled={sending} className="btn-primary" data-testid="contact-submit-btn">
          {sending ? 'Sending...' : 'Send Message'} <ArrowRight size={16} />
        </button>
        <div className="flex items-center gap-2">
          <Clock size={14} style={{ color: 'var(--text-on-light-muted)' }} />
          <span className="font-body text-[0.75rem]" style={{ color: 'var(--text-on-light-muted)' }}>We respond within 24 hours</span>
        </div>
      </div>
    </motion.form>
  );
};

export default function ContactPage() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  const handleContact = () => {
    const form = document.querySelector('[data-testid="contact-form"]');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="contact-page">
      <Navbar onContactClick={handleContact} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="contact-hero">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="absolute inset-0 gradient-mesh" />
          <div className="noise-overlay absolute inset-0" />
          <ParticleField id="contact-hero-particles" density="normal" />
        </motion.div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--orange-core)] to-transparent opacity-30 z-10" />

        <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-16 z-10" style={{ y: fgY, opacity }}>
          <div className="max-w-[700px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
              <span className="section-label">Get in Touch</span>
            </motion.div>
            <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6" style={{ color: 'var(--white-pure)' }}>
              <WordReveal text="Let's Start a Conversation" startDelay={0.3} />
            </h1>
            <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-6 max-w-[480px] leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
              Whether you're building a team, exploring a career move, or looking for strategic talent guidance — we're ready to help.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--white-warm)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-16">
            {/* Form */}
            <ContactForm />

            {/* Info sidebar */}
            <motion.div
              className="space-y-10"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp} transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <div>
                <div className="accent-line mb-6" />
                <span className="section-label">Direct Contact</span>
                <div className="mt-6 space-y-5">
                  <a href="mailto:info@adastraconsultants.com" className="flex items-center gap-3 group no-underline" data-testid="contact-email-link">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                      <Mail size={16} style={{ color: 'var(--orange-core)' }} />
                    </div>
                    <span className="font-body text-[0.9375rem] group-hover:text-[var(--orange-core)] transition-colors duration-300" style={{ color: 'var(--text-on-light)' }}>info@adastraconsultants.com</span>
                  </a>
                  <a href="tel:+918040928888" className="flex items-center gap-3 group no-underline" data-testid="contact-phone-link">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                      <Phone size={16} style={{ color: 'var(--orange-core)' }} />
                    </div>
                    <span className="font-body text-[0.9375rem] group-hover:text-[var(--orange-core)] transition-colors duration-300" style={{ color: 'var(--text-on-light)' }}>+91 80 4092 8888</span>
                  </a>
                </div>
              </div>

              {/* Response commitment */}
              <div className="glass-card-light !rounded-2xl !p-6" data-testid="response-commitment">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} style={{ color: 'var(--orange-core)' }} />
                  <h3 className="font-display text-[1.125rem] font-600" style={{ color: 'var(--text-on-light)' }}>Our Response Commitment</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    'Employer inquiries — within 4 business hours',
                    'Candidate inquiries — within 24 hours',
                    'General inquiries — within 48 hours',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--orange-core)' }} />
                      <span className="font-body text-[0.8125rem] leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OFFICES ─── */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="contact-offices">
        <ParticleField id="contact-offices-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
          <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <div className="accent-line mb-6" style={{ background: 'var(--orange-core)' }} />
            <span className="section-label">Global Presence</span>
            <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
              Our Offices
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.08 }}
          >
            {offices.map((office) => (
              <motion.div
                key={office.city}
                variants={fadeUp}
                transition={{ duration: 0.7, ease }}
                className="glass-card-dark p-6"
                data-testid={`office-${office.city.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} style={{ color: 'var(--orange-core)' }} />
                  <h3 className="font-display text-[1.25rem] font-600" style={{ color: 'var(--text-on-dark)' }}>
                    {office.city}
                    {office.tag && <span className="ml-2 font-mono text-[0.625rem] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--orange-ghost)', color: 'var(--orange-core)' }}>{office.tag}</span>}
                  </h3>
                </div>
                <p className="font-body text-[0.8125rem] leading-[1.7] mb-3" style={{ color: 'var(--text-on-dark-muted)' }}>{office.address}</p>
                {office.phone && (
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="block font-mono text-[0.6875rem] no-underline hover:text-[var(--orange-core)] transition-colors duration-300 mb-1" style={{ color: 'var(--text-on-dark-muted)' }}>
                    Ph: {office.phone}
                  </a>
                )}
                {office.fax && (
                  <span className="block font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                    Fax: {office.fax}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
