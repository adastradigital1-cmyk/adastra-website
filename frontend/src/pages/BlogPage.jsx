import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { ConsultationModal } from '../components/ConsultationModal';
import { ParticleField } from '../components/ParticleField';
import { ArrowRight, Clock, Tag, ChevronRight, ChevronDown } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const blogPosts = [
  {
    id: 'skills-first-hiring',
    title: 'The Rise of Skills-First Hiring in 2026: Redefining How Organisations Evaluate Talent',
    category: 'Market Trends',
    audience: 'For Employers',
    readTime: '6 min read',
    excerpt: 'The global talent landscape in 2026 is undergoing a structural shift. Employers are increasingly prioritising demonstrable skills over formal qualifications.',
    sections: [
      {
        heading: 'Why Skills-First Hiring Is Accelerating',
        items: [
          { subtitle: 'Rapid Technological Evolution', text: 'Technology cycles are shrinking. Skills in AI engineering, cloud infrastructure, data science, and cybersecurity evolve faster than traditional degree programs can adapt. Employers cannot rely solely on academic credentials that may reflect outdated knowledge.' },
          { subtitle: 'Expanding Access to Talent', text: 'Remote work and global hiring models have broadened candidate pools. Companies are sourcing talent from emerging markets, career transition professionals, and self-taught specialists who demonstrate strong applied competencies.' },
          { subtitle: 'Workforce Diversity Objectives', text: 'Skills-based evaluation reduces reliance on pedigree-driven filtering, which can unintentionally exclude capable candidates. This approach strengthens diversity across socio-economic, educational, and geographic backgrounds.' },
          { subtitle: 'Performance-Based Evaluation', text: 'Hiring outcomes increasingly correlate with competency assessment rather than academic history. Structured skill validation improves job-role alignment.' },
        ],
      },
      {
        heading: 'What Skills-First Hiring Looks Like in Practice',
        text: 'Organisations implementing this model typically introduce:',
        bullets: ['Structured technical assessments', 'Scenario-based problem-solving exercises', 'Behavioural competency mapping', 'Portfolio reviews', 'Short-term paid project evaluations', 'Micro-credential validation'],
        footer: 'This approach moves evaluation closer to real-world performance.',
      },
      {
        heading: 'Risks and Implementation Challenges',
        text: 'Skills-first hiring requires:',
        bullets: ['Clear competency frameworks', 'Interviewer training', 'Balanced evaluation metrics', 'Integration with long-term workforce planning'],
        footer: 'Without structure, organisations risk replacing one flawed filter with another inconsistent process.',
      },
      {
        heading: 'Impact on Candidates',
        text: 'Professionals are responding by:',
        bullets: ['Building demonstrable portfolios', 'Earning industry-recognised certifications', 'Participating in hackathons and practical assessments', 'Upskilling through online platforms'],
        footer: 'The future workforce will increasingly be defined by adaptability and demonstrable capability.',
      },
    ],
    conclusion: 'Skills-first hiring is not a trend. It is a structural correction to outdated evaluation models. Organisations that implement it strategically will gain faster access to future-ready talent.',
  },
  {
    id: 'executive-hiring',
    title: 'Executive Hiring in Uncertain Markets: What Boards and Investors Expect in 2026',
    category: 'Leadership & CXO Hiring',
    audience: '',
    readTime: '5 min read',
    excerpt: 'Executive hiring has grown significantly more complex. Boards are seeking leaders who can navigate volatility, digital transformation, and regulatory scrutiny simultaneously.',
    sections: [
      {
        heading: 'The Modern Executive Mandate',
        items: [
          { subtitle: 'Transformation Leadership', text: 'Executives must lead innovation while preserving operational stability. Digital transformation is no longer delegated to CTOs alone — it is a CEO and board-level priority.' },
          { subtitle: 'Strategic Agility', text: 'Markets are influenced by geopolitical shifts, AI disruption, and supply chain instability. Leaders must demonstrate adaptability under uncertainty.' },
          { subtitle: 'Data Fluency', text: 'Modern executives are expected to interpret data dashboards, understand technology investment implications, and support digital business models.' },
          { subtitle: 'Stakeholder Confidence', text: 'Transparent communication with investors, employees, regulators, and customers has become critical.' },
        ],
      },
      {
        heading: 'Why Executive Search Requires Structured Methodology',
        text: 'Confidential leadership mandates require:',
        bullets: ['Deep talent mapping', 'Cross-industry benchmarking', 'Discretion in approach', 'Succession planning alignment', 'Culture compatibility assessment'],
        footer: 'Boards are increasingly evaluating candidates not only on past achievements but also on leadership adaptability indicators.',
      },
      {
        heading: 'Common Mistakes in Executive Hiring',
        bullets: ['Overemphasis on brand pedigree', 'Insufficient cultural alignment assessment', 'Rushed closures due to urgency', 'Underestimating transition support'],
      },
    ],
    conclusion: 'Executive hiring decisions shape organisational trajectory for years. Structured search processes backed by market intelligence and leadership mapping reduce long-term risk.',
  },
  {
    id: 'rpo-2026',
    title: 'RPO in 2026: From Cost Efficiency to Strategic Hiring Infrastructure',
    category: 'Workforce & RPO',
    audience: '',
    readTime: '5 min read',
    excerpt: 'Recruitment Process Outsourcing has evolved beyond cost control. In 2026, RPO is increasingly viewed as strategic hiring infrastructure for high-growth organisations.',
    sections: [
      {
        heading: 'Why Organisations Adopt RPO',
        items: [
          { subtitle: 'Sustained Hiring Demand', text: 'Scaling across geographies requires embedded recruitment systems.' },
          { subtitle: 'Process Standardisation', text: 'Inconsistent interview frameworks lead to variable quality-of-hire.' },
          { subtitle: 'Data Visibility', text: 'Leadership requires real-time hiring dashboards for workforce planning.' },
          { subtitle: 'Employer Branding Alignment', text: 'RPO partners often integrate branding, communication, and candidate experience.' },
        ],
      },
      {
        heading: 'What Modern RPO Models Include',
        bullets: ['Dedicated embedded recruiters', 'Centralised sourcing hubs', 'Talent analytics dashboards', 'Interview calibration processes', 'Workforce demand forecasting'],
      },
      {
        heading: 'Measurable Outcomes Observed',
        bullets: ['30-40% reduction in time-to-hire', 'Lower cost-per-hire', 'Improved candidate satisfaction scores', 'Higher offer-to-join ratios'],
      },
      {
        heading: 'When RPO Is Not Suitable',
        text: 'RPO may not be appropriate for:',
        bullets: ['Short-term sporadic hiring', 'Organisations without process maturity', 'Companies lacking leadership alignment'],
      },
    ],
    conclusion: 'RPO has become a strategic tool for organisations seeking scalable, transparent, and data-driven hiring frameworks.',
  },
  {
    id: 'contract-staffing',
    title: 'Workforce Agility in 2026: Why Contract Staffing Is Now a Competitive Strategy',
    category: 'Industry Insights',
    audience: 'For Employers',
    readTime: '4 min read',
    excerpt: 'Contract staffing has transitioned from a reactive workforce measure to a proactive business strategy driving operational agility.',
    sections: [
      {
        heading: 'Why Workforce Models Are Changing',
        bullets: ['Digital transformation projects', 'AI integration initiatives', 'Market unpredictability', 'Cost structure optimisation'],
      },
      {
        heading: 'Advantages of Contract Staffing',
        items: [
          { subtitle: 'Operational Agility', text: 'Rapid deployment of project-specific talent.' },
          { subtitle: 'Access to Niche Expertise', text: 'Specialised professionals engaged for defined timelines.' },
          { subtitle: 'Financial Flexibility', text: 'Optimised fixed-to-variable cost ratios.' },
          { subtitle: 'Risk Mitigation', text: 'Reduced long-term liability exposure.' },
        ],
      },
      {
        heading: 'Key Risk Considerations',
        text: 'Organisations must ensure:',
        bullets: ['Compliance adherence', 'Clear performance metrics', 'Structured onboarding', 'Integration with permanent workforce'],
      },
      {
        heading: 'Future Outlook',
        text: 'Hybrid workforce models combining permanent leadership with flexible specialist layers will define high-performing organisations.',
      },
    ],
    conclusion: 'Contract staffing is no longer merely temporary hiring. It is an essential component of modern workforce architecture.',
  },
];

const categories = ['All', 'Market Trends', 'Leadership & CXO Hiring', 'Workforce & RPO', 'Industry Insights'];

const WordReveal = ({ text, className, style, startDelay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.3em]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: startDelay + i * 0.06, ease }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ─── ARTICLE DETAIL VIEW ─── */
const ArticleView = ({ post, onBack }) => (
  <article className="max-w-[800px] mx-auto" data-testid={`article-${post.id}`}>
    <motion.button
      onClick={onBack}
      className="flex items-center gap-2 font-body text-[0.875rem] font-500 mb-10 transition-colors duration-200"
      style={{ color: 'var(--orange-core)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-testid="article-back-btn"
    >
      <ChevronRight size={14} className="rotate-180" /> Back to Insights
    </motion.button>

    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="px-3 py-1 rounded-full font-mono text-[0.625rem]" style={{ backgroundColor: 'rgba(232, 96, 28, 0.1)', color: 'var(--orange-core)', border: '1px solid rgba(232, 96, 28, 0.2)' }}>
          {post.category}
        </span>
        {post.audience && (
          <span className="px-3 py-1 rounded-full font-mono text-[0.625rem]" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-on-dark-muted)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {post.audience}
          </span>
        )}
        <span className="flex items-center gap-1 font-mono text-[0.625rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
          <Clock size={10} /> {post.readTime}
        </span>
      </div>

      <h1 className="font-display text-[2rem] lg:text-[2.75rem] font-700 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
        {post.title}
      </h1>

      <p className="font-body text-[1.0625rem] mt-6 leading-[1.8]" style={{ color: 'var(--text-on-dark-muted)' }}>
        {post.excerpt}
      </p>

      <div className="mt-10 space-y-10">
        {post.sections.map((section, si) => (
          <div key={si}>
            <h2 className="font-display text-[1.5rem] font-600 mb-4" style={{ color: 'var(--text-on-dark)' }}>
              {section.heading}
            </h2>

            {section.text && (
              <p className="font-body text-[0.9375rem] leading-[1.8] mb-4" style={{ color: 'var(--text-on-dark-muted)' }}>
                {section.text}
              </p>
            )}

            {section.items && (
              <div className="space-y-5">
                {section.items.map((item, ii) => (
                  <div key={ii} className="glass-card-dark p-5" data-testid={`section-${si}-item-${ii}`}>
                    <h3 className="font-display text-[1rem] font-600" style={{ color: 'var(--text-on-dark)' }}>
                      <span className="font-mono text-[0.625rem] mr-2" style={{ color: 'var(--orange-core)' }}>{ii + 1}.</span>
                      {item.subtitle}
                    </h3>
                    <p className="font-body text-[0.875rem] mt-2 leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.bullets && (
              <ul className="space-y-2 mt-3">
                {section.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 font-body text-[0.875rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
                    <ChevronRight size={12} className="mt-1 flex-shrink-0" style={{ color: 'var(--orange-core)' }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {section.footer && (
              <p className="font-body text-[0.9375rem] mt-4 leading-[1.8] font-500" style={{ color: 'var(--text-on-dark)' }}>
                {section.footer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 className="font-display text-[1.5rem] font-600 mb-4" style={{ color: 'var(--text-on-dark)' }}>Conclusion</h2>
        <p className="font-body text-[1rem] leading-[1.85] font-500" style={{ color: 'var(--text-on-dark-muted)' }}>
          {post.conclusion}
        </p>
      </div>
    </motion.div>
  </article>
);

/* ─── BLOG LISTING VIEW ─── */
const BlogListing = ({ posts, activeCategory, setActiveCategory, onReadPost }) => (
  <>
    {/* Category Filter */}
    <motion.div className="flex flex-wrap gap-3 mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, ease }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          data-testid={`blog-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-5 py-2.5 rounded-full font-body text-[0.8125rem] font-500 transition-all duration-300"
          style={
            activeCategory === cat
              ? { backgroundColor: 'var(--orange-core)', color: 'white' }
              : { backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-on-dark-muted)', border: '1px solid rgba(255,255,255,0.08)' }
          }
        >
          {cat}
        </button>
      ))}
    </motion.div>

    {/* Blog Cards */}
    <motion.div className="grid md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.1 }}>
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          variants={fadeUp}
          transition={{ duration: 0.7, ease }}
          className="glass-card-dark p-7 cursor-pointer group"
          onClick={() => onReadPost(post)}
          data-testid={`blog-card-${i}`}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full font-mono text-[0.5625rem]" style={{ backgroundColor: 'rgba(232, 96, 28, 0.1)', color: 'var(--orange-core)', border: '1px solid rgba(232, 96, 28, 0.2)' }}>
              {post.category}
            </span>
            {post.audience && (
              <span className="px-3 py-1 rounded-full font-mono text-[0.5625rem]" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-on-dark-muted)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {post.audience}
              </span>
            )}
          </div>
          <h3 className="font-display text-[1.25rem] lg:text-[1.375rem] font-600 leading-[1.25] transition-colors duration-300" style={{ color: 'var(--text-on-dark)' }}>
            {post.title}
          </h3>
          <p className="font-body text-[0.875rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }}>
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-[0.5625rem]" style={{ color: 'var(--text-on-dark-muted)' }}>
              <Clock size={10} /> {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 font-body font-600 text-[0.8125rem] transition-all duration-300 group-hover:gap-2.5" style={{ color: 'var(--orange-core)' }}>
              Read <ArrowRight size={13} />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </>
);

/* ─── MAIN PAGE ─── */
export default function BlogPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="blog-page">
      <Navbar onContactClick={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="blog-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="noise-overlay absolute inset-0" />
          <ParticleField id="blog-hero-particles" density="light" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-16 z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
            <span className="section-label">Insights & Intelligence</span>
          </motion.div>
          <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
            {activePost
              ? <WordReveal text="Insight" startDelay={0.2} />
              : <WordReveal text="Hiring Intelligence & Market Insights" startDelay={0.2} />
            }
          </h1>
          {!activePost && (
            <motion.p className="font-body text-[1.125rem] mt-6 max-w-[600px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
              Research-backed perspectives on talent strategy, workforce trends, and leadership hiring.
            </motion.p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 relative" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="blog-content">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {activePost ? (
            <ArticleView post={activePost} onBack={() => setActivePost(null)} />
          ) : (
            <BlogListing
              posts={filteredPosts}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onReadPost={setActivePost}
            />
          )}
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
