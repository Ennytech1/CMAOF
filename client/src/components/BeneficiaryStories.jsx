import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const BeneficiaryStories = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const stories = [
    {
      id: 1,
      image: '/images/story_amina.jpg',
      quote:
        '“The scholarship gave me a second chance to pursue my dream. Today, I am more confident about my future.”',
      name: 'Amina S.',
      role: 'Scholarship Beneficiary',
    },
    {
      id: 2,
      image: '/images/story_kehinde.jpg',
      quote:
        '“The medical outreach helped me and my child. We received care, support and hope.”',
      name: 'Mrs. Kehinde',
      role: 'Beneficiary, Ilara-Mokin',
    },
    {
      id: 3,
      image: '/images/story_adeyemi.jpg',
      quote:
        '“Clean water has made a big difference in our community. We are healthier and happier now.”',
      name: 'Chief B. Adeyemi',
      role: 'Community Leader',
    },
  ];

  const newsItems = [
    {
      id: 1,
      image: '/images/pillar_education.jpg',
      date: '12 Oct 2026',
      title: 'CMAOF Supports 200 Students with New Scholarships',
      link: '/news',
    },
    {
      id: 2,
      image: '/images/pillar_health.jpg',
      date: '05 Oct 2026',
      title: 'Over 500 Beneficiaries Served at 2026 Medical Outreach',
      link: '/news',
    },
    {
      id: 3,
      image: '/images/pillar_community.jpg',
      date: '28 Sep 2026',
      title: 'Clean Water Initiative Brings Safe Water to Three Communities',
      link: '/news',
    },
  ];

  const handlePrev = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIdx((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-10 sm:py-14 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

        {/* ════════════════════════════════════════════════════
            ROW 1: STORIES OF CHANGE
        ════════════════════════════════════════════════════ */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Header Column (~32% width) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-start gap-3">
                {/* Orange Vertical Line Accent */}
                <div className="w-1.5 h-12 sm:h-14 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />

                <div className="space-y-0.5">
                  <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F2B5B] block font-sans">
                    STORIES OF CHANGE
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] font-extrabold text-[#0F2B5B] tracking-tight leading-tight">
                    Real Stories. Brighter Futures.
                  </h2>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm pl-4">
                Meet some of the people and communities whose lives are being transformed through CMAOF’s work.
              </p>

              <div className="pt-1 pl-4">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-[#0F4C3A] text-[#0F4C3A] hover:bg-[#0F4C3A] hover:text-white font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                >
                  <span>View More Stories</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </Link>
              </div>
            </div>

            {/* Right Story Cards Slider with Arrows (~68% width) */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2">

                {/* Left Navigation Circular Arrow */}
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all shrink-0 cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Previous story"
                >
                  <ChevronLeft size={18} strokeWidth={2.2} />
                </button>

                {/* 3 Story Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 flex-1">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
                    >
                      {/* Left Portrait Image */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Right Text Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-slate-700 text-[11px] sm:text-xs italic leading-snug line-clamp-4 font-normal">
                          {story.quote}
                        </p>
                        <div className="pt-0.5">
                          <div className="font-extrabold text-[#0F2B5B] text-xs leading-tight">
                            {story.name}
                          </div>
                          <div className="text-slate-500 text-[10px] leading-tight mt-0.5">
                            {story.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Navigation Circular Arrow */}
                <button
                  onClick={handleNext}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all shrink-0 cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Next story"
                >
                  <ChevronRight size={18} strokeWidth={2.2} />
                </button>

              </div>

              {/* Centered Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F4C3A]" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>

            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            ROW 2: LATEST NEWS & STORIES
        ════════════════════════════════════════════════════ */}
        <div className="space-y-6 pt-2">
          
          {/* Header Row with Title on Left & "View All News ->" on Far Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            {/* Left Title Block */}
            <div className="flex items-start gap-3">
              {/* Orange Vertical Line Accent */}
              <div className="w-1.5 h-12 sm:h-14 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />

              <div className="space-y-0.5">
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F2B5B] block font-sans">
                  LATEST NEWS & STORIES
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] font-extrabold text-[#0F2B5B] tracking-tight leading-tight">
                  Updates, Voices and Perspectives
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Stay informed about our programmes, events, stories and impact across communities.
                </p>
              </div>
            </div>

            {/* Right Link: View All News -> */}
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0F4C3A] hover:underline cursor-pointer shrink-0 group self-start sm:self-end pb-1"
            >
              <span>View All News</span>
              <ArrowRight size={15} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
            </Link>

          </div>

          {/* 3 News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  {/* Card Banner Image */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <span className="text-slate-400 text-[11px] sm:text-xs font-medium block">
                      {item.date}
                    </span>
                    <h3 className="font-extrabold text-[#0F2B5B] text-sm sm:text-base leading-snug group-hover:text-[#0F4C3A] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F4C3A] hover:underline cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight size={13} strokeWidth={2.4} />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeneficiaryStories;
