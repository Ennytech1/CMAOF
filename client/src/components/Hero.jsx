import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, GraduationCap, HeartPulse, Sprout } from 'lucide-react';

const Hero = ({ onOpenDonate }) => {
  return (
    <section className="relative w-full overflow-hidden min-h-[440px] sm:min-h-[480px]">

      {/* ── Full-bleed background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero_banner_official.jpg')` }}
        aria-hidden="true"
      />

      {/* ── High-Contrast Linear Gradient Overlay: ensures 100% solid, crisp white backing behind all text ── */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 32%, rgba(255,255,255,0.92) 46%, rgba(255,255,255,0.40) 60%, transparent 72%)',
        }}
        aria-hidden="true"
      />
      {/* Mobile vertical gradient fallback */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 65%, rgba(255,255,255,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content wrapper with balanced, reduced padding ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[78px] sm:pt-[86px] lg:pt-[94px] pb-8 sm:pb-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

          {/* ════ LEFT: Text column (6 cols) ════ */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-4.5">

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] text-[#5B2E19]">
              <span className="block text-[#5B2E19]">Stronger People.</span>
              <span className="block mt-1 text-[#5B2E19]">
                Brighter Communities.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md font-medium">
              Creating pathways for people to overcome barriers,
              unlock their potential and build better futures.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Donate Now Button - Vibrant Sun Yellow with Earth Brown Text */}
              <Link
                to="/donate"
                className="btn-cmao-primary px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-black shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <Heart size={16} className="fill-[#5B2E19]/30 stroke-[#5B2E19]" strokeWidth={2.5} />
                <span>Donate Now</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>

              {/* Explore Our Work - Crisp Earth Brown Outline */}
              <a
                href="#our-work"
                className="btn-cmao-outline px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Explore Our Work</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>

            {/* ── 4 Stat Indicators with Official Brand Colors ── */}
            <div className="pt-4 border-t border-slate-200/90 mt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:divide-x divide-slate-200/80">

                {/* 1 – People Empowered (Earth Brown) */}
                <div className="flex items-center gap-2.5 sm:pr-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(91, 46, 25, 0.12)', color: '#5B2E19' }}
                  >
                    <Users size={16} strokeWidth={2.4} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#5B2E19] leading-tight">
                    People<br />Empowered
                  </span>
                </div>

                {/* 2 – Communities Strengthened (CMAO Blue) */}
                <div className="flex items-center gap-2.5 sm:px-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0, 71, 186, 0.12)', color: '#0047BA' }}
                  >
                    <GraduationCap size={16} strokeWidth={2.4} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#5B2E19] leading-tight">
                    Communities<br />Strengthened
                  </span>
                </div>

                {/* 3 – Lives Improved (CMAO Green) */}
                <div className="flex items-center gap-2.5 sm:px-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(51, 140, 38, 0.12)', color: '#338C26' }}
                  >
                    <HeartPulse size={16} strokeWidth={2.4} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#5B2E19] leading-tight">
                    Lives<br />Improved
                  </span>
                </div>

                {/* 4 – A Brighter Tomorrow (Sun Yellow) */}
                <div className="flex items-center gap-2.5 sm:pl-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(252, 205, 55, 0.25)', color: '#996F00' }}
                  >
                    <Sprout size={16} strokeWidth={2.4} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#5B2E19] leading-tight">
                    A Brighter<br />Tomorrow
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* ════ RIGHT: Floating Quote Card (6 cols — anchored to bottom-right) ════ */}
          <div
            className="lg:col-span-6 flex justify-end items-end pt-4 lg:pt-0"
            style={{ minHeight: '290px' }}
          >
            <div
              className="max-w-xs sm:max-w-sm rounded-2xl p-4 sm:p-5 shadow-xl border border-white/80"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              <div className="flex items-start gap-3">
                {/* Large opening quote mark in Sun Yellow */}
                <span
                  className="text-4xl font-black leading-none select-none"
                  style={{ color: '#FCCD37', fontFamily: 'Georgia, serif', lineHeight: '1' }}
                >
                  "
                </span>
                <div className="space-y-2.5">
                  <p className="text-[#3D1E10] text-xs sm:text-sm italic font-semibold leading-relaxed">
                    When we empower people and strengthen
                    communities, we build a brighter Nigeria
                    for generations to come.
                  </p>
                  <div className="pt-2.5 border-t border-slate-200">
                    <span
                      className="font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest block font-sans"
                      style={{ color: '#5B2E19' }}
                    >
                      Chief Michael Ade.Ojo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
