import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * EventCtaSection Component
 * 
 * Exact pixel-faithful dual CTA banner:
 * - Left card: "Be Part of Our Next Event" with young schoolgirl seedling photo & dual buttons
 * - Right card: "Stay Updated on Our Events" with newsletter subscription input
 * - Perfectly aligned with the global footer width (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8) and zero bottom margin.
 */
const EventCtaSection = ({ onViewCalendar }) => {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#241007] via-[#3D1E10] to-[#5B2E19] text-white font-sans overflow-hidden mb-0 border-t-4 border-[#FCCD37]">
      {/* ── Left Photo of Young Girl with Seedling (Smooth gradient blend) ── */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[42%] overflow-hidden pointer-events-none select-none">
        <img
          src="/images/past_event_seedling_girl.jpg"
          alt="Young schoolgirl holding seedling"
          className="w-full h-full object-cover object-[center_30%]"
        />
        {/* Smooth horizontal gradient fade blending photo into Earth Brown */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(36, 16, 7, 0.05) 0%, rgba(36, 16, 7, 0.35) 30%, rgba(36, 16, 7, 0.88) 68%, #241007 92%)',
          }}
        />
      </div>

      {/* Dark overlay for mobile clarity so text remains easily legible on small screens */}
      <div className="absolute inset-0 bg-[#241007]/90 sm:bg-transparent pointer-events-none" />

      {/* ── Banner Content Row inside max-w-7xl ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 relative z-10 min-h-[140px] sm:min-h-[155px] lg:min-h-[165px] flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-8">

          {/* Title & Description with Sun Yellow Vertical Accent Bar */}
          <div className="flex items-start gap-3 sm:gap-3.5 max-w-xl sm:ml-[22%] md:ml-[24%] lg:ml-[25%] xl:ml-[23%]">
            {/* Accent Vertical Bar */}
            <div className="w-1.5 self-stretch min-h-[50px] sm:min-h-[56px] bg-[#FCCD37] rounded-full shrink-0 mt-0.5 shadow-xs" />

            <div className="space-y-1">
              {/* Headline */}
              <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-extrabold text-white tracking-tight leading-tight drop-shadow-xs">
                Be Part of Our Next Event
              </h2>

              {/* Paragraph */}
              <p className="text-[#FAF6EE] text-xs sm:text-[13.5px] font-medium leading-relaxed drop-shadow-xs">
                Join us in creating more opportunities, healthier communities<br className="hidden sm:inline" />
                {' '}and brighter futures across Nigeria.
              </p>
            </div>
          </div>

          {/* Action Buttons: Solid Sun Yellow Get Involved + Outlined View Event Calendar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 shrink-0 self-start sm:self-auto ml-4 sm:ml-[22%] lg:ml-0">
            {/* Primary CTA: Get Involved */}
            <Link
              to="/get-involved"
              className="btn-cmao-primary font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-[#FCCD37]/25 transition-all cursor-pointer"
            >
              <span>Get Involved</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>

            {/* Secondary CTA: View Event Calendar */}
            <a
              href="#event-calendar"
              onClick={onViewCalendar}
              className="border-2 border-[#FCCD37]/70 hover:bg-[#FCCD37]/15 text-[#FAF6EE] font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl inline-flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calendar size={15} strokeWidth={2.2} className="text-[#FCCD37]" />
              <span>View Event Calendar</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventCtaSection;
