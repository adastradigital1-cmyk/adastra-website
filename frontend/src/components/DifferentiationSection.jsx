import React from 'react';
import { differentiators } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FlaskConical, Globe, Layers } from 'lucide-react';

const icons = { FlaskConical, Globe, Layers };

export const DifferentiationSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-28 bg-white" ref={ref}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
        <div
          className={`text-center mb-20 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F26522] mb-3 block"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Why Ad Astra
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            Data-Driven Differentiation
          </h2>
          <div className="mt-5 w-10 h-[3px] bg-[#F26522] mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[42px] left-[16.5%] right-[16.5%] h-[1px]">
            <div
              className={`h-full transition-all duration-1500 ease-out origin-left ${
                isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(242, 101, 34, 0.2), rgba(242, 101, 34, 0.35), rgba(242, 101, 34, 0.2), transparent)',
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {differentiators.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={item.title}
                  className={`text-center transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative inline-flex">
                    <div
                      className="w-[84px] h-[84px] rounded-full flex items-center justify-center mx-auto border-2 transition-all duration-500 hover:scale-110"
                      style={{
                        borderColor: 'rgba(242, 101, 34, 0.15)',
                        backgroundColor: '#FFF8F4',
                      }}
                    >
                      <Icon size={28} style={{ color: '#F26522' }} />
                    </div>
                    {/* Small dot connectors */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-[calc(50%+16px)] w-2 h-2 rounded-full bg-[#F26522]/20 -translate-y-1/2" />
                    )}
                  </div>

                  <h3
                    className="mt-7 text-[18px] font-bold"
                    style={{
                      color: '#2B2B2B',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-3 text-[14px] text-[#888] leading-[1.7] max-w-[280px] mx-auto"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
