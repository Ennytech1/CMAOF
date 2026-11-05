import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HeartPulse, Users, TrendingUp, Check, ArrowRight, ShieldCheck } from 'lucide-react';

const OurWorkStrategicPillars = () => {
  const pillars = [
    {
      id: 'education',
      number: '01',
      title: 'Education & Opportunity',
      pathway: 'Learn → Develop → Excel',
      description:
        'Expanding access to quality schooling, modern STEM labs, academic scholarships, and technical skills that empower youth to thrive in the modern economy.',
      image: '/images/pillar_graduates.jpg',
      icon: <BookOpen size={22} strokeWidth={2.4} />,
      colorHex: '#0047BA',
      badgeBg: 'bg-[#0047BA]',
      lightBg: 'bg-[#F0F6FD]',
      borderColor: 'border-[#CCE0F8]',
      accentColor: 'text-[#0047BA]',
      link: '/our-work/education',
      buttonText: 'Explore Education',
      buttonBg: 'bg-[#0047BA] hover:bg-[#00368F] text-white',
      programmeCount: 10,
      keyProgrammes: [
        'Academic Excellence & STEM Labs',
        'University & Polytechnic Scholarships',
        'Teacher Excellence & Pedagogy',
        'Technical & Vocational Trades',
      ],
      targetBeneficiaries: 'Students, youth scholars, teachers & apprentice artisans',
      primaryOutcome: '98% completion rate & full tuition endowments',
    },
    {
      id: 'health',
      number: '02',
      title: 'Health & Wellbeing',
      pathway: 'Prevent → Treat → Restore',
      description:
        'Improving frontline healthcare delivery, maternal & pediatric care, rural medical clinics, and vision restoration for healthier, resilient communities.',
      image: '/images/pillar_health.jpg',
      icon: <HeartPulse size={22} strokeWidth={2.4} />,
      colorHex: '#338C26',
      badgeBg: 'bg-[#338C26]',
      lightBg: 'bg-[#F0F8F0]',
      borderColor: 'border-[#C5E6C2]',
      accentColor: 'text-[#338C26]',
      link: '/our-work/health',
      buttonText: 'Explore Health',
      buttonBg: 'bg-[#338C26] hover:bg-[#266E1C] text-white',
      programmeCount: 10,
      keyProgrammes: [
        'Maternal & Reproductive Healthcare',
        'Child Nutrition & Pediatric Care',
        'Community Medical Outreaches',
        'Eye Care & Vision Restoration Surgeries',
      ],
      targetBeneficiaries: 'Mothers, infants, senior citizens & rural households',
      primaryOutcome: 'Free surgeries & solar-powered primary care clinics',
    },
    {
      id: 'humanitarian',
      number: '03',
      title: 'Humanitarian Support',
      pathway: 'Relieve → Rebuild → Sustain',
      description:
        'Strengthening the safety nets of vulnerable families through food aid, clean solar water boreholes, senior welfare packages, and rapid crisis relief.',
      image: '/images/pillar_community_elderly.jpg',
      icon: <Users size={22} strokeWidth={2.4} />,
      colorHex: '#5B2E19',
      badgeBg: 'bg-[#5B2E19]',
      lightBg: 'bg-[#FAF6EE]',
      borderColor: 'border-[#EADDC9]',
      accentColor: 'text-[#5B2E19]',
      link: '/our-work/humanitarian-support',
      buttonText: 'Explore Humanitarian',
      buttonBg: 'bg-[#5B2E19] hover:bg-[#3D1E10] text-[#FAF6EE]',
      programmeCount: 10,
      keyProgrammes: [
        'Food Security & Nutrition Aid',
        'Clean Water & Solar Boreholes (WASH)',
        'Senior Citizens Dignity Packages',
        'Disability Mobility & Assistive Kits',
      ],
      targetBeneficiaries: 'Impoverished families, senior citizens & disaster victims',
      primaryOutcome: 'Potable water access & permanent welfare safety nets',
    },
    {
      id: 'economic-empowerment',
      number: '04',
      title: 'Economic Empowerment',
      pathway: 'Empower → Produce → Thrive',
      description:
        'Fostering financial self-sufficiency through vocational apprenticeships, agricultural enablement, micro-seed grants, and youth startup incubation.',
      image: '/images/past_event_seedling_girl.jpg',
      icon: <TrendingUp size={22} strokeWidth={2.4} className="text-[#3D1E10]" />,
      colorHex: '#FCCD37',
      badgeBg: 'bg-[#FCCD37]',
      lightBg: 'bg-[#FFFBF0]',
      borderColor: 'border-[#F8E39D]',
      accentColor: 'text-[#7A5200]',
      link: '/our-work/economic-empowerment',
      buttonText: 'Explore Empowerment',
      buttonBg: 'bg-[#FCCD37] hover:bg-[#E8B823] text-[#3D1E10] font-black',
      programmeCount: 10,
      keyProgrammes: [
        'Vocational Trades Apprenticeships',
        'Agri-Enterprise Value Chains',
        'Financial Literacy & Cooperative Credit',
        'Youth Seed Grants & Tech Incubation',
      ],
      targetBeneficiaries: 'Artisans, smallholder farmers, youth & women traders',
      primaryOutcome: 'Micro-grants, enterprise growth & certified trades',
    },
  ];

  return (
    <section id="our-work-pillars" className="py-8 sm:py-12 bg-[#FCFBF8] font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-[#E8DEC2]/80">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-11 sm:h-13 bg-[#FCCD37] rounded-full shrink-0 mt-0.5 shadow-2xs" />
            <div className="space-y-1">
              <span className="text-xs sm:text-[12.5px] font-black uppercase tracking-wider text-[#5B2E19] block">
                STRATEGIC IMPACT FRAMEWORK
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#5B2E19] tracking-tight leading-tight">
                Four Strategic Pillars. One Sustainable Nigeria.
              </h2>
              <p className="text-slate-600 text-xs sm:text-[14px] font-normal leading-relaxed max-w-2xl pt-0.5">
                Our interventions are structured across four synergistic pillars engineered to break systemic barriers, foster self-reliance, and build lasting intergenerational change.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 self-end">
            <span className="text-xs font-semibold text-[#5B2E19]/80 bg-white px-3 py-1.5 rounded-full border border-[#E8DEC2] shadow-2xs flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#338C26]" />
              <span>40 Flagship Programmes Nationwide</span>
            </span>
          </div>
        </div>

        {/* ── 4 Strategic Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#5B2E19]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* 1. Photographic Banner with Number & Pathway Badge */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-[#5B2E19] text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
                      Pillar {pillar.number}
                    </span>
                    <span 
                      className="text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs bg-white text-[#5B2E19]"
                    >
                      {pillar.pathway}
                    </span>
                  </div>
                </div>

                {/* 2. Floating Circular Icon Emblem */}
                <div className="px-5 relative -mt-6 z-10 flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl ${pillar.badgeBg} text-white flex items-center justify-center border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-105`}
                  >
                    {pillar.icon}
                  </div>
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#5B2E19]/70 bg-[#FAF6EE] px-2 py-0.5 rounded-md border border-[#E8DEC2]">
                    10 Initiatives
                  </span>
                </div>

                {/* 3. Title, Pathway & Descriptive Text */}
                <div className="px-5 pt-3 pb-3 space-y-2">
                  <h3 className="text-xl font-black text-[#5B2E19] leading-tight tracking-tight group-hover:text-[#0047BA] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* 4. Structured Impact Highlights Box */}
                <div className="px-5 pb-3">
                  <div className={`rounded-xl p-3.5 ${pillar.lightBg} border ${pillar.borderColor} space-y-2.5`}>
                    
                    {/* Key Initiatives */}
                    <div className="space-y-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${pillar.accentColor} block`}>
                        Core Interventions
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700 font-medium">
                        {pillar.keyProgrammes.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className={`${pillar.accentColor} text-sm leading-none`}>•</span>
                            <span className="text-[11.5px]">{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Primary Outcome */}
                    <div className="pt-2 border-t border-black/5 flex items-start gap-2">
                      <Check size={14} className={`${pillar.accentColor} stroke-[3] shrink-0 mt-0.5`} />
                      <div className="text-[11px] text-slate-700 font-medium leading-snug">
                        <span className="font-bold text-[#5B2E19]">Expected Impact: </span>
                        {pillar.primaryOutcome}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* 5. Full-Width Bottom CTA Button */}
              <div className="px-5 pb-5 pt-1">
                <Link
                  to={pillar.link}
                  className={`w-full ${pillar.buttonBg} text-xs sm:text-[13px] font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all group-hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
                >
                  <span>{pillar.buttonText}</span>
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
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
