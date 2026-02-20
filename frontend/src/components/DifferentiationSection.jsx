import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroStats } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { ParticleField } from './ParticleField';

const StatItem = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="stat-number text-[4rem] sm:text-[5rem] lg:text-[6rem] font-800 leading-none">
        {fmt(count)}{stat.suffix}
      </div>
      <p className="font-mono text-[0.75rem] mt-4" style={{ color: 'var(--text-on-dark-muted)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
};

export const DifferentiationSection = () => {
  const [ref, isVisible] = useScrollAnimation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={(el) => { sectionRef.current = el; ref.current = el; }}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--black-rich)' }}
      data-testid="stats-section"
    >
      {/* Parallax background particles */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="stats-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {heroStats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};
