import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Play, X, ChevronLeft, ChevronRight, Images, Award, Sparkles, ArrowLeft, ArrowUp } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import AboutFounderSection from '../components/about/AboutFounderSection';
import AboutPillarsGrid from '../components/about/AboutPillarsGrid';
import AboutTimelineSection from '../components/about/AboutTimelineSection';
import AboutGovernanceLeadership from '../components/about/AboutGovernanceLeadership';
import AboutCommitmentBanner from '../components/about/AboutCommitmentBanner';
import OurPartners from '../components/OurPartners';
import { founderGallery } from '../assets/founderImages';

const AboutUs = () => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const thumbnailContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const activePhoto = founderGallery[currentGalleryIdx];

  const handleNextPhoto = () => {
    setCurrentGalleryIdx((prev) => (prev + 1) % founderGallery.length);
  };

  const handlePrevPhoto = () => {
    setCurrentGalleryIdx((prev) => (prev - 1 + founderGallery.length) % founderGallery.length);
  };

  // Keyboard navigation & body scroll lock when modal is open
  useEffect(() => {
    if (galleryModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setGalleryModalOpen(false);
        } else if (e.key === 'ArrowRight') {
          handleNextPhoto();
        } else if (e.key === 'ArrowLeft') {
          handlePrevPhoto();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [galleryModalOpen]);

  // Floating Back-to-Top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll active thumbnail into view smoothly
  useEffect(() => {
    if (galleryModalOpen && thumbnailRefs.current[currentGalleryIdx]) {
      thumbnailRefs.current[currentGalleryIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentGalleryIdx, galleryModalOpen]);

  return (
    <div className="w-full bg-white font-sans animate-fade-in relative">

      {/* 1. Hero Banner Section */}
      <AboutHero onWatchStory={() => setGalleryModalOpen(true)} />

      {/* 2. Our Founder Section */}
      <AboutFounderSection onReadStory={() => setGalleryModalOpen(true)} />

      {/* 3. Purpose, Vision, Mission & Values 4-Card Grid */}
      <AboutPillarsGrid />

      {/* 4. Timeline Journey Section */}
      <AboutTimelineSection />

      {/* 5. Governance, Leadership & Geographic Focus Section */}
      <AboutGovernanceLeadership />

      {/* 6. Commitment CTA Banner Strip */}
      <AboutCommitmentBanner />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0F4C3A] hover:bg-[#14634C] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
          title="Scroll back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={19} strokeWidth={2.6} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Interactive Founder Tribute & 7-Photo Gallery Lightbox Modal rendered via Portal (Full 100vh / Full Page) */}
      {galleryModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Chief Michael Ade.Ojo Photographic Archive"
        >
          {/* Ambient subtle glow effects with brand colors */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#06402B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* 1. Modal Top Brand Header / Navbar with Back Button & Breadcrumbs */}
          <div className="shrink-0 px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 border-b border-slate-200/80 bg-white/95 backdrop-blur-md z-10 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Left: Back Icon Button + Breadcrumbs (Matching Image 2) + Archive Title */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                
                {/* Sleek Back Button with Left Arrow */}
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-700 hover:text-white transition-all duration-200 cursor-pointer text-xs font-bold shrink-0 shadow-xs hover:shadow-md active:scale-95"
                  title="Back to About Us"
                >
                  <ArrowLeft size={16} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-0.5" />
                  <span className="font-sans">Back</span>
                </button>

                <div className="h-6 w-px bg-slate-200 shrink-0 hidden sm:block" />

                {/* Breadcrumbs matching Image 2 with vertical orange indicator bar */}
                <div className="min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                    <button
                      type="button"
                      onClick={() => setGalleryModalOpen(false)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <button
                      type="button"
                      onClick={() => setGalleryModalOpen(false)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      About Us
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <span className="text-[#0F2B5B] font-bold truncate">Founder Gallery</span>
                  </div>

                  {/* Title and Heritage Pill */}
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <h3 className="text-sm sm:text-base font-black font-serif-cmaof text-[#0F2B5B] truncate">
                      Chief Michael Ade.Ojo Photographic Archive
                    </h3>
                    <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#0F4C3A]/10 text-[#0F4C3A] border border-[#0F4C3A]/20">
                      Institutional Heritage
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Slide Counter + Close Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-xs font-extrabold text-[#0F2B5B]">
                    Slide {currentGalleryIdx + 1} of {founderGallery.length}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Press ESC to exit</span>
                </div>

                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-[#EA580C] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                  title="Close archive (Esc)"
                >
                  <X size={18} strokeWidth={2.4} />
                </button>
              </div>

            </div>
          </div>

          {/* 2. Modal Center Showcase - Takes 100% remaining vertical space */}
          <div className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center overflow-y-auto z-10">
            
            {/* Left Photo Display Stage */}
            <div className="md:col-span-7 h-full max-h-[56vh] sm:max-h-[62vh] lg:max-h-[66vh] flex items-center justify-center relative">
              <div className="relative w-full h-full max-w-xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl group flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain md:object-cover md:object-top transition-all duration-300"
                />

                {/* Navigation Arrows on Photo */}
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#06402B] text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg group-hover:scale-105"
                  title="Previous photo (Left Arrow)"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#06402B] text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg group-hover:scale-105"
                  title="Next photo (Right Arrow)"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Floating Photo Counter Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-bold text-[#0F2B5B] border border-slate-200 shadow-md">
                  Photo {currentGalleryIdx + 1} of {founderGallery.length}
                </div>
              </div>
            </div>

            {/* Right Photo Narrative */}
            <div className="md:col-span-5 space-y-3.5 sm:space-y-4 lg:space-y-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs self-start">
                <span>{activePhoto.badge}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-cmaof leading-tight text-[#0F2B5B]">
                {activePhoto.title}
              </h4>

              <p className="text-sm sm:text-base font-bold text-[#06402B]">
                {activePhoto.subtitle}
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-medium">
                {activePhoto.caption}
              </p>

              {/* Historical Context Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#06402B]/[0.04] border-l-4 border-[#06402B] border-y border-r border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1.5 shadow-xs">
                <span className="font-extrabold text-[#06402B] uppercase tracking-wider text-[11px] block">Historical Context</span>
                <span className="leading-relaxed font-medium">Chief Michael Ade.Ojo’s enduring legacy in higher education, community empowerment, and national industrial leadership.</span>
              </div>
            </div>

          </div>

          {/* 3. Modal Bottom Thumbnail Strip Dock with Smooth Scroll & Nav Controls */}
          <div className="shrink-0 py-3 sm:py-3.5 px-4 bg-white/95 border-t border-slate-200/80 backdrop-blur-md flex items-center justify-center gap-2 sm:gap-3 z-10 shadow-xs">
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Previous slide"
            >
              <ChevronLeft size={16} strokeWidth={2.4} />
            </button>

            <div 
              ref={thumbnailContainerRef}
              className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
            >
              {founderGallery.map((item, idx) => (
                <button
                  key={item.id}
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  type="button"
                  onClick={() => setCurrentGalleryIdx(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    currentGalleryIdx === idx
                      ? 'border-[#EA580C] ring-4 ring-[#EA580C]/30 scale-105 sm:scale-110 shadow-lg shadow-[#EA580C]/20'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-[#0F4C3A] hover:scale-105'
                  }`}
                  title={`View ${item.title}`}
                >
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Next slide"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>

        </div>,
        document.body
      )}

    </div>
  );
};

export default AboutUs;
