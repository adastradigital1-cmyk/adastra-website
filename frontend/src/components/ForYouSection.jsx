import React from 'react';
import { audienceCards } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Users, UserCheck, Building2, ArrowRight } from 'lucide-react';

const iconMap = {
  1: Users,
  2: UserCheck,
  3: Building2,
};

export const ForYouSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-28 bg-white" ref={ref}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
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
                className={`group relative p-9 rounded-lg border border-gray-100 bg-white transition-all duration-500 ease-out hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F26522] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-7 transition-all duration-300 group-hover:scale-110"
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
                  className="mt-3 text-[14px] text-[#777] leading-[1.7]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {card.copy}
                </p>

                <a
                  href="#"
                  className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 group-hover:gap-3 no-underline"
                  style={{ color: '#F26522', fontFamily: 'Inter, sans-serif' }}
                >
                  {card.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
