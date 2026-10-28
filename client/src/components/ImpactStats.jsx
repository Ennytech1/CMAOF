import React from 'react';
import { Users, GraduationCap, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactStats = () => {
  const stats = [
    {
      id: 'medical-outreach',
      icon: <Users className="w-7 h-7 text-[#15803D]" strokeWidth={2.3} />,
      number: "500+",
      numberColor: "text-[#15803D]",
      label: "People reached in 2026 medical outreach",
    },
    {
      id: 'education-support',
      icon: <GraduationCap className="w-7 h-7 text-[#1D4ED8]" strokeWidth={2.3} />,
      number: "1,200+",
      numberColor: "text-[#1D4ED8]",
      label: "Students supported through education initiatives",
    },
    {
      id: 'medical-consultations',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-xs shrink-0">
          <Heart className="w-4 h-4 fill-current stroke-none" />
        </div>
      ),
      number: "5,000+",
      numberColor: "text-[#DC2626]",
      label: "Medical consultations and screenings",
    },
    {
      id: 'communities-served',
      icon: <Users className="w-7 h-7 text-[#EA580C]" strokeWidth={2.3} />,
      number: "30+",
      numberColor: "text-[#EA580C]",
      label: "Communities served across key locations",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-5 sm:py-6 lg:py-7 bg-slate-900">
      {/* ── Background Image with Atmospheric Overlay ── */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('/images/impact_bg.jpg')` }}
      />
      {/* Dark gradient overlay for visual clarity */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-slate-900/40" />
      <div className="absolute inset-0 bg-emerald-950/20 backdrop-brightness-[0.85]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">

          {/* ── Left Column: Compact Headline & CTA ── */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-start gap-2.5">
              {/* Orange Vertical Accent Bar */}
              <div className="w-1.5 h-11 sm:h-13 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />

              <div className="space-y-0.5">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-100 block">
                  OUR IMPACT
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-white tracking-tight leading-tight">
                  Real People. Real Change.
                </h2>
              </div>
            </div>

            <p className="text-white text-xs sm:text-sm leading-snug pl-4 font-semibold drop-shadow-xs max-w-sm">
              Together, we are creating measurable impact in communities across Nigeria.
            </p>

            <div className="pt-1 pl-4">
              <Link
                to="/impact"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#0F4C3A] font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View Our Impact</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ── Right Column: 4 Sleek Compact Stat Cards ── */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center shadow-md border border-white/40 flex flex-col items-center justify-center min-h-[125px] sm:min-h-[135px] hover:-translate-y-1 transition-transform duration-200 group"
                >
                  {/* Top Icon */}
                  <div className="flex items-center justify-center h-8 mb-1 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>

                  {/* Stat Number */}
                  <div className={`text-2xl sm:text-3xl font-black tracking-tight mb-0.5 ${stat.numberColor}`}>
                    {stat.number}
                  </div>

                  {/* Stat Label */}
                  <p className="text-slate-700 font-medium text-[11px] sm:text-xs leading-tight max-w-[170px] mx-auto">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
