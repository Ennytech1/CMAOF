import React from 'react';
import { BookOpen, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { founderImages } from '../../assets/founderImages';

/**
 * Pixel-perfect Branching Tree Icon representing growth and multi-pillar expansion
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
    <line x1="12" y1="22" x2="12" y2="13" strokeWidth="2.5" />
    <path d="M12 16L7 11" strokeWidth="2" />
    <path d="M12 14l5-5" strokeWidth="2" />
    <path d="M12 13V6" strokeWidth="2" />
    <path d="M9 13l-3 1" strokeWidth="1.8" />
    <path d="M15 11l3 1" strokeWidth="1.8" />
    <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
    <circle cx="6" cy="10" r="1.8" fill="currentColor" stroke="none" />
    <circle cx="18" cy="8" r="1.8" fill="currentColor" stroke="none" />
    <circle cx="5" cy="14" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Ascending 3-Bar Chart Icon representing measurable lasting impact
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
      step: '01',
      year: '2007',
      tag: 'Genesis',
      tagBg: 'bg-emerald-50 text-[#0F4C3A] border-emerald-200/60',
      yearColor: 'text-[#0F4C3A]',
      accentBg: 'bg-[#0F4C3A]',
      ringColor: 'ring-emerald-100',
      icon: <BookOpen size={20} strokeWidth={2.4} className="text-white" />,
      title: 'Elizade Ojo Educational Foundation',
      desc: 'Established by Chief Michael Ade.Ojo to support higher education, university scholarships, and human capital development across Nigeria.',
      highlight: 'Scholarships & Education',
    },
    {
      step: '02',
      year: '2015',
      tag: 'Expansion',
      tagBg: 'bg-teal-50 text-[#054E3B] border-teal-200/60',
      yearColor: 'text-[#054E3B]',
      accentBg: 'bg-[#054E3B]',
      ringColor: 'ring-teal-100',
      icon: <Users size={20} strokeWidth={2.4} className="text-white" />,
      title: 'Expanding Impact & Community Reach',
      desc: 'Increased reach with substantial support for schools, infrastructure, community development programs, and youth empowerment.',
      highlight: 'Community Outreach',
    },
    {
      step: '03',
      year: '2021',
      tag: 'Historic Rebrand',
      tagBg: 'bg-orange-50 text-[#EA580C] border-orange-200/60',
      yearColor: 'text-[#EA580C]',
      accentBg: 'bg-[#EA580C]',
      ringColor: 'ring-orange-100',
      icon: <BranchingTreeIcon />,
      title: 'Chief Michael Ade.Ojo Foundation (CMAOF)',
      desc: 'Formally restructured with an expanded multi-pillar mandate: Education & Human Capital, Health & Well-being, and Community Resilience.',
      highlight: 'Three Strategic Pillars',
      isFeatured: true,
    },
    {
      step: '04',
      year: 'Today',
      tag: 'Current Mission',
      tagBg: 'bg-blue-50 text-[#0F2B5B] border-blue-200/60',
      yearColor: 'text-[#0F2B5B]',
      accentBg: 'bg-[#0F2B5B]',
      ringColor: 'ring-blue-100',
      icon: <BarChartIcon />,
      title: 'Stronger People. Brighter Communities.',
      desc: 'Continuing the founder’s legacy with nationwide reach, deeper measurable impact, and an unshakeable commitment to building a brighter Nigeria.',
      highlight: 'Nationwide Transformation',
      isCurrent: true,
    },
  ];

  return (
    <section className="pt-3 sm:pt-4 pb-12 sm:pb-16 bg-gradient-to-b from-white via-slate-50/60 to-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Header with Provenance Badge ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
              <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F4C3A]">
                OUR JOURNEY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F2B5B] tracking-tight leading-tight">
              From a Bold Vision to a Broader Impact
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              What began as a personal commitment to education in 2007 has evolved into an enduring institutional foundation empowering people, improving health, and strengthening communities across Nigeria.
            </p>
          </div>

          {/* Founder Provenance Citation Badge */}
          <div className="inline-flex items-center gap-3.5 p-2 sm:p-2.5 pr-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm self-start lg:self-end">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#0F4C3A] shrink-0 bg-slate-100 shadow-xs">
              <img 
                src={founderImages.founder7} 
                alt="Chief Michael Ade.Ojo, OON" 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#0F2B5B] leading-snug">
                Chief Michael Ade.Ojo, OON
              </span>
              <span className="block text-[11px] font-semibold text-[#0F4C3A]">
                Founding Visionary (2007 – Present)
              </span>
            </div>
          </div>
        </div>

        {/* ── Horizontal Interactive Timeline ── */}
        <div className="pt-6 sm:pt-8 relative">
          
          {/* Connecting Track Line (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[6%] right-[6%] h-1 bg-gradient-to-r from-[#0F4C3A] via-[#EA580C] to-[#0F2B5B] rounded-full z-0 opacity-20" />

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 relative z-10 items-stretch">
            {milestones.map((m) => (
              <div 
                key={m.step} 
                className={`group flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 relative ${
                  m.isFeatured 
                    ? 'bg-white border-2 border-[#EA580C]/40 shadow-xl shadow-orange-500/5 hover:-translate-y-2' 
                    : 'bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                {/* Top Node Indicator & Step Marker */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon Badge */}
                    <div 
                      className={`w-12 h-12 rounded-2xl ${m.accentBg} flex items-center justify-center shadow-lg ring-4 ${m.ringColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {m.icon}
                    </div>

                    {/* Step Number Tag */}
                    <div className="flex items-center gap-1.5">
                      {m.isCurrent && (
                        <span className="relative flex h-2.5 w-2.5 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      )}
                      <span className="text-xs font-black font-mono tracking-wider text-slate-400 group-hover:text-[#0F2B5B] transition-colors">
                        STEP {m.step}
                      </span>
                    </div>
                  </div>

                  {/* Year & Milestone Tag */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl sm:text-3xl font-black tracking-tight ${m.yearColor}`}>
                        {m.year}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border ${m.tagBg}`}>
                        {m.tag}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-base sm:text-[17px] font-black text-[#0F2B5B] leading-snug pt-1">
                      {m.title}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1.5">
                      {m.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className={m.isFeatured ? 'text-[#EA580C]' : 'text-[#0F4C3A]'} />
                    {m.highlight}
                  </span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={14} />
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutTimelineSection;
