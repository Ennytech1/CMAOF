import React from 'react';
import { Image as ImageIcon, Play, Images } from 'lucide-react';
import ResourcesMediaAlbums from '../components/resources/ResourcesMediaAlbums';
import PhotoGalleryGrid from '../components/resources/PhotoGalleryGrid';
import MultimediaCtaBanner from '../components/resources/MultimediaCtaBanner';

const MultimediaGallery = ({ onOpenDonate }) => {

  return (
    <div className="w-full bg-white animate-fade-in pb-0">
      
      {/* ── Hero Section matching Hero.jsx linear gradient and reference screenshot ── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-[position:88%_center] sm:bg-[position:86%_center] lg:bg-[position:90%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/multimedia_gallery_hero.jpg')` }}
          aria-hidden="true"
        />

        {/* ── Exact Linear Gradient Overlay matching home page hero (Hero.jsx) ── */}
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
            
            {/* Left Column: Eyebrow, Main Title, Subtitle, Stat Cards (col-span-8) */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              
              {/* Eyebrow with Orange Vertical Accent Bar */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F4C3A]">
                  MULTIMEDIA GALLERY
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12]">
                <span className="block text-[#0F4C3A]">Stories in Pictures.</span>
                <span className="block text-[#0F2B5B]">Change in Motion.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] leading-relaxed max-w-xl font-medium">
                Explore authentic moments from our programmes and see how your support is creating stronger people and brighter communities across Nigeria.
              </p>

              {/* 3 Quick Stat Cards / Pills */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-1">
                
                {/* Photos Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border border-slate-100 shadow-md shadow-slate-200/50 flex items-center gap-3.5 min-w-[130px] sm:min-w-[145px]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F4C3A] flex items-center justify-center shrink-0">
                    <ImageIcon size={22} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">Photos</span>
                    <span className="block text-base sm:text-lg font-black text-[#0F2B5B] leading-tight">1,200+</span>
                  </div>
                </div>

                {/* Videos Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border border-slate-100 shadow-md shadow-slate-200/50 flex items-center gap-3.5 min-w-[130px] sm:min-w-[145px]">
                  <div className="w-10 h-10 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Play size={17} className="fill-white translate-x-0.5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">Videos</span>
                    <span className="block text-base sm:text-lg font-black text-[#0F2B5B] leading-tight">150+</span>
                  </div>
                </div>

                {/* Albums Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border border-slate-100 shadow-md shadow-slate-200/50 flex items-center gap-3.5 min-w-[130px] sm:min-w-[145px]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F4C3A] flex items-center justify-center shrink-0">
                    <Images size={22} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">Albums</span>
                    <span className="block text-base sm:text-lg font-black text-[#0F2B5B] leading-tight">50+</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Floating Handwritten Script with Orange Swoosh (col-span-4) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end items-center pr-2 xl:pr-6">
              <div className="space-y-1 select-none transform rotate-[-2deg] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                <div className="font-handwriting text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] tracking-wide">
                  <span className="block">Real People.</span>
                  <span className="block">Real Stories.</span>
                  <span className="block">Lasting Change.</span>
                </div>
                {/* Curved orange brush underline matching screenshot */}
                <svg
                  className="w-36 sm:w-44 h-4 text-[#EA580C] mt-1"
                  viewBox="0 0 160 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12C45 4 110 3 156 14"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Interactive Media Albums & Featured Videos Showcase & Photo Gallery ── */}
      <div className="space-y-16">
        <ResourcesMediaAlbums />
        <PhotoGalleryGrid />
      </div>

      {/* ── Call To Action Banner: "More Stories. Greater Impact." (Flush against footer) ── */}
      <MultimediaCtaBanner onOpenDonate={onOpenDonate} />
    </div>
  );
};

export default MultimediaGallery;
