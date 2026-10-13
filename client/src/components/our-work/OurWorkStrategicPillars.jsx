import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HeartPulse, Users, BarChart3, Check, ArrowRight } from 'lucide-react';

const OurWorkStrategicPillars = () => {
  const pillars = [
    {
      id: 'education',
      title: 'Education & Human Capital',
      pathway: 'Learn → Develop → Excel',
      description:
        'Expanding access to quality education, developing relevant skills and creating opportunities for people to learn, work and thrive.',
      image: '/images/pillar_graduates.jpg',
      icon: <BookOpen size={22} strokeWidth={2.4} />,
      badgeBg: 'bg-[#0B4891]',
      badgeBorder: 'border-white',
      accentColor: 'text-[#0B4891]',
      boxBg: 'bg-[#F0F6FF]',
      boxBorder: 'border-[#DBEAFE]',
      dotColor: 'text-[#0B4891]',
      checkColor: 'text-emerald-600',
      buttonBg: 'bg-[#0B4891] hover:bg-[#083870]',
      link: '/our-work/education',
      buttonText: 'Explore Education',
      programmeCount: 10,
      programmes: [
        'Academic Excellence',
        'University Scholarships',
        'Teacher Excellence',
        'Graduate Finishing & Professional Readiness',
        'Skills & Capacity Development',
      ],
      targetBeneficiaries:
        'Children & young people, students, teachers & educators, young graduates and underserved communities.',
      outcomes: [
        'Improved learning outcomes',
        'Increased access to education',
        'Stronger skills and capabilities',
        'More opportunities for a brighter future',
      ],
    },
    {
      id: 'health',
      title: 'Health & Well-being',
      pathway: 'Prevent → Treat → Restore',
      description:
        'Improving access to essential healthcare, prevention, early diagnosis and targeted medical intervention for healthier and more resilient communities.',
      image: '/images/pillar_health.jpg',
      icon: <HeartPulse size={22} strokeWidth={2.4} />,
      badgeBg: 'bg-[#DC2626]',
      badgeBorder: 'border-white',
      accentColor: 'text-[#DC2626]',
      boxBg: 'bg-[#FEF2F2]',
      boxBorder: 'border-[#FEE2E2]',
      dotColor: 'text-[#DC2626]',
      checkColor: 'text-[#DC2626]',
      buttonBg: 'bg-[#DC2626] hover:bg-[#B91C1C]',
      link: '/our-work/health',
      buttonText: 'Explore Health',
      programmeCount: 10,
      programmes: [
        'Maternal, Women & Reproductive Health',
        'Child Health & Nutrition',
        'Community Health Outreach',
        'Primary Healthcare Strengthening',
        'Eye Care & Vision',
      ],
      targetBeneficiaries:
        'Women & mothers, children, families, older persons and vulnerable communities.',
      outcomes: [
        'Healthier mothers and children',
        'Improved access to healthcare',
        'Early detection and treatment',
        'Stronger, healthier communities',
      ],
    },
    {
      id: 'community',
      title: 'Community Resilience & Social Well-being',
      pathway: 'Support → Protect → Strengthen',
      description:
        'Strengthening the ability of individuals, families and communities to meet essential needs, withstand shocks and maintain dignity and well-being.',
      image: '/images/pillar_community_elderly.jpg',
      icon: <Users size={22} strokeWidth={2.4} />,
      badgeBg: 'bg-[#EA580C]',
      badgeBorder: 'border-white',
      accentColor: 'text-[#EA580C]',
      boxBg: 'bg-[#FFF7ED]',
      boxBorder: 'border-[#FFEDD5]',
      dotColor: 'text-[#EA580C]',
      checkColor: 'text-[#EA580C]',
      buttonBg: 'bg-[#EA580C] hover:bg-[#C2410C]',
      link: '/our-work/community-resilience',
      buttonText: 'Explore Community',
      programmeCount: 10,
      programmes: [
        'Food Security & Nutrition',
        'Clean Water & Sanitation',
        'Elderly & Social Care',
        'Emergency Response & Recovery',
        'Household Resilience',
      ],
      targetBeneficiaries:
        'Families & households, children, older persons, persons with disabilities and underserved communities.',
      outcomes: [
        'Greater food and water security',
        'Stronger, more resilient communities',
        'Improved social inclusion and support',
        'Enhanced dignity and quality of life',
      ],
    },
  ];

  return (
    <section id="our-work-pillars" className="py-4 sm:py-6 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header matching screenshot ── */}
        <div className="flex items-start gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          {/* Orange Vertical Accent Bar */}
          <div className="w-1.5 h-9 sm:h-10 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
          
          <div className="space-y-0.5">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#0F4C3A] block">
              OUR STRATEGIC PILLARS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F2B5B] tracking-tight leading-tight">
              Three Pillars. One Brighter Future.
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13.5px] font-normal leading-relaxed max-w-3xl pt-0.5">
              Our work focuses on three interconnected areas that create lasting change in people&apos;s lives and communities.
            </p>
          </div>
        </div>

        {/* ── 3 Strategic Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* 1. Card Top Photographic Banner */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* 2. Floating Circular Icon Badge */}
                <div className="px-4 sm:px-5 relative -mt-5 z-10">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${pillar.badgeBg} text-white flex items-center justify-center border-[3px] border-white shadow-sm`}
                  >
                    {pillar.icon}
                  </div>
                </div>

                {/* 3. Title, Pathway & Descriptive Text */}
                <div className="px-4 sm:px-5 pt-2 pb-2 space-y-1.5">
                  <h3 className="text-lg sm:text-[19px] font-extrabold text-[#0F2B5B] leading-snug tracking-tight">
                    {pillar.title}
                  </h3>

                  <div className={`text-xs font-bold tracking-tight ${pillar.accentColor}`}>
                    {pillar.pathway}
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* 4. Three Information Tinted Boxes */}
                <div className="px-4 sm:px-5 pb-1 space-y-2">
                  
                  {/* Box A: Programme Families (10) */}
                  <div className={`rounded-lg sm:rounded-xl p-2.5 sm:p-3 ${pillar.boxBg} border ${pillar.boxBorder} space-y-1.5`}>
                    <h4 className={`text-xs font-bold ${pillar.accentColor}`}>
                      Programme Families ({pillar.programmeCount})
                    </h4>

                    <ul className="space-y-1 text-[11.5px] sm:text-xs text-slate-700 font-medium">
                      {pillar.programmes.map((prog, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className={`${pillar.dotColor} text-sm leading-none select-none`}>•</span>
                          <span>{prog}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-0.5">
                      <Link
                        to={pillar.link}
                        className={`inline-flex items-center gap-1 text-[11.5px] font-bold ${pillar.accentColor} hover:underline cursor-pointer`}
                      >
                        <span>View all programmes</span>
                        <ArrowRight size={12} strokeWidth={2.4} />
                      </Link>
                    </div>
                  </div>

                  {/* Box B: Target Beneficiaries */}
                  <div className={`rounded-lg sm:rounded-xl p-2.5 sm:p-3 ${pillar.boxBg} border ${pillar.boxBorder} flex items-start gap-2.5`}>
                    <div className={`${pillar.accentColor} shrink-0 mt-0.5`}>
                      <Users size={16} strokeWidth={2.3} />
                    </div>
                    <div className="space-y-0.5">
                      <div className={`text-xs font-bold leading-none ${pillar.accentColor}`}>
                        Target Beneficiaries
                      </div>
                      <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-snug font-normal">
                        {pillar.targetBeneficiaries}
                      </p>
                    </div>
                  </div>

                  {/* Box C: Key Outcomes */}
                  <div className={`rounded-lg sm:rounded-xl p-2.5 sm:p-3 ${pillar.boxBg} border ${pillar.boxBorder} space-y-1.5`}>
                    <div className="flex items-center gap-2">
                      <div className={`${pillar.accentColor} shrink-0`}>
                        <BarChart3 size={15} strokeWidth={2.3} />
                      </div>
                      <div className={`text-xs font-bold ${pillar.accentColor}`}>
                        Key Outcomes
                      </div>
                    </div>

                    <ul className="space-y-1 pl-4 text-[11px] sm:text-[11.5px] text-slate-700 font-normal">
                      {pillar.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <Check size={13} className={`${pillar.checkColor} stroke-[2.8] shrink-0 mt-0.5`} />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* 5. Full-Width Bottom CTA Button */}
              <div className="px-4 sm:px-5 pb-4 pt-2">
                <Link
                  to={pillar.link}
                  className={`w-full ${pillar.buttonBg} text-white font-extrabold text-xs sm:text-[13px] py-2.5 px-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
                >
                  <span>{pillar.buttonText}</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurWorkStrategicPillars;
