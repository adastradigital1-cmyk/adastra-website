import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ForYouSection } from '../components/ForYouSection';
import { ServicesSection } from '../components/ServicesSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { DifferentiationSection } from '../components/DifferentiationSection';
import { TrustSection } from '../components/TrustSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ForYouSection />
      <ServicesSection />
      <IndustriesSection />
      <DifferentiationSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
}
