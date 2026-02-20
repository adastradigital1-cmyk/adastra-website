import React from 'react';
import { heroStats } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';

const StatItem = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);

  return (
    <div
      className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-number text-[3rem] lg:text-[3.5rem] font-700 leading-none">
        {fmt(count)}{stat.suffix}
      </div>
      <p className="font-mono text-[0.75rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>
        {stat.label}
      </p>
    </div>
  );
};

export const DifferentiationSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-28 overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--black-rich)' }}
      data-testid="stats-section"
    >
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {heroStats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};
