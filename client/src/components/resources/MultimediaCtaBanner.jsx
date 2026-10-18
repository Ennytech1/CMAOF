import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const MultimediaCtaBanner = ({ onOpenDonate }) => {
  return (
    <section className="relative w-full bg-[#063B28] text-white font-sans overflow-hidden mb-0">
      {/* ── Left Photo of Boy with Camera (Mirrored horizontally with smooth gradient blend) ── */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[42%] overflow-hidden pointer-events-none select-none">
        <img
          src="/images/cta_boy_camera.jpg"
          alt="CMAOF Youth Photography & Community Stories"
          className="w-full h-full object-cover object-[center_25%]"
          style={{ transform: 'scaleX(-1)' }}
        />
        {/* Smooth horizontal gradient fade blending photo into dark green */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(6, 59, 40, 0.05) 0%, rgba(6, 59, 40, 0.25) 30%, rgba(6, 59, 40, 0.8) 68%, #063B28 92%)',
          }}
        />
      </div>

      {/* Dark overlay for mobile clarity so text remains easily legible on small screens */}
      <div className="absolute inset-0 bg-[#063B28]/75 sm:bg-transparent pointer-events-none" />

      {/* ── Banner Content Row inside max-w-7xl ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 relative z-10 min-h-[140px] sm:min-h-[155px] lg:min-h-[165px] flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-8">
          
          {/* Title & Description with Orange Vertical Accent Bar */}
          <div className="flex items-start gap-3 sm:gap-3.5 max-w-xl sm:ml-[22%] md:ml-[24%] lg:ml-[25%] xl:ml-[23%]">
            {/* Orange Vertical Bar */}
            <div className="w-1.5 self-stretch min-h-[50px] sm:min-h-[56px] bg-[#EA580C] rounded-full shrink-0" />
            
            <div className="space-y-1">
              {/* Headline */}
              <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-extrabold text-white tracking-tight leading-tight">
                More Stories. Greater Impact.
              </h2>
              
              {/* Paragraph */}
              <p className="text-emerald-50/90 text-xs sm:text-[13.5px] font-normal leading-relaxed">
                These are real people, real communities and real change.<br className="hidden sm:inline" />
                {' '}Join us in creating more stories of hope across Nigeria.
              </p>
            </div>
          </div>

          {/* Action Buttons: Solid Orange Donate Now + White Outlined Get Involved */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 shrink-0 self-start sm:self-auto ml-4 sm:ml-[22%] lg:ml-0">
            {/* Primary CTA: Donate Now */}
            <button
              type="button"
              onClick={onOpenDonate}
              className="bg-[#EA580C] hover:bg-[#d94e08] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Heart size={16} className="fill-white stroke-none shrink-0" />
              <span>Donate Now</span>
              <ArrowRight size={15} strokeWidth={2.4} className="shrink-0" />
            </button>

            {/* Secondary CTA: Get Involved */}
            <Link
              to="/get-involved"
              className="border border-white/70 hover:border-white text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl inline-flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Involved</span>
              <ArrowRight size={15} strokeWidth={2.4} className="shrink-0" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MultimediaCtaBanner;
