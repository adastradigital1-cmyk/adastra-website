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
  Search, Users, Settings, Clock, TrendingUp, ArrowRight, ChevronRight, 
  AlertTriangle, Target, BarChart3, Building2, Globe, Award, CheckCircle,
  Cpu, Factory, Landmark, Heart, Truck, Zap, ShoppingBag, Rocket,
  LineChart, MapPin, DollarSign, Brain, UsersRound
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const hiringChallenges = [
  { icon: AlertTriangle, text: 'Leadership gaps at critical moments' },
  { icon: Clock, text: 'Delayed hiring cycles' },
  { icon: Brain, text: 'Skill shortages in emerging domains' },
  { icon: TrendingUp, text: 'Scaling challenges during rapid expansion' },
  { icon: Settings, text: 'Increasing compliance and workforce complexity' },
];

const talentSolutions = [
  {
    id: 'executive-search',
    title: 'Executive Search',
    subtitle: 'For leadership and senior critical roles',
    icon: Search,
    features: ['CXO & Board-level hiring', 'Confidential search mandates', 'Leadership mapping & succession alignment', 'Strategic culture-fit assessment'],
    cta: 'Explore Executive Search',
  },
  {
    id: 'contingency-hiring',
    title: 'Contingency Hiring',
    subtitle: 'For mid-to-senior level professionals across functions',
    icon: Users,
    features: ['Fast turnaround hiring', 'Multi-industry coverage', 'Pre-validated talent pipelines', 'Outcome-based engagement model'],
    cta: 'Explore Contingency Hiring',
  },
  {
    id: 'rpo',
    title: 'Recruitment Process Outsourcing (RPO)',
    subtitle: 'For scalable and embedded hiring needs',
    icon: Settings,
    features: ['End-to-end recruitment lifecycle management', 'Embedded recruiter models', 'Hiring analytics & reporting', 'Cost optimisation and efficiency improvement'],
    cta: 'Explore RPO Solutions',
  },
  {
    id: 'temporary-staffing',
    title: 'Temporary & Contract Staffing',
    subtitle: 'For workforce flexibility and project-based needs',
    icon: Clock,
    features: ['Rapid deployment', 'Payroll & compliance management', 'Short-term & long-term contract models', 'Workforce scalability during peak cycles'],
    cta: 'Explore Temporary Staffing',
  },
  {
    id: 'workforce-advisory',
    title: 'Workforce Advisory',
    subtitle: 'For organisations transforming their talent strategy',
    icon: TrendingUp,
    features: ['Workforce planning', 'Talent demand forecasting', 'Market intelligence integration', 'Leadership pipeline advisory'],
    cta: 'Speak to a Consultant',
  },
];

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We understand your business goals, culture, and talent gaps.' },
  { num: '02', title: 'Talent Mapping', desc: 'Market research, competitor benchmarking, and pipeline development.' },
  { num: '03', title: 'Assessment', desc: 'Structured screening, competency evaluation, leadership validation.' },
  { num: '04', title: 'Delivery', desc: 'Shortlist presentation, interview coordination, offer closure.' },
  { num: '05', title: 'Post-Placement', desc: 'Onboarding support and retention alignment.' },
];

const stats = [
  { value: 18, suffix: '+', label: 'Years of Talent Leadership' },
  { value: 250, suffix: '+', label: 'Hiring Specialists' },
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 10000, suffix: '+', label: 'Successful Placements' },
  { value: 95, suffix: '%', label: 'Client Retention Rate' },
];

const industries = [
  { icon: Cpu, name: 'Technology' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Landmark, name: 'Banking & Financial Services' },
  { icon: Heart, name: 'Healthcare' },
  { icon: Truck, name: 'Logistics & Supply Chain' },
  { icon: Zap, name: 'Energy & Electric Mobility' },
  { icon: ShoppingBag, name: 'Consumer & Retail' },
  { icon: Rocket, name: 'High-Growth & Startup Ecosystems' },
];

const dataInsights = [
  { icon: LineChart, text: 'Market trend analysis' },
  { icon: MapPin, text: 'Talent availability mapping' },
  { icon: DollarSign, text: 'Compensation benchmarking' },
  { icon: Brain, text: 'Skill-demand forecasting' },
  { icon: UsersRound, text: 'Diversity and inclusion alignment' },
];

const caseImpacts = [
  { metric: '40%', desc: 'Reduced time-to-hire for a manufacturing client' },
  { metric: '60 days', desc: 'Closed 3 CXO mandates for a high-growth tech firm' },
  { metric: '200+', desc: 'Workforce positions scaled within 90 days for logistics enterprise' },
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

/* ─── HERO SECTION ─── */
const FindTalentHero = ({ onConsultation }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-talent-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="find-talent-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Strategic Talent Solutions for Measurable Growth</span>
        </motion.div>
        <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Build Teams That Drive Outcomes." startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[700px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          Ad Astra Consultants partners with organisations to design, execute, and scale talent strategies across leadership, specialist, and volume hiring needs.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}>
          <button onClick={onConsultation} className="btn-primary" data-testid="find-talent-consultation-btn">
            Schedule a Consultation <ArrowRight size={16} />
          </button>
          <Link to="/solutions" className="btn-secondary btn-secondary-dark no-underline">
            Explore Hiring Solutions <ChevronRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 1: REALITY OF HIRING TODAY ─── */
const HiringRealitySection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="hiring-reality">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — The Reality of Hiring Today</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Hiring Is No Longer a Transaction. It's a Strategic Decision.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            In today's competitive landscape, the difference between growth and stagnation often lies in the quality of talent you attract and retain.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            Ad Astra addresses these challenges through structured, research-driven, and execution-focused talent solutions.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          <p className="font-body font-600 text-[1rem] mb-4" style={{ color: 'var(--text-on-light)' }}>Organisations face:</p>
          {hiringChallenges.map((challenge, i) => {
            const Icon = challenge.icon;
            return (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-4" data-testid={`challenge-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>{challenge.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 2: TALENT SOLUTIONS FRAMEWORK ─── */
const TalentSolutionsSection = ({ onConsultation }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="talent-solutions">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="talent-solutions-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">02 — Our Talent Solutions Framework</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Integrated Hiring Models. One Strategic Partner.
          </h2>
          <p className="font-body text-[1rem] mt-4 max-w-[600px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }}>
            We offer specialised hiring models aligned to different business needs — from confidential CXO search to high-volume workforce scaling.
          </p>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {talentSolutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div key={solution.id} variants={fadeUp} transition={{ duration: 0.7, ease }} className={`glass-card-dark p-8 ${i === 4 ? 'lg:col-span-2 lg:max-w-[600px] lg:mx-auto' : ''}`} data-testid={`solution-${solution.id}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                    <Icon size={22} style={{ color: 'var(--orange-core)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[1.375rem] font-600" style={{ color: 'var(--text-on-dark)' }}>{solution.title}</h3>
                    <p className="font-body text-[0.875rem] mt-1" style={{ color: 'var(--text-on-dark-muted)' }}>{solution.subtitle}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {solution.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 font-body text-[0.875rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--orange-core)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button onClick={onConsultation} className="mt-5 inline-flex items-center gap-2 font-body font-600 text-[0.875rem] bg-transparent border-none cursor-pointer p-0 transition-all duration-300 hover:gap-3" style={{ color: 'var(--orange-core)' }}>
                  {solution.cta} <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: DELIVERY METHODOLOGY ─── */
const DeliveryMethodologySection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="delivery-methodology">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6 mx-auto" style={{ width: '60px' }} />
        <span className="section-label">03 — Our Delivery Methodology</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Structured. Transparent. Measurable.
        </h2>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {processSteps.map((step, i) => (
          <motion.div key={step.num} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-6 text-center relative" data-testid={`process-${step.num}`}>
            {i < processSteps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px]" style={{ backgroundColor: 'var(--orange-core)', opacity: 0.3 }} />
            )}
            <span className="font-mono text-[2.5rem] font-700" style={{ color: 'var(--orange-core)' }}>{step.num}</span>
            <h3 className="font-display text-[1.125rem] font-600 mt-3" style={{ color: 'var(--text-on-light)' }}>{step.title}</h3>
            <p className="font-body text-[0.8125rem] mt-2 leading-[1.6]" style={{ color: 'var(--text-on-light-muted)' }}>{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 4: WHY CHOOSE AD ASTRA ─── */
const WhyChooseSection = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="why-choose">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="why-choose-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">04 — Why Organisations Choose Ad Astra</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            A Strategic Advantage in Talent Acquisition.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease }}>
              <StatNum stat={s} isVisible={vis} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 5: INDUSTRIES ─── */
const IndustriesSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="find-talent-industries">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">05 — Industries We Power</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Cross-Sector Expertise.
        </h2>
      </motion.div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
        {industries.map((industry, i) => {
          const Icon = industry.icon;
          return (
            <motion.div key={industry.name} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-3" data-testid={`industry-${i}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <Icon size={18} style={{ color: 'var(--orange-core)' }} />
              </div>
              <span className="font-body text-[0.875rem] font-500" style={{ color: 'var(--text-on-light)' }}>{industry.name}</span>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="mt-10 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }}>
        <Link to="/solutions" className="inline-flex items-center gap-2 font-body font-600 text-[0.9375rem] no-underline transition-all duration-300 hover:gap-3" style={{ color: 'var(--orange-core)' }}>
          Explore All Industries <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 6: DATA-DRIVEN DIFFERENTIATION ─── */
const DataDrivenSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="data-driven">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="data-driven-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
            <span className="section-label">06 — Data-Driven Differentiation</span>
            <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
              Insight-Led Hiring.
            </h2>
            <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
              We combine human judgement with structured data to improve quality-of-hire and time-to-hire. Our approach is guided by comprehensive market intelligence.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
            {dataInsights.map((insight, i) => {
              const Icon = insight.icon;
              return (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-5 flex items-center gap-4" data-testid={`insight-${i}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                    <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                  </div>
                  <p className="font-body text-[0.9375rem]" style={{ color: 'var(--text-on-dark)' }}>{insight.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 7: CASE IMPACT SNAPSHOT ─── */
const CaseImpactSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="case-impact">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[150px] opacity-15" style={{ background: 'var(--orange-core)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6 mx-auto" style={{ width: '60px' }} />
        <span className="section-label">07 — Case Impact Snapshot</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Results That Matter.
        </h2>
      </motion.div>

      <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.12 }}>
        {caseImpacts.map((impact, i) => (
          <motion.div key={i} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-8 text-center" data-testid={`impact-${i}`}>
            <span className="font-display text-[3rem] lg:text-[4rem] font-700" style={{ color: 'var(--orange-core)' }}>{impact.metric}</span>
            <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{impact.desc}</p>
          </motion.div>
        ))}
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
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-talent-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="find-talent-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-[0.06]" style={{ background: 'var(--orange-core)' }} />
      
      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.25rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Ready to Strengthen Your Talent Strategy?
          </h2>
          <p className="font-body text-[1.0625rem] mt-6 max-w-[600px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            Whether you are building leadership pipelines, expanding into new markets, or optimising hiring efficiency — Ad Astra brings structure, insight, and execution together.
          </p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onConsultation} className="btn-primary" data-testid="final-consultation-btn">
              Schedule a Consultation <ArrowRight size={16} />
            </button>
            <button onClick={onContact} className="btn-secondary btn-secondary-dark" data-testid="final-contact-btn">
              Submit Hiring Requirement <ChevronRight size={16} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── MAIN PAGE COMPONENT ─── */
export default function FindTalentPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-talent-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <FindTalentHero onConsultation={() => setConsultationOpen(true)} />
      <HiringRealitySection />
      <TalentSolutionsSection onConsultation={() => setConsultationOpen(true)} />
      <DeliveryMethodologySection />
      <WhyChooseSection />
      <IndustriesSection />
      <DataDrivenSection />
      <CaseImpactSection />
      <FinalCTASection onConsultation={() => setConsultationOpen(true)} onContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
