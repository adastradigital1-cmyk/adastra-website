import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight, Upload } from 'lucide-react';

export const CTASection = ({ onConsultation, onSubmitCV }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ backgroundColor: '#F26522' }}>
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 cta-pattern-circle" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full translate-x-1/3 translate-y-1/3 cta-pattern-circle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/[0.03] rounded-full -translate-y-1/2 cta-pattern-circle" style={{ animationDelay: '1s' }} />

      {/* Animated lines */}
      <div className="absolute top-1/2 left-[15%] w-[1px] h-24 bg-gradient-to-b from-transparent via-white/15 to-transparent -translate-y-1/2 hidden lg:block" />
      <div className="absolute top-1/2 right-[15%] w-[1px] h-24 bg-gradient-to-b from-transparent via-white/15 to-transparent -translate-y-1/2 hidden lg:block" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2
            className="text-[36px] lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Ready to Strengthen Your
            <br />
            Talent Strategy?
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onConsultation}
              className="magnetic-btn group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold rounded-md bg-white text-[#111] transition-all duration-300 hover:-translate-y-[2px] active:translate-y-0"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Schedule Consultation
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={onSubmitCV}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold rounded-md border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-[#111] hover:-translate-y-[2px] active:translate-y-0"
              style={{ fontFamily: 'Inter, sans-serif' }}
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
