import React from 'react';
import Hero from '../components/Hero';
import FounderIntro from '../components/FounderIntro';
import OurPartners from '../components/OurPartners';
import StrategicPillars from '../components/StrategicPillars';
import ImpactStats from '../components/ImpactStats';
import BeneficiaryStories from '../components/BeneficiaryStories';
import HomeEventsPreview from '../components/events/HomeEventsPreview';
import CallToActionBanner from '../components/CallToActionBanner';

const Home = ({ onOpenDonate }) => {
  return (
    <main className="animate-fade-in">
      {/* 1. Hero Section */}
      <Hero onOpenDonate={onOpenDonate} />

      {/* 2. Founder & Legacy Introduction */}
      <FounderIntro />

      {/* 3. Three Strategic Pillars (Education, Health, Community Resilience) */}
      <StrategicPillars />

      {/* 4. Real People. Real Change. (Impact Stats) */}
      <ImpactStats />

      {/* 5. Stories of Change & Latest News */}
      <BeneficiaryStories />

      {/* 6. Upcoming Field Missions & Assemblies */}
      <HomeEventsPreview />

      {/* 7. Our Institutional Partners (Stronger Together) */}
      <OurPartners />

      {/* 8. Be Part of a Brighter Tomorrow CTA Banner */}
      <CallToActionBanner onOpenDonate={onOpenDonate} />
    </main>
  );
};

export default Home;
