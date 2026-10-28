import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

/**
 * EventHero Component
 * 
 * Exact pixel-faithful implementation of the CMAOF Events Hero section.
 * Features:
 * - Top brand slogan with official CMAOF emblem ("Stronger People, Brighter Communities.")
 * - Orange vertical accent bar + "EVENTS" category tag
 * - High-contrast stacked headline: "People. Partnerships." in forest green & "Lasting Change." in deep navy
 * - Subtitle description of foundation community events across Nigeria
 * - Solid forest green CTA button ("View Upcoming Events →")
 * - Outline CTA button with calendar icon ("📅 Our Event Calendar")
 * - Full-bleed photographic background of smiling Nigerian students in green uniform
 * - Smooth linear white feather gradient overlay
 * - Floating white cursive typography ("People / Ideas / Action / Stronger / Communities.") with orange brush stroke underline
 */
const EventHero = ({
  onOpenDonate,
  onViewEvents,
  onViewCalendar,
  upcomingEventsHref = '#upcoming-events',
  calendarHref = '#event-calendar',
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-white select-text" style={{ minHeight: '460px' }}>
      
      {/* ── Photographic Background Image ── */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-[position:78%_center] bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url('/images/event_hero_bg.jpg')` }}
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

      {/* ── Mobile Vertical Gradient Overlay Fallback ── */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 65%, rgba(255,255,255,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content Container (Properly padded below fixed navbar) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[96px] sm:pt-[110px] lg:pt-[120px] pb-12 sm:pb-16 lg:pb-18 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ════ LEFT COLUMN: Brand Eyebrow, Main Headline, Subtitle, & CTAs (Span 7) ════ */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 max-w-2xl">
            
            {/* Orange Vertical Accent Bar + Category Tag */}
            <div className="flex items-center gap-2">
              <div className="w-[3.5px] h-4.5 bg-[#EA580C] rounded-xs shrink-0" />
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.2em] text-[#06402B]">
                EVENTS
              </span>
            </div>

            {/* High-Contrast Stacked Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold tracking-tight leading-[1.08] text-left">
              <span className="block text-[#06402B]">People. Partnerships.</span>
              <span className="block text-[#0B2D6E] mt-0.5">Lasting Change.</span>
            </h1>

            {/* Body Description */}
            <p className="text-slate-600 sm:text-slate-700 text-sm sm:text-base lg:text-[16.5px] leading-relaxed max-w-xl font-normal">
              Join our events, initiatives and community activities as we work together to build stronger people and brighter communities across Nigeria.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1.5 sm:pt-2">
              
              {/* Primary Action Button: View Upcoming Events */}
              <a
                href={upcomingEventsHref}
                onClick={onViewEvents}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
                style={{ backgroundColor: '#06402B' }}
              >
                <span>View Upcoming Events</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </a>

              {/* Secondary Action Button: Our Event Calendar */}
              <a
                href={calendarHref}
                onClick={onViewCalendar}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs cursor-pointer bg-white border-2"
                style={{ borderColor: '#06402B', color: '#06402B' }}
              >
                <Calendar size={17} strokeWidth={2.2} style={{ color: '#06402B' }} />
                <span>Our Event Calendar</span>
              </a>

            </div>

          </div>

          {/* ════ RIGHT COLUMN: Floating Script Typography & Brush Stroke Underline (Span 5) ════ */}
          <div className="lg:col-span-5 flex justify-end items-center pointer-events-none pr-2 sm:pr-4 lg:pr-8">
            <div className="select-none text-left pointer-events-auto">
              
              {/* Stacked Handwritten Script Words */}
              <div
                className="font-handwriting font-bold text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] leading-[1.04] tracking-tight italic"
                style={{
                  fontFamily: "'Caveat', cursive, sans-serif",
                  color: '#FFFFFF',
                  textShadow:
                    '0 3px 12px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                <span className="block !text-white translate-x-0" style={{ color: '#FFFFFF' }}>People</span>
                <span className="block !text-white translate-x-1 sm:translate-x-2" style={{ color: '#FFFFFF' }}>Ideas</span>
                <span className="block !text-white translate-x-2 sm:translate-x-3.5" style={{ color: '#FFFFFF' }}>Action</span>
                <span className="block !text-white translate-x-1 sm:translate-x-2" style={{ color: '#FFFFFF' }}>Stronger</span>
                <span className="block !text-white translate-x-2 sm:translate-x-3.5" style={{ color: '#FFFFFF' }}>Communities.</span>
              </div>

              {/* Orange Brush Stroke Underline */}
              <div className="mt-1 translate-x-2 sm:translate-x-3">
                <svg
                  className="w-32 sm:w-38 xl:w-44 h-4 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                  viewBox="0 0 160 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 11 C 45 4, 105 15, 157 7"
                    stroke="#EA580C"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default EventHero;
