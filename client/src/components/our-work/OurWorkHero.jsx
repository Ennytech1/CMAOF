import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';

// ── Custom SVG Icons for the Lower-Right List ──
const SproutIcon = () => (
  <svg className="w-4 h-4 text-[#10B981] shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22v-8c0-3.3-2.7-6-6-6H3v3c0 3.3 2.7 6 6 6h3v5h0z" />
    <path d="M12 14c0-4.4 3.6-8 8-8h1v2c0 4.4-3.6 8-8 8h-1z" opacity="0.85" />
  </svg>
);

const GroupUsersIcon = () => (
  <svg className="w-4 h-4 text-[#0F4C3A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4 text-[#EF4444] fill-[#EF4444] shrink-0" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BarChartIcon = () => (
  <svg className="w-4 h-4 text-[#0F4C3A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="14" width="3.5" height="7" rx="1" />
    <rect x="10.5" y="9" width="3.5" height="12" rx="1" />
    <rect x="17" y="4" width="3.5" height="17" rx="1" />
  </svg>
);

const OurWorkHero = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '440px' }}>
      
      {/* ── Full-bleed background image matching Hero.jsx & AboutHero.jsx ── */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
        style={{ backgroundImage: `url('/images/our_work_hero_girl.jpg')` }}
        aria-hidden="true"
      />

      {/* ── Exact Linear Gradient Overlay matching reference screenshot ── */}
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

      {/* ── Content wrapper with reduced, balanced padding ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[80px] sm:pt-[90px] lg:pt-[98px] pb-8 sm:pb-10 lg:pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN: Eyebrow, Stacked Headline, Description, CTAs (Span 7)
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 max-w-xl">
            
            {/* Tag / Eyebrow with Solid Orange Vertical Accent Bar */}
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-4 bg-[#EA580C] shrink-0 rounded-xs" />
              <span className="text-xs sm:text-[12.5px] font-black uppercase tracking-wider text-[#0F4C3A]">
                OUR WORK
              </span>
            </div>

            {/* High-Contrast Stacked Headline (Creating Pathways to Better Futures) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-[1.06] tracking-tight">
              <span className="block text-[#0F4C3A]">Creating</span>
              <span className="block text-[#0F4C3A]">Pathways to</span>
              <span className="block text-[#0F2B5B]">Better Futures</span>
            </h1>

            {/* Body Description */}
            <p className="text-slate-700 text-xs sm:text-[13.5px] leading-relaxed max-w-lg font-normal pt-0.5">
              At CMAOF, we work across three interconnected areas to expand opportunities,
              improve lives and strengthen communities. Our programmes are designed to address
              real needs, create lasting impact and build a more inclusive, resilient and prosperous Nigeria.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary Action Button: Explore Our Programmes */}
              <Link
                to="/our-work#our-work-pillars"
                className="bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#c2410c] hover:to-[#ea580c] text-white font-extrabold text-xs sm:text-[13px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Explore Our Programmes</span>
                <ArrowRight size={15} strokeWidth={2.4} />
              </Link>

              {/* Secondary Action Button: Watch Our Story */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="border-[1.5px] border-[#0F4C3A] hover:bg-[#0F4C3A]/5 text-[#0F4C3A] font-extrabold text-xs sm:text-[13px] px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer bg-white/70 backdrop-blur-xs"
              >
                {/* Circle Play Icon */}
                <div className="w-4.5 h-4.5 rounded-full bg-[#0F4C3A] flex items-center justify-center text-white shrink-0">
                  <Play size={9} className="fill-white ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN OVERLAYS: Brushstroke Quote + Micro-Badges List (Span 5)
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex flex-col justify-between items-end min-h-[280px] lg:min-h-[350px] pointer-events-none">
            
            {/* ── TOP RIGHT: Textured White Brushstroke Quote Badge ── */}
            <div className="self-end mr-0 sm:mr-2 lg:mr-0 mt-0 pointer-events-auto">
              <div className="relative group select-none">
                
                {/* Authentic Artistic Brushstroke SVG Shape Background */}
                <div className="relative filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.10)]">
                  {/* Brushstroke Container */}
                  <div
                    className="bg-white/95 backdrop-blur-xs px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl relative overflow-hidden"
                    style={{
                      clipPath:
                        'polygon(2% 4%, 96% 1%, 100% 92%, 97% 98%, 4% 97%, 0% 88%)',
                    }}
                  >
                    {/* Handwritten Styled Quote */}
                    <div className="font-['Caveat',cursive] font-bold text-[#0F2B5B] text-xl sm:text-[23px] leading-[1.08] tracking-tight">
                      <p>“Stronger</p>
                      <p className="pl-2.5">People.</p>
                      <p className="pl-3.5">Brighter</p>
                      <p className="pl-4">Communities.”</p>
                    </div>

                    {/* Artistic Orange Brush Sweep Underline */}
                    <svg
                      className="w-28 sm:w-32 h-3.5 mt-1 ml-3"
                      viewBox="0 0 140 16"
                      fill="none"
                    >
                      <path
                        d="M3 10 C 35 3, 75 14, 137 6"
                        stroke="#EA580C"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* ── LOWER RIGHT: 4 Vertical Badges List ── */}
            <div className="self-end mr-2 sm:mr-3 mb-1 pointer-events-auto">
              <div className="bg-white/90 sm:bg-white/80 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-white/80 shadow-sm space-y-2">
                
                {/* 1. Sprout: People Empowered */}
                <div className="flex items-center gap-2">
                  <SproutIcon />
                  <span className="text-slate-700 text-[11px] sm:text-xs font-semibold leading-none">
                    People Empowered
                  </span>
                </div>

                {/* 2. Group Users: Healthier Communities */}
                <div className="flex items-center gap-2">
                  <GroupUsersIcon />
                  <span className="text-slate-700 text-[11px] sm:text-xs font-semibold leading-none">
                    Healthier Communities
                  </span>
                </div>

                {/* 3. Red Heart: Inclusive Opportunities */}
                <div className="flex items-center gap-2">
                  <HeartIcon />
                  <span className="text-slate-700 text-[11px] sm:text-xs font-semibold leading-none">
                    Inclusive Opportunities
                  </span>
                </div>

                {/* 4. Bar Chart: A Brighter Tomorrow */}
                <div className="flex items-center gap-2">
                  <BarChartIcon />
                  <span className="text-slate-700 text-[11px] sm:text-xs font-semibold leading-none">
                    A Brighter Tomorrow
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. WATCH OUR STORY VIDEO MODAL (Interactive Enhancement)
          ───────────────────────────────────────────────────────────── */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full flex items-center justify-center text-white bg-slate-900">
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EA580C] text-white flex items-center justify-center mx-auto shadow-lg">
                  <Play size={28} className="fill-white ml-1" />
                </div>
                <h3 className="text-lg font-bold text-white">Chief Michael Ade.Ojo Foundation Story</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Watch how our programmes empower individuals, build resilience, and create lasting generational change across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default OurWorkHero;
