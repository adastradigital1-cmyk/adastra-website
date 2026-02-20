import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight, Upload } from 'lucide-react';

export const CTASection = ({ onConsultation, onSubmitCV }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ backgroundColor: '#F26522' }}>
      {/* Subtle geometric accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/[0.04] rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-1 h-20 bg-white/10 -translate-y-1/2 rounded-full hidden lg:block" />
      <div className="absolute top-1/2 right-1/4 w-1 h-20 bg-white/10 -translate-y-1/2 rounded-full hidden lg:block" />

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
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold rounded-md bg-white text-[#111] transition-all duration-300 hover:shadow-xl hover:-translate-y-[2px] active:translate-y-0"
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
