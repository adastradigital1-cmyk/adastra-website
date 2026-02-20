import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ForYouSection } from '../components/ForYouSection';
import { ServicesSection } from '../components/ServicesSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { DifferentiationSection } from '../components/DifferentiationSection';
import { TrustSection } from '../components/TrustSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { CVModal } from '../components/CVModal';
import { ConsultationModal } from '../components/ConsultationModal';

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }}>
      <Navbar onContactClick={() => setContactOpen(true)} />
      <HeroSection
        onFindTalent={() => setContactOpen(true)}
        onExploreCareers={() => setCvOpen(true)}
      />
      <ForYouSection
        onContactClick={() => setContactOpen(true)}
        onCVClick={() => setCvOpen(true)}
      />
      <DifferentiationSection />
      <ServicesSection />
      <IndustriesSection />
      <TrustSection />
      <CTASection
        onConsultation={() => setConsultationOpen(true)}
        onSubmitCV={() => setCvOpen(true)}
      />
      <Footer />

      {/* Modals */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
