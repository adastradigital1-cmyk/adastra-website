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
  ArrowRight, ChevronRight, CheckCircle, Quote,
  Cpu, Factory, Landmark, Heart, Truck, Zap, ShoppingBag, Rocket,
  Globe, Users, TrendingUp, Clock, BarChart3, Briefcase,
  Target, Shield, BookOpen, Handshake, LineChart, Award
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const scaleStats = [
  { value: 18, suffix: '+', label: 'Years of Talent Leadership' },
  { value: 250, suffix: '+', label: 'Hiring Specialists' },
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 10000, suffix: '+', label: 'Successful Placements' },
  { value: 95, suffix: '%', label: 'Client Retention Rate' },
];

const leadershipHighlights = [
  'Closed confidential CXO searches across multiple industries',
  'Supported succession planning initiatives',
  'Built leadership pipelines for expansion markets',
  'Accelerated executive hiring timelines',
];

const leadershipMetrics = [
  { metric: '3X', desc: 'Faster Executive Closures compared to traditional market cycles' },
  { metric: '60-90', desc: 'Days to complete leadership mandates in high-growth sectors' },
];

const enterpriseHighlights = [
  'Reduced average time-to-hire by up to 40%',
  'Built embedded recruitment teams for large enterprises',
  'Supported multi-location hiring expansions',
  'Delivered workforce scale-ups during rapid growth cycles',
];

const workforceHighlights = [
  'Rapid deployment of skilled professionals',
  'Seamless payroll & compliance management',
  'Flexible workforce scaling during seasonal or project cycles',
];

const industryImpacts = [
  { icon: Cpu, name: 'Technology', impact: 'Supported leadership hiring during product expansion phases.' },
  { icon: Factory, name: 'Manufacturing', impact: 'Reduced leadership vacancy downtime across plant operations.' },
  { icon: Landmark, name: 'BFSI', impact: 'Placed compliance and risk leaders aligned to regulatory frameworks.' },
  { icon: Heart, name: 'Healthcare', impact: 'Supported administrative and operational talent deployment.' },
  { icon: Truck, name: 'Logistics', impact: 'Enabled rapid scale-up during e-commerce demand surges.' },
  { icon: Zap, name: 'Energy & EV', impact: 'Placed specialised engineering leadership for renewable initiatives.' },
  { icon: ShoppingBag, name: 'Consumer & Retail', impact: 'Strengthened omni-channel operational leadership.' },
  { icon: Rocket, name: 'Startups', impact: 'Built founding teams and growth leadership structures.' },
];

const candidateHighlights = [
  'Enabled leadership transitions',
  'Facilitated cross-industry career moves',
  'Supported international mobility placements',
  'Strengthened candidate preparedness through structured guidance',
];

const thoughtLeadershipPoints = [
  'Published structured hiring intelligence',
  'Contributed to national business publications',
  'Provided commentary on workforce trends',
  'Delivered market-driven advisory to organisations',
];

const partnershipPillars = [
  { icon: CheckCircle, text: 'Consistent delivery' },
  { icon: Shield, text: 'Transparent communication' },
  { icon: Target, text: 'Strategic alignment' },
  { icon: Award, text: 'Performance accountability' },
];

const performanceMetrics = [
  'Time-to-hire',
  'Quality-of-hire',
  'Offer-to-join ratios',
  'Retention indicators',
  'Hiring cycle efficiency',
];

const summaryStats = [
  { value: '10,000+', label: 'Placements' },
  { value: '3X', label: 'Faster Executive Closures' },
  { value: '40%', label: 'Reduced Hiring Time' },
  { value: '30+', label: 'Countries' },
  { value: '18+', label: 'Years Experience' },
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
      <div className="stat-number text-[3rem] lg:text-[4rem] font-800 leading-none">{fmt(count)}{stat.suffix}</div>
      <p className="font-body text-[0.8125rem] mt-2" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

/* ─── HERO ─── */
const ImpactHero = ({ onConsultation }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="impact-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="impact-hero-particles" density="normal" />
      </motion.div>

      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Measurable Outcomes. Sustainable Growth.</span>
        </motion.div>
        <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Impact That Extends Beyond Hiring." startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[720px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          At Ad Astra Consultants, our work is measured not only by placements — but by the long-term organisational and career outcomes we help create.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}>
          <button onClick={onConsultation} className="btn-primary" data-testid="impact-hero-consultation-btn">
            Discuss Your Talent Needs <ArrowRight size={16} />
          </button>
          <Link to="/solutions" className="btn-secondary btn-secondary-dark no-underline" data-testid="impact-hero-explore-btn">
            Explore Our Solutions <ChevronRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 1: SCALE OF IMPACT ─── */
const ScaleSection = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="impact-scale">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="impact-scale-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">01 — Our Scale of Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            A Proven Track Record.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {scaleStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease }}>
              <StatNum stat={s} isVisible={vis} />
            </motion.div>
          ))}
        </div>

        <motion.p className="font-body text-[1rem] mt-12 text-center max-w-[600px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6, ease }}>
          Our metrics reflect sustained partnerships and consistent delivery across industries and geographies.
        </motion.p>
      </div>
    </section>
  );
};

/* ─── SECTION 2: LEADERSHIP IMPACT ─── */
const LeadershipSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="leadership-impact">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-start" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">02 — Leadership Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Shaping Organisations Through Leadership.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Executive Search mandates often define strategic direction. Over the years, we have:
          </p>
          <ul className="mt-5 space-y-3">
            {leadershipHighlights.map((item, i) => (
              <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                {item}
              </motion.li>
            ))}
          </ul>
          <p className="font-body text-[0.9375rem] mt-6 leading-[1.8] font-500" style={{ color: 'var(--text-on-light)' }}>
            Outcome: Improved strategic alignment, stronger operational execution, and leadership continuity.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-5">
          <p className="font-mono text-[0.625rem] mb-2" style={{ color: 'var(--orange-core)' }}>Example Impact</p>
          {leadershipMetrics.map((m, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-6" data-testid={`leadership-metric-${i}`}>
              <span className="font-display text-[2.5rem] lg:text-[3rem] font-800 leading-none" style={{ color: 'var(--orange-core)' }}>{m.metric}</span>
              <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 3: ENTERPRISE SCALING ─── */
const EnterpriseSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="enterprise-impact">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="enterprise-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <span className="section-label">03 — Enterprise Scaling Impact</span>
            <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
              Enabling Organisational Expansion.
            </h2>
            <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              Through RPO and structured recruitment models, we have:
            </p>
            <ul className="mt-5 space-y-3">
              {enterpriseHighlights.map((item, i) => (
                <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <div className="glass-card-dark p-8" data-testid="enterprise-example">
              <p className="font-mono text-[0.625rem] mb-3" style={{ color: 'var(--orange-core)' }}>Example Scenario</p>
              <p className="font-body text-[1rem] leading-[1.8]" style={{ color: 'var(--text-on-dark)' }}>
                Scaled <span className="font-display font-700" style={{ color: 'var(--orange-core)' }}>200+ roles</span> within <span className="font-display font-700" style={{ color: 'var(--orange-core)' }}>90 days</span> for a logistics enterprise during expansion.
              </p>
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-dark)' }}>
                <p className="font-mono text-[0.625rem] mb-1" style={{ color: 'var(--orange-core)' }}>Outcome</p>
                <p className="font-body text-[0.9375rem] leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
                  Accelerated operational readiness and reduced opportunity cost.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 4: WORKFORCE FLEXIBILITY ─── */
const WorkforceSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="workforce-impact">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">04 — Workforce Flexibility Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Operational Agility Delivered.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Through Temporary & Contract Staffing solutions:
          </p>
          <ul className="mt-5 space-y-3">
            {workforceHighlights.map((item, i) => (
              <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="glass-card-light p-8 text-center" data-testid="workforce-result">
            <TrendingUp size={32} style={{ color: 'var(--orange-core)' }} className="mx-auto mb-4" />
            <h3 className="font-display text-[1.375rem] font-600" style={{ color: 'var(--text-on-light)' }}>Impact</h3>
            <p className="font-body text-[1rem] mt-3 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
              Improved workforce agility without increasing fixed cost structures.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 5: INDUSTRY-SPECIFIC IMPACT ─── */
const IndustryImpactSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="industry-impact">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="industry-impact-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">05 — Industry-Specific Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Cross-Sector Results.
          </h2>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {industryImpacts.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div key={ind.name} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-6" data-testid={`industry-impact-${i}`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                  <Icon size={20} style={{ color: 'var(--orange-core)' }} />
                </div>
                <h3 className="font-display text-[1.0625rem] font-600" style={{ color: 'var(--text-on-dark)' }}>{ind.name}</h3>
                <p className="font-body text-[0.8125rem] mt-2 leading-[1.6]" style={{ color: 'var(--text-on-dark-muted)' }}>{ind.impact}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 6: CANDIDATE IMPACT ─── */
const CandidateSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="candidate-impact">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">06 — Candidate Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Transforming Careers.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Beyond client outcomes, we have:
          </p>
          <ul className="mt-5 space-y-3">
            {candidateHighlights.map((item, i) => (
              <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="glass-card-light p-8 text-center" data-testid="candidate-quote">
            <Quote size={32} style={{ color: 'var(--orange-core)', opacity: 0.4 }} className="mx-auto mb-4" />
            <p className="font-display text-[1.375rem] lg:text-[1.5rem] font-600 leading-[1.4]" style={{ color: 'var(--text-on-light)' }}>
              Thousands of professionals have advanced their careers through our structured hiring ecosystem.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 7: THOUGHT LEADERSHIP ─── */
const ThoughtLeadershipSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="thought-leadership">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="thought-leadership-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <span className="section-label">07 — Market & Thought Leadership</span>
            <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
              Influencing Talent Conversations.
            </h2>
            <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              Through research reports, media contributions, and industry insights:
            </p>
            <ul className="mt-5 space-y-3">
              {thoughtLeadershipPoints.map((item, i) => (
                <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <div className="glass-card-dark p-8" data-testid="thought-leadership-card">
              <BookOpen size={28} style={{ color: 'var(--orange-core)' }} className="mb-4" />
              <p className="font-display text-[1.25rem] font-600 leading-[1.4]" style={{ color: 'var(--text-on-dark)' }}>
                Our insights shape conversations on leadership hiring, workforce strategy, and talent transformation.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 8: PARTNERSHIP & PERFORMANCE ─── */
const PartnershipSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="partnership-impact">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        {/* Partnership */}
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">08 — Long-Term Partnership</span>
          <h2 className="font-display text-[2rem] lg:text-[2.5rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Relationships That Extend Beyond Transactions.
          </h2>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            <span className="font-display font-700" style={{ color: 'var(--orange-core)' }}>95% Client Retention</span> reflects:
          </p>
          <div className="mt-5 space-y-3">
            {partnershipPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-4 flex items-center gap-3" data-testid={`partnership-pillar-${i}`}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                    <Icon size={16} style={{ color: 'var(--orange-core)' }} />
                  </div>
                  <span className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{pillar.text}</span>
                </motion.div>
              );
            })}
          </div>
          <p className="font-body text-[0.9375rem] mt-5 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>
            Many partnerships evolve from single-role mandates to integrated hiring ecosystems.
          </p>
        </motion.div>

        {/* Data-Driven Performance */}
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">09 — Data-Driven Performance</span>
          <h2 className="font-display text-[2rem] lg:text-[2.5rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Measured. Tracked. Optimised.
          </h2>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            We monitor:
          </p>
          <ul className="mt-5 space-y-3">
            {performanceMetrics.map((metric, i) => (
              <motion.li key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex items-start gap-3 font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                <LineChart size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                {metric}
              </motion.li>
            ))}
          </ul>
          <p className="font-body text-[0.9375rem] mt-5 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>
            This ensures continuous improvement and measurable ROI for our clients.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 10: IMPACT VISUAL SUMMARY ─── */
const VisualSummarySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="visual-summary">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="visual-summary-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">10 — Impact at a Glance</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            The Numbers That Define Us.
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {summaryStats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-6 text-center" data-testid={`summary-stat-${i}`}>
              <span className="font-display text-[2rem] lg:text-[2.5rem] font-800 leading-none" style={{ color: 'var(--orange-core)' }}>{stat.value}</span>
              <p className="font-body text-[0.75rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── FINAL CTA ─── */
const FinalCTASection = ({ onConsultation }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="impact-final-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="impact-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-[0.06]" style={{ background: 'var(--orange-core)' }} />

      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.25rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Ready to Create Measurable Talent Impact?
          </h2>
          <p className="font-body text-[1.0625rem] mt-6 max-w-[650px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            Whether your organisation requires strategic leadership hiring or scalable workforce integration, Ad Astra Consultants delivers outcomes that drive growth and stability.
          </p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onConsultation} className="btn-primary" data-testid="final-impact-consultation-btn">
              Start a Consultation <ArrowRight size={16} />
            </button>
            <Link to="/solutions" className="btn-secondary btn-secondary-dark no-underline" data-testid="final-impact-explore-btn">
              Explore Our Solutions <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── MAIN PAGE ─── */
export default function ImpactPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="impact-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <ImpactHero onConsultation={() => setConsultationOpen(true)} />
      <ScaleSection />
      <LeadershipSection />
      <EnterpriseSection />
      <WorkforceSection />
      <IndustryImpactSection />
      <CandidateSection />
      <ThoughtLeadershipSection />
      <PartnershipSection />
      <VisualSummarySection />
      <FinalCTASection onConsultation={() => setConsultationOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
