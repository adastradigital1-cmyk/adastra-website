import React from 'react';
import { audienceCards } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Users, UserCheck, Building2, ArrowRight } from 'lucide-react';

const iconMap = {
  1: Users,
  2: UserCheck,
  3: Building2,
};

export const ForYouSection = ({ onContactClick, onCVClick }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-28 bg-white overflow-hidden" ref={ref}>
      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522]/[0.02] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F4F4F4] rounded-full blur-[80px]" />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F26522] mb-3 block"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tailored Solutions
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            What's In It For You
          </h2>
          <div className="mt-5 w-10 h-[3px] bg-[#F26522] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {audienceCards.map((card, index) => {
            const Icon = iconMap[card.id];
            return (
              <div
                key={card.id}
                className={`group relative p-9 rounded-lg border border-gray-100 bg-white cursor-pointer overflow-hidden card-3d animated-border ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms`, transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F26522] to-[#ff8a50] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Background number */}
                <div className="absolute top-4 right-4 text-[80px] font-bold text-gray-50 leading-none select-none group-hover:text-[#F26522]/[0.04] transition-colors duration-700"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {String(card.id).padStart(2, '0')}
                </div>

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-7 transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(242,101,34,0.15)]"
                  style={{ backgroundColor: '#FFF1E8' }}
                >
                  <Icon size={22} style={{ color: '#F26522' }} />
                </div>

                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#999]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {card.audience}
                </span>

                <h3
                  className="mt-3 text-[20px] font-bold leading-tight"
                  style={{ color: '#2B2B2B', fontFamily: 'Poppins, sans-serif' }}
                >
                  {card.headline}
                </h3>

                <p
                  className="mt-3 text-[14px] text-[#777] leading-[1.7] relative z-[1]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {card.copy}
                </p>

                <button
                  onClick={card.id === 2 ? onCVClick : onContactClick}
                  className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold bg-transparent border-none cursor-pointer p-0 transition-all duration-300 group-hover:gap-3"
                  style={{ color: '#F26522', fontFamily: 'Inter, sans-serif' }}
                >
                  {card.cta}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
