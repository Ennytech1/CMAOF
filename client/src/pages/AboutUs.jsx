import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import AboutFounderSection from '../components/about/AboutFounderSection';
import AboutPillarsGrid from '../components/about/AboutPillarsGrid';
import AboutTimelineSection from '../components/about/AboutTimelineSection';
import AboutGovernanceLeadership from '../components/about/AboutGovernanceLeadership';
import AboutCommitmentBanner from '../components/about/AboutCommitmentBanner';
import OurPartners from '../components/OurPartners';

const AboutUs = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="w-full bg-white font-sans animate-fade-in">

      {/* 1. Hero Banner Section */}
      <AboutHero onWatchStory={() => setVideoModalOpen(true)} />

      {/* 2. Our Founder Section */}
      <AboutFounderSection onReadStory={() => setVideoModalOpen(true)} />

      {/* 3. Purpose, Vision, Mission & Values 4-Card Grid */}
      <AboutPillarsGrid />

      {/* 4. Timeline Journey Section */}
      <AboutTimelineSection />

      {/* 5. Governance, Leadership & Geographic Focus Section */}
      <AboutGovernanceLeadership />

      {/* 6. Commitment CTA Banner Strip */}
      <AboutCommitmentBanner />


      {/* Video Documentary Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 z-10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full flex items-center justify-center bg-slate-900 text-white p-8 text-center">
              <div className="space-y-3">
                <Play size={48} className="mx-auto text-amber-400" />
                <h3 className="text-xl font-bold">Watch Our Story - CMAOF Documentary</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  A documentary detailing Chief Michael Ade.Ojo’s legacy and the CMAOF institutional vision for Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AboutUs;
