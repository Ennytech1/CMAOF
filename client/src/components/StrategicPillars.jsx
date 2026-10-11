import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HeartPulse, Users, ArrowRight } from 'lucide-react';

const StrategicPillars = () => {
  const pillars = [
    {
      id: 'education',
      title: 'Education & Human Capital',
      pathway: 'Learn → Develop → Excel',
      description:
        'Expanding access to quality education, developing relevant skills and creating opportunities for people to learn, work and thrive.',
      image: '/images/pillar_education.jpg',
      icon: <BookOpen size={20} strokeWidth={2.4} />,
      badgeBg: 'bg-[#2563EB]',
      accentColor: 'text-[#2563EB]',
      bottomBorder: 'border-b-4 border-[#2563EB]',
      link: '/our-work/education',
      linkText: 'Explore Education',
    },
    {
      id: 'health',
      title: 'Health & Well-being',
      pathway: 'Prevent → Treat → Restore',
      description:
        'Improving access to essential healthcare, prevention, early diagnosis and targeted medical intervention for healthier and more resilient communities.',
      image: '/images/pillar_health.jpg',
      icon: <HeartPulse size={20} strokeWidth={2.4} />,
      badgeBg: 'bg-[#DC2626]',
      accentColor: 'text-[#DC2626]',
      bottomBorder: 'border-b-4 border-[#DC2626]',
      link: '/our-work/health',
      linkText: 'Explore Health',
    },
    {
      id: 'community',
      title: 'Community Resilience & Social Well-being',
      pathway: 'Support → Protect → Strengthen',
      description:
        'Strengthening the ability of individuals, families and communities to meet essential needs, withstand shocks and maintain dignity and well-being.',
      image: '/images/pillar_community.jpg',
      icon: <Users size={20} strokeWidth={2.4} />,
      badgeBg: 'bg-[#EA580C]',
      accentColor: 'text-[#EA580C]',
      bottomBorder: 'border-b-4 border-[#EA580C]',
      link: '/our-work/community-resilience',
      linkText: 'Explore Community',
    },
  ];

  return (
    <section id="our-work" className="py-14 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 bg-[#EA580C] rounded-full inline-block" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0F4C3A]">
                OUR WORK
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2B5B] tracking-tight">
              Three Pillars for Stronger Communities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              We focus on three interconnected areas that create lasting change in people’s lives and communities.
            </p>
          </div>

          <Link
            to="/our-work"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F4C3A] hover:text-[#14634C] hover:underline shrink-0 group cursor-pointer"
          >
            <span>View All Programmes</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── 3 Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${pillar.bottomBorder}`}
            >
              <div>
                {/* Card Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlapping Floating Circle Badge */}
                <div className="px-6 relative -mt-6 z-10">
                  <div
                    className={`w-12 h-12 rounded-full ${pillar.badgeBg} text-white flex items-center justify-center border-4 border-white shadow-md`}
                  >
                    {pillar.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 pt-3 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2B5B] leading-snug group-hover:text-[#0F4C3A] transition-colors">
                    {pillar.title}
                  </h3>

                  <div className={`text-xs sm:text-sm font-bold tracking-tight ${pillar.accentColor}`}>
                    {pillar.pathway}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="px-6 pb-6 pt-1">
                <Link
                  to={pillar.link}
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${pillar.accentColor} hover:gap-2.5 transition-all group-hover:underline cursor-pointer`}
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight size={15} strokeWidth={2.4} />
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
