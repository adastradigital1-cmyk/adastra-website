import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollY } = useScroll();
  const videoRef = useRef(null);
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const midY = useTransform(scrollY, [0, 600], [0, 80]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  // Ensure video plays on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--black-rich)' }}
    >
      {/* Video Background Layer */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
          data-testid="hero-video"
        >
          <source src="https://customer-assets.emergentagent.com/job_0b42685e-05d6-4cc8-96a2-cc86172006b2/artifacts/pnnglkcr_Adastra%20Ad.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(12, 12, 12, 0.7) 0%, rgba(12, 12, 12, 0.5) 50%, rgba(12, 12, 12, 0.85) 100%)' 
          }} 
        />
      </motion.div>

      {/* Gradient mesh overlay */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Particle layer */}
      <motion.div className="absolute inset-0 z-[2]" style={{ y: midY }}>
        <ParticleField id="hero-particles" density="normal" />
      </motion.div>

      {/* Geometric accent — parallax mid layer */}
      <motion.div className="absolute inset-0" style={{ y: midY }}>
        <svg className="absolute top-[10%] right-[6%] w-[500px] h-[500px] opacity-[0.05] hidden lg:block" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="220" stroke="var(--orange-core)" strokeWidth="0.5" strokeDasharray="8 12" />
          <circle cx="250" cy="250" r="150" stroke="var(--orange-core)" strokeWidth="0.3" />
          <circle cx="250" cy="250" r="80" stroke="var(--orange-core)" strokeWidth="0.2" strokeDasharray="4 8" />
        </svg>
      </motion.div>

      {/* Orange accent top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--orange-core)] to-transparent opacity-30 z-10" />

      {/* Foreground content with parallax */}
      <motion.div
        className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10"
        style={{ y: fgY, opacity }}
      >
        <div className="max-w-[800px]">
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
            className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[500px] leading-[1.7]"
            style={{ color: 'var(--text-on-dark-muted)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
          >
            India's largest women-owned recruitment solutions firm. Executive Search, RPO, and bespoke workforce strategies across 50+ countries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
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
          className="absolute bottom-10 left-6 lg:left-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <div className="scroll-indicator w-[1px] h-[40px] bg-gradient-to-b from-[var(--orange-core)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
