import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { audienceCards } from '../data/mock';
import { ArrowRight } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

export const ForYouSection = ({ onContactClick, onCVClick }) => {
  const { scrollYProgress } = useScroll();

  return (
    <section
      className="relative py-32 lg:py-40"
      style={{ backgroundColor: 'var(--white-warm)' }}
      data-testid="foryou-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header — asymmetric */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.8, ease }}
          >
            <div className="accent-line mb-6" />
            <span className="section-label">01 — What We Do</span>
            <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>
              Tailored Solutions for Every Stakeholder
            </h2>
          </motion.div>
          <motion.div
            className="flex items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="font-body text-[1rem] leading-[1.75] max-w-[60ch]" style={{ color: 'var(--text-on-light-muted)' }}>
              Whether you're an enterprise seeking transformative leaders, a candidate pursuing purposeful growth, or a scaling company building teams — we architect the path.
            </p>
          </motion.div>
        </div>

        {/* Cards — staggered entrance */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {audienceCards.map((card, i) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="glass-card-light group cursor-pointer"
              data-testid={`foryou-card-${i}`}
            >
              <span className="section-label text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)', letterSpacing: '0.12em' }}>
                {card.audience}
              </span>
              <h3 className="font-display text-[1.5rem] font-600 mt-3 leading-[1.2]" style={{ color: 'var(--text-on-light)' }}>
                {card.headline}
              </h3>
              <p className="font-body text-[0.9375rem] mt-4 leading-[1.75]" style={{ color: 'var(--text-on-light-muted)' }}>
                {card.copy}
              </p>
              <button
                onClick={card.id === 2 ? onCVClick : onContactClick}
                className="mt-6 inline-flex items-center gap-2 font-body font-600 text-[0.875rem] bg-transparent border-none cursor-pointer p-0 transition-all duration-300 group-hover:gap-3"
                style={{ color: 'var(--orange-core)' }}
              >
                {card.cta} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
