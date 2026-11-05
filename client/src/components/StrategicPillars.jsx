import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HeartPulse, Users, TrendingUp, ArrowRight } from 'lucide-react';

const StrategicPillars = () => {
  const pillars = [
    {
      id: 'education',
      title: 'Education & Opportunity',
      pathway: 'Learn → Develop → Excel',
      description:
        'Expanding access to quality education, developing relevant skills and creating opportunities for people to learn, work and thrive.',
      image: '/images/pillar_education.jpg',
      icon: <BookOpen size={20} strokeWidth={2.4} />,
      badgeBg: 'bg-[#0047BA]',
      accentColor: 'text-[#0047BA]',
      bottomBorder: 'border-b-4 border-[#0047BA]',
      link: '/our-work/education',
      linkText: 'Explore Education',
    },
    {
      id: 'health',
      title: 'Health & Wellbeing',
      pathway: 'Prevent → Treat → Restore',
      description:
        'Improving access to essential healthcare, prevention, early diagnosis and targeted medical intervention for healthier communities.',
      image: '/images/pillar_health.jpg',
      icon: <HeartPulse size={20} strokeWidth={2.4} />,
      badgeBg: 'bg-[#338C26]',
      accentColor: 'text-[#338C26]',
      bottomBorder: 'border-b-4 border-[#338C26]',
      link: '/our-work/health',
      linkText: 'Explore Health',
    },
    {
      id: 'humanitarian',
      title: 'Humanitarian Support',
      pathway: 'Relieve → Rebuild → Sustain',
      description:
        'Strengthening the ability of vulnerable families and communities to withstand crisis, secure water & food, and sustain dignity.',
      image: '/images/pillar_community.jpg',
      icon: <Users size={20} strokeWidth={2.4} />,
      badgeBg: 'bg-[#5B2E19]',
      accentColor: 'text-[#5B2E19]',
      bottomBorder: 'border-b-4 border-[#5B2E19]',
      link: '/our-work/humanitarian-support',
      linkText: 'Explore Humanitarian',
    },
    {
      id: 'economic-empowerment',
      title: 'Economic Empowerment',
      pathway: 'Empower → Produce → Thrive',
      description:
        'Fostering self-reliance through vocational mastery, agricultural enablement, micro-grants, and sustainable enterprise development.',
      image: '/images/pillar_graduates.jpg',
      icon: <TrendingUp size={20} strokeWidth={2.4} className="text-[#5B2E19]" />,
      badgeBg: 'bg-[#FCCD37]',
      accentColor: 'text-[#5B2E19]',
      bottomBorder: 'border-b-4 border-[#FCCD37]',
      link: '/our-work/economic-empowerment',
      linkText: 'Explore Empowerment',
    },
  ];

  return (
    <section id="our-work" className="py-10 sm:py-14 bg-[#FAF6EE] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#FCCD37] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                OUR WORK & STRATEGIC PILLARS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
              Four Pillars for Stronger Communities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
              We focus on four interconnected programmatic pillars that create lasting change in people’s lives and communities across Nigeria.
            </p>
          </div>

          <Link
            to="/our-work"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5B2E19] hover:text-[#0047BA] transition-colors shrink-0 group cursor-pointer"
          >
            <span>View All Programmes</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── 4 Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`bg-white rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${pillar.bottomBorder}`}
            >
              <div>
                {/* Card Image Banner */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlapping Floating Circle Badge */}
                <div className="px-5 relative -mt-6 z-10">
                  <div
                    className={`w-12 h-12 rounded-full ${pillar.badgeBg} text-white flex items-center justify-center border-4 border-white shadow-md`}
                  >
                    {pillar.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-5 pt-3 pb-2 space-y-2">
                  <h3 className="text-lg font-black text-[#5B2E19] leading-snug group-hover:text-[#0047BA] transition-colors">
                    {pillar.title}
                  </h3>

                  <div className={`text-xs font-extrabold tracking-tight ${pillar.accentColor}`}>
                    {pillar.pathway}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="px-5 pb-5 pt-2">
                <Link
                  to={pillar.link}
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${pillar.accentColor} hover:gap-2.5 transition-all group-hover:underline cursor-pointer`}
                >
                  <span>{pillar.linkText}</span>
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

export default StrategicPillars;
