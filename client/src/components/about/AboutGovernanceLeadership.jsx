import React from 'react';
import { founderImages } from '../../assets/founderImages';

// Custom filled SVG icons matching the reference image 100%
const ShieldCheckIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9 text-[#0F4C3A]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9 text-[#0F4C3A]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const UsersGroupIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9 text-[#0F4C3A]" viewBox="0 0 24 24" fill="currentColor">
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

const GearSettingsIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9 text-[#0F4C3A]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const LeavesSproutIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9 text-[#0F4C3A]" viewBox="0 0 24 24" fill="currentColor">
    {/* Stem */}
    <path d="M12 21a10 10 0 0 0 1-5v-6h-2v6a8 8 0 0 1-.8 3.5L12 21z" />
    {/* Left Leaf */}
    <path d="M11 11C6.5 11 3.5 7 3.5 3c4.5 0 8.5 3.5 8.5 7.5 0 .17-.02.34-.05.5z" />
    {/* Right Leaf */}
    <path d="M13 11c4.5 0 7.5-4 7.5-8-4.5 0-8.5 3.5-8.5 7.5 0 .17.02.34.05.5z" />
  </svg>
);

const governancePillars = [
  {
    id: 1,
    icon: ShieldCheckIcon,
    title1: 'Responsible',
    title2: 'leadership',
  },
  {
    id: 2,
    icon: FileTextIcon,
    title1: 'Transparent',
    title2: 'operations',
  },
  {
    id: 3,
    icon: UsersGroupIcon,
    title1: 'Accountable',
    title2: 'stewardship',
  },
  {
    id: 4,
    icon: GearSettingsIcon,
    title1: 'Ethical',
    title2: 'practices',
  },
  {
    id: 5,
    icon: LeavesSproutIcon,
    title1: 'Sustainable',
    title2: 'impact',
  },
];

const leaders = [
  {
    id: 1,
    image: founderImages.founder7,
    role: 'Founder & Chairman',
    subRole: 'Board of Trustees',
  },
  {
    id: 2,
    image: '/images/leader_member_1.jpg',
    role: 'Member',
    subRole: 'Board of Trustees',
  },
  {
    id: 3,
    image: '/images/leader_member_2.jpg',
    role: 'Member',
    subRole: 'Board of Trustees',
  },
  {
    id: 4,
    image: '/images/leader_director.jpg',
    role: 'Executive Director',
    subRole: null,
  },
];

const geographicLegend = [
  { label: 'North Central', color: 'bg-[#0F4C3A]' },
  { label: 'South West', color: 'bg-[#0F4C3A]' },
  { label: 'South East', color: 'bg-[#EA580C]' },
  { label: 'South South', color: 'bg-[#EA580C]' },
  { label: 'Core Focus States', color: 'bg-[#F59E0B]' },
  { label: 'Expansion States', color: 'bg-[#FDE68A]' },
];

const AboutGovernanceLeadership = () => {
  return (
    <section className="w-full bg-white text-slate-800 py-10 md:py-14">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-14">
        
        {/* ========================================================= */}
        {/* TOP SECTION: OUR GOVERNANCE                               */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
          
          {/* Left Column: Governance Info */}
          <div className="w-full lg:w-[38%] space-y-3.5">
            {/* Eyebrow & Title with Orange Accent Bar */}
            <div className="flex items-start gap-3">
              <div className="w-[3.5px] h-12 md:h-14 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-[#0F2B5B] uppercase tracking-wider mb-1">
                  OUR GOVERNANCE
                </span>
                <h2 className="text-2xl md:text-[27px] font-bold text-[#0F2B5B] leading-tight tracking-tight">
                  Built on Trust and Accountability
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs md:text-[13px] leading-relaxed max-w-lg">
              CMAOF is guided by a strong governance structure that ensures transparency, 
              accountability and effective stewardship of resources, in line with best 
              practices for philanthropic organisations.
            </p>

            {/* Outlined Pill Button */}
            <div className="pt-1.5">
              <a
                href="#governance-approach"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0F4C3A] text-[#0F4C3A] text-xs font-semibold hover:bg-[#0F4C3A] hover:text-white transition-all duration-200"
              >
                <span>Our Governance Approach</span>
                <span className="text-sm font-bold leading-none">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5-Pillar Icon Grid with Clean Dividers */}
          <div className="w-full lg:w-[62%]">
            <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/90">
              {governancePillars.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="flex flex-col items-center text-center px-2 py-3 sm:py-1 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="h-11 flex items-center justify-center mb-2.5">
                      <IconComponent />
                    </div>
                    <p className="text-xs md:text-[13px] font-semibold text-[#0F2B5B] leading-snug">
                      <span className="block">{item.title1}</span>
                      <span className="block">{item.title2}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: OUR LEADERSHIP & OUR GEOGRAPHIC FOCUS     */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-7">
          
          {/* Left Column: Leadership Intro (~24% width) */}
          <div className="w-full lg:w-[24%] flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              {/* Eyebrow & Title with Orange Accent Bar */}
              <div className="flex items-start gap-3">
                <div className="w-[3.5px] h-12 md:h-14 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-[#0F2B5B] uppercase tracking-wider mb-1">
                    OUR LEADERSHIP
                  </span>
                  <h2 className="text-xl md:text-[23px] font-bold text-[#0F2B5B] leading-tight tracking-tight">
                    Guided by Experienced and Committed Leaders
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs md:text-[13px] leading-relaxed">
                Our Board of Trustees and leadership team bring diverse expertise, deep commitment 
                and a shared passion for creating lasting impact in Nigeria.
              </p>
            </div>

            {/* Outlined Pill Button */}
            <div className="pt-2">
              <a
                href="#meet-leadership"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0F4C3A] text-[#0F4C3A] text-xs font-semibold hover:bg-[#0F4C3A] hover:text-white transition-all duration-200"
              >
                <span>Meet Our Leadership</span>
                <span className="text-sm font-bold leading-none">→</span>
              </a>
            </div>
          </div>

          {/* Middle Column: 4 Leadership Portrait Cards (~46% width) */}
          <div className="w-full lg:w-[46%]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {leaders.map((leader) => (
                <div 
                  key={leader.id}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_3px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-slate-300 group"
                >
                  {/* Portrait Image */}
                  <div className="w-full aspect-[4/5] bg-slate-100 overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.role}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Card Content & Role */}
                  <div className="p-3 pt-2.5 pb-3 flex flex-col justify-between flex-1 bg-white">
                    <div className="min-h-[38px]">
                      <h4 className="text-[#0F4C3A] font-bold text-xs sm:text-[13px] leading-tight">
                        {leader.role}
                      </h4>
                      {leader.subRole ? (
                        <p className="text-slate-500 text-[11px] mt-0.5 leading-tight">
                          {leader.subRole}
                        </p>
                      ) : (
                        <div className="h-[14px]" />
                      )}
                    </div>
                    
                    {/* Bottom Left Arrow */}
                    <div className="mt-2.5 flex items-center">
                      <span className="text-[#0F4C3A] text-sm font-bold leading-none group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Geographic Focus (~30% width) */}
          <div className="w-full lg:w-[30%] space-y-3.5">
            <div>
              {/* Eyebrow with Orange Accent Bar */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[3px] h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs font-bold text-[#0F2B5B] uppercase tracking-wider">
                  OUR GEOGRAPHIC FOCUS
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs md:text-[12.5px] leading-relaxed">
                We work across Nigeria, focusing on selected states and communities where 
                the need is greatest and our programmes can achieve meaningful, lasting impact.
              </p>
            </div>

            {/* Map & Legend Side-by-Side */}
            <div className="flex items-center justify-between gap-2 pt-1">
              
              {/* Legend List */}
              <div className="space-y-1.5 shrink-0 text-[11px] sm:text-xs">
                {geographicLegend.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.color}`} />
                    <span className="text-slate-700 font-medium leading-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Nigeria Vector Map Image */}
              <div className="w-[58%] flex items-center justify-center">
                <img 
                  src="/images/nigeria_geographic_map.jpg" 
                  alt="Nigeria Geographic Focus Map" 
                  className="w-full max-h-[165px] object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutGovernanceLeadership;
