import React from 'react';
import OurWorkHero from '../components/our-work/OurWorkHero';
import StrategicPillars from '../components/StrategicPillars';

const OurWork = () => {
  return (
    <div className="w-full bg-white space-y-8 animate-fade-in pb-12">
      {/* 1. Official Hero Section replicating image_6.png */}
      <OurWorkHero />

      {/* 2. Three Interconnected Strategic Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StrategicPillars />
      </div>
    </div>
  );
};

export default OurWork;
