import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, 
  BookOpen, 
  Heart, 
  Users, 
  Search, 
  ChevronDown, 
  ArrowRight, 
  X, 
  Image as ImageIcon, 
  Video, 
  Maximize2 
} from 'lucide-react';

const ResourcesMediaAlbums = () => {
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [activeModalAlbum, setActiveModalAlbum] = useState(null);

  const filterTabs = [
    {
      id: 'all',
      label: 'All Media',
      icon: <LayoutGrid size={17} />,
      activeClass: 'bg-[#0F4C3A] text-white shadow-sm border border-[#0F4C3A]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
    {
      id: 'education',
      label: 'Education & Human Capital',
      icon: <BookOpen size={17} className="text-[#0B4891]" />,
      activeClass: 'bg-[#0B4891] text-white shadow-sm border border-[#0B4891]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
    {
      id: 'health',
      label: 'Health & Well-being',
      icon: <Heart size={17} className="fill-[#DC2626] text-[#DC2626]" />,
      activeClass: 'bg-[#DC2626] text-white shadow-sm border border-[#DC2626]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
    {
      id: 'community',
      label: 'Community Resilience',
      icon: <Users size={17} className="text-[#EA580C]" />,
      activeClass: 'bg-[#EA580C] text-white shadow-sm border border-[#EA580C]',
      inactiveClass: 'bg-white text-[#0F2B5B] border border-slate-200/90 hover:border-slate-300 hover:shadow-xs',
    },
  ];

  const albums = [
    {
      id: 'education',
      pillar: 'education',
      title: 'Education & Human Capital',
      subtitle: 'Learning Today, Leading Tomorrow',
      image: '/images/album_education.jpg',
      photos: 124,
      videos: 8,
      date: '2026-03-15',
      gallery: [
        '/images/album_education.jpg',
        '/images/pillar_graduates.jpg',
        '/images/resources_hero_girl.jpg',
      ],
    },
    {
      id: 'health',
      pillar: 'health',
      title: 'Health & Well-being',
      subtitle: 'Healthier People, Stronger Communities',
      image: '/images/album_health.jpg',
      photos: 98,
      videos: 12,
      date: '2026-02-28',
      gallery: [
        '/images/album_health.jpg',
        '/images/pillar_health.jpg',
      ],
    },
    {
      id: 'community',
      pillar: 'community',
      title: 'Community Resilience',
      subtitle: 'Stronger Communities, Brighter Futures',
      image: '/images/album_community.jpg',
      photos: 112,
      videos: 10,
      date: '2026-01-20',
      gallery: [
        '/images/album_community.jpg',
        '/images/pillar_community_elderly.jpg',
        '/images/hero_community.jpg',
      ],
    },
    {
      id: 'events',
      pillar: 'all',
      title: 'Events & Special Moments',
      subtitle: 'Milestones, Partnerships and Field Visits',
      image: '/images/album_events.jpg',
      photos: 86,
      videos: 15,
      date: '2026-03-01',
      gallery: [
        '/images/album_events.jpg',
        '/images/founder_new.jpg',
        '/images/hero_banner_official.jpg',
      ],
    },
  ];

  const filteredAlbums = useMemo(() => {
    return albums
      .filter((album) => {
        const matchesPillar = selectedPillar === 'all' || album.pillar === selectedPillar;
        const matchesSearch =
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType =
          filterType === 'all' ||
          (filterType === 'photos' && album.photos > 0) ||
          (filterType === 'videos' && album.videos > 0);
        return matchesPillar && matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'photos') return b.photos - a.photos;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [albums, selectedPillar, searchQuery, filterType, sortBy]);

  return (
    <section className="w-full bg-white font-sans pt-8 sm:pt-10 pb-12 sm:pb-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8">
        
        {/* ── 1. Top Controls Bar: Pillar Tabs + Search + Type & Sort Dropdowns ── */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Pillar Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 xl:pb-0 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = selectedPillar === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPillar(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
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
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0F4C3A] transition-colors"
              />
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
                  className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer"
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
                  className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0F4C3A] cursor-pointer"
                >
                  <option value="latest">Latest</option>
                  <option value="photos">Most Photos</option>
                  <option value="title">Alphabetical</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>

        {/* ── 2. Featured Albums Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          
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
            }}
            className="flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-[#0F4C3A] hover:text-[#064E3B] transition-colors self-start sm:self-auto cursor-pointer group"
          >
            <span className="underline decoration-2 underline-offset-4">View All Albums</span>
            <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </button>

        </div>

        {/* ── 3. 4 Album Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              onClick={() => setActiveModalAlbum(album)}
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
                  {/* Subtle hover overlay badge */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur-xs text-[#0F2B5B] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
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
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-200 mt-0.5">
                    <ArrowRight size={14} className="stroke-[2.4]" />
                  </div>
                </div>
              </div>

              {/* Counts footer */}
              <div className="px-4 sm:px-5 pb-4 pt-1 text-[11px] sm:text-xs text-slate-400 font-medium">
                <span>{album.photos} photos</span>
                <span className="mx-2 text-slate-300">|</span>
                <span>{album.videos} videos</span>
              </div>

            </div>
          ))}
        </div>

        {/* Fallback if no albums match search */}
        {filteredAlbums.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 space-y-2">
            <p className="text-sm font-bold text-slate-700">No media albums match your criteria.</p>
            <button
              onClick={() => {
                setSelectedPillar('all');
                setSearchQuery('');
                setFilterType('all');
              }}
              className="text-xs font-bold text-[#0F4C3A] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* ── 4. Interactive Album Preview Modal ── */}
      {activeModalAlbum && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModalAlbum(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#0F2B5B]">
                  {activeModalAlbum.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeModalAlbum.photos} photos • {activeModalAlbum.videos} videos • {activeModalAlbum.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalAlbum(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Gallery Preview */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
                <img
                  src={activeModalAlbum.image}
                  alt={activeModalAlbum.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {activeModalAlbum.gallery.map((imgSrc, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={imgSrc} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Official CMAO Foundation Media Archive
              </span>
              <button
                type="button"
                onClick={() => setActiveModalAlbum(null)}
                className="px-4 py-2 bg-[#0F2B5B] hover:bg-[#0F4C3A] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ResourcesMediaAlbums;
