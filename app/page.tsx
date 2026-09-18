'use client';

import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/loading/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/nav/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import ConfiguratorSection from '@/components/configurator/ConfiguratorSection';
import ServicesSection from '@/components/services/ServicesSection';
import BeforeAfterSection from '@/components/detailing/BeforeAfterSection';
import BuildsGallery from '@/components/builds/BuildsGallery';
import DetailingLab from '@/components/detailing/DetailingLab';
import ProcessSection from '@/components/process/ProcessSection';
import GarageExperience from '@/components/garage/GarageExperience';
import ReviewsCarousel from '@/components/reviews/ReviewsCarousel';
import TrustSection from '@/components/stats/TrustSection';
import SocialFeed from '@/components/social/SocialFeed';
import BookingSection from '@/components/booking/BookingSection';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import Footer from '@/components/footer/Footer';
import { soundEngine } from '@/lib/audio';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'showroom'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(() =>
    typeof window !== 'undefined' ? soundEngine.getIsEnabled() : false
  );

  // Cross-component communication for booking
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledSpec, setPrefilledSpec] = useState<string>('');

  useEffect(() => {
    // Scroll spy for navigation
    const handleScroll = () => {
      const sections = [
        'hero',
        'builds',
        'configurator',
        'services',
        'detailing',
        'detailing-lab',
        'process',
        'garage',
        'reviews',
        'contact',
      ];

      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const enabled = soundEngine.toggleSound();
    setSoundEnabled(enabled);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'showroom' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    setPrefilledService(serviceName);
    scrollToSection('contact');
  };

  const handleBuildMySpec = (specSummary: string) => {
    setPrefilledSpec(specSummary);
    setPrefilledService('Full Build');
    scrollToSection('contact');
  };

  return (
    <main className={`relative w-full min-h-screen ${theme === 'showroom' ? 'bg-[#141414]' : 'bg-[#080808]'} text-[#F5F5F5] selection:bg-[#C9A66B] selection:text-black`}>
      {/* Precision Automotive Custom Cursor */}
      <CustomCursor />

      {/* Initial Ignition Loading Sequence */}
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {/* Persistent Floating Studio Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero Section: Vehicle Reveal & Parallax */}
      <HeroSection
        onStartBuild={() => scrollToSection('configurator')}
        onExploreWork={() => scrollToSection('builds')}
        onScrollToGarage={() => scrollToSection('builds')}
      />

      {/* Section: The Archive / Builds Gallery (Large Editorial Cards + Fullscreen Modal) */}
      <BuildsGallery
        onInquireBuild={(vehicleName) => {
          setPrefilledService(`Replicate ${vehicleName} Program`);
          scrollToSection('contact');
        }}
      />

      {/* Section: Interactive 3D Car Configurator ("YOUR CAR. YOUR SPEC.") */}
      <ConfiguratorSection onBuildMySpec={handleBuildMySpec} />

      {/* Section: Surgical Engineering & Detailing Services */}
      <ServicesSection onSelectService={handleSelectServiceFromCard} />

      {/* Section: Before / After Draggable Detailing Comparison */}
      <BeforeAfterSection />

      {/* Section: Detailing Lab (3D Hotspots & Zoom Cameras) */}
      <DetailingLab onBookDetailing={(spotName) => {
        setPrefilledService(`Detailing: ${spotName}`);
        scrollToSection('contact');
      }} />

      {/* Section: Horizontal Timeline ("FROM IDEA TO MACHINE") */}
      <ProcessSection />

      {/* Section: Virtual Garage & Workshop Experience */}
      <GarageExperience />

      {/* Section: Real Client Reviews Carousel */}
      <ReviewsCarousel />

      {/* Section: Animated Numbers & Trust Telemetry */}
      <TrustSection />

      {/* Section: Instagram Workshop Feed */}
      <SocialFeed />

      {/* Section: Booking & Consultation Dossier Form */}
      <BookingSection
        prefilledService={prefilledService}
        prefilledSpec={prefilledSpec}
      />

      {/* Fixed Floating WhatsApp Direct Concierge */}
      <FloatingWhatsApp />

      {/* Comprehensive Studio Footer */}
      <Footer
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </main>
  );
}
