import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { CVModal } from '../components/CVModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { ParticleField } from '../components/ParticleField';
import { Linkedin, ArrowRight, ChevronRight } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

/* ─── DATA ─── */
const values = [
  { title: 'Client Success', desc: 'Dedication to every client\'s success achieved through innovation and excellence in quality.' },
  { title: 'Integrity & Trust', desc: 'Building trust through honest work ethics and fair policies for clients and employees alike.' },
  { title: 'Leading with Sensitivity', desc: 'Characterized by thoughtfulness and responsibility in every interaction.' },
  { title: 'Diversity & Inclusion', desc: '80% women workforce including those with visual impairments. Champions of workplace diversity.' },
];

const leaders = [
  { name: 'Jayanthi Yeshwant Kumar', role: 'Chairperson & Founder', bio: 'Visionary founder with 27+ years in banking, financial services, and recruitment consulting. Former Senior Director at Societe Generale. Independent Director at Greaves Electric Mobility. Strong advocate for diversity and inclusion.', img: 'https://images.pexels.com/photos/29995739/pexels-photo-29995739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'Nirupama VG', role: 'Managing Director & Co-Founder', bio: 'Serial entrepreneur with 25+ years experience. Built three HR firms acquired by Randstad, Aon Hewitt, and ADP. Recognized among top 25 women entrepreneurs by Silicon India. Featured by Oxford Economics and Forbes.', img: 'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?w=600' },
  { name: 'Sourav Bose', role: 'Co-Founder & Vice President', bio: '27 years of executive search experience. Oversees East operations and manages key projects. Previously with First Flight Couriers, Genius Consultants, and Team Lease Services.', img: 'https://images.pexels.com/photos/31880922/pexels-photo-31880922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'Manuj Bij', role: 'Vice President', bio: '17 years in executive search and talent acquisition. Delivered multiple CXO and senior-level searches. Expert in deep customer engagement and leadership of diverse teams.', img: 'https://images.unsplash.com/photo-1769636929261-e913ed023c83?w=600' },
];

const stats = [
  { value: 50, suffix: '+', label: 'Countries Served' },
  { value: 300, suffix: '+', label: 'Team Members' },
  { value: 10000, suffix: '+', label: 'Placements Delivered' },
  { value: 150, suffix: '+', label: 'Years Combined Experience' },
];

const whyCards = [
  { title: 'Proprietary Technology', desc: 'Our AI-powered A Cube platform offers cloud-based automation, configurable dashboards, and trend-based searches.' },
  { title: 'Global Reach', desc: '9 worldwide locations — Bangalore, Mumbai, Delhi, Kolkata, Coimbatore, Singapore, London, and Amsterdam.' },
  { title: 'Women-Owned Leadership', desc: 'India\'s largest women-owned recruitment firm with 80% women workforce, championing diversity.' },
];

/* ─── HELPERS ─── */
const StatNum = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : n);
  return (
    <div className="text-center">
      <div className="stat-number text-[4rem] lg:text-[5rem] font-800 leading-none">{fmt(count)}{stat.suffix}</div>
      <p className="font-mono text-[0.75rem] mt-3" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</p>
    </div>
  );
};

const WordReveal = ({ text, className, style, startDelay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.3em]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: startDelay + i * 0.08, ease }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ─── SECTIONS ─── */
const AboutHero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="about-hero-particles" density="normal" />
      </motion.div>
      <svg className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] opacity-[0.05] hidden lg:block" viewBox="0 0 350 350" fill="none">
        <circle cx="175" cy="175" r="160" stroke="var(--orange-core)" strokeWidth="0.5" strokeDasharray="6 10" />
      </svg>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--orange-core)] to-transparent opacity-30 z-10" />

      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10" style={{ y: fgY, opacity }}>
        <div className="max-w-[800px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
            <span className="section-label">About Ad Astra</span>
          </motion.div>
          <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6" style={{ color: 'var(--white-pure)' }}>
            <WordReveal text="Building Organisations. Transforming Careers." startDelay={0.3} />
          </h1>
          <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[520px] leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
            A strategic talent solutions partner helping organisations scale intelligently and professionals grow purposefully.
          </motion.p>
        </div>
        <motion.div className="absolute bottom-10 left-6 lg:left-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}>
          <div className="scroll-indicator w-[1px] h-[40px] bg-gradient-to-b from-[var(--orange-core)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const WhoWeAre = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-who-we-are">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">01 — Who We Are</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>A Global Talent Advisory Firm</h2>
          <div className="mt-8 space-y-5 max-w-[60ch]">
            <p className="font-body text-[1.0625rem] leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>Ad Astra Consultants is a global talent advisory and recruitment solutions firm with deep expertise across executive search, contingency hiring, recruitment process outsourcing, and flexible workforce deployment.</p>
            <p className="font-body text-[1.0625rem] leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>We operate at the intersection of insight, strategy, and execution — enabling businesses to secure the right talent at the right time.</p>
          </div>
        </motion.div>
        <motion.div className="flex items-end" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, delay: 0.2, ease }}>
          <div className="img-container w-full">
            <img src="https://images.unsplash.com/photo-1762433813475-e6b761cc23d0?w=800" alt="Abstract geometric" className="img-treated w-full h-[360px]" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const MissionVision = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return (
    <section ref={ref} className="py-24 lg:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-mission-vision">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-mv-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" style={{ background: 'var(--orange-core)' }} />
          <span className="section-label">02 — Purpose</span>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.12 }}>
          {[
            { label: 'Our Mission', text: 'To change lives every day – one job at a time.' },
            { label: 'Our Vision', text: 'To be the leading HR Solutions provider in Asia, a respected employer and the preferred vendor of choice.' },
          ].map((item) => (
            <motion.div key={item.label} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-8" data-testid={`about-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--orange-core)' }}>{item.label}</span>
              <p className="font-display text-[1.5rem] lg:text-[1.75rem] font-600 mt-4 leading-[1.35]" style={{ color: 'var(--text-on-dark)' }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ValuesSection = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-values">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">03 — Values</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>What Drives Us</h2>
      </motion.div>
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {values.map((v, i) => (
          <motion.div key={v.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light" data-testid={`value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-[1.25rem] font-600 mt-3" style={{ color: 'var(--text-on-light)' }}>{v.title}</h3>
            <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Leadership = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-cream)' }} data-testid="about-leadership">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">04 — Team</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Leadership That Drives Impact</h2>
      </motion.div>
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
        {leaders.map((l) => (
          <motion.div key={l.name} variants={fadeUp} transition={{ duration: 0.7, ease }} className="group" data-testid={`leader-${l.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="img-container w-full aspect-[3/4] mb-5">
              <img src={l.img} alt={l.name} className="img-treated w-full h-full" loading="lazy" />
            </div>
            <h3 className="font-display text-[1.125rem] font-600" style={{ color: 'var(--text-on-light)' }}>{l.name}</h3>
            <p className="font-mono text-[0.625rem] mt-1" style={{ color: 'var(--orange-core)' }}>{l.role}</p>
            <p className="font-body text-[0.875rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{l.bio}</p>
            <a href="#" className="inline-block mt-3 text-[var(--text-on-light-muted)] hover:text-[var(--orange-core)] opacity-50 hover:opacity-100 transition-all duration-300"><Linkedin size={15} /></a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const GlobalFootprint = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-global-footprint">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-gf-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, ease }}>
              <StatNum stat={s} isVisible={vis} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyAdAstra = () => (
  <section className="py-32 lg:py-40" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="about-why-ad-astra">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">05 — Differentiators</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Why Ad Astra</h2>
      </motion.div>
      <motion.div className="grid lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.12 }}>
        {whyCards.map((c, i) => (
          <motion.div key={c.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light" data-testid={`why-${c.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-[1.25rem] font-600 mt-3" style={{ color: 'var(--text-on-light)' }}>{c.title}</h3>
            <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const FinalCTA = ({ onTalent, onConnect }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="about-cta">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="about-cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--orange-core)] opacity-[0.04] rounded-full blur-[150px]" />
      <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>Let's Build the Future of Talent Together.</h2>
          <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <button onClick={onTalent} data-testid="about-cta-talent-btn" className="btn-primary">Explore Talent Solutions <ArrowRight size={16} /></button>
            <button onClick={onConnect} data-testid="about-cta-connect-btn" className="btn-secondary btn-secondary-dark">Connect With Us <ChevronRight size={16} /></button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

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
      <FinalCTA onTalent={() => setContactOpen(true)} onConnect={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
