import React from 'react';
import { Heart } from 'lucide-react';

const AboutCommitmentBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#052e22]">
      {/* Background with children on the left and lush foliage */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-[position:left_center] pointer-events-none"
        style={{ backgroundImage: `url('/images/commitment_banner_bg.jpg')` }}
      />

      {/* Dark Forest Green Gradient Overlay: keeps children clear on the left, dark background for text & buttons */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#052e22]/90 to-[#032118]/95 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Middle Text Block - positioned after children */}
          <div className="w-full lg:w-auto flex items-start gap-4 sm:gap-4.5 lg:ml-[25%] xl:ml-[27%] flex-1">
            {/* Solid Brand Orange Accent Line */}
            <div className="w-[3.5px] h-12 sm:h-14 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />

            {/* Eyebrow, Heading, Body */}
            <div>
              <span className="block text-xs font-bold text-white uppercase tracking-wider mb-1">
                OUR COMMITMENT
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-white tracking-tight leading-tight">
                Stronger People. Brighter Communities.
              </h2>
              <p className="text-white/90 text-xs sm:text-[13px] leading-relaxed max-w-xl mt-1">
                Join us in creating opportunities, improving lives and strengthening communities across Nigeria.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="w-full lg:w-auto flex items-center gap-3 sm:gap-3.5 shrink-0">
            {/* Primary CTA: Solid Orange Pill */}
            <a
              href="#support-our-work"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#EA580C] hover:bg-[#d94e07] text-white text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white text-white shrink-0" />
              <span>Support Our Work</span>
              <span className="text-sm font-bold leading-none">→</span>
            </a>

            {/* Secondary CTA: Outline Pill */}
            <a
              href="#explore-programmes"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/85 hover:bg-white/10 hover:border-white text-white text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer"
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
