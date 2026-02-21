import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ParticleField } from './ParticleField';

const ease = [0.25, 0.46, 0.45, 0.94];

const WordReveal = ({ text, className, style, startDelay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: startDelay + i * 0.08, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const HeroSection = ({ onFindTalent, onExploreCareers }) => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Background gradient that blends from transparent to dark */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(to bottom, transparent 0%, rgba(12,12,12,0.5) 15%, var(--black-rich) 35%)',
          zIndex: 0
        }}
      />

      {/* Background layer */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="noise-overlay absolute inset-0" />
      </div>

      {/* Particle layer */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticleField id="hero-particles" density="normal" />
      </div>

      {/* Geometric accent */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <svg className="absolute top-[10%] right-[6%] w-[500px] h-[500px] opacity-[0.05] hidden lg:block" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="220" stroke="var(--orange-core)" strokeWidth="0.5" strokeDasharray="8 12" />
          <circle cx="250" cy="250" r="150" stroke="var(--orange-core)" strokeWidth="0.3" />
          <circle cx="250" cy="250" r="80" stroke="var(--orange-core)" strokeWidth="0.2" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Foreground content — no parallax */}
      <div
        className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20"
        style={{ zIndex: 50 }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <span className="section-label text-[0.75rem]">Global Recruitment</span>
          </motion.div>

          {/* Headline — word-by-word stagger */}
          <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6" style={{ color: 'var(--white-pure)' }}>
            <WordReveal text="Connecting Exceptional Talent With Global Opportunity" startDelay={0.3} />
          </h1>

          {/* Subtitle */}
          <motion.p
            className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[600px] mx-auto leading-[1.7]"
            style={{ color: 'var(--text-on-dark-muted)', textWrap: 'balance' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
          >
            India's largest women-owned recruitment solutions firm. Executive Search, RPO, and bespoke workforce strategies across 50+ countries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease }}
          >
            <button onClick={onFindTalent} data-testid="hero-find-talent-btn" className="btn-primary">
              Find Talent <ArrowRight size={16} />
            </button>
            <button onClick={onExploreCareers} data-testid="hero-explore-careers-btn" className="btn-secondary btn-secondary-dark">
              Explore Careers
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <div className="scroll-indicator w-[1px] h-[40px] bg-gradient-to-b from-[var(--orange-core)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
