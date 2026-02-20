import React from 'react';
import { differentiators } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Globe, Users, Layers } from 'lucide-react';

const icons = { Globe, Users, Layers };

export const DifferentiationSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-28 bg-white overflow-hidden" ref={ref}>
      {/* Background SVG pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1300 600" preserveAspectRatio="xMidYMid slice">
          {/* Animated circuit-like lines */}
          <line x1="0" y1="300" x2="1300" y2="300" stroke="rgba(242,101,34,0.03)" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="325" y1="0" x2="325" y2="600" stroke="rgba(242,101,34,0.02)" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="650" y1="0" x2="650" y2="600" stroke="rgba(242,101,34,0.02)" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="975" y1="0" x2="975" y2="600" stroke="rgba(242,101,34,0.02)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-8">
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
          {/* Animated connecting line with flowing dots */}
          <div className="hidden md:block absolute top-[52px] left-[16.5%] right-[16.5%]">
            <svg className="w-full h-8" viewBox="0 0 800 30" preserveAspectRatio="none">
              {/* Base line */}
              <line x1="0" y1="15" x2="800" y2="15"
                stroke="rgba(242,101,34,0.12)"
                strokeWidth="1"
                className={`transition-all duration-1500 origin-left ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                strokeDasharray="6 4"
              />
              {/* Flowing dot 1 */}
              <circle r="4" fill="rgba(242,101,34,0.3)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M0,15 L800,15" />
              </circle>
              {/* Flowing dot 2 */}
              <circle r="3" fill="rgba(242,101,34,0.2)">
                <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" path="M0,15 L800,15" />
              </circle>
              {/* Node dots */}
              <circle cx="0" cy="15" r="5" fill="rgba(242,101,34,0.15)" className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              <circle cx="400" cy="15" r="5" fill="rgba(242,101,34,0.15)" className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              <circle cx="800" cy="15" r="5" fill="rgba(242,101,34,0.15)" className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              {/* Pulsing rings at nodes */}
              <circle cx="0" cy="15" r="5" fill="none" stroke="rgba(242,101,34,0.1)" strokeWidth="1">
                <animate attributeName="r" from="5" to="20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="15" r="5" fill="none" stroke="rgba(242,101,34,0.1)" strokeWidth="1">
                <animate attributeName="r" from="5" to="20" dur="2s" begin="0.7s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin="0.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="800" cy="15" r="5" fill="none" stroke="rgba(242,101,34,0.1)" strokeWidth="1">
                <animate attributeName="r" from="5" to="20" dur="2s" begin="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" begin="1.4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {differentiators.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={item.title}
                  className={`text-center group transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative inline-flex">
                    <div
                      className="w-[84px] h-[84px] rounded-full flex items-center justify-center mx-auto border-2 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(242,101,34,0.15)]"
                      style={{
                        borderColor: 'rgba(242, 101, 34, 0.15)',
                        backgroundColor: '#FFF8F4',
                      }}
                    >
                      <Icon size={28} style={{ color: '#F26522' }} className="transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Orbiting dot */}
                    <div className="absolute inset-[-8px] hidden lg:block">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(242,101,34,0.06)" strokeWidth="0.5" strokeDasharray="4 6" />
                        <circle r="2.5" fill="rgba(242,101,34,0.25)">
                          <animateMotion
                            dur={`${4 + index}s`}
                            repeatCount="indefinite"
                            path="M50,2 A48,48 0 1,1 49.99,2"
                          />
                        </circle>
                      </svg>
                    </div>
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
