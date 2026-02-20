import React from 'react';
import { mediaLogos } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Quote } from 'lucide-react';

export const TrustSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      className="py-28"
      style={{ backgroundColor: '#F4F4F4' }}
      ref={ref}
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F26522] mb-3 block"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Trust & Recognition
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight mb-4"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            Recognised Voice in Talent &<br className="hidden sm:block" />
            Workforce Strategy
          </h2>
          <div className="w-10 h-[3px] bg-[#F26522] mx-auto rounded-full mb-16" />
        </div>

        {/* Media Logos */}
        <div
          className={`flex flex-wrap items-center justify-center gap-10 lg:gap-16 mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {mediaLogos.map((logo, index) => (
            <div
              key={logo}
              className="group cursor-pointer transition-all duration-300 py-3"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span
                className="text-[18px] lg:text-[20px] font-bold text-[#D0D0D0] group-hover:text-[#F26522] transition-colors duration-400 tracking-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-1000 delay-300 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <Quote
            size={36}
            className="mx-auto mb-5"
            style={{ color: 'rgba(242, 101, 34, 0.2)' }}
          />
          <blockquote
            className="text-[17px] italic text-[#666] leading-[1.8]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            "Ad Astra's insights continue to shape conversations around
            talent and workforce evolution."
          </blockquote>
        </div>
      </div>
    </section>
  );
};
