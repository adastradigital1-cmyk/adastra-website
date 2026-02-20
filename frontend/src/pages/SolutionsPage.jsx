import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { CVModal } from '../components/CVModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { ParticleField } from '../components/ParticleField';
import { Search, Users, Settings, Clock, BarChart3, TrendingUp, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const services = [
  {
    id: 'executive-search',
    title: 'Executive Search',
    subtitle: 'Astral Honchos',
    icon: Search,
    shortDesc: 'Strategic placement of top-tier senior executives',
    fullDesc: 'Committed to strategically place top-tier senior-level executives in pivotal roles. From global enterprises to early-stage startups, we find leaders who make an impact on your business.',
    features: ['C-Suite & VP-level placements', 'Global talent mapping', 'Confidential search capabilities', 'Assessment & cultural fit analysis'],
  },
  {
    id: 'contingent-search',
    title: 'Contingent Search',
    subtitle: 'Astral Melance',
    icon: Users,
    shortDesc: 'High-caliber executive positioning at all levels',
    fullDesc: 'Our selection service is devoted to strategically position high-caliber executives at various levels, leveraging our exclusive proprietary database and research team.',
    features: ['Mid to senior-level hiring', 'Proprietary talent database', 'Industry-specific expertise', 'Success-based engagement'],
  },
  {
    id: 'rpo',
    title: 'Recruitment Process Outsourcing',
    subtitle: 'Astral Bespoke',
    icon: Settings,
    shortDesc: 'End-to-end recruitment process ownership',
    fullDesc: 'Dedicated to streamline recruitment processes through outsourcing. Ad Astra assumes full ownership of our client\'s recruitment process with our AI-powered A Cube platform.',
    features: ['Full-cycle recruitment ownership', 'AI-powered A Cube platform', 'Scalable hiring solutions', 'Real-time analytics dashboards'],
  },
  {
    id: 'temporary-staffing',
    title: 'Temporary Staffing',
    subtitle: 'Astral Temp',
    icon: Clock,
    shortDesc: 'Flexible workforce deployment solutions',
    fullDesc: 'We tailor our temporary staffing services using a hybrid methodology crafted to precisely match the client\'s requirement, enabling workforce flexibility.',
    features: ['Contract staffing', 'Project-based hiring', 'Compliance management', 'Rapid deployment'],
  },
  {
    id: 'payroll-management',
    title: 'Payroll Management',
    subtitle: 'Astral Payroll',
    icon: BarChart3,
    shortDesc: 'Accurate, compliant payroll processing',
    fullDesc: 'We ensure accuracy, timeliness, and compliance with all local and international regulations, freeing your team to focus on core business activities.',
    features: ['Multi-country payroll', 'Tax & compliance management', 'Employee self-service portal', 'Statutory reporting'],
  },
  {
    id: 'hr-consulting',
    title: 'HR Consulting',
    subtitle: 'Astral Consult',
    icon: TrendingUp,
    shortDesc: 'Comprehensive HR solutions & advisory',
    fullDesc: 'As a comprehensive HR solutions provider, we specialize in Systems, Training, Compensation, and Diagnostics, serving as the sole point of contact for our clients.',
    features: ['Compensation benchmarking', 'HR systems implementation', 'Leadership development', 'Organizational diagnostics'],
  },
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

const SolutionsHero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solutions-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="solutions-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Our Solutions</span>
        </motion.div>
        <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Comprehensive Talent Solutions for Every Need" startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[600px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          From executive search to workforce outsourcing — proprietary tools, deep domain expertise, and 150+ years of combined leadership experience.
        </motion.p>
      </motion.div>
    </section>
  );
};

const ServicesGrid = ({ onContact }) => (
  <section className="py-32 lg:py-40 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="solutions-grid">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">01 — Service Portfolio</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>End-to-End Talent Solutions</h2>
      </motion.div>

      <motion.div className="grid lg:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.id} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-8 group" data-testid={`solution-${service.id}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                      <Icon size={22} style={{ color: 'var(--orange-core)' }} />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.5rem] font-600 leading-tight" style={{ color: 'var(--text-on-light)' }}>{service.title}</h3>
                      <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)' }}>{service.subtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="font-body text-[0.9375rem] mt-5 leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>{service.fullDesc}</p>
              
              <ul className="mt-6 space-y-2">
                {service.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2 font-body text-[0.875rem]" style={{ color: 'var(--text-on-light-muted)' }}>
                    <CheckCircle size={14} style={{ color: 'var(--orange-core)' }} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button onClick={onContact} className="mt-6 inline-flex items-center gap-2 font-body font-600 text-[0.875rem] bg-transparent border-none cursor-pointer p-0 transition-all duration-300 group-hover:gap-3" style={{ color: 'var(--orange-core)' }}>
                Learn More <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Deep-dive into your organization\'s culture, goals, and talent requirements.' },
    { num: '02', title: 'Strategy', desc: 'Custom recruitment approach leveraging our proprietary tools and market intelligence.' },
    { num: '03', title: 'Execution', desc: 'Rigorous sourcing, assessment, and candidate presentation with full transparency.' },
    { num: '04', title: 'Integration', desc: 'Onboarding support and ongoing partnership to ensure long-term success.' },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solutions-process">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="solutions-process-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">02 — Our Process</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>How We Deliver Results</h2>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-6" data-testid={`process-step-${step.num}`}>
              <span className="font-mono text-[2rem] font-700" style={{ color: 'var(--orange-core)' }}>{step.num}</span>
              <h3 className="font-display text-[1.25rem] font-600 mt-4" style={{ color: 'var(--text-on-dark)' }}>{step.title}</h3>
              <p className="font-body text-[0.875rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SolutionsCTA = ({ onContact }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="solutions-cta">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20" style={{ background: 'var(--orange-core)' }} />
      </div>
      
      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Ready to Transform Your Talent Strategy?</h2>
          <p className="font-body text-[1.0625rem] mt-5 max-w-[500px] mx-auto" style={{ color: 'var(--text-on-light-muted)' }}>Let's discuss how our solutions can help you build high-performing teams.</p>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onContact} className="btn-primary" data-testid="solutions-cta-btn">Schedule a Consultation <ArrowRight size={16} /></button>
            <Link to="/contact" className="btn-secondary no-underline">Contact Us <ChevronRight size={16} /></Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function SolutionsPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="solutions-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <SolutionsHero />
      <ServicesGrid onContact={() => setConsultationOpen(true)} />
      <ProcessSection />
      <SolutionsCTA onContact={() => setConsultationOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
