import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

// Exact Book with open pages icon for Education badge
const EducationBookIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
    {/* Left open page */}
    <path
      d="M3 4.5C3 3.67 3.67 3 4.5 3H11v16.5H4.5C3.67 19.5 3 18.83 3 18V4.5z"
      fill="white"
    />
    {/* Right open page */}
    <path
      d="M21 4.5C21 3.67 20.33 3 19.5 3H13v16.5h6.5c.83 0 1.5-.67 1.5-1.5V4.5z"
      fill="white"
    />
    {/* Left page lines (blue cutout matching badge bg) */}
    <line x1="5.2" y1="7.2" x2="9.2" y2="7.2" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="5.2" y1="10.2" x2="9.2" y2="10.2" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="5.2" y1="13.2" x2="8.2" y2="13.2" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
    {/* Right page lines (blue cutout matching badge bg) */}
    <line x1="14.8" y1="7.2" x2="18.8" y2="7.2" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="14.8" y1="10.2" x2="18.8" y2="10.2" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="15.8" y1="13.2" x2="18.8" y2="13.2" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Exact Heart with ECG pulse line icon for Health badge
const HealthHeartIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#FFFFFF"
    />
    <path
      d="M4.5 11h3l1.8-3.5 2.8 7 2.2-5 1.5 1.5h3.7"
      fill="none"
      stroke="#DC2626"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Exact 2-Person filled group icon for Community badge
const CommunityUsersIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
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
      title: 'Education & Human Capital',
      pathway: 'Learn → Develop → Excel',
      pathwayColor: 'text-[#1D4ED8]',
      description:
        'Expanding access to quality education, developing relevant skills and creating opportunities for people to learn, work and thrive.',
      image: '/images/pillar_education.jpg',
      icon: <EducationBookIcon />,
      badgeBg: 'bg-[#1D4ED8]',
      statColor: 'text-[#065F46]',
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
      linkColor: 'text-[#1D4ED8]',
    },
    {
      id: 'health',
      title: 'Health & Well-being',
      pathway: 'Prevent → Treat → Restore',
      pathwayColor: 'text-[#DC2626]',
      description:
        'Improving access to essential healthcare, prevention, early diagnosis and targeted medical intervention for healthier and more resilient communities.',
      image: '/images/pillar_health.jpg',
      icon: <HealthHeartIcon />,
      badgeBg: 'bg-[#DC2626]',
      statColor: 'text-[#DC2626]',
      stat1: {
        value: '5,000+',
        label: 'Consultations and screenings',
      },
      stat2: {
        value: '500+',
        label: 'People reached (2026 outreach)',
      },
      stat3: {
        value: 'XX',
        label: 'Primary healthcare facilities supported',
      },
      link: '/our-work/health',
      linkText: 'View Health Impact',
      linkColor: 'text-[#DC2626]',
    },
    {
      id: 'community',
      title: 'Community Resilience & Social Well-being',
      pathway: 'Support → Protect → Strengthen',
      pathwayColor: 'text-[#EA580C]',
      description:
        'Strengthening the ability of individuals, families and communities to meet essential needs, withstand shocks and maintain dignity and well-being.',
      image: '/images/pillar_community.jpg',
      icon: <CommunityUsersIcon />,
      badgeBg: 'bg-[#EA580C]',
      statColor: 'text-[#EA580C]',
      stat1: {
        value: 'XX',
        label: 'People reached',
      },
      stat2: {
        value: 'XX',
        label: 'Communities supported',
      },
      stat3: {
        value: 'XX',
        label: 'Water/Sanitation projects (placeholder)',
      },
      link: '/our-work/community-resilience',
      linkText: 'View Community Impact',
      linkColor: 'text-[#EA580C]',
    },
  ];

  return (
    <section className="w-full py-3 sm:py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 sm:mb-5">
          <div className="flex items-start gap-2.5">
            {/* Orange Vertical Bar */}
            <div className="w-[3.5px] h-6 sm:h-6.5 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F2B5B] uppercase tracking-tight leading-tight">
                IMPACT BY STRATEGIC PILLAR
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 font-normal leading-relaxed">
                Three interconnected areas creating lasting change in people&apos;s lives and communities.
              </p>
            </div>
          </div>

          <Link
            to="/our-work"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F4C3A] hover:text-[#14634C] shrink-0 transition-colors cursor-pointer self-start sm:self-auto sm:mt-0.5 group"
          >
            <span className="underline underline-offset-2">View All Programmes</span>
            <ArrowRight size={15} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── 3 Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Card Top Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlapping Floating Circle Badge */}
                <div className="px-6 relative -mt-7 z-10">
                  <div
                    className={`w-14 h-14 rounded-full ${pillar.badgeBg} text-white flex items-center justify-center border-4 border-white shadow-md`}
                  >
                    {pillar.icon}
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="px-6 pt-3 pb-2 space-y-2.5">
                  <h3 className="text-lg sm:text-[19px] font-extrabold text-[#0F2B5B] leading-snug tracking-tight">
                    {pillar.title}
                  </h3>

                  <div className={`text-xs sm:text-[13px] font-bold tracking-tight ${pillar.pathwayColor}`}>
                    {pillar.pathway}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Stats & Navigation Link */}
              <div className="px-6 pb-6 pt-1 space-y-4">
                {/* 3 Metric Columns with Vertical Divider Lines */}
                <div className="grid grid-cols-3 pt-3.5 border-t border-slate-100">
                  
                  {/* Metric 1 */}
                  <div className="pr-2 flex flex-col justify-start">
                    <div className={`flex items-center text-base sm:text-lg font-black leading-none ${pillar.statColor}`}>
                      {pillar.stat1.hasLocationPin && (
                        <MapPin size={16} className="text-[#065F46] fill-[#065F46]/20 stroke-[2.4] shrink-0 mr-1 inline-block" />
                      )}
                      <span>{pillar.stat1.value}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight pt-1.5 font-normal">
                      {pillar.stat1.label}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="px-2.5 border-l border-slate-200/90 flex flex-col justify-start">
                    <div className={`text-base sm:text-lg font-black leading-none ${pillar.statColor}`}>
                      {pillar.stat2.value}
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight pt-1.5 font-normal">
                      {pillar.stat2.label}
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="pl-2.5 border-l border-slate-200/90 flex flex-col justify-start">
                    <div className={`text-base sm:text-lg font-black leading-none ${pillar.statColor}`}>
                      {pillar.stat3.value}
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight pt-1.5 font-normal">
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
                    <ArrowRight size={15} strokeWidth={2.4} />
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
