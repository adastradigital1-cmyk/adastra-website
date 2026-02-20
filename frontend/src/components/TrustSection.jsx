import React from 'react';
import { awards, testimonials, mediaLogos } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const TrustSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-32 lg:py-40"
      style={{ backgroundColor: 'var(--white-cream)' }}
      data-testid="trust-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-20 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="accent-line mb-6" />
          <span className="section-label">04 — Recognition</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* Media logos — greyscale to color */}
        <div className={`flex flex-wrap items-center gap-10 lg:gap-16 mb-20 transition-all duration-800 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {mediaLogos.map((logo) => (
            <div key={logo} className="group cursor-default" data-testid={`media-${logo.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="font-display text-[1.125rem] font-600 tracking-wide transition-colors duration-500 text-[var(--white-cream)] group-hover:text-[var(--orange-core)]"
                style={{ color: '#C8C0B8' }}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>

        {/* Awards row */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {awards.map((award, i) => (
            <div
              key={i}
              className="glass-card-light !p-6 !rounded-2xl"
              data-testid={`award-${i}`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              </div>
              <p className="font-body text-[0.875rem] leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>
                <span className="font-600" style={{ color: 'var(--text-on-light)' }}>{award.highlight}</span>
                {' — '}{award.text}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial — pull quote style (not carousel) */}
        <div className={`max-w-[700px] transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <blockquote className="pull-quote">
            <p className="text-[1.5rem] lg:text-[1.75rem] leading-[1.5]" style={{ color: 'var(--text-on-light)' }}>
              "{testimonials[0].quote}"
            </p>
            <footer className="mt-6">
              <p className="font-body font-600 text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
                {testimonials[0].name}
              </p>
              <p className="font-mono text-[0.6875rem] mt-1" style={{ color: 'var(--text-on-light-muted)' }}>
                {testimonials[0].title}, {testimonials[0].company}
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
