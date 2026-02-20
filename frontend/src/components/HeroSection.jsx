import React from 'react';
import { heroStats } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { ArrowRight, Briefcase } from 'lucide-react';

const StatCard = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 2200 + delay, isVisible);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num;
  };

  return (
    <div className="group relative p-7 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-100/80 hover:border-[#F26522]/20 shadow-sm hover:shadow-md transition-all duration-400 hover:-translate-y-1">
      <div
        className="text-[32px] font-bold tracking-tight"
        style={{ color: '#F26522', fontFamily: 'Poppins, sans-serif' }}
      >
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <div
        className="text-[13px] text-[#666] mt-1.5 font-medium tracking-wide"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {stat.label}
      </div>
      <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#F26522] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export const HeroSection = ({ onFindTalent, onExploreCareers }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={ref}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAFAFA] to-[#FFF8F4]" />
      <div className="absolute top-[-100px] right-[-50px] w-[500px] h-[500px] bg-[#F26522]/[0.04] rounded-full blur-[100px]" />
      <div className="absolute bottom-[-80px] left-[-30px] w-[400px] h-[400px] bg-[#F4F4F4] rounded-full blur-[80px]" />

      {/* Subtle geometric elements */}
      <div className="absolute top-32 right-40 w-64 h-64 border border-[#F26522]/[0.06] rounded-full hidden xl:block" />
      <div className="absolute bottom-40 right-60 w-32 h-32 border border-gray-200/40 rounded-full hidden xl:block" />
      <div className="absolute top-1/2 left-[-20px] w-[3px] h-40 bg-gradient-to-b from-transparent via-[#F26522]/20 to-transparent hidden lg:block" />

      {/* Orange accent line at very top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F26522]/30 to-transparent" />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-8 w-full py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Side */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1E8] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-pulse" />
              <span
                className="text-[11px] font-semibold tracking-widest uppercase text-[#F26522]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Global Talent Solutions
              </span>
            </div>

            <h1
              className="text-[44px] lg:text-[56px] font-bold leading-[1.08] tracking-[-0.02em]"
              style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
            >
              Strategic Talent.
              <br />
              <span style={{ color: '#F26522' }}>Measurable Impact.</span>
            </h1>

            <p
              className="mt-7 text-[17px] text-[#666] leading-[1.7] max-w-[480px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              We build leadership pipelines, scalable workforce models, and
              high-performance hiring systems for organisations across
              industries.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={onFindTalent}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold text-white rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px] active:translate-y-0"
                style={{
                  backgroundColor: '#F26522',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Find Talent
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={onExploreCareers}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold rounded-md border-2 border-[#111] text-[#111] transition-all duration-300 hover:bg-[#111] hover:text-white hover:-translate-y-[2px] active:translate-y-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Briefcase size={16} />
                Explore Careers
              </button>
            </div>
          </div>

          {/* Right Side - Stats Grid */}
          <div
            className={`grid grid-cols-2 gap-5 transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {heroStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                isVisible={isVisible}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
