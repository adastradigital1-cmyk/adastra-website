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
    <section className="py-28" style={{ backgroundColor: '#F4F4F4' }} ref={ref}>
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
            Our Expertise
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            Services Snapshot
          </h2>
          <p
            className="mt-4 text-[15px] text-[#888] max-w-md mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Comprehensive talent solutions tailored to your needs
          </p>
          <div className="mt-5 w-10 h-[3px] bg-[#F26522] mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = iconComponents[service.icon];
            return (
              <div
                key={service.title}
                className={`group p-7 rounded-lg bg-white border border-gray-100/80 transition-all duration-500 ease-out hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#F4F4F4] group-hover:bg-[#FFF1E8] transition-colors duration-300 flex-shrink-0">
                    <Icon
                      size={20}
                      className="text-[#999] group-hover:text-[#F26522] transition-colors duration-300"
                    />
                  </div>
                  <h3
                    className="text-[15px] font-semibold"
                    style={{
                      color: '#2B2B2B',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
