import React from 'react';
import OurWorkHero from '../components/our-work/OurWorkHero';
import OurWorkStrategicPillars from '../components/our-work/OurWorkStrategicPillars';
import OurWorkApproachAndCTA from '../components/our-work/OurWorkApproachAndCTA';

const OurWork = ({ onOpenDonate }) => {
  return (
    <div className="w-full bg-white animate-fade-in pb-0">
      {/* 1. Official Hero Section */}
      <OurWorkHero />

      {/* 2. Detailed Three Strategic Pillars Section */}
      <OurWorkStrategicPillars />

      {/* 3. Our Approach (Connected for Greater Impact) + Call to Action Banner */}
      <OurWorkApproachAndCTA onOpenDonate={onOpenDonate} />
    </div>
  );
};

export default OurWork;
