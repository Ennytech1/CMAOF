import React, { useState, useMemo } from 'react';
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
  Maximize2, 
  ChevronLeft, 
  X, 
  Share2, 
  Check, 
  Download,
  Calendar,
  Sparkles,
  School
} from 'lucide-react';

const PhotoGalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

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
      icon: <Sparkles size={15} strokeWidth={2.4} className="text-[#0B4891]" />,
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
  ];

  // 2. 12 Photos Dataset (Matching the 12 cards in the screenshot)
  const photos = [
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
      {currentPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {currentPhoto.badgeIcon}
                  <span>{currentPhoto.category}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Photo {activeLightboxIndex + 1} of {filteredPhotos.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lightbox Image Stage with Previous/Next Controls */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                className="w-full h-full object-contain"
              />

              {/* Navigation Arrows */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    title="Previous Photo"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    title="Next Photo"
                  >
                    <ArrowRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Caption & Details */}
            <div className="p-5 sm:p-6 space-y-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#0F2B5B]">
                  {currentPhoto.title}
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  {currentPhoto.location} • {currentPhoto.year}
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {currentPhoto.caption}
              </p>
            </div>

            {/* Lightbox Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Official CMAOF Multimedia Gallery
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="px-4 py-1.5 bg-[#0F2B5B] hover:bg-[#0F4C3A] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default PhotoGalleryGrid;
