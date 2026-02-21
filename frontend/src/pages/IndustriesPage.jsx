import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { ParticleField } from '../components/ParticleField';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import {
  ArrowRight, ChevronRight, ChevronDown, CheckCircle,
  Cpu, Factory, Landmark, Heart, Truck, Zap, ShoppingBag, Rocket,
  Globe, MapPin, BarChart3, Shield, TrendingUp, Users,
  Briefcase, Settings, DollarSign, Target, Layers, Brain
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const industries = [
  {
    id: 'technology',
    icon: Cpu,
    title: 'Technology & Digital Services',
    tagline: 'High-growth, innovation-driven, and skill-intensive.',
    roles: [
      'Product & Engineering leadership',
      'AI / ML / Data Science professionals',
      'Cybersecurity specialists',
      'Cloud & DevOps roles',
      'IT services scaling',
    ],
    insight: 'Rapid skill evolution and global talent competition require structured sourcing and speed-driven execution.',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing & Engineering',
    tagline: 'Operational excellence and leadership continuity are critical.',
    roles: [
      'Plant leadership',
      'Operations heads',
      'Production managers',
      'Supply chain specialists',
      'Industrial automation professionals',
    ],
    insight: 'Balancing traditional manufacturing expertise with Industry 4.0 transformation demands hybrid leadership talent.',
  },
  {
    id: 'bfsi',
    icon: Landmark,
    title: 'Banking, Financial Services & Insurance',
    tagline: 'Highly regulated and performance-driven.',
    roles: [
      'Risk & compliance leaders',
      'Investment and corporate banking professionals',
      'Fintech specialists',
      'Digital transformation roles',
      'Actuarial and analytics talent',
    ],
    insight: 'Compliance integrity and digital acceleration shape hiring decisions.',
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Life Sciences',
    tagline: 'Precision, regulation, and specialised expertise.',
    roles: [
      'Hospital administrators',
      'Clinical leadership roles',
      'Medical technology professionals',
      'Pharma operations & quality leaders',
      'Healthcare analytics specialists',
    ],
    insight: 'Demand for specialised healthcare professionals continues to grow amid global workforce shortages.',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics & Supply Chain',
    tagline: 'Speed, scalability, and operational control.',
    roles: [
      'Supply chain heads',
      'Warehouse operations leaders',
      'Procurement specialists',
      'Distribution network managers',
      'E-commerce logistics talent',
    ],
    insight: 'Global trade volatility and digital supply chains require agile workforce models.',
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy & Electric Mobility',
    tagline: 'Emerging and transformation-driven sector.',
    roles: [
      'Renewable energy project leaders',
      'EV engineering specialists',
      'Infrastructure planners',
      'Sustainability strategists',
      'Grid & operations experts',
    ],
    insight: 'Green transition and electric mobility expansion create demand for future-ready engineering and leadership talent.',
  },
  {
    id: 'consumer',
    icon: ShoppingBag,
    title: 'Consumer & Retail',
    tagline: 'Brand-led, customer-driven environments.',
    roles: [
      'Retail operations leadership',
      'Category managers',
      'Marketing & brand professionals',
      'Omni-channel specialists',
      'Store & regional heads',
    ],
    insight: 'Shifts toward digital retail and customer analytics reshape talent requirements.',
  },
  {
    id: 'startup',
    icon: Rocket,
    title: 'High-Growth & Startup Ecosystems',
    tagline: 'Rapid scaling and leadership depth.',
    roles: [
      'Founding team hires',
      'Growth leaders',
      'Product managers',
      'Venture-backed CXOs',
      'Cross-functional scaling teams',
    ],
    insight: 'Startups require adaptable leaders capable of navigating hyper-growth and operational uncertainty.',
  },
];

const specialisationChallenges = [
  { icon: Brain, text: 'Skill scarcity and emerging roles' },
  { icon: Shield, text: 'Regulatory and compliance requirements' },
  { icon: Users, text: 'Leadership expectations' },
  { icon: Layers, text: 'Operational scale differences' },
  { icon: TrendingUp, text: 'Market volatility' },
];

const functionalAreas = [
  { icon: Users, label: 'Leadership & CXO' },
  { icon: Settings, label: 'Operations' },
  { icon: Cpu, label: 'Technology' },
  { icon: DollarSign, label: 'Finance' },
  { icon: Target, label: 'Sales & Marketing' },
  { icon: Briefcase, label: 'Human Resources' },
  { icon: BarChart3, label: 'Strategy & Transformation' },
];

const consultantStrengths = [
  'Understand sector-specific KPIs',
  'Track evolving skill demand',
  'Monitor compensation benchmarks',
  'Anticipate regulatory shifts',
  'Align leadership profiles with market maturity',
];

const stats = [
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 18, suffix: '+', label: 'Years of Industry Experience' },
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
  return (
    <div className="text-center">
      <div className="stat-number text-[3.5rem] lg:text-[5rem] font-800 leading-none">{count}{stat.suffix}</div>
      <p className="font-body text-[0.875rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

/* ─── HERO SECTION ─── */
const IndustriesHero = ({ onConsultation }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="industries-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="industries-hero-particles" density="normal" />
      </motion.div>

      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Sector Expertise. Talent Precision.</span>
        </motion.div>
        <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Industry-Aligned Talent Solutions." startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[720px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          Ad Astra Consultants delivers specialised hiring solutions across high-growth and established sectors, aligning talent strategy with industry-specific demands.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}>
          <button onClick={onConsultation} className="btn-primary" data-testid="industries-consultation-btn">
            Discuss Your Industry Needs <ArrowRight size={16} />
          </button>
          <Link to="/solutions" className="btn-secondary btn-secondary-dark no-underline" data-testid="industries-explore-btn">
            Explore Talent Solutions <ChevronRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 1: WHY INDUSTRY SPECIALISATION MATTERS ─── */
const SpecialisationSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="specialisation-section">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — Why Industry Specialisation Matters</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Every Industry Has Its Own Talent Dynamics.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Hiring is not uniform across sectors. Each industry presents unique challenges that demand domain-aligned insight for contextual hiring precision.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Our consultants bring domain-aligned insight to every engagement — ensuring contextual hiring precision.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          <p className="font-body font-600 text-[1rem] mb-4" style={{ color: 'var(--text-on-light)' }}>Each industry presents unique challenges:</p>
          {specialisationChallenges.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-4" data-testid={`challenge-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 2: INDUSTRIES WE SERVE ─── */
const IndustryCard = ({ industry, index, expanded, onToggle }) => {
  const Icon = industry.icon;
  const isOpen = expanded === industry.id;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.7, ease }}
      className="glass-card-dark p-6 lg:p-8 cursor-pointer group"
      onClick={onToggle}
      data-testid={`industry-card-${industry.id}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
          <Icon size={22} style={{ color: 'var(--orange-core)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)' }}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[1.25rem] lg:text-[1.375rem] font-600 mt-1" style={{ color: 'var(--text-on-dark)' }}>{industry.title}</h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown size={20} style={{ color: 'var(--text-on-dark-muted)' }} />
            </motion.div>
          </div>
          <p className="font-body text-[0.875rem] mt-1" style={{ color: 'var(--text-on-dark-muted)' }}>{industry.tagline}</p>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-mono text-[0.625rem] mb-3" style={{ color: 'var(--orange-core)' }}>We Support</p>
              <ul className="space-y-2 mb-5">
                {industry.roles.map((role, ri) => (
                  <li key={ri} className="flex items-center gap-2 font-body text-[0.8125rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                    <CheckCircle size={12} style={{ color: 'var(--orange-core)' }} />
                    {role}
                  </li>
                ))}
              </ul>
              <div className="glass-card-dark p-4" style={{ background: 'rgba(232, 96, 28, 0.06)', border: '1px solid rgba(232, 96, 28, 0.15)' }}>
                <p className="font-mono text-[0.625rem] mb-1" style={{ color: 'var(--orange-core)' }}>Industry Insight</p>
                <p className="font-body text-[0.8125rem] leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>{industry.insight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const IndustriesServedSection = () => {
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="industries-served">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="industries-served-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">02 — Industries We Serve</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Sector-Specific Talent Intelligence.
          </h2>
          <p className="font-body text-[1rem] mt-4 max-w-[600px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }}>
            Select an industry to explore roles and insights.
          </p>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {industries.map((industry, i) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              index={i}
              expanded={expanded}
              onToggle={() => setExpanded(expanded === industry.id ? null : industry.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: CROSS-SECTOR CAPABILITIES ─── */
const CrossSectorSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="cross-sector">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">03 — Cross-Sector Capabilities</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Functional Expertise Across Industries.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Beyond industry verticals, we support roles across core business functions. This dual capability — industry + functional expertise — strengthens our delivery precision.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="grid grid-cols-2 gap-4">
          {functionalAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div key={area.label} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-3" data-testid={`functional-area-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <span className="font-body text-[0.875rem] font-500" style={{ color: 'var(--text-on-light)' }}>{area.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 4: GLOBAL & LOCAL INSIGHT ─── */
const GlobalInsightSection = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="global-insight">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="global-insight-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">04 — Global & Local Insight</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Local Intelligence. Global Reach.
          </h2>
          <p className="font-body text-[1rem] mt-4 max-w-[600px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }}>
            We combine international search capability with contextual market understanding.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 lg:gap-24 mt-16">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, ease }}>
              <StatNum stat={s} isVisible={vis} />
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 flex justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }}>
          <div className="glass-card-dark p-6 lg:p-8 max-w-[700px] text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe size={22} style={{ color: 'var(--orange-core)' }} />
              <MapPin size={22} style={{ color: 'var(--orange-core)' }} />
            </div>
            <p className="font-body text-[1rem] leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              From emerging markets to established economies, our network spans continents — delivering talent solutions with the nuance of local expertise and the breadth of global reach.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 5: WHY INDUSTRY EXPERTISE MATTERS ─── */
const ExpertiseSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="expertise-section">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">05 — Why Industry Expertise Matters</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Context Creates Competitive Advantage.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            This depth allows us to deliver faster, stronger, and more relevant placements.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          <p className="font-body font-600 text-[1rem] mb-4" style={{ color: 'var(--text-on-light)' }}>Our consultants:</p>
          {consultantStrengths.map((strength, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-4" data-testid={`strength-${i}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <CheckCircle size={16} style={{ color: 'var(--orange-core)' }} />
              </div>
              <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{strength}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 6: FINAL CTA ─── */
const FinalCTASection = ({ onConsultation }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="industries-final-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="industries-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-[0.06]" style={{ background: 'var(--orange-core)' }} />

      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.25rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Looking for Industry-Specific Talent Expertise?
          </h2>
          <p className="font-body text-[1.0625rem] mt-6 max-w-[650px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            Whether you operate in established markets or emerging sectors, Ad Astra Consultants brings structured hiring intelligence aligned to your industry dynamics.
          </p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onConsultation} className="btn-primary" data-testid="final-industries-consultation-btn">
              Connect With Industry Specialist <ArrowRight size={16} />
            </button>
            <Link to="/solutions" className="btn-secondary btn-secondary-dark no-underline" data-testid="final-industries-explore-btn">
              Explore Talent Solutions <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── MAIN PAGE COMPONENT ─── */
export default function IndustriesPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="industries-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <IndustriesHero onConsultation={() => setConsultationOpen(true)} />
      <SpecialisationSection />
      <IndustriesServedSection />
      <CrossSectorSection />
      <GlobalInsightSection />
      <ExpertiseSection />
      <FinalCTASection onConsultation={() => setConsultationOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
