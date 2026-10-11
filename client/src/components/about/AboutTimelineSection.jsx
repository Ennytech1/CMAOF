import React from 'react';
import { BookOpen, Users, Leaf, BarChart3, ArrowRight } from 'lucide-react';

const AboutTimelineSection = () => {
  const milestones = [
    {
      year: '2007',
      yearColor: 'text-[#0F4C3A]',
      icon: <BookOpen size={18} strokeWidth={2.2} />,
      badgeBg: 'bg-[#054E3B] text-white',
      title: 'Elizade Ojo Educational Foundation',
      desc: 'Established to support education and human development.',
      cardBg: 'bg-white rounded-xl p-3 shadow-sm border border-slate-200/80'
    },
    {
      year: '2015',
      yearColor: 'text-[#0F4C3A]',
      icon: <Users size={18} strokeWidth={2.2} />,
      badgeBg: 'bg-[#054E3B] text-white',
      title: 'Expanding Impact',
      desc: 'Increased support for scholarships, schools and community initiatives.',
      cardBg: 'bg-white rounded-xl p-3 shadow-sm border border-slate-200/80'
    },
    {
      year: '2021',
      yearColor: 'text-[#EA580C]',
      icon: <Leaf size={18} strokeWidth={2.2} />,
      badgeBg: 'bg-[#EA580C] text-white',
      title: 'Chief Michael Ade.Ojo Foundation (CMAOF)',
      desc: 'Rebranded with an expanded focus beyond education to include health and community development.',
      cardBg: 'bg-white rounded-xl p-3 shadow-sm border border-slate-200/80'
    },
    {
      year: 'Today',
      yearColor: 'text-[#0F2B5B]',
      icon: <BarChart3 size={18} strokeWidth={2.2} />,
      badgeBg: 'bg-[#0F2B5B] text-white',
      title: 'Stronger People. Brighter Communities.',
      desc: 'Continuing the legacy with greater reach, deeper impact and a commitment to a brighter Nigeria.',
      cardBg: 'bg-transparent p-3'
    }
  ];

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white">
        
        <div className="flex flex-col lg:flex-row">

          {/* ════ LEFT: Nature / Sprout Banner ════ */}
          <div className="lg:w-[38%] relative overflow-hidden min-h-[220px] p-6 sm:p-8 flex flex-col justify-center shrink-0">
            
            {/* Seedling background image */}
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url('/images/timeline_sprout_bg.jpg')`,
                backgroundPosition: 'center 78%'
              }}
              aria-hidden="true"
            />

            {/* Dark green overlay fade */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(4,42,32,0.96) 0%, rgba(10,71,54,0.92) 55%, rgba(10,71,54,0.45) 100%)'
              }}
              aria-hidden="true"
            />

            {/* Content block */}
            <div className="relative z-10 space-y-3 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/90 font-sans">
                  OUR JOURNEY
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-black text-white tracking-tight leading-[1.15] font-sans">
                From a Bold Vision<br />to a Broader Impact
              </h2>

              <p className="text-emerald-50/85 text-[11px] sm:text-xs leading-relaxed font-medium">
                What began as a commitment to education has evolved into a broader mission to improve lives across education, health and community development.
              </p>
            </div>

          </div>

          {/* ════ RIGHT: 4 Milestone Timeline Cards ════ */}
          <div className="flex-1 bg-[#F7F9FC] px-5 py-5 sm:px-6 sm:py-6 flex flex-col justify-center">
            
            <div className="relative">
              
              {/* Connecting horizontal line */}
              <div className="hidden md:block absolute top-[22px] left-4 right-4 h-[1.5px] bg-slate-200 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C3A] via-[#EA580C] to-[#0F2B5B] opacity-50" />
                <div className="absolute -right-1 -top-[5px] text-[#0F2B5B]">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </div>
              </div>

              {/* 4 Columns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10 items-start">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex flex-col space-y-2.5">
                    
                    {/* Circle Icon Badge */}
                    <div className="flex items-center justify-start md:justify-center">
                      <div 
                        className={`w-11 h-11 rounded-full ${m.badgeBg} flex items-center justify-center shadow-md ring-[3px] ring-[#F7F9FC] shrink-0 transition-transform duration-300 hover:scale-110`}
                      >
                        {m.icon}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`${m.cardBg} flex-1 space-y-1.5 transition-all duration-300 hover:-translate-y-0.5`}>
                      {/* Year */}
                      <span className={`text-lg sm:text-xl font-black tracking-tight ${m.yearColor} font-sans block`}>
                        {m.year}
                      </span>

                      {/* Title */}
                      <h3 className="font-extrabold text-[11px] text-[#0F2B5B] leading-snug font-sans">
                        {m.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-[10px] sm:text-[11px] leading-relaxed font-medium">
                        {m.desc}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutTimelineSection;

