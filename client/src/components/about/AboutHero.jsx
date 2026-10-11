import React from 'react';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutHero = ({ onWatchStory }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
      
      {/* ── Full-bleed background image featuring Chief Michael Ade.Ojo on the right ── */}
      <div 
        className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
        style={{ backgroundImage: `url('/images/about_hero_bg.jpg')` }}
        aria-hidden="true"
      />

      {/* ── Exact Linear Gradient Overlay matching Home Hero ── */}
      <div 
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.78) 8%, rgba(255,255,255,0.97) 20%, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.75) 48%, rgba(255,255,255,0.25) 58%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      {/* Mobile vertical gradient fallback */}
      <div 
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper with balanced padding matching Home Hero ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ── Left Column: Breadcrumb, Headline & CTAs (col-span-7) ── */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F2B5B]">
              <div className="w-1 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
              <Link to="/" className="hover:text-[#0F4C3A] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-[#0F2B5B]">About Us</span>
            </div>

            {/* Eyebrow + Main Headline */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F2B5B] font-sans">
                  ABOUT US
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-black tracking-tight leading-[1.12] font-sans">
                <span className="block text-[#0F2B5B]">A Legacy of</span>
                <span className="block mt-0.5">
                  <span className="text-[#0F4C3A]">People </span>
                  <span className="text-[#0F2B5B]">and Possibilities</span>
                </span>
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="text-[#1E293B] text-sm sm:text-base leading-relaxed max-w-xl font-medium font-sans">
              The Chief Michael Ade.Ojo Foundation (CMAOF) is driven by a deep commitment to people, opportunity and stronger communities. We work to overcome barriers, unlock potential and build better futures for individuals and communities across Nigeria.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#purpose-vision"
                className="bg-[#0F4C3A] hover:bg-[#14634C] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Our Story</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>

              <button
                onClick={onWatchStory}
                className="border-2 border-[#0F4C3A] bg-white text-[#0F4C3A] hover:bg-[#0F4C3A]/5 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full inline-flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center shrink-0">
                  <Play size={10} className="fill-white translate-x-[0.5px]" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

          </div>

          {/* ── Right Column: Floating Quote Card with Linear Gradient Backdrop (col-span-5) ── */}
          <div className="lg:col-span-5 flex justify-end items-end pt-6 lg:pt-0">
            <div 
              className="rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/80 max-w-xs sm:max-w-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="space-y-3">
                {/* Green Quotation Mark */}
                <span className="text-4xl sm:text-5xl font-serif font-black text-[#0F4C3A] leading-none select-none block">
                  “
                </span>

                <p className="text-slate-700 text-xs sm:text-sm italic font-semibold leading-relaxed">
                  When we empower people and strengthen communities, we build a brighter Nigeria for generations to come."
                </p>

                <div className="pt-2">
                  <span className="font-extrabold text-xs text-[#0F2B5B] uppercase tracking-wider block font-sans">
                    CHIEF MICHAEL ADE.OJO
                  </span>
                  {/* Horizontal Orange Accent Line */}
                  <div className="w-12 h-1 bg-[#EA580C] rounded-full mt-2" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;
