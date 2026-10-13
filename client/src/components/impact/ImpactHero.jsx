import React from 'react';
import { ArrowRight, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>

      {/* ── Full-bleed Background Image with Smiling Schoolboy on Right ── */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
        style={{ backgroundImage: `url('/images/impact_hero_boy.jpg')` }}
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

      {/* ── Main Content Container matching Home Hero & About Hero ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ── Left Column: Branding, Eyebrow, Heading, Subtitle & CTAs (Span 7) ── */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5 max-w-2xl">

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F2B5B]">
              <div className="w-1 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
              <Link to="/" className="hover:text-[#0F4C3A] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-[#0F2B5B]">Impact</span>
            </div>

            {/* Category Eyebrow Header with Orange Indicator */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <div className="w-[3px] h-4 bg-[#EA580C] rounded-full shrink-0" />
              <span className="text-xs sm:text-[13px] font-extrabold text-[#0F2B5B] tracking-wider uppercase">
                IMPACT & ACCOUNTABILITY
              </span>
            </div>

            {/* Main Headline on One Line */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-tight">
              <span className="text-[#064E3B]">Real People. </span>
              <span className="text-[#0F2B5B]">Real Change.</span>
            </h1>

            {/* Descriptive Subtitle (Clean 2 lines) */}
            <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl font-normal">
              We are committed to delivering measurable, lasting impact in education,
              health and community well-being across Nigeria.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1.5">
              {/* Primary CTA: Solid Brand Orange */}
              <a
                href="#verified-impact"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#EA580C] hover:bg-[#d94e07] text-white text-xs sm:text-[13.5px] font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>View Our Impact</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>

              {/* Secondary CTA: Dark Teal Outlined */}
              <a
                href="#download-reports"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 border-[#064E3B] bg-white/70 hover:bg-[#064E3B]/5 text-[#064E3B] text-xs sm:text-[13.5px] font-bold transition-all duration-200 cursor-pointer"
              >
                <span>Download Reports</span>
                <Download size={15} strokeWidth={2.5} />
              </a>
            </div>

          </div>

          {/* ── Right Column: Floating Quote Card (Span 5) ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-end items-center pt-4 lg:pt-0">
            <div
              className="rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/90 max-w-[280px] sm:max-w-[310px]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Dark Green Quotation Mark */}
              <div className="text-[#064E3B] leading-none mb-2.5">
                <span className="text-4xl sm:text-5xl font-serif font-black block leading-none select-none">“</span>
              </div>

              {/* Quote Text */}
              <p className="text-slate-700 text-xs sm:text-[13px] italic font-medium leading-relaxed">
                Investing in people creates ripple effects that strengthen families, communities and nations."
              </p>

              {/* Attribution & Orange Underline Bar */}
              <div className="pt-3">
                <span className="block text-[11px] font-bold text-[#0F2B5B] uppercase tracking-wider">
                  CHIEF MICHAEL ADE.OJO
                </span>
                <div className="w-10 h-1 bg-[#EA580C] rounded-full mt-2" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ImpactHero;
