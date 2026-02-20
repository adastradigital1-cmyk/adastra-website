import React, { useState, useEffect, useCallback } from 'react';
import { awards, mediaLogos, testimonials } from '../data/mock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TrustSection = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <section
      className="py-28"
      style={{ backgroundColor: '#F4F4F4' }}
      ref={ref}
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
        {/* Awards Section */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F26522] mb-3 block"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Awards & Recognition
          </span>
          <h2
            className="text-[36px] lg:text-[42px] font-bold tracking-tight mb-4"
            style={{ color: '#111111', fontFamily: 'Poppins, sans-serif' }}
          >
            Recognised Excellence in
            <br className="hidden sm:block" />
            Talent & Workforce Strategy
          </h2>
          <div className="w-10 h-[3px] bg-[#F26522] mx-auto rounded-full mb-14" />
        </div>

        {/* Awards Grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {awards.map((award, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-white border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-400"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Award size={20} className="text-[#F26522] mb-3" />
              <p
                className="text-[13px] text-[#666] leading-[1.7]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="font-bold text-[#2B2B2B]">{award.highlight}</span>
                {' — '}
                {award.text}
              </p>
            </div>
          ))}
        </div>

        {/* Media Logos */}
        <div
          className={`flex flex-wrap items-center justify-center gap-10 lg:gap-16 mb-20 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {mediaLogos.map((logo, index) => (
            <div
              key={logo}
              className="group cursor-pointer transition-all duration-300 py-3"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span
                className="text-[18px] lg:text-[20px] font-bold text-[#D0D0D0] group-hover:text-[#F26522] transition-colors duration-400 tracking-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          className={`transition-all duration-1000 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-10">
            <span
              className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F26522] block"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Client Testimonials
            </span>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Testimonial Card */}
            <div className="bg-white rounded-lg p-10 lg:p-12 shadow-sm border border-gray-100 text-center min-h-[260px] flex flex-col justify-center">
              <div className="flex items-center justify-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F26522" className="text-[#F26522]" />
                ))}
              </div>

              <blockquote
                className="text-[15px] lg:text-[16px] italic text-[#555] leading-[1.8] mb-7"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              <div>
                <p
                  className="text-[15px] font-bold"
                  style={{ color: '#2B2B2B', fontFamily: 'Poppins, sans-serif' }}
                >
                  {testimonials[activeTestimonial].name}
                </p>
                <p
                  className="text-[12px] text-[#999] mt-0.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#999] hover:text-[#F26522] hover:border-[#F26522]/30 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-[#F26522] w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#999] hover:text-[#F26522] hover:border-[#F26522]/30 transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
