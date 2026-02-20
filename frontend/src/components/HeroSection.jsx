import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';

export const HeroSection = ({ onFindTalent, onExploreCareers }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--black-rich)' }}
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Geometric accent — thin arc */}
      <svg className="absolute top-[15%] right-[8%] w-[400px] h-[400px] opacity-[0.07] hidden lg:block" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="180" stroke="var(--orange-core)" strokeWidth="0.5" strokeDasharray="8 12" />
        <circle cx="200" cy="200" r="120" stroke="var(--orange-core)" strokeWidth="0.3" />
      </svg>

      {/* Orange accent top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--orange-core)] to-transparent opacity-30" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20">
        <div className="max-w-[800px]">
          {/* Section label */}
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="section-label text-[0.75rem]">
              Global Recruitment
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.08] mt-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ color: 'var(--white-pure)' }}
          >
            Connecting Exceptional Talent With Global Opportunity
          </h1>

          {/* Subtitle */}
          <p
            className={`font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[500px] leading-[1.7] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color: 'var(--text-on-dark-muted)' }}
          >
            India's largest women-owned recruitment solutions firm. Executive Search, RPO, and bespoke workforce strategies across 50+ countries.
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <button
              onClick={onFindTalent}
              data-testid="hero-find-talent-btn"
              className="btn-primary"
            >
              Find Talent
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onExploreCareers}
              data-testid="hero-explore-careers-btn"
              className="btn-secondary btn-secondary-dark"
            >
              Explore Careers
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-6 lg:left-12 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="scroll-indicator w-[1px] h-[40px] bg-gradient-to-b from-[var(--orange-core)] to-transparent" />
        </div>
      </div>
    </section>
  );
};
