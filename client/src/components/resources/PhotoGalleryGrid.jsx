import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { founderGallery, founderImages } from '../../assets/founderImages';
import { 
  Images, 
  BookOpen, 
  Heart, 
  Users, 
  Award, 
  Smile, 
  Building2, 
  Handshake, 
  ArrowRight, 
  ArrowLeft,
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  X, 
  Share2, 
  Check, 
  Download,
  Calendar,
  School
} from 'lucide-react';

const PhotoGalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const galleryThumbnailContainerRef = useRef(null);
  const galleryThumbnailRefs = useRef([]);

  // Auto-scroll active photo thumbnail into view smoothly
  useEffect(() => {
    if (activeLightboxIndex !== null && galleryThumbnailRefs.current[activeLightboxIndex]) {
      galleryThumbnailRefs.current[activeLightboxIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeLightboxIndex]);

  // 1. Category Filter Pills matching screenshot
  const categories = [
    {
      id: 'all',
      label: 'All Photos',
      icon: <Images size={15} strokeWidth={2.4} />,
      activeClass: 'bg-[#06402B] text-white shadow-xs border-[#06402B]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'education',
      label: 'Education',
      icon: <BookOpen size={15} strokeWidth={2.4} className="text-[#0B4891]" />,
      activeClass: 'bg-[#0B4891] text-white shadow-xs border-[#0B4891]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'health',
      label: 'Health',
      icon: <Heart size={15} strokeWidth={2.4} className="fill-[#DC2626] text-[#DC2626]" />,
      activeClass: 'bg-[#DC2626] text-white shadow-xs border-[#DC2626]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'community',
      label: 'Community',
      icon: <Users size={15} strokeWidth={2.4} className="text-[#EA580C]" />,
      activeClass: 'bg-[#EA580C] text-white shadow-xs border-[#EA580C]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'events',
      label: 'Events',
      icon: <Calendar size={15} strokeWidth={2.4} className="text-[#0B4891]" />,
      activeClass: 'bg-[#0B4891] text-white shadow-xs border-[#0B4891]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'people-stories',
      label: 'People & Stories',
      icon: <Smile size={15} strokeWidth={2.4} className="text-[#7C3AED]" />,
      activeClass: 'bg-[#7C3AED] text-white shadow-xs border-[#7C3AED]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'infrastructure',
      label: 'Facilities & Infrastructure',
      icon: <Building2 size={15} strokeWidth={2.4} className="text-[#059669]" />,
      activeClass: 'bg-[#059669] text-white shadow-xs border-[#059669]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'partnerships',
      label: 'Partnerships',
      icon: <Handshake size={15} strokeWidth={2.4} className="text-[#EA580C]" />,
      activeClass: 'bg-[#EA580C] text-white shadow-xs border-[#EA580C]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
    {
      id: 'founder',
      label: 'Founder & Legacy',
      icon: <Award size={15} strokeWidth={2.4} className="text-[#D4AF37]" />,
      activeClass: 'bg-[#0D1B2A] text-white shadow-xs border-[#0D1B2A]',
      inactiveClass: 'bg-white text-[#0F2B5B] border-slate-200/90 hover:border-slate-300',
    },
  ];

  // 2. Photos Dataset featuring all Authentic Founder Photos + Core Interventions
  const photos = [
    // Authentic Founder Photos
    {
      id: 'founder-p1',
      title: 'Chief Michael Ade.Ojo, OON',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-amber-800',
      badgeIcon: <Award size={13} className="text-amber-600" />,
      image: founderImages.founder1,
      caption: 'Official institutional portrait of Chief Michael Ade.Ojo, founding visionary and benefactor of CMAOF.',
      location: 'Ilara-Mokin / Lagos, Nigeria',
      year: 'Official'
    },
    {
      id: 'founder-p2',
      title: 'A Vision for Community Prosperity',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-emerald-800',
      badgeIcon: <Users size={13} className="text-emerald-700" />,
      image: founderImages.founder2,
      caption: 'Chief Michael Ade.Ojo engaging with grassroots community leaders and advocates.',
      location: 'Ondo State, Nigeria',
      year: 'Community'
    },
    {
      id: 'founder-p3',
      title: 'Commitment to Academic Excellence',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-blue-800',
      badgeIcon: <School size={13} className="text-blue-600" />,
      image: founderImages.founder3,
      caption: 'Championing higher education, university patronage, and youth academic scholarships.',
      location: 'Elizade University, Ilara-Mokin',
      year: 'Education'
    },
    {
      id: 'founder-p4',
      title: 'Institutional Governance & Leadership',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-slate-800',
      badgeIcon: <Building2 size={13} className="text-slate-700" />,
      image: founderImages.founder4,
      caption: 'Guiding the foundation Board of Trustees in strategic governance and impact scaling.',
      location: 'Victoria Island, Lagos',
      year: 'Governance'
    },
    {
      id: 'founder-p5',
      title: 'Enduring Philanthropic Legacy',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-amber-800',
      badgeIcon: <Heart size={13} className="text-amber-600" />,
      image: founderImages.founder5,
      caption: 'Decades of transformative giving advancing healthcare, scholarships, and rural infrastructure.',
      location: 'Ilara-Mokin, Ondo State',
      year: 'Legacy'
    },
    {
      id: 'founder-p6',
      title: 'Empowering Next-Generation Leaders',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-purple-800',
      badgeIcon: <Smile size={13} className="text-purple-600" />,
      image: founderImages.founder6,
      caption: 'Mentoring young innovators and professionals under the foundation human capital programs.',
      location: 'Lagos State, Nigeria',
      year: 'Mentorship'
    },
    {
      id: 'founder-p7',
      title: 'A Life of Dedicated National Service',
      category: 'Founder & Legacy',
      categoryId: 'founder',
      badgeClass: 'text-orange-800',
      badgeIcon: <Handshake size={13} className="text-orange-600" />,
      image: founderImages.founder7,
      caption: 'Embodying integrity, industry, and selfless commitment to the Nigerian people.',
      location: 'National Civic Assembly',
      year: 'Leadership'
    },
    // Row 1
    {
      id: 'p1',
      title: 'Classroom Learning in Ilara-Mokin',
      category: 'Education',
      categoryId: 'education',
      badgeClass: 'text-emerald-800',
      badgeIcon: <BookOpen size={13} className="text-emerald-700" />,
      image: '/images/gallery_girl_writing.jpg',
      caption: 'Primary school students actively writing class assignments under the Mission 1,000 educational support program.',
      location: 'Ilara-Mokin, Ondo State',
      year: '2026'
    },
    {
      id: 'p2',
      title: 'Maternal & Infant Healthcare Outreach',
      category: 'Health',
      categoryId: 'health',
      badgeClass: 'text-rose-800',
      badgeIcon: <Heart size={13} className="fill-rose-600 text-rose-600" />,
      image: '/images/album_health.jpg',
      caption: 'Community healthcare officer providing infant wellness examinations at our rural maternal clinic.',
      location: 'Akure South, Ondo State',
      year: '2026'
    },
    {
      id: 'p3',
      title: 'Clean Drinking Water Commissioning',
      category: 'Community',
      categoryId: 'community',
      badgeClass: 'text-orange-800',
      badgeIcon: <Users size={13} className="text-orange-600" />,
      image: '/images/video_borehole_water.jpg',
      caption: 'Child drinking fresh, potable water delivered 24/7 by the solar-powered community borehole installation.',
      location: 'Owo Community, Ondo State',
      year: '2026'
    },
    {
      id: 'p4',
      title: 'Women in Community Agriculture',
      category: 'People & Stories',
      categoryId: 'people-stories',
      badgeClass: 'text-purple-800',
      badgeIcon: <Smile size={13} className="text-purple-600" />,
      image: '/images/pillar_community_elderly.jpg',
      caption: 'Beneficiaries of the foundation agricultural cooperative grant celebrating their seasonal harvest.',
      location: 'Idanre, Ondo State',
      year: '2026'
    },
    {
      id: 'p5',
      title: 'St. Mary Primary School Renovation',
      category: 'Infrastructure',
      categoryId: 'infrastructure',
      badgeClass: 'text-emerald-800',
      badgeIcon: <Building2 size={13} className="text-emerald-700" />,
      image: '/images/gallery_school_building.jpg',
      caption: 'Modernized classroom block, safe playground, and sanitary amenities completed in partnership with community leaders.',
      location: 'Ilara-Mokin, Ondo State',
      year: '2026'
    },
    {
      id: 'p6',
      title: 'Youth Action Volunteer Corps',
      category: 'Community',
      categoryId: 'community',
      badgeClass: 'text-orange-800',
      badgeIcon: <Users size={13} className="text-orange-600" />,
      image: '/images/hero_community.jpg',
      caption: 'Youth leaders and community organizers collaborating on grassroots community development campaigns.',
      location: 'Ondo Central, Ondo State',
      year: '2026'
    },

    // Row 2
    {
      id: 'p7',
      title: 'Mentorship in the Classroom',
      category: 'Education',
      categoryId: 'education',
      badgeClass: 'text-emerald-800',
      badgeIcon: <BookOpen size={13} className="text-emerald-700" />,
      image: '/images/gallery_teacher_classroom.jpg',
      caption: 'Dedicated instructor providing personalized mathematics and literacy guidance to eager primary school learners.',
      location: 'Ilara-Mokin, Ondo State',
      year: '2026'
    },
    {
      id: 'p8',
      title: 'Primary Healthcare Medical Screening',
      category: 'Health',
      categoryId: 'health',
      badgeClass: 'text-rose-800',
      badgeIcon: <Heart size={13} className="fill-rose-600 text-rose-600" />,
      image: '/images/pillar_health.jpg',
      caption: 'Physician conducting health assessments and preventative diagnostics during our mobile medical outreach.',
      location: 'Ikare-Akoko, Ondo State',
      year: '2026'
    },
    {
      id: 'p9',
      title: 'Tree Planting & Eco-Resilience Drive',
      category: 'Community',
      categoryId: 'community',
      badgeClass: 'text-orange-800',
      badgeIcon: <Users size={13} className="text-orange-600" />,
      image: '/images/our_journey_seedling.jpg',
      caption: 'School club students nurturing green seedlings as part of our environmental conservation and climate resilience campaign.',
      location: 'Ilara-Mokin, Ondo State',
      year: '2026'
    },
    {
      id: 'p10',
      title: 'Strategic Development Bilateral Meeting',
      category: 'Partnerships',
      categoryId: 'partnerships',
      badgeClass: 'text-teal-800',
      badgeIcon: <Handshake size={13} className="text-teal-700" />,
      image: '/images/gallery_partners_meeting.jpg',
      caption: 'Foundation executives and corporate CSR partners conferring on programmatic scaling for fiscal year 2026-2027.',
      location: 'Lagos & Abuja, Nigeria',
      year: '2026'
    },
    {
      id: 'p11',
      title: 'Reading Culture & Literacy Enhancement',
      category: 'Education',
      categoryId: 'education',
      badgeClass: 'text-emerald-800',
      badgeIcon: <BookOpen size={13} className="text-emerald-700" />,
      image: '/images/gallery_student_reading.jpg',
      caption: 'Student reading with new textbooks donated to community school libraries under our educational resources program.',
      location: 'Akure, Ondo State',
      year: '2026'
    },
    {
      id: 'p12',
      title: 'Community Civic Center & Clinic Aerial View',
      category: 'Infrastructure',
      categoryId: 'infrastructure',
      badgeClass: 'text-orange-800',
      badgeIcon: <Building2 size={13} className="text-orange-600" />,
      image: '/images/gallery_facility_aerial.jpg',
      caption: 'Drone aerial capture of the newly completed multipurpose community complex housing a health outpost and learning hub.',
      location: 'Ilara-Mokin, Ondo State',
      year: '2026'
    },
  ];

  // Filtered Photos based on Category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory, photos]);

  const currentPhoto = activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Keyboard navigation and body scroll lock for lightbox
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveLightboxIndex(null);
        } else if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeLightboxIndex, filteredPhotos.length]);

  return (
    <section className="w-full bg-white font-sans pt-4 sm:pt-6 pb-16 sm:pb-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7">
        
        {/* ── 1. Section Header: Title on Left & "View All Photos ->" on Far Right ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* Orange Vertical Accent Bar */}
            <div className="w-1.5 h-10 sm:h-11 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
            
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#0F2B5B] tracking-tight leading-tight">
                Photo Gallery
              </h2>
              <p className="text-slate-500 text-xs sm:text-[13px] font-normal leading-relaxed">
                Explore recent photos from our programmes, communities and events.
              </p>
            </div>
          </div>

          {/* View All Photos Link */}
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-[#0F4C3A] hover:text-[#064E3B] transition-colors self-start sm:self-auto cursor-pointer group"
          >
            <span className="underline decoration-2 underline-offset-4">View All Photos</span>
            <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* ── 2. Category Filter Pills Row ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[12.5px] font-bold border transition-all duration-200 whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive ? cat.activeClass : cat.inactiveClass
                }`}
              >
                <span className="shrink-0">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── 3. 12 Photos Grid (2 rows of 6 cards on large screens) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5 pt-1">
          {filteredPhotos.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 hover:border-slate-300 hover:-translate-y-1"
            >
              {/* Photo Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Vignette for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top-Right Hover Zoom Trigger */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-sm">
                <Maximize2 size={13} />
              </div>

              {/* Bottom-Left Translucent Category Badge Pill */}
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg sm:rounded-xl shadow-md text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-transform group-hover:translate-y-[-1px]">
                {item.badgeIcon}
                <span className="text-slate-800 leading-none">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 space-y-2">
            <p className="text-sm font-bold text-slate-700">No photos found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs font-bold text-[#0F4C3A] hover:underline cursor-pointer"
            >
              View all photos
            </button>
          </div>
        )}

      </div>

      {/* ── 4. Full-Featured Interactive Photo Lightbox Modal ── */}
      {/* ── 4. Full-Featured Interactive Photo Lightbox Modal rendered via Portal (Full 100vh / Full Page) ── */}
      {currentPhoto && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden animate-fade-in font-sans"
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title}
        >
          {/* Subtle ambient glow effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#06402B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* 1. Modal Top Brand Header / Navbar with Back Button & Breadcrumbs */}
          <div className="shrink-0 px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 border-b border-slate-200/80 bg-white/95 backdrop-blur-md z-10 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Left: Back Button + Breadcrumbs + Photo Title */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-700 hover:text-white transition-all duration-200 cursor-pointer text-xs font-bold shrink-0 shadow-xs hover:shadow-md active:scale-95"
                  title="Back to Photo Gallery"
                >
                  <ArrowLeft size={16} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-0.5" />
                  <span className="font-sans">Back</span>
                </button>

                <div className="h-6 w-px bg-slate-200 shrink-0 hidden sm:block" />

                {/* Breadcrumbs with vertical orange indicator bar */}
                <div className="min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                    <button
                      type="button"
                      onClick={() => setActiveLightboxIndex(null)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <button
                      type="button"
                      onClick={() => setActiveLightboxIndex(null)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Resources
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <span className="text-[#0F2B5B] font-bold truncate">Photo Archive</span>
                  </div>

                  {/* Title and Category Badge */}
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <h3 className="text-sm sm:text-base font-black font-serif-cmaof text-[#0F2B5B] truncate">
                      {currentPhoto.title}
                    </h3>
                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#06402B]/10 text-[#06402B] border border-[#06402B]/20">
                      {currentPhoto.badgeIcon}
                      <span>{currentPhoto.category}</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Slide Counter + Close Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-xs font-extrabold text-[#0F2B5B]">
                    Photo {activeLightboxIndex + 1} of {filteredPhotos.length}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Press ESC to exit</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-[#EA580C] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                  title="Close gallery (Esc)"
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
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  className="w-full h-full object-contain md:object-cover md:object-center transition-all duration-300"
                />

                {/* Navigation Arrows on Photo */}
                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#06402B] text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg group-hover:scale-105"
                      title="Previous photo (Left Arrow)"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#06402B] text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg group-hover:scale-105"
                      title="Next photo (Right Arrow)"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Floating Photo Counter Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-bold text-[#0F2B5B] border border-slate-200 shadow-md">
                  Photo {activeLightboxIndex + 1} of {filteredPhotos.length}
                </div>
              </div>
            </div>

            {/* Right Photo Narrative */}
            <div className="md:col-span-5 space-y-3.5 sm:space-y-4 lg:space-y-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs self-start">
                <span>{currentPhoto.category}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-cmaof leading-tight text-[#0F2B5B]">
                {currentPhoto.title}
              </h4>

              <p className="text-sm sm:text-base font-bold text-[#06402B]">
                {currentPhoto.location} • {currentPhoto.year}
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-medium">
                {currentPhoto.caption}
              </p>

              {/* Archival Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#06402B]/[0.04] border-l-4 border-[#06402B] border-y border-r border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1.5 shadow-xs">
                <span className="font-extrabold text-[#06402B] uppercase tracking-wider text-[11px] block">Field Provenance</span>
                <span className="leading-relaxed font-medium">Chief Michael Ade.Ojo Foundation official photographic archive documenting our strategic interventions across Nigerian communities.</span>
              </div>

              {/* Action Buttons: Share & Close */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {copiedLink ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Photo'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="px-5 py-2 bg-[#06402B] hover:bg-[#042A1D] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Done
                </button>
              </div>
            </div>

          </div>

          {/* 3. Modal Bottom Thumbnail Strip Dock with Smooth Scroll & Nav Controls */}
          <div className="shrink-0 py-3 sm:py-3.5 px-4 bg-white/95 border-t border-slate-200/80 backdrop-blur-md flex items-center justify-center gap-2 sm:gap-3 z-10 shadow-xs">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Previous photo"
            >
              <ChevronLeft size={16} strokeWidth={2.4} />
            </button>

            <div 
              ref={galleryThumbnailContainerRef}
              className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
            >
              {filteredPhotos.map((photo, idx) => (
                <button
                  key={photo.id || idx}
                  ref={(el) => (galleryThumbnailRefs.current[idx] = el)}
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeLightboxIndex === idx
                      ? 'border-[#EA580C] ring-4 ring-[#EA580C]/30 scale-105 sm:scale-110 shadow-lg shadow-[#EA580C]/20'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-[#0F4C3A] hover:scale-105'
                  }`}
                  title={`View ${photo.title}`}
                >
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Next photo"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>

        </div>,
        document.body
      )}

    </section>
  );
};

export default PhotoGalleryGrid;
