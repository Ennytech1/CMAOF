import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  FileText, 
  Search, 
  BookOpen, 
  Shield, 
  Mail, 
  Image as ImageIcon,
  Filter, 
  RefreshCw, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight,
  Check,
  Video,
  Presentation,
  PieChart,
  Headphones,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';
import ResourcesHero from '../components/resources/ResourcesHero';

/**
 * Custom 4-Bar Chart Icon matching reference screenshot
 */
const FourBarChartIcon = ({ className = "w-[22px] h-[22px]" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect x="2.5" y="13" width="3.4" height="8" rx="1" />
    <rect x="7.8" y="8.5" width="3.4" height="12.5" rx="1" />
    <rect x="13.1" y="4" width="3.4" height="17" rx="1" />
    <rect x="18.4" y="9.5" width="3.4" height="11.5" rx="1" />
  </svg>
);

const ResourcesPage = ({ onOpenDonate }) => {
  // Filters State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedDocTypes, setSelectedDocTypes] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('latest');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      toast.success('Thank you for subscribing to CMAOF Resources & Publications!');
      setNewsletterEmail('');
    }
  };

  // 1. Top 8 Horizontal Category Tabs (Exact match to reference image 1)
  const topTabs = [
    {
      id: 'all',
      title: 'All Resources',
      subtitle: 'View all',
      icon: <FileText size={20} strokeWidth={2.2} />,
      iconColor: 'text-white',
    },
    {
      id: 'annual-reports',
      title: 'Annual Reports',
      subtitle: 'Financial & impact',
      icon: <BookOpen size={20} strokeWidth={2.4} />,
      iconColor: 'text-[#0B3B82]',
    },
    {
      id: 'impact-reports',
      title: 'Impact Reports',
      subtitle: 'Our results',
      icon: <FourBarChartIcon className="w-5 h-5 text-[#06402B]" />,
      iconColor: 'text-[#06402B]',
    },
    {
      id: 'programme-reports',
      title: 'Programme Reports',
      subtitle: 'By pillar and initiative',
      icon: <FileText size={20} strokeWidth={2.2} />,
      iconColor: 'text-[#EA580C]',
    },
    {
      id: 'publications',
      title: 'Publications',
      subtitle: 'Guides & research',
      icon: <BookOpen size={20} strokeWidth={2.4} />,
      iconColor: 'text-[#0B3B82]',
    },
    {
      id: 'policies',
      title: 'Policies',
      subtitle: 'Governance & compliance',
      icon: <Shield size={20} strokeWidth={2.2} />,
      iconColor: 'text-[#DC2626]',
    },
    {
      id: 'newsletters',
      title: 'Newsletters',
      subtitle: 'Updates & insights',
      icon: <Mail size={20} strokeWidth={2.2} />,
      iconColor: 'text-[#06402B]',
    },
    {
      id: 'media-kit',
      title: 'Media Kit',
      subtitle: 'Logos, photos & brand',
      icon: <ImageIcon size={20} strokeWidth={2.2} />,
      iconColor: 'text-[#EA580C]',
    },
  ];

  // 2. Sidebar Category Options with Counts
  const categoryOptions = [
    { id: 'all', label: 'All Resources', count: 42 },
    { id: 'annual-reports', label: 'Annual Reports', count: 6 },
    { id: 'impact-reports', label: 'Impact Reports', count: 8 },
    { id: 'programme-reports', label: 'Programme Reports', count: 10 },
    { id: 'publications', label: 'Publications', count: 7 },
    { id: 'policies', label: 'Policies', count: 6 },
    { id: 'newsletters', label: 'Newsletters', count: 4 },
    { id: 'media-kit', label: 'Media Kit', count: 3 },
  ];

  // 3. Document Type Options with Counts
  const docTypeOptions = [
    { id: 'pdf', label: 'PDF', count: 36 },
    { id: 'video', label: 'Video', count: 4 },
    { id: 'presentation', label: 'Presentation', count: 2 },
    { id: 'infographic', label: 'Infographic', count: 3 },
    { id: 'image', label: 'Image', count: 3 },
  ];

  // 4. Featured Resources (Section A - 4 Large Cards)
  const featuredResources = [
    {
      id: 'feat-1',
      title: 'Annual Report 2024',
      subtitle: 'Our progress, achievements and financial overview for 2024.',
      coverImage: '/images/cover_annual_report_2024.jpg',
      format: 'PDF',
      size: '12.4 MB',
      category: 'annual-reports',
      year: '2024',
      type: 'pdf',
    },
    {
      id: 'feat-2',
      title: 'Impact Report 2024',
      subtitle: 'Stories of impact across education, health and community programmes.',
      coverImage: '/images/cover_impact_report_2024.jpg',
      format: 'PDF',
      size: '8.7 MB',
      category: 'impact-reports',
      year: '2024',
      type: 'pdf',
    },
    {
      id: 'feat-3',
      title: 'Strategic Plan 2026 – 2030',
      subtitle: 'Our roadmap for a stronger, more inclusive Nigeria.',
      coverImage: '/images/cover_strategic_plan.jpg',
      format: 'PDF',
      size: '5.1 MB',
      category: 'publications',
      year: '2025',
      type: 'pdf',
    },
    {
      id: 'feat-4',
      title: 'Governance & Policy Manual',
      subtitle: 'Our key policies, standards and governance framework.',
      coverImage: '/images/cover_governance_policy.jpg',
      format: 'PDF',
      size: '3.6 MB',
      category: 'policies',
      year: '2024',
      type: 'pdf',
    },
  ];

  // 5. All Resources (Section B - 8+ Compact Cards with Thumbnails)
  const allResources = [
    {
      id: 1,
      title: 'Medical Outreach Report 2024',
      categoryName: 'Programme Report',
      category: 'programme-reports',
      date: 'March 2025',
      year: '2025',
      format: 'PDF',
      size: '4.2 MB',
      type: 'pdf',
      thumbnail: '/images/album_health.jpg',
      thumbnailBg: 'bg-[#06402B]',
    },
    {
      id: 2,
      title: 'Education Programme Report 2024',
      categoryName: 'Programme Report',
      category: 'programme-reports',
      date: 'February 2025',
      year: '2025',
      format: 'PDF',
      size: '3.8 MB',
      type: 'pdf',
      thumbnail: '/images/album_education.jpg',
      thumbnailBg: 'bg-[#0B3B82]',
    },
    {
      id: 3,
      title: 'CMAOF Newsletter Q1 2025',
      categoryName: 'Newsletter',
      category: 'newsletters',
      date: 'January 2025',
      year: '2025',
      format: 'PDF',
      size: '2.1 MB',
      type: 'pdf',
      thumbnail: '/images/banner_schoolgirl.jpg',
      thumbnailBg: 'bg-[#06402B]',
    },
    {
      id: 4,
      title: 'Child Protection Policy',
      categoryName: 'Policy',
      category: 'policies',
      date: 'January 2025',
      year: '2025',
      format: 'PDF',
      size: '1.5 MB',
      type: 'pdf',
      thumbnail: '/images/cover_governance_policy.jpg',
      thumbnailBg: 'bg-[#C28224]',
    },
    {
      id: 5,
      title: 'Clean Water Initiative Brief',
      categoryName: 'Publication',
      category: 'publications',
      date: 'December 2024',
      year: '2024',
      format: 'PDF',
      size: '2.8 MB',
      type: 'pdf',
      thumbnail: '/images/album_community.jpg',
      thumbnailBg: 'bg-[#0F2B5B]',
    },
    {
      id: 6,
      title: 'Community Health Impact Study',
      categoryName: 'Research Report',
      category: 'impact-reports',
      date: 'November 2024',
      year: '2024',
      format: 'PDF',
      size: '4.5 MB',
      type: 'pdf',
      thumbnail: '/images/pillar_health.jpg',
      thumbnailBg: 'bg-[#06402B]',
    },
    {
      id: 7,
      title: 'CMAOF Brand Kit',
      categoryName: 'Media Kit',
      category: 'media-kit',
      date: 'October 2024',
      year: '2024',
      format: 'ZIP',
      size: '25.6 MB',
      type: 'image',
      thumbnail: '/images/timeline_sprout_bg.jpg',
      thumbnailBg: 'bg-[#EA580C]',
    },
    {
      id: 8,
      title: 'Safeguarding Policy',
      categoryName: 'Policy',
      category: 'policies',
      date: 'September 2024',
      year: '2024',
      format: 'PDF',
      size: '1.9 MB',
      type: 'pdf',
      thumbnail: '/images/cover_governance_policy.jpg',
      thumbnailBg: 'bg-[#C28224]',
    },
    {
      id: 9,
      title: 'Tertiary Scholarship Cohort Review',
      categoryName: 'Programme Report',
      category: 'programme-reports',
      date: 'August 2024',
      year: '2024',
      format: 'PDF',
      size: '3.1 MB',
      type: 'pdf',
      thumbnail: '/images/pillar_graduates.jpg',
      thumbnailBg: 'bg-[#06402B]',
    },
    {
      id: 10,
      title: 'Audited Financial Statements 2023–2024',
      categoryName: 'Annual Report',
      category: 'annual-reports',
      date: 'July 2024',
      year: '2024',
      format: 'PDF',
      size: '5.4 MB',
      type: 'pdf',
      thumbnail: '/images/cover_annual_report_2024.jpg',
      thumbnailBg: 'bg-[#0B3B82]',
    },
    {
      id: 11,
      title: 'Mission 1,000 Ilara Community Brief',
      categoryName: 'Publication',
      category: 'publications',
      date: 'June 2024',
      year: '2024',
      format: 'PDF',
      size: '2.4 MB',
      type: 'pdf',
      thumbnail: '/images/hero_community.jpg',
      thumbnailBg: 'bg-[#0F2B5B]',
    },
    {
      id: 12,
      title: 'Foundation Institutional Charter',
      categoryName: 'Policy',
      category: 'policies',
      date: 'May 2024',
      year: '2024',
      format: 'PDF',
      size: '1.8 MB',
      type: 'pdf',
      thumbnail: '/images/cover_governance_policy.jpg',
      thumbnailBg: 'bg-[#C28224]',
    },
  ];

  // Filtering Logic
  const filteredAllResources = useMemo(() => {
    return allResources
      .filter((item) => {
        // Category Filter
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        
        // Search Filter
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

        // Year Filter
        const matchesYear = selectedYear === 'all' || item.year === selectedYear;

        // Doc Type Filter
        const matchesDocType = 
          selectedDocTypes.length === 0 || selectedDocTypes.includes(item.type);

        return matchesCategory && matchesSearch && matchesYear && matchesDocType;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return b.id - a.id;
        if (sortBy === 'oldest') return a.id - b.id;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [allResources, activeCategory, searchQuery, selectedYear, selectedDocTypes, sortBy]);

  // Handle Category Toggle from Sidebar or Top Tabs
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
  };

  // Handle Doc Type Checkbox
  const handleDocTypeToggle = (typeId) => {
    setSelectedDocTypes((prev) => 
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  // Clear Filters Action
  const handleClearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedYear('all');
    setSelectedDocTypes([]);
    setSortBy('latest');
    toast.success('Filters cleared.');
  };

  // Download Trigger
  const handleDownload = (title) => {
    toast.success(`Downloading "${title}"...`, {
      icon: '📥',
      style: {
        borderRadius: '12px',
        background: '#06402B',
        color: '#fff',
        fontSize: '13px',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <div className="w-full bg-[#F8FAFC] font-sans animate-fade-in pb-0">
      
      {/* ── 1. Resources Hero Banner ── */}
      <ResourcesHero />

      {/* ── 2. Top Horizontal Category Tabs / Navigation ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="relative">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
            {topTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategorySelect(tab.id)}
                  className={`group flex items-center gap-3 px-4 py-2.5 sm:px-4.5 sm:py-3 rounded-2xl shrink-0 text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#06402B] text-white shadow-md border border-[#06402B]'
                      : 'bg-white text-slate-800 border border-[#E2E8F0] shadow-xs hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5'
                  }`}
                >
                  {/* Category Icon */}
                  <div className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-white' : tab.iconColor
                  }`}>
                    {tab.icon}
                  </div>

                  {/* Two-Line Text Block */}
                  <div className="flex flex-col whitespace-nowrap pr-1.5">
                    <span className={`text-[13px] sm:text-[13.5px] font-bold leading-tight ${
                      isActive ? 'text-white' : 'text-[#0B2D6E]'
                    }`}>
                      {tab.title}
                    </span>
                    <span className={`text-[10.5px] sm:text-[11px] font-medium leading-tight mt-0.5 ${
                      isActive ? 'text-emerald-100/90' : 'text-[#5A6E85]'
                    }`}>
                      {tab.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Two-Column Main Layout: Left Filter Sidebar + Right Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ════════ LEFT SIDEBAR: Sticky Filter Control Panel (Width ~22-25%) ════════ */}
          <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 sticky top-24 z-20 space-y-6 bg-transparent">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-5">
              
              {/* Filter Resources Header */}
              <div className="flex items-center gap-2.5 text-[#06402B] pb-1">
                <Filter size={19} strokeWidth={2.4} />
                <h3 className="font-bold text-base text-[#06402B]">
                  Filter Resources
                </h3>
              </div>

              {/* Search Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0B2D6E]">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources..."
                    className="w-full pl-3.5 pr-9 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] transition-colors"
                  />
                  <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Category Filter Checkbox List */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0B2D6E] pt-2">
                  Category
                </label>
                <div className="space-y-1.5">
                  {categoryOptions.map((cat) => {
                    const isChecked = activeCategory === cat.id;
                    return (
                      <label
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="flex items-center justify-between text-xs py-1 px-1 rounded-lg hover:bg-slate-50 cursor-pointer group select-none transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                            isChecked 
                              ? 'bg-[#06402B] text-white' 
                              : 'border border-slate-300 group-hover:border-slate-400 bg-white'
                          }`}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className={`text-[12.5px] transition-colors ${
                            isChecked ? 'font-bold text-[#06402B]' : 'font-medium text-[#5A6E85] group-hover:text-[#0B2D6E]'
                          }`}>
                            {cat.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#5A6E85]">
                          ({cat.count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Year Select Dropdown */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0B2D6E] pt-2">
                  Year
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full appearance-none bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-medium text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    <option value="all">All Years</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Document Type Checkboxes */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0B2D6E] pt-2">
                  Document Type
                </label>
                <div className="space-y-1.5">
                  {docTypeOptions.map((dt) => {
                    const isChecked = selectedDocTypes.includes(dt.id);
                    return (
                      <label
                        key={dt.id}
                        onClick={() => handleDocTypeToggle(dt.id)}
                        className="flex items-center justify-between text-xs py-1 px-1 rounded-lg hover:bg-slate-50 cursor-pointer group select-none transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                            isChecked 
                              ? 'bg-[#06402B] text-white' 
                              : 'border border-slate-300 group-hover:border-slate-400 bg-white'
                          }`}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className={`text-[12.5px] transition-colors ${
                            isChecked ? 'font-bold text-[#06402B]' : 'font-medium text-[#5A6E85] group-hover:text-[#0B2D6E]'
                          }`}>
                            {dt.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#5A6E85]">
                          ({dt.count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters Outlined Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#06402B] text-[#06402B] hover:bg-[#06402B]/5 font-bold text-xs transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} strokeWidth={2.3} />
                  <span>Clear Filters</span>
                </button>
              </div>

            </div>

          </aside>

          {/* ════════ RIGHT MAIN CONTENT AREA (Width ~75-78%) ════════ */}
          <div className="flex-1 min-w-0 space-y-9 sm:space-y-10">
            
            {/* ──────────────── SECTION A: Featured Resources ──────────────── */}
            <section className="space-y-4">
              
              {/* Section Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-1 self-stretch min-h-[32px] sm:min-h-[36px] bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2D6E] tracking-tight leading-snug">
                      Featured Resources
                    </h2>
                    <p className="text-[#5A6E85] text-xs sm:text-[13px] font-normal leading-relaxed">
                      Key reports and publications highlighting our impact, progress and strategic direction.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCategory('all')}
                  className="hidden sm:flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#06402B] hover:text-[#042D1E] transition-colors shrink-0 group cursor-pointer"
                >
                  <span>View All Featured</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* 4-Column Grid of Large Featured Cards */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-4.5">
                  {featuredResources.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                    >
                      {/* Top Cover Image Area */}
                      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Card Content & Metadata */}
                      <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3.5">
                        <div className="space-y-1">
                          <h3 className="font-bold text-[14.5px] sm:text-[15px] text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[#5A6E85] text-xs sm:text-[12.5px] font-normal leading-relaxed line-clamp-2">
                            {item.subtitle}
                          </p>
                        </div>

                        {/* Format & Download Button */}
                        <div className="space-y-3 pt-1">
                          {/* Format Tag with Red PDF Icon */}
                          <div className="flex items-center gap-1.5 text-xs text-[#5A6E85] font-medium">
                            <FileText size={15} className="text-[#DC2626] shrink-0" strokeWidth={2.4} />
                            <span>{item.format} • {item.size}</span>
                          </div>

                          {/* Full-width dark green download button */}
                          <button
                            type="button"
                            onClick={() => handleDownload(item.title)}
                            className="w-full bg-[#06402B] hover:bg-[#042D1E] active:bg-[#032418] text-white py-2.5 px-3 rounded-lg font-medium text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.99] cursor-pointer"
                          >
                            <span>Download</span>
                            <Download size={14} strokeWidth={2.3} />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Carousel Right Arrow Button matching Card 4 in reference screenshot */}
                <button
                  type="button"
                  onClick={() => toast('Viewing next featured publications page', { icon: '📄' })}
                  className="hidden xl:flex absolute -right-3.5 top-[28%] -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[#E2E8F0] shadow-md items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer"
                  title="Next featured publication"
                >
                  <ChevronRight size={17} strokeWidth={2.5} />
                </button>
              </div>

            </section>

            {/* ──────────────── SECTION B: All Resources ──────────────── */}
            <section className="space-y-4 pt-2">
              
              {/* Section Header & Toolbar Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
                
                {/* Left Heading & Counter */}
                <div className="flex items-start gap-3">
                  <div className="w-1 self-stretch min-h-[32px] sm:min-h-[36px] bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2D6E] tracking-tight leading-snug">
                      All Resources
                    </h2>
                    <p className="text-[#5A6E85] text-xs sm:text-[13px] font-normal leading-relaxed">
                      Showing 1 – {filteredAllResources.length} of {allResources.length} resources
                    </p>
                  </div>
                </div>

                {/* Right Controls: Sort By + Grid/List View Toggles */}
                <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                  
                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#5A6E85] hidden sm:inline">
                      Sort by
                    </span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-[#E2E8F0] rounded-xl pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
                      >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="title">Alphabetical</option>
                      </select>
                      <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Grid View & List View Toggle Buttons */}
                  <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'grid' 
                          ? 'bg-white text-[#06402B] shadow-xs font-bold' 
                          : 'text-[#5A6E85] hover:text-slate-800'
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'list' 
                          ? 'bg-white text-[#06402B] shadow-xs font-bold' 
                          : 'text-[#5A6E85] hover:text-slate-800'
                      }`}
                      title="List View"
                    >
                      <List size={15} />
                    </button>
                  </div>

                </div>

              </div>

              {/* 4-Column Grid of Compact Document Cards (Exact Match to Image 2) */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {filteredAllResources.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between group hover:-translate-y-0.5"
                    >
                      {/* Upper Section: Thumbnail on Left, Metadata Stack on Right */}
                      <div className="flex items-start gap-3">
                        
                        {/* Vertical Book Thumbnail */}
                        <div className="w-[66px] h-[90px] rounded-lg overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/80 shadow-2xs group-hover:scale-102 transition-transform duration-300">
                          <img
                            src={doc.thumbnail}
                            alt={doc.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                          <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.2 rounded text-[7px] font-black text-white uppercase tracking-wider">
                            CMAOF
                          </div>
                        </div>

                        {/* Title, Category, Date, Format */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <h4 className="font-bold text-[13.5px] text-[#0B2D6E] leading-snug line-clamp-2 group-hover:text-[#06402B] transition-colors">
                            {doc.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#06402B] block">
                            {doc.categoryName}
                          </span>
                          <span className="text-[10.5px] font-normal text-[#5A6E85] block">
                            {doc.date}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5A6E85] pt-0.5">
                            <FileText size={13} className="text-[#DC2626]" strokeWidth={2.3} />
                            <span>{doc.format} • {doc.size}</span>
                          </div>
                        </div>

                      </div>

                      {/* Lower Section: Full-Width Dark Green Download Button */}
                      <div className="pt-3.5 mt-2 border-t border-slate-100/80">
                        <button
                          type="button"
                          onClick={() => handleDownload(doc.title)}
                          className="w-full bg-[#06402B] hover:bg-[#042D1E] active:bg-[#032418] text-white py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.99] cursor-pointer"
                        >
                          <span>Download</span>
                          <Download size={13} strokeWidth={2.3} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* List View Option */
                <div className="bg-white rounded-2xl border border-[#E2E8F0] divide-y divide-slate-100 overflow-hidden shadow-xs">
                  {filteredAllResources.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 bg-slate-100 border border-slate-200 relative">
                          <img src={doc.thumbnail} alt={doc.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm sm:text-[15px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors">
                            {doc.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6E85] font-normal">
                            <span className="font-semibold text-[#06402B]">{doc.categoryName}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.format} • {doc.size}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownload(doc.title)}
                        className="self-start sm:self-auto bg-[#06402B] hover:bg-[#042D1E] active:bg-[#032418] text-white py-2 px-4 rounded-lg font-medium text-xs flex items-center gap-2 shrink-0 transition-colors shadow-xs cursor-pointer"
                      >
                        <span>Download</span>
                        <Download size={13} strokeWidth={2.3} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredAllResources.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3 shadow-xs">
                  <BookOpen size={36} className="mx-auto text-slate-300" />
                  <h4 className="text-base font-bold text-slate-700">No resources found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    We couldn't find any resources matching your current filter criteria.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-[#06402B] hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              )}

            </section>

          </div>

        </div>
      </main>

      {/* ── 4. Resource Categories & Utility Support Cards (Exact match to reference screenshot) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ── Card 1: Resource Categories (lg:col-span-6) ── */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-1 h-5 bg-[#EA580C] rounded-full shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2D6E] tracking-tight">
                  Resource Categories
                </h3>
              </div>

              {/* 2-Column Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                
                {/* Column 1 */}
                <div className="space-y-4">
                  
                  {/* Annual Reports */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('annual-reports');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <BookOpen size={20} className="text-[#0B3B82] shrink-0 mt-0.5" strokeWidth={2.4} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Annual Reports
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Financial & impact reports
                      </p>
                    </div>
                  </button>

                  {/* Impact Reports */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('impact-reports');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <FourBarChartIcon className="w-5 h-5 text-[#06402B] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Impact Reports
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Our results and key outcomes
                      </p>
                    </div>
                  </button>

                  {/* Programme Reports */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('programme-reports');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <FileText size={20} className="text-[#EA580C] shrink-0 mt-0.5" strokeWidth={2.4} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Programme Reports
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Reports by pillar and initiative
                      </p>
                    </div>
                  </button>

                  {/* Publications */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('publications');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <BookOpen size={20} className="text-[#0B3B82] shrink-0 mt-0.5" strokeWidth={2.4} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Publications
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Research, guides and insights
                      </p>
                    </div>
                  </button>

                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  
                  {/* Policies */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('policies');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <Shield size={20} className="text-[#DC2626] shrink-0 mt-0.5" strokeWidth={2.4} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Policies
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Governance & compliance
                      </p>
                    </div>
                  </button>

                  {/* Newsletters */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('newsletters');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <Mail size={20} className="text-[#06402B] shrink-0 mt-0.5" strokeWidth={2.4} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Newsletters
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Updates and stories
                      </p>
                    </div>
                  </button>

                  {/* Media Kit */}
                  <button
                    type="button"
                    onClick={() => {
                      handleCategorySelect('media-kit');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-start gap-3 text-left group w-full cursor-pointer"
                  >
                    <ImageIcon size={20} className="text-[#EA580C] shrink-0 mt-0.5" strokeWidth={2.4} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug">
                        Media Kit
                      </h4>
                      <p className="text-[#5A6E85] text-xs font-normal leading-tight">
                        Logos, photos and brand assets
                      </p>
                    </div>
                  </button>

                </div>

              </div>
            </div>
          </div>

          {/* ── Card 2: Stay Updated (lg:col-span-3) ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Header with Green Envelope */}
              <div className="flex items-center gap-2.5">
                <div className="text-[#06402B]">
                  <Mail size={22} strokeWidth={2.4} />
                </div>
                <h3 className="text-lg font-bold text-[#0B2D6E] tracking-tight">
                  Stay Updated
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#5A6E85] text-xs sm:text-[13px] font-normal leading-relaxed">
                Subscribe to our newsletter for latest reports, stories and opportunities.
              </p>
            </div>

            {/* Newsletter Input + Orange Subscribe Button */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:opacity-95 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* ── Card 3: Need a Specific Document? (lg:col-span-3) ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Header with Green Headset */}
              <div className="flex items-center gap-2.5">
                <div className="text-[#06402B]">
                  <Headphones size={22} strokeWidth={2.4} />
                </div>
                <h3 className="text-lg font-bold text-[#0B2D6E] tracking-tight">
                  Need a Specific Document?
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#5A6E85] text-xs sm:text-[13px] font-normal leading-relaxed">
                Can't find what you're looking for? Contact us and we'll be happy to assist you.
              </p>
            </div>

            {/* Outlined Contact Us Button */}
            <div className="pt-1">
              <Link
                to="/contact"
                className="w-full bg-white hover:bg-emerald-50/70 border border-[#06402B] text-[#06402B] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs active:scale-98 cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. Full-Width CTA Banner: Knowledge Today. Stronger Communities Tomorrow. ── */}
      <section className="w-full mt-10 sm:mt-14">
        <div className="relative w-full overflow-hidden min-h-[145px] sm:min-h-[165px] flex items-center">
          
          {/* Background Image: Smiling Boy & Natural Outdoor Setting */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: `url('/images/our_work_cta_boy.jpg')`,
              backgroundPosition: 'left 28%',
            }}
            aria-hidden="true"
          />

          {/* Exact Seamless Gradient Overlay matching reference screenshot */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(4,30,20,0.3) 18%, rgba(4,30,20,0.88) 32%, rgba(4,30,20,0.96) 55%, rgba(4,30,20,0.97) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Mobile Fallback Overlay */}
          <div 
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(4,30,20,0.65) 0%, rgba(4,30,20,0.95) 45%, rgba(4,30,20,0.98) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Banner Content Wrapper (Constrained to max-w-7xl to align with footer content) */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Text Block (offset on desktop to preserve smiling boy) */}
            <div className="flex items-start gap-4 lg:pl-[24%] xl:pl-[26%] max-w-4xl">
              {/* Brand Orange Vertical Accent Bar */}
              <div className="w-1.5 self-stretch min-h-[64px] bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
              
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] text-emerald-300 font-sans block drop-shadow-xs">
                  BE PART OF THE CHANGE
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-white tracking-tight leading-snug font-sans drop-shadow-xs">
                  Knowledge Today. Stronger Communities Tomorrow.
                </h3>
                <p className="text-white text-xs sm:text-[13.5px] leading-relaxed font-medium max-w-2xl drop-shadow-xs">
                  Your support helps us document, share and scale solutions that create lasting impact across Nigeria.
                </p>
              </div>
            </div>

            {/* Right Action: Vibrant Orange Donate Now Button */}
            <div className="shrink-0 self-start lg:self-center pl-5 sm:pl-0">
              <button
                type="button"
                onClick={onOpenDonate}
                className="bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:opacity-95 text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl flex items-center gap-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Heart size={18} className="fill-white stroke-white" />
                <span>Donate Now</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default ResourcesPage;
