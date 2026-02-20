import React from 'react';
import { industries } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  Monitor,
  Factory,
  Landmark,
  HeartPulse,
  Truck,
  Zap,
  ShoppingBag,
} from 'lucide-react';

const iconComponents = {
  Monitor,
  Factory,
  Landmark,
  HeartPulse,
  Truck,
  Zap,
  ShoppingBag,
};

export const IndustriesSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-28 bg-white overflow-hidden" ref={ref}>
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
            Sector Focus
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            Industries We Power
          </h2>
          <div className="mt-5 w-10 h-[3px] bg-[#F26522] mx-auto rounded-full" />
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="industries-scroll-container">
          <div className="industries-scroll-track">
            {[...industries, ...industries, ...industries].map(
              (industry, index) => {
                const Icon = iconComponents[industry.icon];
                return (
                  <div
                    key={`${industry.name}-${index}`}
                    className="group flex-shrink-0 flex items-center gap-3 px-10 py-5 cursor-pointer"
                  >
                    <Icon
                      size={20}
                      className="text-[#CCC] group-hover:text-[#F26522] transition-colors duration-300 flex-shrink-0"
                    />
                    <span
                      className="relative text-[15px] font-medium text-[#888] group-hover:text-[#2B2B2B] transition-colors duration-300 whitespace-nowrap"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {industry.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#F26522] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
