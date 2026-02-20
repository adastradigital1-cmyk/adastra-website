import React from 'react';
import { industries } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Monitor, Factory, Landmark, HeartPulse, Truck, Zap, ShoppingBag } from 'lucide-react';

const iconMap = { Monitor, Factory, Landmark, HeartPulse, Truck, Zap, ShoppingBag };

export const IndustriesSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-40 overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--black-rich)' }}
      data-testid="industries-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 mb-16">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="accent-line mb-6" />
          <span className="section-label">03 — Industries</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            Sectors We Serve
          </h2>
        </div>
      </div>

      {/* Scrolling strip */}
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="industries-scroll-container">
          <div className="industries-scroll-track">
            {[...industries, ...industries, ...industries].map((ind, i) => {
              const Icon = iconMap[ind.icon];
              return (
                <div key={`${ind.name}-${i}`} className="group flex-shrink-0 flex items-center gap-3 px-10 py-6 cursor-pointer">
                  <Icon size={18} className="text-[var(--text-on-dark-muted)] group-hover:text-[var(--orange-core)] transition-colors duration-300 flex-shrink-0" />
                  <span className="relative font-body text-[0.9375rem] font-500 whitespace-nowrap transition-colors duration-300 text-[var(--text-on-dark-muted)] group-hover:text-[var(--text-on-dark)]">
                    {ind.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--orange-core)] rounded-full transition-all duration-300 group-hover:w-full" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
