import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { ParticleField } from '../components/ParticleField';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import {
  ArrowRight, ChevronRight, CheckCircle,
  Search, Users, Settings, Clock, TrendingUp, BarChart3,
  Shield, Eye, Briefcase, Globe, MapPin,
  Award, Handshake, Target, Layers
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const whoWeArePoints = [
  { icon: Eye, text: 'Deep industry understanding' },
  { icon: Settings, text: 'Structured hiring methodologies' },
  { icon: BarChart3, text: 'Market intelligence' },
  { icon: Target, text: 'Execution discipline' },
  { icon: Handshake, text: 'Long-term relationship focus' },
];

const journeyCapabilities = [
  { icon: Search, label: 'Executive Search' },
  { icon: Users, label: 'Contingency Hiring' },
  { icon: Settings, label: 'Recruitment Process Outsourcing (RPO)' },
  { icon: Clock, label: 'Temporary & Contract Staffing' },
  { icon: TrendingUp, label: 'Workforce Advisory' },
  { icon: BarChart3, label: 'Market Intelligence & Research' },
];

const philosophyBeliefs = [
  'Talent is a strategic differentiator.',
  'Hiring decisions must align with long-term business goals.',
  'Recruitment requires both human judgment and data-driven discipline.',
];

const philosophyPrinciples = [
  'Relationships matter more than transactions.',
  'Research supports every hiring mandate.',
  'Ethical engagement defines client and candidate experience.',
];

const founderStrengths = [
  'Extensive cross-industry hiring expertise',
  'Experience across multiple geographies',
  'Deep understanding of leadership search dynamics',
  'Insight into workforce scalability challenges',
];

const founderVision = [
  'Building long-term client partnerships',
  'Maintaining uncompromising ethical standards',
  'Creating measurable impact through structured hiring',
];

const teamHighlights = [
  '250+ Hiring Specialists',
  'Domain-aligned consultants',
  'Research analysts',
  'Embedded RPO professionals',
  'Workforce deployment coordinators',
];

const values = [
  { title: 'Integrity', desc: 'Transparent communication and ethical engagement.', icon: Shield },
  { title: 'Strategic Thinking', desc: 'Every mandate is aligned to business objectives.', icon: Target },
  { title: 'Execution Excellence', desc: 'Structured processes and measurable outcomes.', icon: Award },
  { title: 'Confidentiality', desc: 'Sensitive mandates handled with discretion.', icon: Eye },
  { title: 'Long-Term Partnership', desc: 'Client relationships built on sustained value.', icon: Handshake },
];

const globalStats = [
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 10000, suffix: '+', label: 'Placements Delivered' },
];

const globalCapabilities = [
  'Leadership mobility',
  'Multi-location expansion',
  'Global capability building',
];

const differentiators = [
  { title: 'Integrated Service Model', desc: 'Leadership, specialist, scalable, and contract hiring under one framework.' },
  { title: 'Research-Backed Delivery', desc: 'Market intelligence informs talent mapping.' },
  { title: 'High Retention Partnerships', desc: '95% client retention reflects consistent performance.' },
  { title: 'Structured Engagement', desc: 'Transparent processes from discovery to post-placement support.' },
];

const impactHighlights = [
  'Strengthened leadership pipelines',
  'Reduced hiring cycle timelines',
  'Enabled enterprise expansion',
  'Supported workforce transformation',
  'Advanced thousands of professional careers',
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

const StatNum = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);
  return (
    <div className="text-center">
      <div className="stat-number text-[3.5rem] lg:text-[5rem] font-800 leading-none">{fmt(count)}{stat.suffix}</div>
      <p className="font-body text-[0.875rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

/* ─── HERO ─── */
const AboutHero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="about-hero-particles" density="normal" />
      </motion.div>

      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Building Organisations. Transforming Careers.</span>
        </motion.div>
        <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.06] mt-6 max-w-[950px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Talent Strategy Built on Insight, Integrity, and Impact." startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[720px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          Ad Astra Consultants is a global talent solutions and advisory firm helping organisations secure high-impact talent and professionals unlock meaningful career opportunities.
        </motion.p>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 1: WHO WE ARE ─── */
const WhoWeAreSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-who-we-are">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — Who We Are</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            A Strategic Talent Partner.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Founded with the vision of elevating recruitment from a transactional activity to a strategic growth function, Ad Astra Consultants has evolved into a multi-dimensional talent solutions firm.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            With over 18 years of industry experience, we operate across leadership hiring, structured recruitment models, workforce scalability, and talent advisory.
          </p>
          <p className="font-body text-[0.9375rem] mt-6 leading-[1.8] font-500" style={{ color: 'var(--text-on-light)' }}>
            We believe talent decisions shape organisational destiny — and must therefore be approached with precision and responsibility.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          <p className="font-body font-600 text-[1rem] mb-4" style={{ color: 'var(--text-on-light)' }}>Our approach combines:</p>
          {whoWeArePoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-4" data-testid={`who-we-are-point-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{point.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 2: OUR JOURNEY ─── */
const JourneySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-journey">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-journey-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <span className="section-label">02 — Our Journey</span>
            <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
              From Search Firm to Integrated Talent Ecosystem.
            </h2>
            <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              Ad Astra began with a focused commitment to executive and specialist hiring. Over time, as client needs evolved, we expanded our capabilities.
            </p>
            <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              Today, we function as an integrated talent ecosystem — supporting businesses across growth phases and industries.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="grid grid-cols-2 gap-4">
            {journeyCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div key={cap.label} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-5 text-center" data-testid={`journey-cap-${i}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                    <Icon size={20} style={{ color: 'var(--orange-core)' }} />
                  </div>
                  <span className="font-body text-[0.8125rem] font-500" style={{ color: 'var(--text-on-dark)' }}>{cap.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: FOUNDING PHILOSOPHY ─── */
const PhilosophySection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-philosophy">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">03 — Our Founding Philosophy</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Why We Exist.
        </h2>
      </motion.div>

      <motion.div className="grid lg:grid-cols-2 gap-12" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.12 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <p className="font-body font-600 text-[1rem] mb-5" style={{ color: 'var(--text-on-light)' }}>The foundation rests on three core beliefs:</p>
          {philosophyBeliefs.map((belief, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 mb-4 flex items-start gap-4" data-testid={`belief-${i}`}>
              <span className="font-mono text-[1.5rem] font-700 flex-shrink-0" style={{ color: 'var(--orange-core)' }}>{i + 1}.</span>
              <p className="font-body text-[0.9375rem] leading-[1.7]" style={{ color: 'var(--text-on-light)' }}>{belief}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <p className="font-body font-600 text-[1rem] mb-5" style={{ color: 'var(--text-on-light)' }}>Our founders envisioned a firm where:</p>
          {philosophyPrinciples.map((principle, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 mb-4 flex items-center gap-4" data-testid={`principle-${i}`}>
              <CheckCircle size={18} className="flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
              <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{principle}</p>
            </motion.div>
          ))}
          <p className="font-body text-[0.9375rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            This philosophy continues to guide our delivery approach today.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 4: FOUNDERS ─── */
const FoundersSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-founders">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-founders-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <span className="section-label">04 — About the Founders</span>
            <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
              Leadership That Defines Direction.
            </h2>
            <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              Ad Astra Consultants was established by industry leaders with deep experience in recruitment strategy, leadership hiring, and organisational advisory.
            </p>

            <div className="mt-6">
              <p className="font-mono text-[0.625rem] mb-3" style={{ color: 'var(--orange-core)' }}>The Founding Team Brings</p>
              <ul className="space-y-2">
                {founderStrengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-[0.875rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <div className="glass-card-dark p-8" data-testid="founder-vision-card">
              <p className="font-mono text-[0.625rem] mb-4" style={{ color: 'var(--orange-core)' }}>Leadership Vision Centres On</p>
              <ul className="space-y-4">
                {founderVision.map((v, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[1.5rem] font-700 leading-none flex-shrink-0" style={{ color: 'var(--orange-core)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-display text-[1.125rem] font-600 leading-[1.4]" style={{ color: 'var(--text-on-dark)' }}>{v}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 5: TEAM ─── */
const TeamSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-team">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">05 — Our Leadership & Team</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            A Team Built on Expertise.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Ad Astra's strength lies in its people. Each consultant is aligned to specific industries and functional domains, enabling contextual precision in delivery.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            We operate with a collaborative structure — ensuring leadership mandates, enterprise-scale hiring, and contract workforce solutions are seamlessly coordinated.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-3">
          <p className="font-body font-600 text-[1rem] mb-4" style={{ color: 'var(--text-on-light)' }}>Our team includes:</p>
          {teamHighlights.map((item, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-4 flex items-center gap-3" data-testid={`team-highlight-${i}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <Users size={14} style={{ color: 'var(--orange-core)' }} />
              </div>
              <span className="font-body text-[0.9375rem] font-500" style={{ color: 'var(--text-on-light)' }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 6: VALUES ─── */
const ValuesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-values">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-values-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">06 — Our Values</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Principles That Guide Us.
          </h2>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-6 text-center" data-testid={`value-${i}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                  <Icon size={22} style={{ color: 'var(--orange-core)' }} />
                </div>
                <h3 className="font-display text-[1rem] font-600" style={{ color: 'var(--text-on-dark)' }}>{v.title}</h3>
                <p className="font-body text-[0.8125rem] mt-2 leading-[1.6]" style={{ color: 'var(--text-on-dark-muted)' }}>{v.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 7: GLOBAL FOOTPRINT ─── */
const GlobalSection = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-global">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[150px] opacity-15" style={{ background: 'var(--orange-core)' }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <div className="accent-line mb-6" />
            <span className="section-label">07 — Our Global Footprint</span>
            <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
              Global Reach. Contextual Insight.
            </h2>
            <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
              We combine international search capabilities with deep local understanding. Our cross-border hiring experience allows us to support:
            </p>
            <ul className="mt-5 space-y-3">
              {globalCapabilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                  <Globe size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div ref={(el) => { if (sectionRef.current === null) sectionRef.current = el; ref.current = el; }} variants={fadeUp} transition={{ duration: 0.8, ease }} className="flex flex-wrap justify-center gap-8">
            {globalStats.map((s, i) => (
              <div key={s.label} className="glass-card-light p-8 text-center flex-1 min-w-[160px]" data-testid={`global-stat-${i}`}>
                <div className="font-display text-[2.5rem] lg:text-[3rem] font-800 leading-none" style={{ color: 'var(--orange-core)' }}>
                  {vis ? <>{new Intl.NumberFormat().format(useCountUp(s.value, 2500, true))}{s.suffix}</> : <>0{s.suffix}</>}
                </div>
                <p className="font-body text-[0.8125rem] mt-2" style={{ color: 'var(--text-on-light-muted)' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 8: DIFFERENTIATION ─── */
const DifferentiationSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-differentiation">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-diff-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">08 — Our Differentiation</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            What Sets Ad Astra Apart.
          </h2>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {differentiators.map((d, i) => (
            <motion.div key={d.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-7" data-testid={`differentiator-${i}`}>
              <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[1.25rem] font-600 mt-2" style={{ color: 'var(--text-on-dark)' }}>{d.title}</h3>
              <p className="font-body text-[0.875rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 9: OUR IMPACT ─── */
const ImpactSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-impact">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">09 — Our Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Beyond Hiring.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Over 18+ years, we have:
          </p>
          <ul className="mt-5 space-y-3">
            {impactHighlights.map((item, i) => (
              <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                {item}
              </motion.li>
            ))}
          </ul>
          <p className="font-body text-[0.9375rem] mt-6 font-500 leading-[1.8]" style={{ color: 'var(--text-on-light)' }}>
            We measure success by long-term organisational growth and sustained candidate success.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <Link to="/impact" className="glass-card-light p-8 block no-underline group" data-testid="about-impact-link">
            <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)' }}>Explore Full Impact</span>
            <p className="font-display text-[1.375rem] font-600 mt-3 leading-[1.4]" style={{ color: 'var(--text-on-light)' }}>
              Discover how our work creates measurable outcomes across leadership, enterprise scaling, and workforce transformation.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 font-body font-600 text-[0.875rem] transition-all duration-300 group-hover:gap-3" style={{ color: 'var(--orange-core)' }}>
              View Impact Page <ArrowRight size={14} />
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 10: FINAL CTA ─── */
const FinalCTASection = ({ onConsultation }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-final-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-[0.06]" style={{ background: 'var(--orange-core)' }} />

      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.25rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Looking Ahead.
          </h2>
          <p className="font-body text-[1.0625rem] mt-6 max-w-[650px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            As industries evolve and workforce models transform, Ad Astra Consultants remains committed to elevating talent acquisition into a strategic business advantage. We continue to innovate, adapt, and refine our approach — ensuring our clients and candidates remain future-ready.
          </p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onConsultation} className="btn-primary" data-testid="about-final-consultation-btn">
              Connect With Our Leadership <ArrowRight size={16} />
            </button>
            <Link to="/solutions" className="btn-secondary btn-secondary-dark no-underline" data-testid="about-final-explore-btn">
              Explore Our Solutions <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── MAIN PAGE ─── */
export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <AboutHero />
      <WhoWeAreSection />
      <JourneySection />
      <PhilosophySection />
      <FoundersSection />
      <TeamSection />
      <ValuesSection />
      <GlobalSection />
      <DifferentiationSection />
      <ImpactSection />
      <FinalCTASection onConsultation={() => setConsultationOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
