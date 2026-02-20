import React, { useState, useEffect } from 'react';
import { navItems } from '../data/mock';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center no-underline">
            <img
              src="/logo-color.png"
              alt="Ad Astra Consultants"
              className="h-12 w-auto"
              style={{ mixBlendMode: 'multiply' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link-enhanced text-[13px] font-medium text-[#2B2B2B] hover:text-[#F26522] no-underline py-1 tracking-wide transition-colors duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              className="px-7 py-2.5 text-[13px] font-semibold text-white rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0"
              style={{ backgroundColor: '#F26522', fontFamily: 'Inter, sans-serif' }}
              onClick={onContactClick}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[#2B2B2B]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            mobileOpen ? 'max-h-[400px] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-[14px] font-medium text-[#2B2B2B] hover:text-[#F26522] no-underline transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="mt-4 w-full px-6 py-2.5 text-[13px] font-semibold text-white rounded-md"
              style={{ backgroundColor: '#F26522' }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
