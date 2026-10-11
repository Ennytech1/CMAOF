import React from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2 
} from 'lucide-react';

// Custom Heart with ECG wave icon for Card 3
const HeartbeatIcon = () => (
  <svg className="w-8 h-8 text-[#DC2626]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    <path 
      d="M3 11h3l2-4 3 8 2-6 2 2h4" 
      fill="none" 
      stroke="#FFFFFF" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// Custom filled 3-person group icon
const GroupPeopleIcon = ({ colorClass }) => (
  <svg className={`w-8 h-8 ${colorClass}`} viewBox="0 0 24 24" fill="currentColor">
    {/* Center person */}
    <circle cx="12" cy="7" r="3" />
    <path d="M12 11.5c-2.8 0-5.2 1.4-5.2 3.5V17h10.4v-2c0-2.1-2.4-3.5-5.2-3.5z" />
    {/* Left person */}
    <circle cx="6" cy="9" r="2.2" />
    <path d="M6 12.5c-1.8 0-3.3.9-3.3 2.4V16.5h2.8v-1.6c0-.9.3-1.6.5-2.4z" />
    {/* Right person */}
    <circle cx="18" cy="9" r="2.2" />
    <path d="M18 12.5c1.8 0 3.3.9 3.3 2.4V16.5h-2.8v-1.6c0-.9-.3-1.6-.5-2.4z" />
  </svg>
);

const statCards = [
  {
    id: 1,
    icon: <GroupPeopleIcon colorClass="text-[#064E3B]" />,
    stat: '500+',
    statColor: 'text-[#064E3B]',
    label: 'People reached through 2026 medical outreach',
  },
  {
    id: 2,
    icon: <GraduationCap className="w-8 h-8 text-[#1D4ED8]" strokeWidth={2.2} />,
    stat: '1,200+',
    statColor: 'text-[#1D4ED8]',
    label: 'Students supported (placeholder)',
  },
  {
    id: 3,
    icon: <HeartbeatIcon />,
    stat: '5,000+',
    statColor: 'text-[#DC2626]',
    label: 'Medical consultations and screenings (placeholder)',
  },
  {
    id: 4,
    icon: <GroupPeopleIcon colorClass="text-[#EA580C]" />,
    stat: '30+',
    statColor: 'text-[#EA580C]',
    label: 'Communities served across key locations (placeholder)',
  },
];

const commitments = [
  'Evidence-led programmes',
  'Transparent reporting',
  'Responsible use of resources',
  'Continuous learning and improvement',
];

const ImpactStatsStrip = () => {
  return (
    <section className="w-full bg-white border-t border-b border-slate-100 py-8 md:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 lg:gap-3.5 xl:gap-4 items-stretch">
          
          {/* ── Block 1: Left Header (Col 1-2) ── */}
          <div className="lg:col-span-2 flex items-start gap-3 justify-center lg:justify-start py-2 lg:py-0">
            <div className="w-[3.5px] h-12 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
            <div className="space-y-1 text-left">
              <span className="block text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                OUR IMPACT
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F2B5B] tracking-tight leading-tight">
                AT A GLANCE
              </h2>
              <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed pt-0.5">
                Transforming lives through education, health and community support.
              </p>
            </div>
          </div>

          {/* ── Blocks 2–5: 4 Metric Cards (Col 3-10, 2 cols each) ── */}
          {statCards.map((card) => (
            <div
              key={card.id}
              className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-200 p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2"
            >
              <div className="h-9 flex items-center justify-center">
                {card.icon}
              </div>
              <div className={`text-2xl sm:text-3xl font-black ${card.statColor} tracking-tight leading-none`}>
                {card.stat}
              </div>
              <p className="text-slate-600 text-xs sm:text-[11.5px] leading-tight font-normal max-w-[170px]">
                {card.label}
              </p>
            </div>
          ))}

          {/* ── Block 6: Right Commitment Checklist (Col 11-12) ── */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-2.5 py-2 lg:py-0 pl-1 lg:pl-2">
            <span className="block text-xs font-bold text-[#064E3B] uppercase tracking-wider">
              OUR COMMITMENT
            </span>
            <ul className="space-y-2">
              {commitments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-left">
                  <div className="w-4 h-4 rounded-full bg-[#064E3B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 fill-none stroke-white stroke-[2.5]" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-slate-700 text-xs sm:text-[11.5px] font-medium leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactStatsStrip;
