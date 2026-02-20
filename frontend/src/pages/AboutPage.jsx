import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { CVModal } from '../components/CVModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { Linkedin, ArrowRight, ChevronRight } from 'lucide-react';

/* ─── DATA ─── */
const values = [
  { title: 'Integrity', desc: 'We operate with transparency and accountability at every level.' },
  { title: 'Strategic Thinking', desc: 'Every hiring decision aligns with long-term organisational goals.' },
  { title: 'Execution Excellence', desc: 'Speed, precision, and measurable results — without compromise.' },
  { title: 'People-Centric', desc: 'We value both client ambition and candidate potential equally.' },
];

const leaders = [
  {
    name: 'Anuradha Das Mathur',
    role: 'Founder & Managing Director',
    bio: 'A pioneer in India\'s recruitment industry. Co-founded and built 3 of India\'s largest HR firms with 25+ years of executive search experience.',
    img: 'https://images.pexels.com/photos/29995739/pexels-photo-29995739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Chief Operating Officer',
    bio: '20+ years driving execution excellence across all service verticals and global delivery centres.',
    img: 'https://images.unsplash.com/photo-1769636929261-e913ed023c83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxleGVjdXRpdmUlMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fHx8MTc3MTU4NjE4Mnww&ixlib=rb-4.1.0&q=85',
  },
  {
    name: 'Meera Shankar',
    role: 'Head of Global Strategy',
    bio: 'Leads international expansion and client partnerships across 30+ markets with deep cross-border acquisition expertise.',
    img: 'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fHx8MTc3MTU4NjE4Mnww&ixlib=rb-4.1.0&q=85',
  },
  {
    name: 'Vikram Desai',
    role: 'Chief Technology Officer',
    bio: 'Architects the proprietary A Cube platform powered by AI & ML, enabling data-driven recruitment dashboards.',
    img: 'https://images.pexels.com/photos/31880922/pexels-photo-31880922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const stats = [
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 250, suffix: '+', label: 'Hiring Specialists' },
  { value: 10000, suffix: '+', label: 'Placements Delivered' },
  { value: 95, suffix: '%', label: 'Client Retention' },
];

const whyCards = [
  { title: 'Strategic Advisory Mindset', desc: 'Beyond hiring — we architect workforce strategies aligned with long-term organisational goals.' },
  { title: 'Integrated Service Model', desc: 'Executive search, RPO, contingency, temp staffing under one unified framework.' },
  { title: 'Data-Driven Delivery', desc: 'Market intelligence and performance metrics guide every engagement we undertake.' },
];

/* ─── HELPERS ─── */
const FadeSection = ({ children, className = '', delay = 0 }) => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const StatNum = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);
  return (
    <div className="text-center">
      <div className="stat-number text-[3rem] lg:text-[3.5rem] font-700 leading-none">{fmt(count)}{stat.suffix}</div>
      <p className="font-mono text-[0.75rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

/* ─── SECTIONS ─── */

const AboutHero = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <section ref={ref} className="relative min-h-[75vh] flex items-center overflow-hidden noise-overlay" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-hero">
      <div className="absolute inset-0 gradient-mesh" />
      <svg className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] opacity-[0.05] hidden lg:block" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="140" stroke="var(--orange-core)" strokeWidth="0.5" strokeDasharray="6 10" />
      </svg>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--orange-core)] to-transparent opacity-30" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20">
        <div className="max-w-[800px]">
          <div className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label">About Ad Astra</span>
          </div>
          <h1 className={`font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.08] mt-6 transition-all duration-1000 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ color: 'var(--white-pure)' }}>
            Building Organisations.{' '}
            <span style={{ color: 'var(--orange-core)' }}>Transforming Careers.</span>
          </h1>
          <p className={`font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[520px] leading-[1.7] transition-all duration-700 delay-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-on-dark-muted)' }}>
            A strategic talent solutions partner helping organisations scale intelligently and professionals grow purposefully.
          </p>
        </div>
        <div className={`absolute bottom-10 left-6 lg:left-12 transition-all duration-700 delay-1000 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          <div className="scroll-indicator w-[1px] h-[40px] bg-gradient-to-b from-[var(--orange-core)] to-transparent" />
        </div>
      </div>
    </section>
  );
};

const WhoWeAre = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-who-we-are">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">
        <FadeSection>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — Who We Are</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
            A Global Talent Advisory Firm
          </h2>
          <div className="mt-8 space-y-5 max-w-[60ch]">
            <p className="font-body text-[1.0625rem] leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>
              Ad Astra Consultants is a global talent advisory and recruitment solutions firm with deep expertise across executive search, contingency hiring, recruitment process outsourcing, and flexible workforce deployment.
            </p>
            <p className="font-body text-[1.0625rem] leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>
              We operate at the intersection of insight, strategy, and execution — enabling businesses to secure the right talent at the right time.
            </p>
          </div>
        </FadeSection>
        <FadeSection delay={200} className="flex items-end">
          <div className="img-container w-full">
            <img
              src="https://images.unsplash.com/photo-1762433813475-e6b761cc23d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMG1pbmltYWwlMjBidXNpbmVzcyUyMGNvbnN1bHRpbmd8ZW58MHx8fHwxNzcxNTg2MTg0fDA&ixlib=rb-4.1.0&q=85"
              alt="Abstract geometric"
              className="img-treated w-full h-[360px]"
              loading="lazy"
            />
          </div>
        </FadeSection>
      </div>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="py-24 lg:py-28 noise-overlay relative" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-mission-vision">
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <FadeSection className="mb-16">
        <div className="accent-line mb-6" style={{ background: 'var(--orange-core)' }} />
        <span className="section-label">02 — Purpose</span>
      </FadeSection>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { label: 'Our Mission', text: 'To build meaningful talent partnerships that create measurable organisational impact.' },
          { label: 'Our Vision', text: 'To redefine recruitment as a strategic growth enabler rather than a transactional function.' },
        ].map((item, i) => (
          <FadeSection key={item.label} delay={i * 150}>
            <div className="glass-card-dark" data-testid={`about-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--orange-core)' }}>{item.label}</span>
              <p className="font-display text-[1.5rem] lg:text-[1.75rem] font-600 mt-4 leading-[1.35]" style={{ color: 'var(--text-on-dark)' }}>
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
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-values">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <FadeSection className="mb-20">
        <div className="accent-line mb-6" />
        <span className="section-label">03 — Values</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          What Drives Us
        </h2>
      </FadeSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <FadeSection key={v.title} delay={i * 100}>
            <div className="glass-card-light" data-testid={`value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[1.25rem] font-600 mt-3" style={{ color: 'var(--text-on-light)' }}>{v.title}</h3>
              <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{v.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-cream)' }} data-testid="about-leadership">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <FadeSection className="mb-20">
        <div className="accent-line mb-6" />
        <span className="section-label">04 — Team</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Leadership That Drives Impact
        </h2>
      </FadeSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {leaders.map((l, i) => (
          <FadeSection key={l.name} delay={i * 120}>
            <div className="group" data-testid={`leader-${l.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="img-container w-full aspect-[3/4] mb-5">
                <img src={l.img} alt={l.name} className="img-treated w-full h-full" loading="lazy" />
              </div>
              <h3 className="font-display text-[1.125rem] font-600" style={{ color: 'var(--text-on-light)' }}>{l.name}</h3>
              <p className="font-mono text-[0.625rem] mt-1" style={{ color: 'var(--orange-core)' }}>{l.role}</p>
              <p className="font-body text-[0.875rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{l.bio}</p>
              <a href="#" className="inline-block mt-3 text-[var(--text-on-light-muted)] hover:text-[var(--orange-core)] opacity-50 hover:opacity-100 transition-all duration-300">
                <Linkedin size={15} />
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
    <section ref={ref} className="py-24 lg:py-28 noise-overlay relative" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-global-footprint">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <StatNum stat={s} isVisible={vis} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyAdAstra = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-why-ad-astra">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <FadeSection className="mb-20">
        <div className="accent-line mb-6" />
        <span className="section-label">05 — Differentiators</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          Why Ad Astra
        </h2>
      </FadeSection>
      <div className="grid lg:grid-cols-3 gap-6">
        {whyCards.map((c, i) => (
          <FadeSection key={c.title} delay={i * 150}>
            <div className="glass-card-light" data-testid={`why-${c.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[1.25rem] font-600 mt-3" style={{ color: 'var(--text-on-light)' }}>{c.title}</h3>
              <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{c.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

const AuthoritySection = () => (
  <section className="py-24 lg:py-28 noise-overlay relative" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="about-authority">
    <div className="relative max-w-[1000px] mx-auto px-6 lg:px-12">
      <FadeSection>
        <blockquote className="pull-quote" style={{ borderColor: 'var(--orange-core)' }}>
          <p className="font-display text-[1.5rem] lg:text-[2rem] font-500 italic leading-[1.5]" style={{ color: 'var(--text-on-dark)' }}>
            "Our insights continue to shape conversations on leadership and workforce transformation."
          </p>
        </blockquote>
      </FadeSection>
    </div>
  </section>
);

const FinalCTA = ({ onTalent, onConnect }) => (
  <section className="py-28 lg:py-36 noise-overlay relative" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-cta">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--orange-core)] opacity-[0.04] rounded-full blur-[150px]" />
    <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center">
      <FadeSection>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
          Let's Build the Future of Talent Together.
        </h2>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button onClick={onTalent} data-testid="about-cta-talent-btn" className="btn-primary">
            Explore Talent Solutions <ArrowRight size={16} />
          </button>
          <button onClick={onConnect} data-testid="about-cta-connect-btn" className="btn-secondary btn-secondary-dark">
            Connect With Us <ChevronRight size={16} />
          </button>
        </div>
      </FadeSection>
    </div>
  </section>
);

/* ─── PAGE ─── */
export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <ValuesSection />
      <Leadership />
      <GlobalFootprint />
      <WhyAdAstra />
      <AuthoritySection />
      <FinalCTA onTalent={() => setContactOpen(true)} onConnect={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
