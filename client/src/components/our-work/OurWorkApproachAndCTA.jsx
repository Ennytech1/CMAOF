import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, Sprout, Heart, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';

const OurWorkApproachAndCTA = ({ onOpenDonate }) => {
  const steps = [
    {
      id: 'people',
      icon: <Users size={24} strokeWidth={2.2} />,
      bg: 'bg-[#5B2E19]',
      textColor: 'text-white',
      title: 'People',
      subtitle: 'Communities at the centre',
    },
    {
      id: 'integrated',
      icon: <Settings size={24} strokeWidth={2.2} />,
      bg: 'bg-[#0047BA]',
      textColor: 'text-white',
      title: 'Integrated Approach',
      subtitle: 'Four pillars, shared impact',
    },
    {
      id: 'evidence',
      icon: <Sprout size={24} strokeWidth={2.2} />,
      bg: 'bg-[#338C26]',
      textColor: 'text-white',
      title: 'Evidence-Led',
      subtitle: 'Data, learning and results',
    },
    {
      id: 'partnerships',
      icon: <Heart size={24} className="fill-white stroke-none" />,
      bg: 'bg-[#5B2E19]',
      textColor: 'text-white',
      title: 'Partnerships',
      subtitle: 'Stronger together for greater reach',
    },
    {
      id: 'lasting-change',
      icon: <BarChart3 size={24} strokeWidth={2.2} />,
      bg: 'bg-[#FCCD37]',
      textColor: 'text-[#5B2E19]',
      title: 'Lasting Change',
      subtitle: 'Resilient people and communities',
    },
  ];

  return (
    <div className="w-full font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP SECTION: OUR APPROACH (Connected for Greater Impact)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-6 sm:py-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-5 flex items-start gap-3 sm:gap-3.5">
              {/* Sun Yellow Vertical Accent Bar */}
              <div className="w-1.5 h-11 sm:h-13 bg-[#FCCD37] rounded-full shrink-0 mt-0.5" />
              
              <div className="space-y-1">
                <span className="text-xs sm:text-[12.5px] font-black uppercase tracking-wider text-[#5B2E19] block">
                  OUR APPROACH
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[27px] font-extrabold text-[#5B2E19] tracking-tight leading-tight">
                  Connected for Greater Impact
                </h2>
                <p className="text-slate-700 text-sm sm:text-[14.5px] font-medium leading-relaxed max-w-md pt-0.5">
                  Our four pillars are interconnected, creating a continuum of support that helps individuals and communities overcome barriers, unlock their potential and build better futures.
                </p>
                {/* 4-Pillar Framework Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF3FC] text-[#0047BA] border border-[#DBEAFE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0047BA]" />
                    Education
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EDF7EB] text-[#338C26] border border-[#C7E5C3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#338C26]" />
                    Health
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF6EE] text-[#5B2E19] border border-[#EFE8DC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B2E19]" />
                    Humanitarian
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF8E5] text-[#5B2E19] border border-[#FCCD37]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FCCD37]" />
                    Economic
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Process Steps in a unified horizontal row with Chevrons */}
            <div className="lg:col-span-7">
              <div className="flex items-start justify-between gap-1 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {steps.map((step, idx) => (
                  <React.Fragment key={step.id}>
                    
                    {/* Step Node */}
                    <div className="flex flex-col items-center text-center flex-1 min-w-[90px] sm:min-w-[105px] max-w-[135px] group">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${step.bg} ${step.textColor || 'text-white'} flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0`}
                      >
                        {step.icon}
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="text-xs sm:text-[13px] font-bold text-[#5B2E19] leading-tight">
                          {step.title}
                        </div>
                        <div className="text-[11px] sm:text-[11.5px] text-slate-700 leading-snug max-w-[115px] mx-auto font-medium">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Connecting Chevron Arrow between nodes (aligned with the circle icons) */}
                    {idx < steps.length - 1 && (
                      <div className="hidden sm:flex items-center justify-center pt-3.5 sm:pt-4 text-slate-400 shrink-0">
                        <ChevronRight size={18} className="stroke-[2.2]" />
                      </div>
                    )}

                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM SECTION: BE PART OF THE CHANGE BANNER (Smiling Boy on Left)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#241007] border-t-4 border-[#FCCD37] text-white">
        
        {/* Full-bleed Photographic Background: Smiling Boy on Left, Foliage spreading across */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[position:8%_28%] pointer-events-none"
          style={{ backgroundImage: `url('/images/our_work_cta_boy.jpg')` }}
          aria-hidden="true"
        />

        {/* Cinematic Earth Brown Gradient Overlay: keeps the boy crystal clear on the left, rich deep brown for text readability on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 16%, rgba(36,16,7,0.50) 26%, rgba(36,16,7,0.85) 38%, rgba(36,16,7,0.92) 55%, #241007 100%)',
          }}
          aria-hidden="true"
        />

        {/* Mobile vertical overlay for small screens to ensure full readability */}
        <div className="absolute inset-0 bg-[#241007]/90 sm:hidden pointer-events-none" aria-hidden="true" />

        {/* Content Row Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 md:py-9">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Center/Left Text Block — starts cleanly beside the smiling boy on the left */}
            <div className="flex items-start gap-3 sm:gap-3.5 max-w-xl sm:ml-[22%] md:ml-[24%] lg:ml-[24%] xl:ml-[22%]">
              {/* Sun Yellow Vertical Bar */}
              <div className="w-1.5 h-12 sm:h-14 bg-[#FCCD37] rounded-full shrink-0 mt-0.5" />
              
              <div className="space-y-1">
                <span className="block text-xs font-black uppercase tracking-wider text-[#FCCD37] drop-shadow-xs">
                  BE PART OF THE CHANGE
                </span>
                
                <h2 className="text-xl sm:text-2xl lg:text-[27px] font-black text-white tracking-tight leading-tight drop-shadow-xs">
                  Your Support Creates Brighter Futures.
                </h2>
                
                <p className="text-white text-xs sm:text-[13px] font-medium leading-relaxed max-w-md pt-0.5 drop-shadow-xs">
                  Join us in expanding opportunities, improving lives and strengthening communities across Nigeria.
                </p>
              </div>
            </div>

            {/* Right Buttons: Solid Sun Yellow Donate Now + White Outlined Partner With Us */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-auto ml-4 sm:ml-[22%] lg:ml-0">
              {/* Primary CTA: Donate Now */}
              <Link
                to="/donate"
                className="btn-cmao-primary text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200"
              >
                <Heart size={16} className="fill-[#5B2E19] stroke-none" />
                <span>Donate Now</span>
                <ArrowRight size={15} strokeWidth={2.4} />
              </Link>

              {/* Secondary CTA: Partner With Us */}
              <Link
                to="/get-involved"
                className="border-2 border-white/80 hover:bg-white hover:text-[#5B2E19] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Partner With Us</span>
                <ArrowRight size={15} strokeWidth={2.4} />
              </Link>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
};

export default OurWorkApproachAndCTA;
