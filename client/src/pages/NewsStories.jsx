import React from 'react';
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
    <div className="py-12 lg:py-16 space-y-16 animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0F4C3A] text-xs font-extrabold uppercase tracking-wider">
          Foundation Newsroom & Media
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
          News, Impact Stories & Updates
        </h1>
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
