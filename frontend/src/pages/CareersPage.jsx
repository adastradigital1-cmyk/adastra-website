import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CVModal } from '../components/CVModal';
import { ParticleField } from '../components/ParticleField';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap, Globe, ChevronRight } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const openPositions = [
  { id: 1, title: 'Senior Recruitment Consultant', department: 'Executive Search', location: 'Bangalore', type: 'Full-time', experience: '5-8 years' },
  { id: 2, title: 'Business Development Manager', department: 'Sales', location: 'Mumbai', type: 'Full-time', experience: '4-6 years' },
  { id: 3, title: 'HR Tech Product Manager', department: 'Technology', location: 'Bangalore', type: 'Full-time', experience: '6-10 years' },
  { id: 4, title: 'Talent Research Analyst', department: 'Research', location: 'Hyderabad', type: 'Full-time', experience: '2-4 years' },
  { id: 5, title: 'Client Success Partner', department: 'Operations', location: 'Delhi', type: 'Full-time', experience: '3-5 years' },
  { id: 6, title: 'Recruitment Associate', department: 'RPO', location: 'Multiple Locations', type: 'Full-time', experience: '1-3 years' },
];

const benefits = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance for you and your family, plus wellness programs.' },
  { icon: Zap, title: 'Learning & Growth', desc: 'Continuous learning opportunities, certifications, and leadership development.' },
  { icon: Globe, title: 'Global Exposure', desc: 'Work with clients and candidates across 50+ countries worldwide.' },
  { icon: Users, title: 'Inclusive Culture', desc: 'A diverse, women-founded organization that celebrates different perspectives.' },
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

const CareersHero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="careers-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="careers-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Join Our Team</span>
        </motion.div>
        <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Build Your Career at Ad Astra" startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[600px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          Join India's largest women-owned recruitment firm and help shape the future of talent acquisition across the globe.
        </motion.p>
      </motion.div>
    </section>
  );
};

const WhyJoinUs = () => (
  <section className="py-32 lg:py-40 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="careers-why-join">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
      <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">01 — Why Ad Astra</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>A Place Where You Grow</h2>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon;
          return (
            <motion.div key={benefit.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-6" data-testid={`benefit-${i}`}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <Icon size={22} style={{ color: 'var(--orange-core)' }} />
              </div>
              <h3 className="font-display text-[1.25rem] font-600" style={{ color: 'var(--text-on-light)' }}>{benefit.title}</h3>
              <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{benefit.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

const OpenPositions = ({ onApply }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="careers-positions">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="careers-positions-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" style={{ background: 'var(--orange-core)' }} />
          <span className="section-label">02 — Open Positions</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>Current Opportunities</h2>
        </motion.div>

        <motion.div className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {openPositions.map((job) => (
            <motion.div key={job.id} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-6 group cursor-pointer" onClick={onApply} data-testid={`job-${job.id}`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="font-display text-[1.25rem] font-600" style={{ color: 'var(--text-on-dark)' }}>{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 font-mono text-[0.6875rem]" style={{ color: 'var(--orange-core)' }}>
                      <Briefcase size={12} /> {job.department}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-[0.8125rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-[0.8125rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body text-[0.875rem]" style={{ color: 'var(--text-on-dark-muted)' }}>{job.experience}</span>
                  <span className="inline-flex items-center gap-1.5 font-body font-600 text-[0.875rem] transition-all duration-300 group-hover:gap-2" style={{ color: 'var(--orange-core)' }}>
                    Apply <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CareersCTA = ({ onApply }) => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="careers-cta">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20" style={{ background: 'var(--orange-core)' }} />
    </div>
    
    <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Don't See a Perfect Fit?</h2>
        <p className="font-body text-[1.0625rem] mt-5 max-w-[500px] mx-auto" style={{ color: 'var(--text-on-light-muted)' }}>We're always looking for exceptional talent. Submit your CV and we'll reach out when the right opportunity arises.</p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
          <button onClick={onApply} className="btn-primary" data-testid="careers-submit-cv-btn">Submit Your CV <ArrowRight size={16} /></button>
          <Link to="/contact" className="btn-secondary no-underline">Contact HR <ChevronRight size={16} /></Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default function CareersPage() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="careers-page">
      <Navbar />
      <CareersHero />
      <WhyJoinUs />
      <OpenPositions onApply={() => setCvOpen(true)} />
      <CareersCTA onApply={() => setCvOpen(true)} />
      <Footer />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
}
