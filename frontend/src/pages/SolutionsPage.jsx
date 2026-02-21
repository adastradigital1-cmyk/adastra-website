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
  Search, Users, Settings, Clock, TrendingUp, BarChart3, ArrowRight, ChevronRight,
  CheckCircle, Eye, Lightbulb, Scale, Database, Layers,
  Rocket, Building2, Globe, Landmark,
  Cpu, Factory, Heart, Truck, Zap, ShoppingBag,
  Target, Cog, Play, LineChart
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const talentRequirements = [
  { icon: Eye, text: 'Visionary leadership' },
  { icon: Lightbulb, text: 'Specialist domain expertise' },
  { icon: Scale, text: 'Scalable hiring systems' },
  { icon: Layers, text: 'Flexible workforce models' },
  { icon: Database, text: 'Data-backed hiring decisions' },
];

const solutions = [
  {
    id: 'executive-search',
    title: 'Executive Search',
    subtitle: 'For critical leadership and senior strategic roles',
    icon: Search,
    features: ['CXO & Board-level hiring', 'Confidential leadership mandates', 'Succession alignment', 'Leadership market mapping', 'Cultural & strategic fit evaluation'],
    tagline: 'Designed for organisations where leadership quality defines competitive advantage.',
  },
  {
    id: 'contingency-hiring',
    title: 'Contingency Hiring',
    subtitle: 'For mid-to-senior level functional roles across industries',
    icon: Users,
    features: ['Speed-driven hiring model', 'Multi-domain recruitment', 'Pre-qualified talent pipelines', 'Outcome-based engagement'],
    tagline: 'Optimised for organisations seeking efficiency and precision.',
  },
  {
    id: 'rpo',
    title: 'Recruitment Process Outsourcing (RPO)',
    subtitle: 'For enterprises requiring scalable, embedded hiring systems',
    icon: Settings,
    features: ['End-to-end recruitment lifecycle management', 'Dedicated recruiter teams', 'Hiring process optimisation', 'Talent analytics & reporting', 'Cost-per-hire reduction strategies'],
    tagline: 'Ideal for high-growth and large enterprises managing sustained hiring demand.',
  },
  {
    id: 'temporary-staffing',
    title: 'Temporary & Contract Staffing',
    subtitle: 'For workforce flexibility and operational agility',
    icon: Clock,
    features: ['Rapid deployment of contract professionals', 'Project-based staffing', 'Payroll & compliance management', 'Short-term and long-term workforce solutions'],
    tagline: 'Designed to support seasonal, cyclical, and expansion-driven workforce needs.',
  },
  {
    id: 'workforce-advisory',
    title: 'Workforce Advisory & Talent Strategy',
    subtitle: 'For organisations redesigning their workforce architecture',
    icon: TrendingUp,
    features: ['Workforce planning & forecasting', 'Talent demand analysis', 'Compensation benchmarking', 'Leadership pipeline strategy', 'Organisational capability mapping'],
    tagline: 'We help businesses align talent strategy with long-term growth objectives.',
  },
  {
    id: 'market-intelligence',
    title: 'Market Intelligence & Research Support',
    subtitle: 'Backed by insights and industry analysis',
    icon: BarChart3,
    features: ['Hiring trend reports', 'Industry-specific talent insights', 'Attrition & compensation benchmarks', 'Sector demand forecasting'],
    tagline: 'Our advisory is informed by structured research and market observation.',
  },
];

const ecosystemPaths = [
  { from: 'Executive Search', to: 'RPO', arrow: '→' },
  { from: 'Temporary Staffing', to: 'Workforce Advisory', arrow: '→' },
  { from: 'Contingency Hiring', to: 'Embedded Hiring Models', arrow: '→' },
];

const businessStages = [
  { icon: Rocket, title: 'Startups & High-Growth Firms', desc: 'Leadership hires, foundational teams, scalable hiring systems.' },
  { icon: Building2, title: 'Mid-Sized Enterprises', desc: 'Operational hiring efficiency, structured talent pipelines.' },
  { icon: Landmark, title: 'Large Enterprises', desc: 'RPO models, workforce transformation, leadership succession.' },
  { icon: Globe, title: 'Global Expanding Firms', desc: 'Cross-border hiring support and international talent access.' },
];

const stats = [
  { value: 18, suffix: '+', label: 'Years of Industry Leadership' },
  { value: 250, suffix: '+', label: 'Hiring Specialists' },
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 10000, suffix: '+', label: 'Successful Placements' },
  { value: 95, suffix: '%', label: 'Client Retention' },
];

const industries = [
  { icon: Cpu, name: 'Technology' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Landmark, name: 'BFSI' },
  { icon: Heart, name: 'Healthcare' },
  { icon: Truck, name: 'Logistics & Supply Chain' },
  { icon: Zap, name: 'Energy & Electric Mobility' },
  { icon: ShoppingBag, name: 'Consumer & Retail' },
  { icon: Rocket, name: 'High-Growth Ecosystems' },
];

const engagementSteps = [
  { num: '01', title: 'Discovery & Needs Assessment', desc: 'Understanding business strategy and hiring objectives.', icon: Target },
  { num: '02', title: 'Solution Design', desc: 'Selecting appropriate service model(s).', icon: Cog },
  { num: '03', title: 'Execution', desc: 'Sourcing, assessment, coordination, and closure.', icon: Play },
  { num: '04', title: 'Performance Review', desc: 'Continuous tracking of hiring metrics and optimisation.', icon: LineChart },
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
      <div className="stat-number text-[3rem] lg:text-[3.5rem] font-800 leading-none">{fmt(count)}{stat.suffix}</div>
      <p className="font-body text-[0.75rem] mt-2" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

/* ─── HERO SECTION ─── */
const SolutionsHero = ({ onConsultation }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solutions-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="solutions-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Strategic Talent Solutions. Structured for Impact.</span>
        </motion.div>
        <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.06] mt-6 max-w-[950px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="End-to-End Talent Solutions for Modern Organisations." startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[700px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          From executive leadership hiring to workforce scalability, Ad Astra Consultants delivers integrated, research-driven, and performance-focused talent solutions.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}>
          <button onClick={onConsultation} className="btn-primary" data-testid="solutions-consultation-btn">
            Schedule a Consultation <ArrowRight size={16} />
          </button>
          <a href="#solution-portfolio" className="btn-secondary btn-secondary-dark no-underline">
            Explore Hiring Models <ChevronRight size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 1: THE TALENT EQUATION ─── */
const TalentEquationSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="talent-equation">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — The Talent Equation</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Talent Is Not a Function. It's a Business Strategy.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Growth, innovation, and operational excellence depend on securing the right talent at the right time.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Ad Astra delivers a unified talent ecosystem that connects all these components under one strategic framework.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          <p className="font-body font-600 text-[1rem] mb-4" style={{ color: 'var(--text-on-light)' }}>Organisations today require:</p>
          {talentRequirements.map((req, i) => {
            const Icon = req.icon;
            return (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-4" data-testid={`talent-req-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{req.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 2: SOLUTION PORTFOLIO ─── */
const SolutionPortfolioSection = ({ onConsultation }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} id="solution-portfolio" className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solution-portfolio">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="solution-portfolio-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">02 — Our Complete Solution Portfolio</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Integrated Talent Capabilities Under One Partner.
          </h2>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div key={solution.id} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-8" data-testid={`solution-${solution.id}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                    <Icon size={22} style={{ color: 'var(--orange-core)' }} />
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-[1.375rem] font-600 mt-1" style={{ color: 'var(--text-on-dark)' }}>{solution.title}</h3>
                    <p className="font-body text-[0.8125rem] mt-1" style={{ color: 'var(--text-on-dark-muted)' }}>{solution.subtitle}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {solution.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 font-body text-[0.8125rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                      <CheckCircle size={12} style={{ color: 'var(--orange-core)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="font-body text-[0.8125rem] mt-4 italic" style={{ color: 'var(--text-on-dark-muted)' }}>{solution.tagline}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: ECOSYSTEM ─── */
const EcosystemSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="ecosystem">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">03 — How Our Solutions Work Together</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            One Ecosystem. Multiple Entry Points.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Our services are modular yet interconnected. An organisation may begin with one solution and seamlessly transition to another as needs evolve.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8] font-500" style={{ color: 'var(--text-on-light)' }}>
            We ensure continuity across every stage of organisational growth.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          {ecosystemPaths.map((path, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5" data-testid={`ecosystem-path-${i}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-[1rem] font-600" style={{ color: 'var(--text-on-light)' }}>{path.from}</span>
                <span className="font-mono text-[1.25rem]" style={{ color: 'var(--orange-core)' }}>{path.arrow}</span>
                <span className="font-display text-[1rem] font-600" style={{ color: 'var(--orange-core)' }}>{path.to}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 4: BUSINESS STAGES ─── */
const BusinessStagesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="business-stages">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="business-stages-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">04 — Solutions by Business Stage</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Built for Every Phase of Growth.
          </h2>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {businessStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div key={stage.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-6 text-center" data-testid={`stage-${i}`}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                  <Icon size={26} style={{ color: 'var(--orange-core)' }} />
                </div>
                <h3 className="font-display text-[1.0625rem] font-600" style={{ color: 'var(--text-on-dark)' }}>{stage.title}</h3>
                <p className="font-body text-[0.8125rem] mt-3 leading-[1.6]" style={{ color: 'var(--text-on-dark-muted)' }}>{stage.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 5: PERFORMANCE & SCALE ─── */
const PerformanceSection = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="performance">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-15" style={{ background: 'var(--orange-core)' }} />
      </div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6 mx-auto" style={{ width: '60px' }} />
          <span className="section-label">05 — Performance & Scale</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Proven Impact Across Industries.
          </h2>
        </motion.div>

        <div className="glass-card-light p-8 lg:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease }}>
                <div className="text-center">
                  <div className="font-display text-[2.5rem] lg:text-[3rem] font-800 leading-none" style={{ color: 'var(--orange-core)' }}>
                    {vis ? <StatNumLight stat={s} /> : '0' + s.suffix}
                  </div>
                  <p className="font-body text-[0.75rem] mt-2" style={{ color: 'var(--text-on-light-muted)' }}>{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="font-body text-[0.9375rem] mt-8 text-center" style={{ color: 'var(--text-on-light-muted)' }}>
            Our metrics reflect long-term partnerships and structured delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

const StatNumLight = ({ stat }) => {
  const count = useCountUp(stat.value, 2500, true);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);
  return <>{fmt(count)}{stat.suffix}</>;
};

/* ─── SECTION 6: INDUSTRY APPLICATION ─── */
const IndustryApplicationSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="industry-application">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="industry-application-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">06 — Industry Application</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Applied Across Diverse Sectors.
          </h2>
          <p className="font-body text-[1rem] mt-4 max-w-[600px]" style={{ color: 'var(--text-on-dark-muted)' }}>
            Each solution adapts to sector-specific talent challenges and regulatory frameworks.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.name} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-5 flex items-center gap-3" data-testid={`solutions-industry-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <span className="font-body text-[0.875rem] font-500" style={{ color: 'var(--text-on-dark)' }}>{industry.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 7: ENGAGEMENT FRAMEWORK ─── */
const EngagementFrameworkSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="engagement-framework">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6 mx-auto" style={{ width: '60px' }} />
        <span className="section-label">07 — Our Engagement Framework</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Structured. Transparent. Accountable.
        </h2>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {engagementSteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={step.num} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-6 text-center relative" data-testid={`engagement-step-${step.num}`}>
              {i < engagementSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px]" style={{ backgroundColor: 'var(--orange-core)', opacity: 0.3 }} />
              )}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <Icon size={22} style={{ color: 'var(--orange-core)' }} />
              </div>
              <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--orange-core)' }}>Step {step.num}</span>
              <h3 className="font-display text-[1rem] font-600 mt-2" style={{ color: 'var(--text-on-light)' }}>{step.title}</h3>
              <p className="font-body text-[0.8125rem] mt-2 leading-[1.6]" style={{ color: 'var(--text-on-light-muted)' }}>{step.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 8: FINAL CTA ─── */
const FinalCTASection = ({ onConsultation, onContact }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solutions-final-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="solutions-final-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-[0.06]" style={{ background: 'var(--orange-core)' }} />
      
      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.25rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Design a Talent Strategy That Scales With You.
          </h2>
          <p className="font-body text-[1.0625rem] mt-6 max-w-[650px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            Whether you require confidential leadership hiring, high-volume recruitment integration, or workforce transformation advisory — Ad Astra Consultants delivers integrated solutions built on insight and execution discipline.
          </p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onConsultation} className="btn-primary" data-testid="solutions-final-consultation-btn">
              Discuss Your Talent Needs <ArrowRight size={16} />
            </button>
            <Link to="/contact" className="btn-secondary btn-secondary-dark no-underline" data-testid="solutions-final-contact-btn">
              Connect With Our Team <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── MAIN PAGE COMPONENT ─── */
export default function SolutionsPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solutions-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <SolutionsHero onConsultation={() => setConsultationOpen(true)} />
      <TalentEquationSection />
      <SolutionPortfolioSection onConsultation={() => setConsultationOpen(true)} />
      <EcosystemSection />
      <BusinessStagesSection />
      <PerformanceSection />
      <IndustryApplicationSection />
      <EngagementFrameworkSection />
      <FinalCTASection onConsultation={() => setConsultationOpen(true)} onContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
