import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const ImpactCallToActionBanner = ({ onOpenDonate }) => {
  return (
    <section className="w-full bg-gradient-to-r from-[#241007] via-[#3D1E10] to-[#5B2E19] text-white font-sans relative overflow-hidden border-t-4 border-[#FCCD37]">
      {/* Left Photo of Smiling Schoolgirl with smooth blend gradient */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[42%] overflow-hidden pointer-events-none">
        <img
          src="/images/banner_schoolgirl.jpg"
          alt="CMAOF Community Beneficiary"
          className="w-full h-full object-cover object-[24%_25%]"
        />
        {/* Smooth gradient overlay blending photo directly into rich dark brown */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(36,16,7,0.05) 0%, rgba(36,16,7,0.4) 30%, rgba(36,16,7,0.85) 65%, #241007 92%)',
          }}
        />
      </div>

      {/* Dark overlay for mobile clarity */}
      <div className="absolute inset-0 bg-[#241007]/90 sm:bg-transparent pointer-events-none" />

      {/* ── Banner Content Row inside max-w-7xl ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 min-h-[175px] sm:min-h-[190px] flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Title & Description with Yellow Vertical Accent Bar */}
          <div className="flex items-start gap-3 sm:gap-3.5 max-w-xl sm:ml-[26%] lg:ml-[24%] xl:ml-[22%]">
            {/* Yellow Vertical Bar */}
            <div className="w-[3.5px] h-12 sm:h-14 bg-[#FCCD37] shrink-0 mt-0.5" />
            
            <div className="space-y-1">
              {/* Category Eyebrow */}
              <span className="block text-xs sm:text-[12px] font-extrabold uppercase tracking-wider text-[#FCCD37] drop-shadow-xs">
                BE PART OF THE IMPACT
              </span>
              
              {/* Headline */}
              <h2 className="text-xl sm:text-2xl lg:text-[27px] font-black text-white tracking-tight leading-tight drop-shadow-xs">
                Your Support Creates Brighter Futures.
              </h2>
              
              {/* Paragraph */}
              <p className="text-stone-200 text-xs sm:text-[13px] font-medium leading-relaxed max-w-md pt-0.5 drop-shadow-xs">
                Join us in expanding opportunities, improving lives and strengthening communities across Nigeria.
              </p>
            </div>
          </div>

          {/* Action Buttons: Solid Sun Yellow Donate Now + Outline Partner With Us */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-auto ml-4 sm:ml-[26%] lg:ml-0">
            {/* Primary CTA: Donate Now */}
            <Link
              to="/donate"
              className="btn-cmao-primary font-black text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Heart size={16} className="fill-[#5B2E19] stroke-none" />
              <span>Donate Now</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>

            {/* Secondary CTA: Partner With Us */}
            <Link
              to="/get-involved"
              className="border-2 border-[#FCCD37] hover:bg-[#FCCD37]/15 text-[#FCCD37] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactCallToActionBanner;
