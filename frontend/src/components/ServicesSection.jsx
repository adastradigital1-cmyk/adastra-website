import React from 'react';
import { services } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  Search,
  Users,
  Settings,
  Clock,
  BarChart3,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const iconComponents = {
  Search,
  Users,
  Settings,
  Clock,
  BarChart3,
  TrendingUp,
};

export const ServicesSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#F4F4F4' }} ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="service-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(242,101,34,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#service-dots)" />
        </svg>
      </div>

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
            Our Expertise
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            Our Services
          </h2>
          <p
            className="mt-4 text-[15px] text-[#888] max-w-lg mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Comprehensive, bespoke HR solutions built from proprietary tools, expertise and experience
          </p>
          <div className="mt-5 w-10 h-[3px] bg-[#F26522] mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconComponents[service.icon];
            return (
              <div
                key={service.title}
                className={`group relative p-8 rounded-lg bg-white border border-gray-100/80 transition-all duration-500 ease-out card-3d animated-border cursor-pointer overflow-hidden ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Top accent that slides in */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F26522] to-[#ff8a50] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Number badge */}
                <div className="absolute top-6 right-6 text-[48px] font-bold text-gray-100/60 leading-none select-none group-hover:text-[#F26522]/[0.07] transition-colors duration-500"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#F4F4F4] group-hover:bg-[#FFF1E8] transition-all duration-300 mb-5">
                  <div className="service-icon-hover">
                    <Icon
                      size={22}
                      className="text-[#999] group-hover:text-[#F26522] transition-colors duration-300"
                    />
                  </div>
                </div>

                <h3
                  className="text-[17px] font-bold"
                  style={{
                    color: '#2B2B2B',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {service.title}
                </h3>

                {service.subtitle && (
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F26522]/70 mt-1 block"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {service.subtitle}
                  </span>
                )}

                <p
                  className="mt-3 text-[13px] text-[#888] leading-[1.7] relative z-[1]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {service.description}
                </p>

                <div
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#F26522] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
