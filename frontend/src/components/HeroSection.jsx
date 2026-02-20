import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight, Briefcase } from 'lucide-react';
import { AnimatedGrid, FloatingShapes } from './AnimatedElements';

const HERO_IMAGE_URL = 'https://customer-assets.emergentagent.com/job_aba56b22-9f01-4c5f-a61f-3d17233d7cdb/artifacts/1iq5jq57_adastra-hero-home.png';

export const HeroSection = ({ onFindTalent, onExploreCareers }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={ref}
      data-testid="hero-section"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
      <AnimatedGrid />
      <FloatingShapes />

      {/* Warm ambient glow */}
      <div className="absolute top-[-100px] right-[-50px] w-[600px] h-[600px] bg-[#F26522]/[0.06] rounded-full blur-[150px]" />
      <div className="absolute bottom-[-80px] left-[-30px] w-[400px] h-[400px] bg-[#F26522]/[0.03] rounded-full blur-[100px]" />

      {/* Orange accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F26522]/50 to-transparent" />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-28 lg:pb-16" style={{ zIndex: 1 }}>
        <div className="flex flex-col items-center gap-10">

          {/* Hero Infographic Image */}
          <div
            className={`w-full max-w-[900px] transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
            data-testid="hero-infographic"
          >
            <img
              src={HERO_IMAGE_URL}
              alt="Ad Astra in Numbers — 18+ Years, 250+ Specialists, 30+ Markets, 10,000+ Placements, 95% Retention, 3X Faster Closures, 72% On-Time Delivery"
              className="w-full h-auto rounded-2xl shadow-2xl hero-image-glow"
              loading="eager"
              fetchpriority="high"
            />
          </div>

          {/* Text + CTA below the image */}
          <div
            className={`text-center max-w-[680px] transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-pulse" />
              <span
                className="text-[11px] font-semibold tracking-widest uppercase text-[#F26522]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Global Talent Solutions
              </span>
            </div>

            <p
              className="text-[17px] text-gray-300 leading-[1.7] max-w-[560px] mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              India's largest women-owned full-suite recruitment solutions firm.
              We provide bespoke HR solutions — Executive Search, Recruitment, Staffing,
              HR Consulting and RPO — across 50+ countries.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button
                onClick={onFindTalent}
                data-testid="hero-find-talent-btn"
                className="magnetic-btn group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold text-white rounded-md transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-[#F26522]/30 active:translate-y-0"
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
                data-testid="hero-explore-careers-btn"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[14px] font-semibold rounded-md border-2 border-white/30 text-white transition-all duration-300 hover:bg-white hover:text-[#111] hover:-translate-y-[2px] active:translate-y-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Briefcase size={16} />
                Explore Careers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
