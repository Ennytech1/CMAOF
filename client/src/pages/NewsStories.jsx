import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeneficiaryStories from '../components/BeneficiaryStories';

const NewsStories = () => {
  const articles = [
    {
      title: "CMAOF Flags Off Mission 1,000 Professionals in Ilara-Mokin",
      date: "October 4, 2026",
      category: "Education & Human Capital",
      desc: "The foundation launches its flagship capacity building program targeted at sponsoring tertiary education and professional certifications."
    },
    {
      title: "Mobile Primary Healthcare Outreach Reaches Rural Ondo Communities",
      date: "September 28, 2026",
      category: "Health & Well-being",
      desc: "Over 2,500 mothers, children, and elderly residents received free medical screenings, medicines, and vision care."
    },
    {
      title: "Clean Water Solar Borehole Commissioned in Community Partnership",
      date: "September 15, 2026",
      category: "Community Resilience",
      desc: "Providing 24/7 potable water supply to over 5,000 households under the Clean Water Initiative."
    }
  ];

  return (
    <div className="w-full bg-white space-y-16 animate-fade-in pb-16">
      
      {/* ── Hero Section matching Hero.jsx and AboutHero.jsx ── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/banner_schoolgirl.jpg')` }}
          aria-hidden="true"
        />

        {/* ── Exact Linear Gradient Overlay matching reference screenshot ── */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.78) 8%, rgba(255,255,255,0.97) 20%, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.75) 48%, rgba(255,255,255,0.25) 58%, transparent 68%)',
          }}
          aria-hidden="true"
        />
        {/* Mobile vertical gradient fallback */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0.40) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Content wrapper with balanced padding matching Home Hero & About Hero ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F2B5B]">
                <div className="w-1 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#0F4C3A] transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#0F2B5B]">News & Stories</span>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F4C3A]">
                  FOUNDATION NEWSROOM & MEDIA
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#0F2B5B]">
                News, Impact Stories & Updates
              </h1>

              {/* Subtitle */}
              <p className="text-[#1E355E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Explore the latest programme announcements, field reports, community transformation milestones, and inspiring stories of change.
              </p>

            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
              <span className="text-xs font-extrabold text-[#0F4C3A] uppercase tracking-wider">{item.category}</span>
              <h3 className="text-xl font-bold text-[#0D1B2A]">{item.title}</h3>
              <p className="text-slate-600 text-xs">{item.desc}</p>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold">{item.date}</div>
            </div>
          ))}
        </div>
      </section>

      <BeneficiaryStories />
    </div>
  );
};

export default NewsStories;
