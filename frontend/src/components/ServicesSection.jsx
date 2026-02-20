import React from 'react';
import { services } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Search, Users, Settings, Clock, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';

const iconMap = { Search, Users, Settings, Clock, BarChart3, TrendingUp };

export const ServicesSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-40"
      style={{ backgroundColor: 'var(--white-warm)' }}
      data-testid="services-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mb-20">
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="accent-line mb-6" />
            <span className="section-label">02 — Services</span>
            <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
              Comprehensive Talent Solutions
            </h2>
          </div>
          <div className={`flex items-end transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-body text-[1rem] leading-[1.75] max-w-[60ch]" style={{ color: 'var(--text-on-light-muted)' }}>
              From C-suite search to workforce outsourcing — proprietary tools, deep domain expertise, and 150+ years of combined leadership experience.
            </p>
          </div>
        </div>

        {/* Service Grid — 2-col asymmetric on large */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className={`glass-card-light group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
                data-testid={`service-card-${i}`}
              >
                {/* Number */}
                <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                    <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.125rem] font-600 leading-tight" style={{ color: 'var(--text-on-light)' }}>
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)', letterSpacing: '0.1em' }}>
                        {service.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-body text-[0.875rem] mt-4 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>
                  {service.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 font-body font-600 text-[0.8125rem] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400" style={{ color: 'var(--orange-core)' }}>
                  Learn More <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
