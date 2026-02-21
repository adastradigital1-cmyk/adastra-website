import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/mock';
import { Search, Users, Settings, Clock, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';

const iconMap = { Search, Users, Settings, Clock, BarChart3, TrendingUp };
const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

export const ServicesSection = () => (
  <section
    className="relative py-32 lg:py-40 overflow-hidden"
    style={{ backgroundColor: 'var(--white-warm)' }}
    data-testid="services-section"
  >
    {/* Gradient background for glassmorphism effect */}
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }}
      />
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-35"
        style={{ background: 'linear-gradient(135deg, #E8601C 0%, #F07A3A 100%)' }}
      />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mb-20">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp} transition={{ duration: 0.8, ease }}
        >
          <div className="accent-line mb-6" />
          <span className="section-label">02 — Services</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>
            Comprehensive Talent Solutions
          </h2>
        </motion.div>
        <motion.div
          className="flex items-end"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp} transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <p className="font-body text-[1rem] leading-[1.75] max-w-[60ch]" style={{ color: 'var(--text-on-light-muted)' }}>
            From C-suite search to workforce outsourcing — proprietary tools, deep domain expertise, and 150+ years of combined leadership experience.
          </p>
        </motion.div>
      </div>

      {/* Cards — staggered */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.08 }}
      >
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.title}
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="glass-card-light group cursor-pointer p-6"
              data-testid={`service-card-${i}`}
            >
              <span className="font-mono text-[0.6875rem]" style={{ color: 'var(--text-on-light-muted)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--orange-ghost)' }}>
                  <Icon size={18} style={{ color: 'var(--orange-core)' }} />
                </div>
                <div>
                  <h3 className="font-display text-[1.125rem] font-600 leading-tight" style={{ color: 'var(--text-on-light)' }}>
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <span className="font-mono text-[0.625rem]" style={{ color: 'var(--orange-core)', letterSpacing: '0.1em' }}>
                      {service.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <p className="font-body text-[0.875rem] mt-4 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>
                {service.description}
              </p>
              <Link to="/solutions" className="mt-5 inline-flex items-center gap-1.5 font-body font-600 text-[0.8125rem] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 no-underline" style={{ color: 'var(--orange-core)' }}>
                Learn More <ArrowRight size={13} />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);
