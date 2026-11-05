import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactStats = () => {
  return (
    <section className="relative w-full overflow-hidden py-7 sm:py-9 lg:py-11 min-h-[210px] sm:min-h-[230px] lg:min-h-[250px] flex items-center bg-[#1F0E06]">
      {/* ── Panoramic Background Image: Unobstructed, vibrant, and fully visible ── */}
      <div 
        className="absolute inset-0 bg-cover bg-[position:center_45%] bg-no-repeat transition-transform duration-700"
        style={{ backgroundImage: `url('/images/impact_bg.jpg')` }}
        aria-hidden="true"
      />

      {/* ── Cinematic Directional Overlay: ensures sharp text readability on left while leaving panoramic landscape clear on right ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(20, 8, 3, 0.94) 0%, rgba(36, 16, 7, 0.88) 32%, rgba(36, 16, 7, 0.52) 52%, rgba(36, 16, 7, 0.12) 75%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Subtle top & bottom edge shading for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15, 6, 2, 0.35) 0%, transparent 25%, transparent 75%, rgba(15, 6, 2, 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-3 sm:space-y-3.5">
          
          {/* Eyebrow & Title with Official Sun Yellow Accent Bar */}
          <div className="flex items-start gap-3 sm:gap-3.5">
            {/* Sun Yellow Vertical Accent Bar */}
            <div className="w-1.5 h-12 sm:h-14 bg-[#FCCD37] rounded-full shrink-0 mt-0.5 shadow-md shadow-[#FCCD37]/30" />

            <div className="space-y-1">
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-widest text-[#FCCD37] block drop-shadow-sm">
                MEASURABLE OUTCOMES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
                Real People. Real Change.
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#FAF6EE] text-xs sm:text-sm lg:text-[15px] leading-relaxed pl-4.5 sm:pl-5 font-medium max-w-xl drop-shadow-sm">
            Through strategic interventions in healthcare, education, and social protection, we create lasting generational impact across Nigeria.
          </p>

          {/* Call to Action Button */}
          <div className="pt-1 pl-4.5 sm:pl-5">
            <Link
              to="/impact"
              className="btn-cmao-primary px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-black shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View Our Impact</span>
              <ArrowRight size={15} strokeWidth={2.6} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
