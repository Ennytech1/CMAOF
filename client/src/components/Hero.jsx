import React from 'react';
import { ArrowRight, Heart, Users, GraduationCap, HeartPulse, Sprout } from 'lucide-react';

const Hero = ({ onOpenDonate }) => {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>

      {/* ── Full-bleed background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero_banner_official.jpg')` }}
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

      {/* ── Content wrapper with balanced padding ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ════ LEFT: Text column (6 cols) ════ */}
          <div className="lg:col-span-6 space-y-6">

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.1]">
              <span className="block" style={{ color: '#0A5C36' }}>Stronger People.</span>
              <span className="block mt-1" style={{ color: '#0F2B5B' }}>Brighter Communities.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#1E355E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md font-medium">
              Creating pathways for people to overcome barriers,
              unlock their potential and build better futures.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Donate Now */}
              <button
                onClick={onOpenDonate}
                className="flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #E67E22 55%, #EA580C 100%)',
                  boxShadow: '0 6px 20px -4px rgba(234, 88, 12, 0.45)',
                }}
              >
                <Heart size={16} className="fill-white/25 stroke-white" strokeWidth={2.5} />
                <span>Donate Now</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>

              {/* Explore Our Work */}
              <a
                href="#our-work"
                className="flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm border-2 transition-all duration-200 hover:bg-[#0F4C3A]/5 cursor-pointer"
                style={{ borderColor: '#0F4C3A', color: '#0F4C3A' }}
              >
                <span>Explore Our Work</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>

            {/* ── 4 Stat Indicators ── */}
            <div className="pt-6 border-t border-slate-200/90 mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:divide-x divide-slate-200/80">

                {/* 1 – People Empowered */}
                <div className="flex items-center gap-2.5 sm:pr-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(10,92,54,0.10)', color: '#0A5C36' }}
                  >
                    <Users size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2B5B] leading-tight">
                    People<br />Empowered
                  </span>
                </div>

                {/* 2 – Communities Strengthened */}
                <div className="flex items-center gap-2.5 sm:px-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(10,92,54,0.10)', color: '#0A5C36' }}
                  >
                    <GraduationCap size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2B5B] leading-tight">
                    Communities<br />Strengthened
                  </span>
                </div>

                {/* 3 – Lives Improved */}
                <div className="flex items-center gap-2.5 sm:px-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(10,92,54,0.10)', color: '#0A5C36' }}
                  >
                    <HeartPulse size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2B5B] leading-tight">
                    Lives<br />Improved
                  </span>
                </div>

                {/* 4 – A Brighter Tomorrow */}
                <div className="flex items-center gap-2.5 sm:pl-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(10,92,54,0.10)', color: '#0A5C36' }}
                  >
                    <Sprout size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2B5B] leading-tight">
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
              className="max-w-xs sm:max-w-sm rounded-2xl p-4 sm:p-5 shadow-xl border border-white/70"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              <div className="flex items-start gap-3">
                {/* Large opening quote mark */}
                <span
                  className="text-4xl font-black leading-none select-none"
                  style={{ color: '#0A5C36', fontFamily: 'Georgia, serif', lineHeight: '1' }}
                >
                  "
                </span>
                <div className="space-y-2.5">
                  <p className="text-[#1E355E] text-xs sm:text-sm italic font-semibold leading-relaxed">
                    When we empower people and strengthen
                    communities, we build a brighter Nigeria
                    for generations to come.
                  </p>
                  <div className="pt-2.5 border-t border-slate-200">
                    <span
                      className="font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest block font-sans"
                      style={{ color: '#0F2B5B' }}
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
