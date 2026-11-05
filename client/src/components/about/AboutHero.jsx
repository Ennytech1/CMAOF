import React from 'react';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import founderAboutHero from '../../assets/founder_about_hero.jpg';

const AboutHero = ({ onWatchStory }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
      
      {/* ── Professional Background image featuring Chief Michael Ade.Ojo seamlessly integrated ── */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-[center_top] sm:bg-[right_center] lg:bg-[right_top] pointer-events-none"
        style={{ 
          backgroundImage: `url("${founderAboutHero}")`,
        }}
        aria-hidden="true"
      />

      {/* ── Soft linear gradient overlay smoothly blending text area with the bright executive backdrop ── */}
      <div 
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 36%, rgba(255,255,255,0.92) 50%, rgba(255,255,255,0.30) 64%, transparent 76%)',
        }}
        aria-hidden="true"
      />
      {/* Mobile vertical gradient fallback for maximum readability */}
      <div 
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 65%, rgba(255,255,255,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper with balanced, reduced padding ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[78px] sm:pt-[86px] lg:pt-[94px] pb-8 sm:pb-10 lg:pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ── Left Column: Breadcrumb, Headline, Description, CTAs (col-span-7) ── */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-4">
            
            {/* Top Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#5B2E19]">
              <div className="w-1.5 h-3.5 bg-[#FCCD37] rounded-full shrink-0" />
              <Link to="/" className="hover:text-[#996F00] transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-400" />
              <span className="text-[#5B2E19] font-bold">About Us</span>
            </div>

            {/* Eyebrow + Main Headline (Solid #5B2E19 - No text gradient) */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#FCCD37] rounded-full shrink-0" />
                <span className="text-xs sm:text-[12.5px] font-black uppercase tracking-wider text-[#5B2E19] font-sans">
                  ABOUT US
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-black tracking-tight leading-[1.12] font-sans text-[#5B2E19]">
                <span className="block">A Legacy of</span>
                <span className="block mt-0.5">
                  People and Possibilities
                </span>
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="text-slate-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl font-medium font-sans">
              The Chief Michael Ade.Ojo Foundation (CMAOF) is driven by a deep commitment to people, opportunity and stronger communities. We work to overcome barriers, unlock potential and build better futures for individuals and communities across Nigeria.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#purpose-vision"
                className="btn-cmao-secondary px-6 py-3 text-xs sm:text-sm shadow-md"
              >
                <span>Our Story</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>

              <button
                type="button"
                onClick={onWatchStory}
                className="btn-cmao-primary px-6 py-3 text-xs sm:text-sm shadow-md"
              >
                <div className="w-5 h-5 rounded-full bg-[#5B2E19] text-[#FCCD37] flex items-center justify-center shrink-0">
                  <Play size={10} className="fill-[#FCCD37] translate-x-[0.5px]" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

          </div>

          {/* ── Right Column: Free space allowing the founder portrait to be fully seen ── */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />

        </div>
      </div>
    </section>
  );
};

export default AboutHero;