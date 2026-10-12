import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Exact Teardrop Map Pin for the Legend
const TeardropPin = ({ color }) => (
  <svg
    className="w-5 h-6 shrink-0"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C5.373 0 0 5.373 0 12c0 8.8 12 16 12 16s12-7.2 12-16c0-6.627-5.373-12-12-12z"
      fill={color}
    />
    <circle cx="12" cy="11" r="3.8" fill="#FFFFFF" />
  </svg>
);

// Exact Teardrop Map Pin for the States Card List
const StateCardPin = () => (
  <svg
    className="w-3.5 h-4.5 shrink-0"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C5.373 0 0 5.373 0 12c0 8.8 12 16 12 16s12-7.2 12-16c0-6.627-5.373-12-12-12z"
      fill="#065F46"
    />
    <circle cx="12" cy="11" r="3.8" fill="#FFFFFF" />
  </svg>
);

const ImpactWhereWeWorkAndStories = () => {
  const presenceStates = [
    'Ondo State',
    'Lagos State',
    'Ogun State',
    'Oyo State',
    'FCT Abuja',
    'Others (as applicable)',
  ];

  const stories = [
    {
      id: 1,
      image: '/images/story_amina.jpg',
      quote: '“The scholarship gave me a second chance to pursue my dream.”',
      name: 'Amina S.',
      role: 'Scholarship Beneficiary',
    },
    {
      id: 2,
      image: '/images/story_kehinde.jpg',
      quote:
        '“The medical outreach helped me and my child. We received care and support when we needed it most.”',
      name: 'Mrs. Kehinde',
      role: 'Community Member',
    },
    {
      id: 3,
      image: '/images/story_adeyemi.jpg',
      quote:
        '“Clean water has made a big difference in our community. We are healthier and happier.”',
      name: 'Chief B. Adeyemi',
      role: 'Community Leader',
    },
  ];

  return (
    <section className="w-full py-3 sm:py-5 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ════════════════════════════════════════════════════════════════
              LEFT COLUMN: WHERE WE WORK (Span 7 on lg)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
            
            {/* ── Top Header with Tall Orange Bar ── */}
            <div className="flex items-start gap-3">
              {/* Tall Orange Bar spanning both title lines */}
              <div className="w-[4px] h-11 sm:h-12 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
              
              <div className="space-y-0.5">
                <h2 className="text-xl sm:text-[22px] font-black text-[#0F2B5B] uppercase tracking-tight leading-tight">
                  WHERE WE WORK
                </h2>
                <div className="text-xl sm:text-[22px] font-black text-[#064E3B] tracking-tight leading-tight">
                  Communities across Nigeria
                </div>
              </div>
            </div>

            {/* ── Content Row: Left Details/Legend + Center Map + Right States Callout ── */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center pt-1">
              
              {/* Left Column (Span 4): Description & 3 Legend Pins */}
              <div className="sm:col-span-4 space-y-3.5">
                <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed font-normal">
                  Our programmes reach people and communities in selected states and local government areas.
                </p>

                {/* 3 Authentic Teardrop Programme Pins */}
                <div className="space-y-2.5 pt-0.5">
                  <div className="flex items-center gap-2.5">
                    <TeardropPin color="#065F46" />
                    <span className="text-slate-800 text-xs sm:text-[12.5px] font-semibold leading-tight">
                      Education programmes
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <TeardropPin color="#DC2626" />
                    <span className="text-slate-800 text-xs sm:text-[12.5px] font-semibold leading-tight">
                      Health programmes
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <TeardropPin color="#EA580C" />
                    <span className="text-slate-800 text-xs sm:text-[12.5px] font-semibold leading-tight">
                      Community programmes
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Column (Span 5): Nigeria Map Image */}
              <div className="sm:col-span-5 flex items-center justify-center py-2 sm:py-0 px-1">
                <img
                  src="/images/nigeria_geographic_map.jpg"
                  alt="Communities across Nigeria Map"
                  className="w-full max-h-[220px] sm:max-h-[240px] object-contain drop-shadow-xs"
                />
              </div>

              {/* Right Column (Span 3): States Speech Bubble Callout Card */}
              <div className="sm:col-span-3 relative">
                {/* Pointer Arrow on Left for Desktop pointing towards Map */}
                <div
                  className="hidden sm:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#F0F4F8] border-l border-b border-slate-200/90 rotate-45 z-10"
                  aria-hidden="true"
                />

                <div className="bg-[#F0F4F8] rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="leading-tight">
                    <span className="block text-[11px] font-black text-[#0F2B5B] uppercase tracking-wider">
                      STATES WITH
                    </span>
                    <span className="block text-[11px] font-black text-[#0F2B5B] uppercase tracking-wider">
                      CMAOF PRESENCE
                    </span>
                    <span className="block text-[10px] font-normal text-slate-500 pt-0.5">
                      (placeholder)
                    </span>
                  </div>

                  <ul className="space-y-1.5 pt-0.5">
                    {presenceStates.map((state, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <StateCardPin />
                        <span className="text-slate-800 text-[11px] sm:text-[11.5px] font-semibold leading-tight whitespace-nowrap">
                          {state}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT COLUMN: STORIES OF IMPACT (Span 5 on lg)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
            
            {/* ── Top Header with "View All Stories ->" on Far Right ── */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-[3.5px] h-6 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#0F2B5B] uppercase tracking-tight leading-tight">
                    STORIES OF IMPACT
                  </h2>
                  <div className="text-base sm:text-lg font-bold text-[#0F2B5B] tracking-tight leading-snug mt-0.5">
                    Real people. Brighter futures.
                  </div>
                </div>
              </div>

              <Link
                to="/news"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F4C3A] hover:text-[#14634C] shrink-0 transition-colors cursor-pointer group pt-0.5"
              >
                <span className="underline underline-offset-2">View All Stories</span>
                <ArrowRight size={14} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── 3 Story Cards Grid: Equal height aligned ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-1 items-stretch h-full">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-2.5 group h-full min-h-[260px] sm:min-h-[275px]"
                >
                  <div className="space-y-1.5">
                    {/* Portrait Photo */}
                    <div className="w-full h-22 sm:h-24 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Quotation & Quote Text */}
                    <div className="space-y-0.5">
                      <span className="text-[#065F46] font-serif font-black text-lg sm:text-xl leading-none select-none block">
                        “
                      </span>
                      <p className="text-slate-700 text-[10.5px] sm:text-[11px] italic leading-snug font-normal">
                        {story.quote}
                      </p>
                    </div>
                  </div>

                  {/* Beneficiary Name & Role */}
                  <div className="pt-1 border-t border-slate-100">
                    <div className="font-extrabold text-[#0F2B5B] text-[11.5px] sm:text-xs leading-tight">
                      {story.name}
                    </div>
                    <div className="text-slate-500 text-[9.5px] sm:text-[10px] leading-tight mt-0.5 font-normal">
                      {story.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactWhereWeWorkAndStories;
