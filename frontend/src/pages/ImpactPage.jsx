import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import { ParticleField } from '../components/ParticleField';
import { Globe, Users, Award, Heart, Leaf, ArrowRight, ChevronRight, Quote } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const impactStats = [
  { value: 10000, suffix: '+', label: 'Careers Transformed' },
  { value: 500, suffix: '+', label: 'Organizations Empowered' },
  { value: 50, suffix: '+', label: 'Countries Reached' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
];

const impactAreas = [
  {
    icon: Users,
    title: 'Diversity & Inclusion',
    desc: 'As India\'s largest women-owned recruitment firm, we champion diversity at every level. Our placements consistently exceed industry benchmarks for diverse leadership.',
    stat: '40%',
    statLabel: 'Women in leadership placements',
  },
  {
    icon: Globe,
    title: 'Global Reach, Local Impact',
    desc: 'We connect talent across 50+ countries while maintaining deep local expertise. Every placement strengthens communities and builds bridges across cultures.',
    stat: '50+',
    statLabel: 'Countries served',
  },
  {
    icon: Heart,
    title: 'Employee Wellbeing',
    desc: 'We prioritize finding roles where professionals can thrive — not just survive. Our focus on cultural fit leads to longer tenures and more fulfilling careers.',
    stat: '85%',
    statLabel: 'Retention rate at 2 years',
  },
  {
    icon: Leaf,
    title: 'Sustainable Growth',
    desc: 'We help organizations build teams that drive long-term, sustainable success. Our strategic approach ensures lasting impact beyond the initial placement.',
    stat: '3x',
    statLabel: 'Average ROI for clients',
  },
];

const testimonials = [
  {
    quote: "Ad Astra didn't just find me a job — they helped me find a career that aligned with my values and ambitions. Three years later, I'm still grateful.",
    name: "Priya Sharma",
    role: "CFO, Tech Startup",
    placed: "Placed 2023",
  },
  {
    quote: "The team's commitment to understanding our culture meant every candidate they presented was a potential fit. The quality was exceptional.",
    name: "Michael Chen",
    role: "CHRO, Global Manufacturing",
    placed: "Client since 2019",
  },
  {
    quote: "Working with a women-owned firm that truly understands the importance of diverse leadership has been transformative for our organization.",
    name: "Sarah Williams",
    role: "CEO, Healthcare Services",
    placed: "Client since 2021",
  },
];

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

const ImpactHero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="impact-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="impact-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Our Impact</span>
        </motion.div>
        <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Creating Meaningful Change Through Talent" startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[600px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          Every placement we make ripples outward — transforming careers, strengthening organizations, and building better workplaces.
        </motion.p>
      </motion.div>
    </section>
  );
};

const ImpactStats = () => {
  const [ref, vis] = useScrollAnimation({ threshold: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={(el) => { sectionRef.current = el; ref.current = el; }} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-soft)' }} data-testid="impact-stats">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="impact-stats-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-dark)]" />
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {impactStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, ease }}>
              <StatNum stat={s} isVisible={vis} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactAreas = () => (
  <section className="py-32 lg:py-40 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="impact-areas">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-25" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>
    
    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
        <div className="accent-line mb-6" />
        <span className="section-label">01 — How We Create Impact</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Beyond Placements</h2>
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.12 }}>
        {impactAreas.map((area, i) => {
          const Icon = area.icon;
          return (
            <motion.div key={area.title} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-8" data-testid={`impact-area-${i}`}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={26} style={{ color: 'var(--orange-core)' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[1.5rem] font-600" style={{ color: 'var(--text-on-light)' }}>{area.title}</h3>
                  <p className="font-body text-[0.9375rem] mt-3 leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>{area.desc}</p>
                  <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-light)' }}>
                    <span className="font-display text-[2rem] font-700" style={{ color: 'var(--orange-core)' }}>{area.stat}</span>
                    <span className="font-body text-[0.875rem] ml-2" style={{ color: 'var(--text-on-light-muted)' }}>{area.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

const ImpactTestimonials = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="impact-testimonials">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="impact-testimonials-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 z-10">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">02 — Voices of Impact</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>Stories That Matter</h2>
        </motion.div>

        <motion.div className="grid lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-dark p-8" data-testid={`testimonial-${i}`}>
              <Quote size={28} style={{ color: 'var(--orange-core)', opacity: 0.5 }} />
              <p className="font-body text-[1rem] mt-4 leading-[1.75] italic" style={{ color: 'var(--text-on-dark)' }}>"{t.quote}"</p>
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-dark)' }}>
                <p className="font-display text-[1rem] font-600" style={{ color: 'var(--text-on-dark)' }}>{t.name}</p>
                <p className="font-body text-[0.8125rem] mt-1" style={{ color: 'var(--text-on-dark-muted)' }}>{t.role}</p>
                <span className="font-mono text-[0.6875rem] mt-2 inline-block" style={{ color: 'var(--orange-core)' }}>{t.placed}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ImpactCTA = ({ onContact }) => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="impact-cta">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20" style={{ background: 'var(--orange-core)' }} />
    </div>
    
    <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center z-10">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Be Part of the Impact</h2>
        <p className="font-body text-[1.0625rem] mt-5 max-w-[500px] mx-auto" style={{ color: 'var(--text-on-light-muted)' }}>Whether you're seeking transformative talent or your next career move, let's create something meaningful together.</p>
        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
          <button onClick={onContact} className="btn-primary" data-testid="impact-cta-btn">Start a Conversation <ArrowRight size={16} /></button>
          <Link to="/about" className="btn-secondary no-underline">Learn Our Story <ChevronRight size={16} /></Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default function ImpactPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="impact-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <ImpactHero />
      <ImpactStats />
      <ImpactAreas />
      <ImpactTestimonials />
      <ImpactCTA onContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
