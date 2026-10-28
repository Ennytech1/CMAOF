import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { founderImages } from '../../assets/founderImages';
import { 
  LayoutGrid, 
  BookOpen, 
  Heart, 
  Users, 
  Search, 
  ChevronDown, 
  ArrowRight, 
  ArrowLeft,
  X, 
  Image as ImageIcon, 
  Video, 
  Maximize2,
  Play,
  Clock,
  GraduationCap,
  HeartPulse,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  Award
} from 'lucide-react';

const ResourcesMediaAlbums = () => {
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  
  // Interactive Modals State
  const [activeModalAlbum, setActiveModalAlbum] = useState(null);
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const albumThumbnailContainerRef = useRef(null);
  const albumThumbnailRefs = useRef([]);

  // Auto-scroll active album thumbnail into view smoothly
  useEffect(() => {
    if (activeModalAlbum && albumThumbnailRefs.current[activePhotoIndex]) {
      albumThumbnailRefs.current[activePhotoIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activePhotoIndex, activeModalAlbum]);

  const handleShare = (title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Body scroll lock and Escape key listener
  useEffect(() => {
    const isModalOpen = Boolean(activeModalAlbum || activeModalVideo);
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalAlbum(null);
          setActiveModalVideo(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModalAlbum, activeModalVideo]);

  // 1. Pillar Filter Tabs (Matching Screenshot 1 exactly)
  const filterTabs = [
    {
      id: 'all',
      label: 'All Media',
      icon: <LayoutGrid size={17} strokeWidth={2.4} />,
      activeClass: 'bg-[#06402B] text-white shadow-sm border border-[#06402B]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
    {
      id: 'education',
      label: 'Education & Human Capital',
      icon: <BookOpen size={17} strokeWidth={2.4} className="text-[#0B4891]" />,
      activeClass: 'bg-[#0B4891] text-white shadow-sm border border-[#0B4891]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
    {
      id: 'health',
      label: 'Health & Well-being',
      icon: <Heart size={17} strokeWidth={2.4} className="fill-[#DC2626] text-[#DC2626]" />,
      activeClass: 'bg-[#DC2626] text-white shadow-sm border border-[#DC2626]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
    {
      id: 'community',
      label: 'Community Resilience & Social Well-being',
      icon: <Users size={17} strokeWidth={2.4} className="text-[#EA580C]" />,
      activeClass: 'bg-[#EA580C] text-white shadow-sm border border-[#EA580C]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
  ];

  // 2. Featured Albums Dataset (Matching Screenshot 1 exactly)
  const albums = [
    {
      id: 'founder-album',
      pillar: 'all',
      title: 'Chief Michael Ade.Ojo: A Life of Service',
      subtitle: 'Philanthropic Journey & Impact Legacy',
      image: founderImages.founder1,
      photos: 7,
      videos: 2,
      date: '2026-03-20',
      views: 3840,
      gallery: [
        founderImages.founder1,
        founderImages.founder2,
        founderImages.founder3,
        founderImages.founder4,
        founderImages.founder5,
        founderImages.founder6,
        founderImages.founder7
      ],
      description: 'A curated visual retrospective documenting Chief Michael Ade.Ojo’s lifetime of philanthropic stewardship, university patronship, and transformative grassroots interventions across Nigeria.'
    },
    {
      id: 'education-album',
      pillar: 'education',
      title: 'Education & Human Capital',
      subtitle: 'Learning Today, Leading Tomorrow',
      image: '/images/album_education.jpg',
      photos: 124,
      videos: 8,
      date: '2026-03-15',
      views: 1420,
      gallery: [
        '/images/album_education.jpg',
        '/images/pillar_graduates.jpg',
        '/images/banner_schoolgirl.jpg',
        '/images/resources_hero_girl.jpg',
        '/images/our_work_cta_boy.jpg'
      ],
      description: 'Documenting our flagship education interventions, Mission 1,000 professionals sponsorship, school facility upgrades, and tertiary academic scholarship awards.'
    },
    {
      id: 'health-album',
      pillar: 'health',
      title: 'Health & Well-being',
      subtitle: 'Healthier People, Stronger Communities',
      image: '/images/album_health.jpg',
      photos: 98,
      videos: 12,
      date: '2026-02-28',
      views: 1290,
      gallery: [
        '/images/album_health.jpg',
        '/images/pillar_health.jpg',
        '/images/video_health_doctor.jpg',
        '/images/pillar_community_elderly.jpg'
      ],
      description: 'Photos and field moments from our free mobile healthcare caravans, maternal care units, medical diagnostic screenings, and community health outposts.'
    },
    {
      id: 'community-album',
      pillar: 'community',
      title: 'Community Resilience',
      subtitle: 'Stronger Communities, Brighter Futures',
      image: '/images/album_community.jpg',
      photos: 112,
      videos: 10,
      date: '2026-01-20',
      views: 1850,
      gallery: [
        '/images/album_community.jpg',
        '/images/video_borehole_water.jpg',
        '/images/pillar_community.jpg',
        '/images/hero_community.jpg',
        '/images/our_journey_seedling.jpg'
      ],
      description: 'Showcasing solar-powered clean water installations, cooperative micro-enterprise grants, rural infrastructure upgrades, and local capacity workshops.'
    },
    {
      id: 'events-album',
      pillar: 'all',
      title: 'Events & Special Moments',
      subtitle: 'Milestones, Partnerships and Field Visits',
      image: '/images/album_events.jpg',
      photos: 86,
      videos: 15,
      date: '2026-03-01',
      views: 2100,
      gallery: [
        '/images/album_events.jpg',
        '/images/founder_new.jpg',
        '/images/hero_banner_official.jpg',
        '/images/chief_ade_ojo_sepia.jpg'
      ],
      description: 'High-profile celebrations, stakeholder memorandums of understanding, foundation annual assemblies, and honorary recognitions with Chief Michael Ade.Ojo.'
    },
  ];

  // 3. Featured Videos Dataset (Matching Screenshot 2 exactly)
  const videos = [
    {
      id: 'vid-education',
      pillar: 'education',
      title: 'A Brighter Future Through Education',
      desc: 'How quality education is opening new opportunities for Nigerian children.',
      thumbnail: '/images/banner_schoolgirl.jpg',
      duration: '4:28',
      category: 'Education & Human Capital',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      badgeIcon: <GraduationCap size={13} className="text-emerald-700" />,
      date: '2026-03-10',
      views: 3420,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'vid-health',
      pillar: 'health',
      title: 'Healthier Communities, Stronger Lives',
      desc: 'Improving access to quality healthcare for families across communities.',
      thumbnail: '/images/video_health_doctor.jpg',
      duration: '5:12',
      category: 'Health & Well-being',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200/80',
      badgeIcon: <HeartPulse size={13} className="text-rose-600" />,
      date: '2026-02-18',
      views: 2890,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'vid-community',
      pillar: 'community',
      title: 'Clean Water, Healthier Communities',
      desc: 'How safe water is transforming lives in rural communities.',
      thumbnail: '/images/video_borehole_water.jpg',
      duration: '3:46',
      category: 'Community Resilience',
      badgeClass: 'bg-orange-50 text-orange-800 border-orange-200/80',
      badgeIcon: <Users size={13} className="text-orange-600" />,
      date: '2026-01-25',
      views: 4120,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'vid-founder',
      pillar: 'all',
      title: 'A Legacy of Service and Impact',
      desc: 'The vision and enduring commitment of Chief Michael Ade.Ojo.',
      thumbnail: '/images/founder_new.jpg',
      duration: '6:15',
      category: 'Our Story',
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-200/80',
      badgeIcon: <Bookmark size={13} className="text-teal-700" />,
      date: '2026-03-02',
      views: 5280,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
  ];

  // Filtered Albums Logic
  const filteredAlbums = useMemo(() => {
    return albums
      .filter((album) => {
        const matchesPillar = selectedPillar === 'all' || album.pillar === selectedPillar;
        const matchesSearch =
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || filterType === 'photos';
        return matchesPillar && matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [albums, selectedPillar, searchQuery, filterType, sortBy]);

  // Filtered Videos Logic
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        const matchesPillar = selectedPillar === 'all' || video.pillar === selectedPillar;
        const matchesSearch =
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || filterType === 'videos';
        return matchesPillar && matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [videos, selectedPillar, searchQuery, filterType, sortBy]);

  return (
    <section className="w-full bg-white font-sans pt-5 sm:pt-6 pb-9 sm:pb-11 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* ══════════════════════════════════════════════════════════════
            1. TOP CONTROLS BAR: PILLAR TABS + SEARCH + DROPDOWNS
        ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Pillar Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 xl:pb-0 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = selectedPillar === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPillar(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 whitespace-nowrap cursor-pointer shadow-2xs ${
                    isActive ? tab.activeClass : tab.inactiveClass
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Search Input & Dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap items-end gap-3 shrink-0">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos and videos..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0F4C3A] transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter by Type Dropdown */}
            <div className="space-y-1">
              <label className="block text-[11px] text-slate-500 font-semibold tracking-tight">
                Filter by Type
              </label>
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer shadow-2xs"
                >
                  <option value="all">All Types</option>
                  <option value="photos">Photos Only</option>
                  <option value="videos">Videos Only</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort by Dropdown */}
            <div className="space-y-1">
              <label className="block text-[11px] text-slate-500 font-semibold tracking-tight">
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer shadow-2xs"
                >
                  <option value="latest">Latest</option>
                  <option value="views">Most Viewed</option>
                  <option value="title">Alphabetical</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>


        {/* ══════════════════════════════════════════════════════════════
            2. FEATURED ALBUMS SECTION (SCREENSHOT 1)
        ══════════════════════════════════════════════════════════════ */}
        {(filterType === 'all' || filterType === 'photos') && (
          <div className="space-y-5">
            
            {/* Header: Title on Left & "View All Albums ->" on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-start gap-3">
                {/* Orange Vertical Accent Bar */}
                <div className="w-1.5 h-10 sm:h-11 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                
                <div className="space-y-0.5">
                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#0F2B5B] tracking-tight leading-tight">
                    Featured Albums
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-[13px] font-normal leading-relaxed">
                    Curated collections from our key programmes and events.
                  </p>
                </div>
              </div>

              {/* View All Albums Link */}
              <button
                type="button"
                onClick={() => {
                  setSelectedPillar('all');
                  setSearchQuery('');
                  setFilterType('photos');
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-[#0F4C3A] hover:text-[#064E3B] transition-colors self-start sm:self-auto cursor-pointer group"
              >
                <span className="underline decoration-2 underline-offset-4">View All Albums</span>
                <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* 4 Album Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {filteredAlbums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => {
                    setActiveModalAlbum(album);
                    setActivePhotoIndex(0);
                  }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer hover:border-slate-300"
                >
                  <div>
                    {/* Album Cover Photo */}
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover Overlay with Preview Icon */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 backdrop-blur-xs text-[#0F2B5B] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Maximize2 size={13} /> View Album
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <h3 className="text-sm sm:text-[15px] font-extrabold text-[#0F2B5B] leading-snug group-hover:text-[#0F4C3A] transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-slate-500 text-[11px] sm:text-xs leading-tight">
                          {album.subtitle}
                        </p>
                      </div>

                      {/* Soft green circle button with arrow */}
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-200 mt-0.5 shadow-2xs">
                        <ArrowRight size={14} className="stroke-[2.4]" />
                      </div>
                    </div>
                  </div>

                  {/* Counts Footer */}
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-[11px] sm:text-xs text-slate-400 font-medium">
                    <span>{album.photos} photos</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span>{album.videos} videos</span>
                  </div>

                </div>
              ))}
            </div>

            {filteredAlbums.length === 0 && (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 space-y-2">
                <p className="text-sm font-bold text-slate-700">No media albums match your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedPillar('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-[#0F4C3A] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}

          </div>
        )}


        {/* ══════════════════════════════════════════════════════════════
            3. FEATURED VIDEOS SECTION (SCREENSHOT 2)
        ══════════════════════════════════════════════════════════════ */}
        {(filterType === 'all' || filterType === 'videos') && (
          <div className="space-y-5 pt-2">
            
            {/* Header: Title on Left & "View All Videos ->" on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                {/* Orange Vertical Accent Bar */}
                <div className="w-1.5 h-10 sm:h-11 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                
                <div className="space-y-0.5">
                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#0F2B5B] tracking-tight leading-tight">
                    Featured Videos
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-[13px] font-normal leading-relaxed">
                    Watch powerful stories of impact from our programmes and communities.
                  </p>
                </div>
              </div>

              {/* View All Videos Link */}
              <button
                type="button"
                onClick={() => {
                  setSelectedPillar('all');
                  setSearchQuery('');
                  setFilterType('videos');
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-[#0F4C3A] hover:text-[#064E3B] transition-colors self-start sm:self-auto cursor-pointer group"
              >
                <span className="underline decoration-2 underline-offset-4">View All Videos</span>
                <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* 4 Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveModalVideo(video)}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer hover:border-slate-300"
                >
                  <div>
                    {/* Video Thumbnail with Play Button Overlay & Duration Badge */}
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                      />

                      {/* Dark gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                      {/* Translucent Play Button Overlay in Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white shadow-xl group-hover:scale-115 group-hover:bg-[#0F4C3A] transition-all duration-300 border border-white/20">
                          <Play size={20} className="fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Duration Badge at Bottom Right */}
                      <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <Clock size={11} className="stroke-[2.2]" />
                        {video.duration}
                      </span>
                    </div>

                    {/* Content Details: Title & Description */}
                    <div className="p-4 sm:p-5 space-y-1.5">
                      <h3 className="text-sm sm:text-[15px] font-extrabold text-[#0F2B5B] leading-snug group-hover:text-[#0F4C3A] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2">
                        {video.desc}
                      </p>
                    </div>
                  </div>

                  {/* Category Pill Tag at Bottom */}
                  <div className="px-4 sm:px-5 pb-4.5 pt-1">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-semibold border ${video.badgeClass}`}>
                      {video.badgeIcon}
                      <span>{video.category}</span>
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 space-y-2">
                <p className="text-sm font-bold text-slate-700">No videos match your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedPillar('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-[#0F4C3A] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}

          </div>
        )}

      </div>


      {/* ══════════════════════════════════════════════════════════════
          4. INTERACTIVE ALBUM VIEWER MODAL - FULL SCREEN 100VH LIGHTBOX
      ══════════════════════════════════════════════════════════════ */}
      {activeModalAlbum && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden animate-fade-in font-sans"
          role="dialog"
          aria-modal="true"
          aria-label={activeModalAlbum.title}
        >
          {/* Subtle ambient glow effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#06402B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* 1. Modal Top Brand Header / Navbar with Back Button & Breadcrumbs */}
          <div className="shrink-0 px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 border-b border-slate-200/80 bg-white/95 backdrop-blur-md z-10 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Left: Back Button + Breadcrumbs + Album Title */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveModalAlbum(null)}
                  className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-700 hover:text-white transition-all duration-200 cursor-pointer text-xs font-bold shrink-0 shadow-xs hover:shadow-md active:scale-95"
                  title="Back to Media Gallery"
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
                      onClick={() => setActiveModalAlbum(null)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <button
                      type="button"
                      onClick={() => setActiveModalAlbum(null)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Resources
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <span className="text-[#0F2B5B] font-bold truncate">Media Album</span>
                  </div>

                  {/* Title and Category Badge */}
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <h3 className="text-sm sm:text-base font-black font-serif-cmaof text-[#0F2B5B] truncate">
                      {activeModalAlbum.title}
                    </h3>
                    <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#0F4C3A]/10 text-[#0F4C3A] border border-[#0F4C3A]/20">
                      {activeModalAlbum.photos} Photos • {activeModalAlbum.videos} Videos
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Slide Counter + Close Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-xs font-extrabold text-[#0F2B5B]">
                    Photo {activePhotoIndex + 1} of {activeModalAlbum.gallery.length}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Press ESC to exit</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalAlbum(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-[#EA580C] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                  title="Close album (Esc)"
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
                  src={activeModalAlbum.gallery[activePhotoIndex]}
                  alt={`${activeModalAlbum.title} photo ${activePhotoIndex + 1}`}
                  className="w-full h-full object-contain md:object-cover md:object-center transition-all duration-300"
                />

                {/* Navigation Arrows on Photo */}
                {activeModalAlbum.gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : activeModalAlbum.gallery.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#06402B] text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg group-hover:scale-105"
                      title="Previous photo (Left Arrow)"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((prev) => (prev < activeModalAlbum.gallery.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#06402B] text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg group-hover:scale-105"
                      title="Next photo (Right Arrow)"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Floating Photo Counter Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-bold text-[#0F2B5B] border border-slate-200 shadow-md">
                  Photo {activePhotoIndex + 1} of {activeModalAlbum.gallery.length}
                </div>
              </div>
            </div>

            {/* Right Photo Narrative */}
            <div className="md:col-span-5 space-y-3.5 sm:space-y-4 lg:space-y-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs self-start">
                <span>{activeModalAlbum.photos} photos • {activeModalAlbum.videos} videos</span>
              </div>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-cmaof leading-tight text-[#0F2B5B]">
                {activeModalAlbum.title}
              </h4>

              <p className="text-sm sm:text-base font-bold text-[#06402B]">
                {activeModalAlbum.subtitle}
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-medium">
                {activeModalAlbum.description}
              </p>

              {/* Archival Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#06402B]/[0.04] border-l-4 border-[#06402B] border-y border-r border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1.5 shadow-xs">
                <span className="font-extrabold text-[#06402B] uppercase tracking-wider text-[11px] block">Strategic Initiative Record</span>
                <span className="leading-relaxed font-medium">Chief Michael Ade.Ojo Foundation official archival record documenting grassroots impact, community empowerment, and institutional progress.</span>
              </div>

              {/* Action Buttons: Share & Close */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleShare(activeModalAlbum.title)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {copiedLink ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Album'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalAlbum(null)}
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
              onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : activeModalAlbum.gallery.length - 1))}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Previous slide"
            >
              <ChevronLeft size={16} strokeWidth={2.4} />
            </button>

            <div 
              ref={albumThumbnailContainerRef}
              className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
            >
              {activeModalAlbum.gallery.map((imgSrc, idx) => (
                <button
                  key={idx}
                  ref={(el) => (albumThumbnailRefs.current[idx] = el)}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-[#EA580C] ring-4 ring-[#EA580C]/30 scale-105 sm:scale-110 shadow-lg shadow-[#EA580C]/20'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-[#0F4C3A] hover:scale-105'
                  }`}
                  title={`View photo ${idx + 1}`}
                >
                  <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex((prev) => (prev < activeModalAlbum.gallery.length - 1 ? prev + 1 : 0))}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Next slide"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>

        </div>,
        document.body
      )}


      {/* ══════════════════════════════════════════════════════════════
          5. INTERACTIVE VIDEO PLAYER MODAL - FULL SCREEN 100VH SHOWCASE
      ══════════════════════════════════════════════════════════════ */}
      {activeModalVideo && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden animate-fade-in font-sans"
          role="dialog"
          aria-modal="true"
          aria-label={activeModalVideo.title}
        >
          {/* Subtle ambient glow effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#06402B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* 1. Modal Top Brand Header / Navbar with Back Button & Breadcrumbs */}
          <div className="shrink-0 px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 border-b border-slate-200/80 bg-white/95 backdrop-blur-md z-10 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Left: Back Button + Breadcrumbs + Video Title */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveModalVideo(null)}
                  className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-700 hover:text-white transition-all duration-200 cursor-pointer text-xs font-bold shrink-0 shadow-xs hover:shadow-md active:scale-95"
                  title="Back to Documentaries"
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
                      onClick={() => setActiveModalVideo(null)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <button
                      type="button"
                      onClick={() => setActiveModalVideo(null)}
                      className="hover:text-[#0F4C3A] transition-colors cursor-pointer"
                    >
                      Resources
                    </button>
                    <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    <span className="text-[#0F2B5B] font-bold truncate">Documentary Showcase</span>
                  </div>

                  {/* Title and Category Badge */}
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <h3 className="text-sm sm:text-base font-black font-serif-cmaof text-[#0F2B5B] truncate">
                      {activeModalVideo.title}
                    </h3>
                    <span className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${activeModalVideo.badgeClass}`}>
                      {activeModalVideo.badgeIcon}
                      <span>{activeModalVideo.category}</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Duration + Close Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-xs font-extrabold text-[#0F2B5B] flex items-center gap-1.5">
                    <Clock size={13} className="text-[#EA580C]" /> {activeModalVideo.duration}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Press ESC to exit</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalVideo(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-[#EA580C] text-slate-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                  title="Close video (Esc)"
                >
                  <X size={18} strokeWidth={2.4} />
                </button>
              </div>

            </div>
          </div>

          {/* 2. Modal Center Showcase - Takes 100% remaining vertical space */}
          <div className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center overflow-y-auto z-10">
            
            {/* Left Video Player Stage (7 Cols) */}
            <div className="md:col-span-7 h-full max-h-[56vh] sm:max-h-[62vh] lg:max-h-[66vh] flex items-center justify-center relative">
              <div className="relative w-full aspect-video max-w-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-2xl group flex items-center justify-center">
                <img
                  src={activeModalVideo.thumbnail}
                  alt={activeModalVideo.title}
                  className="w-full h-full object-cover"
                />

                {/* Simulated Player Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 flex flex-col justify-between p-4 sm:p-6">
                  <div className="flex items-center justify-between text-white text-xs font-semibold">
                    <span className="bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 border border-white/10">
                      <Clock size={12} className="text-[#EA580C]" /> Duration: {activeModalVideo.duration}
                    </span>
                    <span className="bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 font-bold">
                      1080p HD
                    </span>
                  </div>

                  {/* Big Play Button with CMAOF Orange */}
                  <div className="self-center">
                    <button 
                      type="button"
                      onClick={() => alert('Streaming documentary presentation...')}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-white/30"
                      title="Play Documentary"
                    >
                      <Play size={30} className="fill-white translate-x-1" />
                    </button>
                  </div>

                  {/* Bottom Player Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#EA580C] to-[#F97316] h-full w-[42%]" />
                    </div>
                    <div className="flex items-center justify-between text-white text-[11px] font-medium">
                      <span>01:45 / {activeModalVideo.duration}</span>
                      <span className="font-semibold text-white/90">Chief Michael Ade.Ojo Foundation Productions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Video Narrative (5 Cols) */}
            <div className="md:col-span-5 space-y-3.5 sm:space-y-4 lg:space-y-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs self-start">
                <span>{activeModalVideo.category}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-cmaof leading-tight text-[#0F2B5B]">
                {activeModalVideo.title}
              </h4>

              <p className="text-sm sm:text-base font-bold text-[#06402B]">
                Field Impact & Community Documentary
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-medium">
                {activeModalVideo.desc} This recorded field documentary illustrates the measurable impact achieved through our strategic partnerships and active community interventions.
              </p>

              {/* Strategic Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#06402B]/[0.04] border-l-4 border-[#06402B] border-y border-r border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1.5 shadow-xs">
                <span className="font-extrabold text-[#06402B] uppercase tracking-wider text-[11px] block">Production Provenance</span>
                <span className="leading-relaxed font-medium">Official Chief Michael Ade.Ojo Foundation field media production. Recorded in high-definition to preserve grassroots stories of lasting transformation.</span>
              </div>

              {/* Action Buttons: Share & Close */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleShare(activeModalVideo.title)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {copiedLink ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Documentary'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalVideo(null)}
                  className="px-5 py-2 bg-[#06402B] hover:bg-[#042A1D] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Done
                </button>
              </div>
            </div>

          </div>

          {/* 3. Modal Bottom Status Bar */}
          <div className="shrink-0 py-3 sm:py-3.5 px-6 sm:px-12 bg-white/95 border-t border-slate-200/80 backdrop-blur-md flex items-center justify-between z-10 shadow-xs">
            <span className="text-xs text-[#06402B] font-bold">
              Chief Michael Ade.Ojo Foundation Documentary Archives
            </span>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>Full HD 1080p</span>
              <span>•</span>
              <span>Official Media Archive</span>
            </div>
          </div>

        </div>,
        document.body
      )}

    </section>
  );
};

export default ResourcesMediaAlbums;
