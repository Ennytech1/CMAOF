import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ResourcesHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-slate-100" style={{ minHeight: '440px' }}>
      
      {/* ── Photographic Background: African Schoolgirl reading book on the right ── */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:88%_center] sm:bg-[position:85%_center] lg:bg-[position:92%_center]"
        style={{ backgroundImage: `url('/images/resources_hero_girl.jpg')` }}
        aria-hidden="true"
      />

      {/* ── Exact Linear Gradient Overlay matching reference screenshot ── */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 28%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.65) 54%, rgba(255,255,255,0.20) 66%, transparent 78%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile vertical gradient overlay to preserve readability on small screens */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 58%, rgba(255,255,255,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[92px] sm:pt-[106px] lg:pt-[118px] pb-12 sm:pb-14 lg:pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ── Left Column: Breadcrumb, Eyebrow, Main Title & Description (col-span-7) ── */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            
            {/* 1. Breadcrumb navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#0F2B5B]">
              <div className="w-1 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
              <Link to="/" className="hover:text-[#0F4C3A] transition-colors">
                Home
              </Link>
              <ChevronRight size={13} className="text-slate-400 stroke-[2.2]" />
              <span className="text-[#0F2B5B]">Resources</span>
            </div>

            {/* 2. Category Eyebrow */}
            <div className="flex items-center gap-2 pt-0.5">
              <div className="w-1 h-4 bg-[#EA580C] rounded-full shrink-0" />
              <span className="text-xs sm:text-[12.5px] font-black uppercase tracking-wider text-[#0F4C3A]">
                RESOURCES LIBRARY
              </span>
            </div>

            {/* 3. Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.08]">
              <span className="text-[#0F4C3A] block">Knowledge for a</span>
              <span className="text-[#0F2B5B] block">Brighter Tomorrow.</span>
            </h1>

            {/* 4. Subtitle / Description */}
            <p className="text-slate-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-xl font-normal pt-1">
              Explore our reports, publications, research and policy documents. Access insights into our work, impact and learning as we create stronger people and brighter communities.
            </p>

          </div>

          {/* ── Right Column: Floating Quote Card beside the Schoolgirl (col-span-5) ── */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end items-center pt-4 lg:pt-0">
            <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-900/8 border border-slate-100/90 max-w-[220px] sm:max-w-[240px] space-y-2.5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Green double quotation icon */}
              <div className="text-3xl font-serif font-black text-[#0F4C3A] leading-none select-none">
                “
              </div>
              
              {/* Quotation text */}
              <p className="text-xs sm:text-[13px] font-medium text-[#0F2B5B] leading-snug">
                Knowledge inspires action and helps build a better future for all.
              </p>
              
              {/* Orange bottom accent line */}
              <div className="w-8 h-1 bg-[#EA580C] rounded-full pt-0.5" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ResourcesHero;
