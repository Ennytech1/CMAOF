import React from 'react';
import { BookOpen, Users } from 'lucide-react';

/**
 * Pixel-perfect Branching Tree Icon matching reference image_8.png
 */
const BranchingTreeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-white"
    aria-hidden="true"
  >
    {/* Trunk */}
    <line x1="12" y1="22" x2="12" y2="13" strokeWidth="2.5" />
    {/* Branching limbs */}
    <path d="M12 16L7 11" strokeWidth="2" />
    <path d="M12 14l5-5" strokeWidth="2" />
    <path d="M12 13V6" strokeWidth="2" />
    <path d="M9 13l-3 1" strokeWidth="1.8" />
    <path d="M15 11l3 1" strokeWidth="1.8" />
    {/* Leaf clusters */}
    <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
    <circle cx="6" cy="10" r="1.8" fill="currentColor" stroke="none" />
    <circle cx="18" cy="8" r="1.8" fill="currentColor" stroke="none" />
    <circle cx="5" cy="14" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Ascending 3-Bar Chart Icon matching reference image_8.png
 */
const BarChartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-white"
    aria-hidden="true"
  >
    <rect x="3.8" y="13" width="3.6" height="8" rx="1.2" />
    <rect x="10.2" y="8" width="3.6" height="13" rx="1.2" />
    <rect x="16.6" y="3" width="3.6" height="18" rx="1.2" />
  </svg>
);

const AboutTimelineSection = () => {
  const milestones = [
    {
      year: '2007',
      yearColor: 'text-[#0F4C3A]',
      icon: <BookOpen size={20} strokeWidth={2.4} className="text-white" />,
      badgeBg: 'bg-[#054E3B]',
      title: 'Elizade Ojo Educational Foundation',
      desc: 'Established to support education and human development.'
    },
    {
      year: '2015',
      yearColor: 'text-[#0F4C3A]',
      icon: <Users size={20} strokeWidth={2.4} className="text-white" />,
      badgeBg: 'bg-[#054E3B]',
      title: 'Expanding Impact',
      desc: 'Increased support for scholarships, schools and community initiatives.'
    },
    {
      year: '2021',
      yearColor: 'text-[#EA580C]',
      icon: <BranchingTreeIcon />,
      badgeBg: 'bg-[#EA580C]',
      title: 'Chief Michael Ade.Ojo Foundation (CMAOF)',
      desc: 'Rebranded with an expanded focus beyond education to include health and community development.'
    },
    {
      year: 'Today',
      yearColor: 'text-[#0F4C3A]',
      icon: <BarChartIcon />,
      badgeBg: 'bg-[#0F2B5B]',
      title: 'Stronger People. Brighter Communities.',
      desc: 'Continuing the legacy with greater reach, deeper impact and a commitment to a brighter Nigeria.'
    }
  ];

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* ── Main Widescreen Banner Container ── */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#FAFBFD]">
        
        <div className="flex flex-col lg:flex-row items-stretch">

          {/* ════ LEFT PORTION: 35% Photographic Banner & Hero Text ════ */}
          <div className="lg:w-[35%] xl:w-[34%] relative overflow-hidden flex flex-col justify-center p-6 sm:p-8 lg:p-9 shrink-0 min-h-[300px] lg:min-h-[360px]">
            
            {/* Seedling macro photo background */}
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url('/images/our_journey_seedling.jpg')`,
                backgroundPosition: 'right 65%'
              }}
              aria-hidden="true"
            />

            {/* Seamless gradient fade blending smoothly into right timeline */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(4,26,16,0.94) 0%, rgba(4,26,16,0.82) 42%, rgba(4,26,16,0.3) 76%, rgba(250,251,253,0.85) 94%, #FAFBFD 100%)'
              }}
              aria-hidden="true"
            />

            {/* Subtle soft bottom shadow for rich soil feel */}
            <div 
              className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)'
              }}
              aria-hidden="true"
            />

            {/* Hero text overlay with high contrast */}
            <div className="relative z-10 space-y-4 max-w-md">
              
              {/* Vertical Orange Accent Bar + Eyebrow & Title */}
              <div className="flex items-start gap-3.5">
                <div className="w-[3.5px] self-stretch min-h-[78px] bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/95 block font-sans">
                    OUR JOURNEY
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.95rem] font-black text-white tracking-tight leading-[1.14] font-sans">
                    From a Bold Vision<br className="hidden sm:inline" /> to a Broader Impact
                  </h2>
                </div>
              </div>

              {/* Body text aligned with the title */}
              <p className="text-white/90 text-xs sm:text-[12.5px] leading-relaxed font-normal pl-[17.5px] max-w-sm">
                What began as a commitment to education has evolved into a broader mission to improve lives across education, health and community development.
              </p>

            </div>

          </div>

          {/* ════ RIGHT PORTION: 65% Horizontal Timeline Grid ════ */}
          <div className="lg:w-[65%] xl:w-[66%] bg-[#FAFBFD] p-5 sm:p-7 lg:p-8 flex flex-col justify-center relative">
            
            <div className="relative w-full">
              
              {/* ── Horizontal Connecting Timeline Line (Desktop) ── */}
              <div className="hidden lg:block absolute top-[22px] left-[22px] right-[4px] h-[1.5px] bg-[#94A3B8]/60 z-0">
                {/* Subtle segment marker dots */}
                <div className="absolute top-1/2 left-[28%] -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
                <div className="absolute top-1/2 left-[53%] -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EA580C]/70" />
                <div className="absolute top-1/2 left-[78%] -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />

                {/* Subtle terminating arrow pointing right */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-[#0F2B5B] flex items-center">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="13 5 20 12 13 19" />
                  </svg>
                </div>
              </div>

              {/* ── Mobile Vertical Line (< lg) ── */}
              <div className="lg:hidden absolute top-[22px] bottom-[60px] left-[22px] w-[1.5px] bg-[#94A3B8]/50 z-0" />

              {/* ── 4 Milestone Columns / Cards Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-3.5 relative z-10 items-stretch">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    
                    {/* Circular Icon Node perched at top margin */}
                    <div className="mb-3 pl-0 sm:pl-0">
                      <div 
                        className={`w-11 h-11 rounded-full ${m.badgeBg} flex items-center justify-center text-white shadow-md ring-4 ring-[#FAFBFD] shrink-0 transition-transform duration-300 hover:scale-110 cursor-default`}
                      >
                        {m.icon}
                      </div>
                    </div>

                    {/* Timeline Card Record */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_22px_rgba(15,43,91,0.05)] border border-slate-100 flex-1 flex flex-col justify-start space-y-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(15,43,91,0.09)]">
                      {/* Year */}
                      <span className={`text-lg sm:text-xl font-extrabold tracking-tight ${m.yearColor} font-sans block`}>
                        {m.year}
                      </span>

                      {/* Title */}
                      <h3 className="font-extrabold text-[13px] sm:text-[13.5px] text-[#0F2B5B] leading-snug font-sans">
                        {m.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal pt-0.5">
                        {m.desc}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutTimelineSection;
