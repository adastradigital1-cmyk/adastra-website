import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CVModal } from '../components/CVModal';
import { ParticleField } from '../components/ParticleField';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { 
  ArrowRight, ChevronRight, Upload, MessageSquare, Target, Handshake, Rocket,
  AlertCircle, Search, Clock, HelpCircle, Lock, Eye,
  Briefcase, Users, Shield, TrendingUp,
  Cpu, Factory, Landmark, Heart, Truck, Zap, ShoppingBag, Building2,
  FileText, Video, BarChart3, DollarSign, CheckCircle, Globe
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const candidateChallenges = [
  { icon: AlertCircle, text: 'Endless job applications with limited responses' },
  { icon: Target, text: 'Roles that don\'t match their true potential' },
  { icon: HelpCircle, text: 'Lack of clarity on hiring processes' },
  { icon: Clock, text: 'Delayed feedback and uncertainty' },
  { icon: Lock, text: 'Limited access to confidential leadership opportunities' },
];

const journeySteps = [
  { num: '01', title: 'Profile Registration', desc: 'Submit your CV and share your career interests.', icon: Upload },
  { num: '02', title: 'Screening & Consultation', desc: 'Our consultants understand your strengths, experience, and long-term aspirations.', icon: MessageSquare },
  { num: '03', title: 'Role Matching', desc: 'We connect you with opportunities that align with your expertise and growth potential.', icon: Target },
  { num: '04', title: 'Interview Coordination', desc: 'Structured guidance and preparation support.', icon: Handshake },
  { num: '05', title: 'Offer & Onboarding', desc: 'Professional negotiation support and smooth transition.', icon: Rocket },
];

const trustPoints = [
  { icon: Eye, title: 'Access to Confidential Leadership Roles', desc: 'We handle senior-level mandates not always advertised publicly.' },
  { icon: Users, title: 'Industry-Aligned Consultants', desc: 'Our recruiters understand sector-specific expectations.' },
  { icon: MessageSquare, title: 'Transparent Communication', desc: 'Structured updates and professional engagement.' },
  { icon: TrendingUp, title: 'Long-Term Perspective', desc: 'We focus on sustainable career progression, not short-term placements.' },
];

const industries = [
  { icon: Cpu, name: 'Technology' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Landmark, name: 'Banking & Financial Services' },
  { icon: Heart, name: 'Healthcare' },
  { icon: Truck, name: 'Logistics & Supply Chain' },
  { icon: Zap, name: 'Energy & EV' },
  { icon: ShoppingBag, name: 'Consumer & Retail' },
  { icon: Building2, name: 'High-Growth Enterprises' },
];

const careerResources = [
  { icon: FileText, title: 'Improve Your CV', desc: 'Expert guidance on CV optimization' },
  { icon: Video, title: 'Interview Preparation', desc: 'Tips and techniques for success' },
  { icon: BarChart3, title: 'Career Insights & Market Trends', desc: 'Stay informed about your industry' },
  { icon: DollarSign, title: 'Salary Benchmark Awareness', desc: 'Know your market value' },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Successful Placements' },
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 18, suffix: '+', label: 'Years of Talent Leadership' },
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
      <div className="stat-number text-[3.5rem] lg:text-[4.5rem] font-800 leading-none">{fmt(count)}{stat.suffix}</div>
      <p className="font-body text-[0.875rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

/* ─── HERO SECTION ─── */
const FindJobsHero = ({ onSubmitCV }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-jobs-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="find-jobs-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Build a Career. Not Just Your Next Job.</span>
        </motion.div>
        <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Opportunities That Match Your Talent and Potential." startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[650px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          At Ad Astra Consultants, we connect professionals with roles aligned to their skills, ambition, and long-term career goals.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}>
          <Link to="/careers" className="btn-primary no-underline" data-testid="find-jobs-explore-btn">
            Explore Opportunities <ArrowRight size={16} />
          </Link>
          <button onClick={onSubmitCV} className="btn-secondary btn-secondary-dark" data-testid="find-jobs-cv-btn">
            Submit Your CV <ChevronRight size={16} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 1: REALITY FOR PROFESSIONALS ─── */
const ProfessionalRealitySection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="professional-reality">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.15 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — The Reality for Professionals</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Finding the Right Role Shouldn't Feel Overwhelming.
          </h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
            In today's competitive job market, talented professionals often face significant challenges in their career search.
          </p>
          <p className="font-body text-[1rem] mt-4 leading-[1.8] font-500" style={{ color: 'var(--text-on-light)' }}>
            We believe the right opportunity should recognize both your capability and your ambition.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className="space-y-4">
          {candidateChallenges.map((challenge, i) => {
            const Icon = challenge.icon;
            return (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-light p-5 flex items-center gap-4" data-testid={`candidate-challenge-${i}`}>
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

/* ─── SECTION 2: CANDIDATE JOURNEY ─── */
const CandidateJourneySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="candidate-journey">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="candidate-journey-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">02 — How We Support Your Journey</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            A Structured, Transparent Candidate Experience.
          </h2>
          <p className="font-body text-[1rem] mt-4 max-w-[550px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }}>
            Our approach ensures clarity, professionalism, and alignment at every step.
          </p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {journeySteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-6 text-center relative" data-testid={`journey-step-${step.num}`}>
                {i < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px]" style={{ backgroundColor: 'var(--orange-core)', opacity: 0.3 }} />
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                  <Icon size={22} style={{ color: 'var(--orange-core)' }} />
                </div>
                <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--orange-core)' }}>Step {step.num}</span>
                <h3 className="font-display text-[1.0625rem] font-600 mt-2" style={{ color: 'var(--text-on-dark)' }}>{step.title}</h3>
                <p className="font-body text-[0.8125rem] mt-2 leading-[1.6]" style={{ color: 'var(--text-on-dark-muted)' }}>{step.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: WHY TRUST AD ASTRA ─── */
const WhyTrustSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="why-trust">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">03 — Why Professionals Trust Ad Astra</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          More Than a Recruitment Agency. A Career Partner.
        </h2>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {trustPoints.map((point, i) => {
          const Icon = point.icon;
          return (
            <motion.div key={point.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-7" data-testid={`trust-point-${i}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={22} style={{ color: 'var(--orange-core)' }} />
                </div>
                <div>
                  <h3 className="font-display text-[1.25rem] font-600" style={{ color: 'var(--text-on-light)' }}>{point.title}</h3>
                  <p className="font-body text-[0.9375rem] mt-2 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{point.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 4: INDUSTRIES ─── */
const IndustriesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-jobs-industries">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="find-jobs-industries-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">04 — Opportunities Across Industries</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Explore Roles Across Key Sectors.
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.name} variants={fadeUp} transition={{ duration: 0.6, ease }} className="glass-card-dark p-5 flex items-center gap-3" data-testid={`find-jobs-industry-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 96, 28, 0.15)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <span className="font-body text-[0.875rem] font-500" style={{ color: 'var(--text-on-dark)' }}>{industry.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="mt-10 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }}>
          <Link to="/careers" className="inline-flex items-center gap-2 font-body font-600 text-[0.9375rem] no-underline transition-all duration-300 hover:gap-3" style={{ color: 'var(--orange-core)' }}>
            Browse Industry Opportunities <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 5: CAREER RESOURCES ─── */
const CareerResourcesSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="career-resources">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">05 — Career Resources</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Prepare. Improve. Progress.
        </h2>
        <p className="font-body text-[1rem] mt-4 max-w-[500px]" style={{ color: 'var(--text-on-light-muted)' }}>
          We provide structured guidance to help you strengthen your candidacy.
        </p>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {careerResources.map((resource, i) => {
          const Icon = resource.icon;
          return (
            <motion.div key={resource.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-6 text-center group cursor-pointer" data-testid={`resource-${i}`}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <Icon size={24} style={{ color: 'var(--orange-core)' }} />
              </div>
              <h3 className="font-display text-[1.0625rem] font-600" style={{ color: 'var(--text-on-light)' }}>{resource.title}</h3>
              <p className="font-body text-[0.8125rem] mt-2 leading-[1.6]" style={{ color: 'var(--text-on-light-muted)' }}>{resource.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="mt-10 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }}>
        <Link to="/blog" className="inline-flex items-center gap-2 font-body font-600 text-[0.9375rem] no-underline transition-all duration-300 hover:gap-3" style={{ color: 'var(--orange-core)' }}>
          Access Career Resources <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 6: OUR IMPACT ─── */
const ImpactSection = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="find-jobs-impact">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="find-jobs-impact-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">06 — Our Impact</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Proven Track Record.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, ease }}>
              <StatNum stat={s} isVisible={vis} />
            </motion.div>
          ))}
        </div>

        <motion.p className="font-body text-[1rem] mt-12 text-center max-w-[500px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }}>
          Thousands of professionals have advanced their careers through our structured hiring approach.
        </motion.p>
      </div>
    </section>
  );
};

/* ─── SECTION 7: DATA PRIVACY ─── */
const PrivacySection = () => (
  <section className="py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="privacy-section">
    <div className="relative max-w-[900px] mx-auto px-6 lg:px-12">
      <motion.div className="glass-card-light p-8 lg:p-12 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--orange-ghost)' }}>
          <Shield size={32} style={{ color: 'var(--orange-core)' }} />
        </div>
        <span className="section-label">07 — Data Privacy & Trust</span>
        <h2 className="font-display text-[1.75rem] lg:text-[2.25rem] font-700 mt-4 leading-[1.15]" style={{ color: 'var(--text-on-light)' }}>
          Your Profile. Handled Professionally.
        </h2>
        <p className="font-body text-[1rem] mt-4 max-w-[600px] mx-auto leading-[1.8]" style={{ color: 'var(--text-on-light-muted)' }}>
          We treat every candidate profile with strict confidentiality and professional integrity. Your information is securely managed and shared only with your consent.
        </p>
      </motion.div>
    </div>
  </section>
);

/* ─── SECTION 8: FINAL CTA ─── */
const FinalCTASection = ({ onSubmitCV }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-jobs-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="find-jobs-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-[0.06]" style={{ background: 'var(--orange-core)' }} />
      
      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.25rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Ready to Take the Next Step?
          </h2>
          <p className="font-body text-[1.0625rem] mt-6 max-w-[550px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            Whether you are exploring new leadership opportunities or planning your next career move, we are here to support your journey.
          </p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onSubmitCV} className="btn-primary" data-testid="final-cv-btn">
              Submit Your CV <ArrowRight size={16} />
            </button>
            <Link to="/careers" className="btn-secondary btn-secondary-dark no-underline" data-testid="final-openings-btn">
              Explore Current Openings <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── MAIN PAGE COMPONENT ─── */
export default function FindJobsPage() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="find-jobs-page">
      <Navbar />
      <FindJobsHero onSubmitCV={() => setCvOpen(true)} />
      <ProfessionalRealitySection />
      <CandidateJourneySection />
      <WhyTrustSection />
      <IndustriesSection />
      <CareerResourcesSection />
      <ImpactSection />
      <PrivacySection />
      <FinalCTASection onSubmitCV={() => setCvOpen(true)} />
      <Footer />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
}
