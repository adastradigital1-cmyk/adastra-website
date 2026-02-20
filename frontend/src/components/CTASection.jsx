import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight, Upload } from 'lucide-react';

export const CTASection = ({ onConsultation, onSubmitCV }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--black-rich)' }}
      data-testid="cta-section"
    >
      {/* Subtle orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--orange-core)] opacity-[0.04] rounded-full blur-[150px]" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Ready to Find Exceptional Talent?
          </h2>
          <p className="font-body text-[1.0625rem] mt-5 max-w-[500px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }}>
            Let's build your next high-performing team together.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onConsultation}
              data-testid="cta-consultation-btn"
              className="btn-primary"
            >
              Schedule Consultation
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onSubmitCV}
              data-testid="cta-cv-btn"
              className="btn-secondary btn-secondary-dark"
            >
              <Upload size={16} />
              Submit CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
