import React from 'react';
import ImpactHero from '../components/impact/ImpactHero';
import ImpactStatsStrip from '../components/impact/ImpactStatsStrip';
import ImpactStrategicPillars from '../components/impact/ImpactStrategicPillars';
import ImpactWhereWeWorkAndStories from '../components/impact/ImpactWhereWeWorkAndStories';
import ImpactReportsAndSDGs from '../components/impact/ImpactReportsAndSDGs';
import ImpactMeasurementApproach from '../components/impact/ImpactMeasurementApproach';
import ImpactCallToActionBanner from '../components/impact/ImpactCallToActionBanner';

const ImpactPage = ({ onOpenDonate }) => {
  return (
    <div className="w-full bg-white space-y-6 sm:space-y-8 animate-fade-in pb-0">
      {/* 1. Impact Hero Banner */}
      <ImpactHero />

      {/* 2. Impact Stats & Commitments Strip (At a Glance) */}
      <div id="verified-impact">
        <ImpactStatsStrip />
      </div>

      {/* 3. Impact by Strategic Pillar Section */}
      <ImpactStrategicPillars />

      {/* 4. Where We Work & Stories of Impact */}
      <ImpactWhereWeWorkAndStories />

      {/* 5. Reports & Publications + Alignment with Global Goals */}
      <div id="download-reports">
        <ImpactReportsAndSDGs />
      </div>

      {/* 6 & 7. Our Approach to Measurement & Call to Action Banner */}
      <div className="space-y-3 sm:space-y-4">
        <ImpactMeasurementApproach />
        <ImpactCallToActionBanner onOpenDonate={onOpenDonate} />
      </div>
    </div>
  );
};

export default ImpactPage;
