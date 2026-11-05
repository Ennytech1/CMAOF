import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';

// Exact Book with open pages icon for Education badge
const EducationBookIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 4.5C3 3.67 3.67 3 4.5 3H11v16.5H4.5C3.67 19.5 3 18.83 3 18V4.5z"
      fill="white"
    />
    <path
      d="M21 4.5C21 3.67 20.33 3 19.5 3H13v16.5h6.5c.83 0 1.5-.67 1.5-1.5V4.5z"
      fill="white"
    />
    <line x1="5.2" y1="7.2" x2="9.2" y2="7.2" stroke="#0047BA" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="5.2" y1="10.2" x2="9.2" y2="10.2" stroke="#0047BA" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="5.2" y1="13.2" x2="8.2" y2="13.2" stroke="#0047BA" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="14.8" y1="7.2" x2="18.8" y2="7.2" stroke="#0047BA" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="14.8" y1="10.2" x2="18.8" y2="10.2" stroke="#0047BA" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="15.8" y1="13.2" x2="18.8" y2="13.2" stroke="#0047BA" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Exact Heart with ECG pulse line icon for Health badge
const HealthHeartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#FFFFFF"
    />
    <path
      d="M4.5 11h3l1.8-3.5 2.8 7 2.2-5 1.5 1.5h3.7"
      fill="none"
      stroke="#338C26"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Exact 2-Person filled group icon for Community/Humanitarian badge
const CommunityUsersIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="8" cy="8" r="2.8" />
    <path d="M8 12.2c-2.4 0-5 1.2-5 3.3V18h10v-2.5c0-2.1-2.6-3.3-5-3.3z" />
    <circle cx="16" cy="8" r="2.8" />
    <path d="M16 12.2c-.6 0-1.3.1-1.9.3 1.2.9 1.9 2.1 1.9 3.5V18H21v-2.5c0-2.1-2.6-3.3-5-3.3z" />
  </svg>
);

const ImpactStrategicPillars = () => {
  const pillars = [
    {
      id: 'education',
      title: 'Education & Opportunity',
      pathway: 'Learn → Develop → Excel',
      pathwayColor: 'text-[#0047BA]',
      description:
        'Expanding access to quality education, developing relevant skills and creating opportunities for people to learn, work and thrive.',
      image: '/images/pillar_education.jpg',
      icon: <EducationBookIcon />,
      badgeBg: 'bg-[#0047BA]',
      statColor: 'text-[#0047BA]',
      stat1: {
        value: '1,200+',
        label: 'Students supported',
        hasLocationPin: true,
      },
      stat2: {
        value: '50+',
        label: 'Teachers trained',
      },
      stat3: {
        value: '20+',
        label: 'Schools/Institutions reached',
      },
      link: '/our-work/education',
      linkText: 'View Education Impact',
      linkColor: 'text-[#0047BA]',
    },
    {
      id: 'health',
      title: 'Health & Wellbeing',
      pathway: 'Prevent → Treat → Restore',
      pathwayColor: 'text-[#338C26]',
      description:
        'Improving access to essential healthcare, prevention, early diagnosis and targeted medical intervention for healthier communities.',
      image: '/images/pillar_health.jpg',
      icon: <HealthHeartIcon />,
      badgeBg: 'bg-[#338C26]',
      statColor: 'text-[#338C26]',
      stat1: {
        value: '5,000+',
        label: 'Consultations and screenings',
      },
      stat2: {
        value: '500+',
        label: 'People reached (2026 outreach)',
      },
      stat3: {
        value: '15',
        label: 'Primary facilities supported',
      },
      link: '/our-work/health',
      linkText: 'View Health Impact',
      linkColor: 'text-[#338C26]',
    },
    {
      id: 'humanitarian',
      title: 'Humanitarian Support',
      pathway: 'Relieve → Rebuild → Sustain',
      pathwayColor: 'text-[#5B2E19]',
      description:
        'Strengthening the ability of vulnerable families and communities to meet basic needs, withstand shocks, and maintain dignity.',
      image: '/images/pillar_community.jpg',
      icon: <CommunityUsersIcon />,
      badgeBg: 'bg-[#5B2E19]',
      statColor: 'text-[#5B2E19]',
      stat1: {
        value: '8,500+',
        label: 'People reached & relieved',
      },
      stat2: {
        value: '25+',
        label: 'Communities supported',
      },
      stat3: {
        value: '18',
        label: 'Solar borehole/WASH projects',
      },
      link: '/our-work/humanitarian-support',
      linkText: 'View Humanitarian Impact',
      linkColor: 'text-[#5B2E19]',
    },
    {
      id: 'economic-empowerment',
      title: 'Economic Empowerment',
      pathway: 'Empower → Produce → Thrive',
      pathwayColor: 'text-[#5B2E19]',
      description:
        'Fostering self-reliance through vocational mastery, agricultural enablement, micro-grants, and sustainable enterprise development.',
      image: '/images/past_event_seedling_girl.jpg',
      icon: <TrendingUp size={20} strokeWidth={2.4} className="text-[#5B2E19]" />,
      badgeBg: 'bg-[#FCCD37]',
      statColor: 'text-[#5B2E19]',
      stat1: {
        value: '1,500+',
        label: 'Artisans & youth trained',
      },
      stat2: {
        value: '350+',
        label: 'Micro-enterprises seeded',
      },
      stat3: {
        value: '12',
        label: 'Cooperative clusters',
      },
      link: '/our-work/economic-empowerment',
      linkText: 'View Economic Impact',
      linkColor: 'text-[#5B2E19]',
    },
  ];

  return (
    <section className="w-full py-4 sm:py-6 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-start gap-2.5">
            <div className="w-[3.5px] h-6 sm:h-6.5 bg-[#FCCD37] rounded-full shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#5B2E19] uppercase tracking-tight leading-tight">
                IMPACT BY STRATEGIC PILLAR
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 font-normal leading-relaxed">
                Four interconnected programmatic areas creating lasting change in people&apos;s lives and communities across Nigeria.
              </p>
            </div>
          </div>

          <Link
            to="/our-work"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#5B2E19] hover:text-[#0047BA] shrink-0 transition-colors cursor-pointer self-start sm:self-auto sm:mt-0.5 group"
          >
            <span className="underline underline-offset-2">View All Programmes</span>
            <ArrowRight size={15} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── 4 Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Card Top Image Banner */}
                <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlapping Floating Circle Badge */}
                <div className="px-5 relative -mt-5 z-10">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${pillar.badgeBg} text-white flex items-center justify-center border-[3px] border-white shadow-sm`}
                  >
                    {pillar.icon}
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="px-5 pt-2 pb-1.5 space-y-1.5 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#5B2E19] leading-snug tracking-tight">
                    {pillar.title}
                  </h3>

                  <div className={`text-xs font-bold tracking-tight ${pillar.pathwayColor}`}>
                    {pillar.pathway}
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Stats & Navigation Link */}
              <div className="px-5 pb-4 pt-1 space-y-3">
                {/* 3 Metric Columns with Vertical Divider Lines */}
                <div className="grid grid-cols-3 pt-2.5 border-t border-slate-100">
                  
                  {/* Metric 1 */}
                  <div className="pr-1.5 flex flex-col justify-start">
                    <div className={`flex items-center text-sm sm:text-base font-black leading-none ${pillar.statColor}`}>
                      {pillar.stat1.hasLocationPin && (
                        <MapPin size={14} className="text-[#0047BA] fill-[#0047BA]/20 stroke-[2.4] shrink-0 mr-0.5 inline-block" />
                      )}
                      <span>{pillar.stat1.value}</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 leading-tight pt-1 font-normal">
                      {pillar.stat1.label}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="px-2 border-l border-slate-200/90 flex flex-col justify-start">
                    <div className={`text-sm sm:text-base font-black leading-none ${pillar.statColor}`}>
                      {pillar.stat2.value}
                    </div>
                    <span className="text-[10.5px] text-slate-500 leading-tight pt-1 font-normal">
                      {pillar.stat2.label}
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="pl-2 border-l border-slate-200/90 flex flex-col justify-start">
                    <div className={`text-sm sm:text-base font-black leading-none ${pillar.statColor}`}>
                      {pillar.stat3.value}
                    </div>
                    <span className="text-[10.5px] text-slate-500 leading-tight pt-1 font-normal">
                      {pillar.stat3.label}
                    </span>
                  </div>

                </div>

                {/* Bottom Action Link with Arrow */}
                <div>
                  <Link
                    to={pillar.link}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${pillar.linkColor} hover:gap-2 transition-all cursor-pointer group-hover:underline`}
                  >
                    <span>{pillar.linkText}</span>
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactStrategicPillars;
