import React from 'react';
import { heroStats } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { ArrowRight, Briefcase } from 'lucide-react';
import { AnimatedGrid, FloatingShapes } from './AnimatedElements';

const StatCard = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 2200 + delay, isVisible);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num;
  };

  return (
    <div className="group relative p-7 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-100/80 hover:border-[#F26522]/20 shadow-sm transition-all duration-500 card-3d stat-card-glow cursor-default">
      <div className="stat-shimmer text-[36px] font-bold tracking-tight"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <div
        className="text-[13px] text-[#777] mt-1.5 font-medium tracking-wide"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {stat.label}
      </div>
      {/* Animated bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-[#F26522] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
      </div>
      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M24 0V24H0" stroke="rgba(242,101,34,0.15)" strokeWidth="1" />
        </svg>
      </div>
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
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAFAFA] to-[#FFF8F4]" />
      <AnimatedGrid />
      <FloatingShapes />

      {/* Subtle gradient orbs */}
      <div className="absolute top-[-100px] right-[-50px] w-[600px] h-[600px] bg-[#F26522]/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-80px] left-[-30px] w-[400px] h-[400px] bg-[#F4F4F4] rounded-full blur-[80px]" />

      {/* Orange accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F26522]/30 to-transparent" />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-8 w-full py-32 lg:py-0" style={{ zIndex: 1 }}>
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
              India's largest women-owned full-suite recruitment solutions firm.
              We provide bespoke HR solutions — Executive Search, Recruitment, Staffing,
              HR Consulting and RPO — across 50+ countries.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={onFindTalent}
                className="magnetic-btn group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold text-white rounded-md transition-all duration-300 hover:-translate-y-[2px] active:translate-y-0"
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

          {/* Right Side - Stats Grid with infographic frame */}
          <div
            className={`relative transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Infographic frame */}
            <div className="absolute -inset-4 rounded-2xl border border-dashed border-[#F26522]/10 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-3 h-3 border-t-2 border-l-2 border-[#F26522]/20 rounded-tl-md hidden lg:block" />
            <div className="absolute -top-4 -right-4 w-3 h-3 border-t-2 border-r-2 border-[#F26522]/20 rounded-tr-md hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 w-3 h-3 border-b-2 border-l-2 border-[#F26522]/20 rounded-bl-md hidden lg:block" />
            <div className="absolute -bottom-4 -right-4 w-3 h-3 border-b-2 border-r-2 border-[#F26522]/20 rounded-br-md hidden lg:block" />

            <div className="grid grid-cols-2 gap-5">
              {heroStats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  isVisible={isVisible}
                  delay={index * 200}
                />
              ))}
            </div>

            {/* Connecting lines between stats */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(242,101,34,0.06)" strokeWidth="0.3" strokeDasharray="2 3" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(242,101,34,0.06)" strokeWidth="0.3" strokeDasharray="2 3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
