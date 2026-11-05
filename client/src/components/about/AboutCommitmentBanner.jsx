import React from 'react';
import { Heart } from 'lucide-react';

const AboutCommitmentBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#241007]">
      {/* Background with children on the left and lush foliage */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-[position:left_center] pointer-events-none"
        style={{ backgroundImage: `url('/images/commitment_banner_bg.jpg')` }}
      />

      {/* Earth Brown Gradient Overlay: keeps children clear on the left, smooth dark brown for text readability on right */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(36,16,7,0.15) 18%, rgba(36,16,7,0.70) 28%, rgba(36,16,7,0.92) 42%, #241007 100%)',
        }}
      />
      {/* Mobile vertical overlay */}
      <div className="absolute inset-0 bg-[#241007]/90 md:hidden pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Middle Text Block - positioned after children */}
          <div className="w-full lg:w-auto flex items-start gap-4 sm:gap-4.5 lg:ml-[25%] xl:ml-[27%] flex-1">
            {/* Brand Sun Yellow Accent Line */}
            <div className="w-[3.5px] h-12 sm:h-14 bg-[#FCCD37] rounded-full shrink-0 mt-0.5 shadow-xs" />

            {/* Eyebrow, Heading, Body */}
            <div>
              <span className="block text-xs font-black text-[#FCCD37] uppercase tracking-wider mb-1 drop-shadow-xs">
                OUR COMMITMENT
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-black text-white tracking-tight leading-tight drop-shadow-xs">
                Stronger People. Brighter Communities.
              </h2>
              <p className="text-[#FAF6EE] font-medium text-xs sm:text-[13px] leading-relaxed max-w-xl mt-1 drop-shadow-xs">
                Join us in creating opportunities, improving lives and strengthening communities across Nigeria.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="w-full lg:w-auto flex items-center gap-3 sm:gap-3.5 shrink-0">
            {/* Primary CTA: Sun Yellow Active Pill */}
            <a
              href="#support-our-work"
              className="btn-cmao-primary px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-black shadow-lg"
            >
              <Heart className="w-4 h-4 fill-[#5B2E19]/30 stroke-[#5B2E19] shrink-0" />
              <span>Support Our Work</span>
              <span className="text-sm font-bold leading-none">→</span>
            </a>

            {/* Secondary CTA: Sun Yellow Outline Pill */}
            <a
              href="#explore-programmes"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-[#FCCD37] text-[#FCCD37] hover:bg-[#FCCD37] hover:text-[#3D1E10] text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer"
            >
              <span>Explore Our Programmes</span>
              <span className="text-sm font-bold leading-none">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutCommitmentBanner;
