import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { CVModal } from '../components/CVModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import {
  Shield, Brain, Zap, Heart,
  Linkedin, Globe, Users, Layers,
  ArrowRight, ChevronRight,
} from 'lucide-react';

/* ─────────── DATA ─────────── */
const values = [
  { icon: Shield, title: 'Integrity', desc: 'We operate with transparency and accountability.' },
  { icon: Brain, title: 'Strategic Thinking', desc: 'Every hiring decision aligns with long-term goals.' },
  { icon: Zap, title: 'Execution Excellence', desc: 'Speed, precision, and measurable results.' },
  { icon: Heart, title: 'People-Centric Approach', desc: 'We value both client ambition and candidate potential.' },
];

const leaders = [
  {
    name: 'Anuradha Das Mathur',
    role: 'Founder & Managing Director',
    bio: 'A pioneer in India\'s recruitment industry, Anuradha has co-founded and built 3 of India\'s largest HR firms. She brings over 25 years of executive search and talent advisory experience.',
    img: 'https://images.pexels.com/photos/29995739/pexels-photo-29995739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Chief Operating Officer',
    bio: 'With 20+ years in HR services and operations, Rajesh drives execution excellence across all service verticals and global delivery centres.',
    img: 'https://images.unsplash.com/photo-1769636929261-e913ed023c83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxleGVjdXRpdmUlMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fHx8MTc3MTU4NjE4Mnww&ixlib=rb-4.1.0&q=85',
  },
  {
    name: 'Meera Shankar',
    role: 'Head of Global Strategy',
    bio: 'Meera leads international expansion and client partnerships across 30+ markets, bringing deep expertise in cross-border talent acquisition.',
    img: 'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fHx8MTc3MTU4NjE4Mnww&ixlib=rb-4.1.0&q=85',
  },
  {
    name: 'Vikram Desai',
    role: 'Chief Technology Officer',
    bio: 'Vikram architects the proprietary A Cube platform powered by AI & ML, enabling data-driven recruitment and configurable workforce dashboards.',
    img: 'https://images.pexels.com/photos/31880922/pexels-photo-31880922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const footprintStats = [
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 250, suffix: '+', label: 'Hiring Specialists' },
  { value: 10000, suffix: '+', label: 'Placements Delivered' },
];

const whyCards = [
  {
    icon: Brain,
    title: 'Strategic Advisory Mindset',
    desc: 'Beyond hiring \u2014 we architect workforce strategies that align with long-term organisational goals.',
  },
  {
    icon: Layers,
    title: 'Integrated Service Model',
    desc: 'Executive search, RPO, contingency, temp staffing under one unified framework.',
  },
  {
    icon: Globe,
    title: 'Data-Driven Delivery',
    desc: 'Market intelligence and performance metrics guide every engagement.',
  },
];

const mediaLogos = ['Forbes', 'Silicon India', 'Oxford Economics', 'Cummins'];

/* ─────────── REUSABLE PIECES ─────────── */
const SectionTag = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1E8] mb-5">
    <div className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#F26522]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {children}
    </span>
  </div>
);

const FadeSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const StatNumber = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, 2200, isVisible);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);
  return (
    <div className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="stat-shimmer text-[48px] lg:text-[56px] font-bold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {fmt(count)}{stat.suffix}
      </div>
      <p className="text-[14px] text-[#888] mt-2 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{stat.label}</p>
    </div>
  );
};

/* ─────────── SECTIONS ─────────── */

const AboutHero = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden" data-testid="about-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
      {/* Geometric SVG pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%"><defs><pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 60M45 0L0 45M60 15L15 60M30 0L0 30M60 30L30 60" stroke="#F26522" strokeWidth="0.5" fill="none" /></pattern></defs><rect width="100%" height="100%" fill="url(#about-grid)" /></svg>
      </div>
      {/* Ambient glow */}
      <div className="absolute top-[-80px] right-[10%] w-[500px] h-[500px] bg-[#F26522]/[0.05] rounded-full blur-[140px]" />
      <div className="absolute bottom-[-60px] left-[5%] w-[350px] h-[350px] bg-[#F26522]/[0.03] rounded-full blur-[100px]" />
      {/* Orange accent top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F26522]/50 to-transparent" />

      <div className="relative max-w-[1000px] mx-auto px-6 lg:px-8 text-center pt-32 pb-20" style={{ zIndex: 1 }}>
        <div className={`transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.02em] text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Building Organisations.{' '}
            <span className="text-[#F26522]">Transforming Careers.</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg text-gray-300 leading-[1.7] max-w-[640px] mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ad Astra Consultants is a strategic talent solutions partner helping organisations scale intelligently and professionals grow purposefully.
          </p>
          {/* Animated accent line */}
          <div className="mt-8 flex justify-center">
            <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#F26522] to-[#ff8a50] about-line-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

const WhoWeAre = () => (
  <section className="py-24 lg:py-32 bg-white" data-testid="about-who-we-are">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <FadeSection>
          <SectionTag>About</SectionTag>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111] leading-[1.15] tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Who We Are
          </h2>
          <div className="mt-6 space-y-5">
            <p className="text-base text-[#555] leading-[1.8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ad Astra Consultants is a global talent advisory and recruitment solutions firm with deep expertise across executive search, contingency hiring, recruitment process outsourcing, and flexible workforce deployment.
            </p>
            <p className="text-base text-[#555] leading-[1.8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              We operate at the intersection of insight, strategy, and execution — enabling businesses to secure the right talent at the right time.
            </p>
          </div>
          {/* Accent line */}
          <div className="mt-8 w-16 h-[3px] rounded-full bg-[#F26522]" />
        </FadeSection>

        <FadeSection delay={200}>
          <div className="relative group">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#F26522]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1762433813475-e6b761cc23d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMG1pbmltYWwlMjBidXNpbmVzcyUyMGNvbnN1bHRpbmd8ZW58MHx8fHwxNzcxNTg2MTg0fDA&ixlib=rb-4.1.0&q=85"
              alt="Abstract geometric shapes representing strategic thinking"
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </FadeSection>
      </div>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="py-24 lg:py-32 bg-[#FAFAFA]" data-testid="about-mission-vision">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <FadeSection className="text-center mb-16">
        <SectionTag>Purpose</SectionTag>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#111] tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Our Mission & Vision
        </h2>
      </FadeSection>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { label: 'Our Mission', text: 'To build meaningful talent partnerships that create measurable organisational impact.' },
          { label: 'Our Vision', text: 'To redefine recruitment as a strategic growth enabler rather than a transactional function.' },
        ].map((item, i) => (
          <FadeSection key={item.label} delay={i * 150}>
            <div className="group relative p-10 lg:p-12 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden" data-testid={`about-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {/* Hover glow line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F26522] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {item.label}
              </span>
              <p className="mt-5 text-xl lg:text-2xl font-semibold text-[#222] leading-[1.4]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {item.text}
              </p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const ValuesSection = () => (
  <section className="py-24 lg:py-32 bg-[#F4F4F4]" data-testid="about-values">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <FadeSection className="text-center mb-16">
        <SectionTag>What Drives Us</SectionTag>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#111] tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Our Values
        </h2>
      </FadeSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <FadeSection key={v.title} delay={i * 100}>
            <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 text-center" data-testid={`value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#FFF1E8] flex items-center justify-center mb-5 group-hover:bg-[#F26522] transition-colors duration-400">
                <v.icon size={24} className="text-[#F26522] group-hover:text-white transition-colors duration-400" />
              </div>
              <h3 className="text-[16px] font-bold text-[#111]" style={{ fontFamily: 'Poppins, sans-serif' }}>{v.title}</h3>
              <p className="mt-3 text-[14px] text-[#666] leading-[1.7]" style={{ fontFamily: 'Inter, sans-serif' }}>{v.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section className="py-24 lg:py-32 bg-white" data-testid="about-leadership">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <FadeSection className="text-center mb-16">
        <SectionTag>Team</SectionTag>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#111] tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Leadership That Drives Impact
        </h2>
      </FadeSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {leaders.map((l, i) => (
          <FadeSection key={l.name} delay={i * 120}>
            <div className="group text-center" data-testid={`leader-${l.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="relative w-40 h-40 mx-auto mb-5 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500">
                <img
                  src={l.img}
                  alt={l.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
              <h3 className="text-[16px] font-bold text-[#111]" style={{ fontFamily: 'Poppins, sans-serif' }}>{l.name}</h3>
              <p className="text-[13px] font-semibold text-[#F26522] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{l.role}</p>
              <p className="mt-3 text-[13px] text-[#666] leading-[1.7] max-w-[240px] mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>{l.bio}</p>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 mt-4 rounded-full bg-[#F4F4F4] text-[#888] hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
                <Linkedin size={14} />
              </a>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const GlobalFootprint = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#111]" data-testid="about-global-footprint">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <FadeSection className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#F26522]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Reach
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Global Reach. <span className="text-[#F26522]">Local Insight.</span>
          </h2>
        </FadeSection>

        {/* Animated world map dots */}
        <div className="relative mb-16">
          <svg viewBox="0 0 800 300" className="w-full max-w-[700px] mx-auto" fill="none">
            {/* Horizontal line */}
            <line x1="100" y1="150" x2="700" y2="150" stroke="rgba(242,101,34,0.12)" strokeWidth="1" strokeDasharray="4 6" />
            {/* Dots for key locations */}
            {[
              { cx: 350, cy: 100, label: 'Europe' },
              { cx: 480, cy: 120, label: 'India' },
              { cx: 560, cy: 130, label: 'Singapore' },
              { cx: 200, cy: 140, label: 'Americas' },
              { cx: 620, cy: 160, label: 'APAC' },
              { cx: 300, cy: 180, label: 'Africa' },
            ].map((dot, i) => (
              <g key={i}>
                <circle cx={dot.cx} cy={dot.cy} r="4" fill="#F26522" opacity="0.8" className="about-dot-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                <circle cx={dot.cx} cy={dot.cy} r="10" fill="none" stroke="#F26522" strokeWidth="0.5" opacity="0.3" className="about-dot-ring" style={{ animationDelay: `${i * 0.4}s` }} />
                <text x={dot.cx} y={dot.cy - 16} textAnchor="middle" fill="#888" fontSize="10" fontFamily="Inter, sans-serif">{dot.label}</text>
              </g>
            ))}
            {/* Connecting arcs */}
            <path d="M480 120 Q430 60 350 100" stroke="rgba(242,101,34,0.15)" strokeWidth="0.8" strokeDasharray="3 4" fill="none" />
            <path d="M480 120 Q520 90 560 130" stroke="rgba(242,101,34,0.15)" strokeWidth="0.8" strokeDasharray="3 4" fill="none" />
            <path d="M350 100 Q275 80 200 140" stroke="rgba(242,101,34,0.12)" strokeWidth="0.8" strokeDasharray="3 4" fill="none" />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-[700px] mx-auto">
          {footprintStats.map((s) => (
            <StatNumber key={s.label} stat={s} isVisible={vis} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyAdAstra = () => (
  <section className="py-24 lg:py-32 bg-white" data-testid="about-why-ad-astra">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <FadeSection className="text-center mb-16">
        <SectionTag>Differentiators</SectionTag>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#111] tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Why Ad Astra
        </h2>
      </FadeSection>

      <div className="grid lg:grid-cols-3 gap-8 relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-[1px] bg-gradient-to-r from-transparent via-[#F26522]/15 to-transparent hidden lg:block about-line-grow" />

        {whyCards.map((c, i) => (
          <FadeSection key={c.title} delay={i * 150}>
            <div className="group relative p-8 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-[#F26522]/20 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 text-center" data-testid={`why-${c.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="w-14 h-14 mx-auto rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-5 shadow-sm group-hover:border-[#F26522]/20 transition-all duration-400">
                <c.icon size={24} className="text-[#F26522]" />
              </div>
              <h3 className="text-[17px] font-bold text-[#111]" style={{ fontFamily: 'Poppins, sans-serif' }}>{c.title}</h3>
              <p className="mt-3 text-[14px] text-[#666] leading-[1.7]" style={{ fontFamily: 'Inter, sans-serif' }}>{c.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const AuthoritySection = () => (
  <section className="py-24 lg:py-28 bg-[#FAFAFA]" data-testid="about-authority">
    <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
      <FadeSection>
        <SectionTag>Recognition</SectionTag>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#111] tracking-[-0.01em]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Recognised Voice in Talent & Workforce Strategy
        </h2>
      </FadeSection>

      <FadeSection delay={200} className="mt-12">
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {mediaLogos.map((logo) => (
            <div key={logo} className="group cursor-default" data-testid={`media-${logo.toLowerCase().replace(/\s+/g, '-')}`}>
              <span
                className="text-[18px] font-bold tracking-wide text-[#CCC] group-hover:text-[#F26522] transition-colors duration-500"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>
      </FadeSection>

      <FadeSection delay={350} className="mt-14">
        <blockquote className="max-w-[600px] mx-auto">
          <p className="text-lg lg:text-xl text-[#444] leading-[1.7] italic" style={{ fontFamily: 'Inter, sans-serif' }}>
            "Our insights continue to shape conversations on leadership and workforce transformation."
          </p>
          <div className="mt-4 w-12 h-[2px] mx-auto bg-[#F26522] rounded-full" />
        </blockquote>
      </FadeSection>
    </div>
  </section>
);

const FinalCTA = ({ onTalent, onConnect }) => (
  <section className="relative py-24 lg:py-28 overflow-hidden" style={{ backgroundColor: '#F26522' }} data-testid="about-cta">
    {/* Pattern circles */}
    <div className="absolute top-[-40px] right-[-40px] w-[250px] h-[250px] rounded-full border border-white/10 cta-pattern-circle" />
    <div className="absolute bottom-[-60px] left-[-20px] w-[180px] h-[180px] rounded-full border border-white/10 cta-pattern-circle" style={{ animationDelay: '1.5s' }} />

    <div className="relative max-w-[800px] mx-auto px-6 lg:px-8 text-center" style={{ zIndex: 1 }}>
      <FadeSection>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-[1.15]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Let's Build the Future of Talent Together.
        </h2>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={onTalent}
            data-testid="about-cta-talent-btn"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-semibold bg-white text-[#F26522] rounded-md transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Explore Talent Solutions
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={onConnect}
            data-testid="about-cta-connect-btn"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-semibold border-2 border-white text-white rounded-md transition-all duration-300 hover:bg-white hover:text-[#F26522] hover:-translate-y-[2px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Connect With Us
            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </FadeSection>
    </div>
  </section>
);

/* ─────────── PAGE ─────────── */
export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <ValuesSection />
      <Leadership />
      <GlobalFootprint />
      <WhyAdAstra />
      <AuthoritySection />
      <FinalCTA
        onTalent={() => setContactOpen(true)}
        onConnect={() => setContactOpen(true)}
      />
      <Footer />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
