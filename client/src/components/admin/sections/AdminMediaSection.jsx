import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  Copy,
  Tag,
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  Shield,
  Upload,
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_MEDIA_ASSETS = [
  {
    id: 'med-01',
    title: 'Amina Bello - STEM Fellowship Scholar in Lab',
    type: 'Photo',
    imageUrl: '/images/story_amina.jpg',
    category: 'Education Pillar',
    size: '3.4 MB',
    dimensions: '2400 x 1600 px',
    dateAdded: '20 Oct 2026',
    tags: ['Scholarship', 'Lagos', 'Biotech'],
  },
  {
    id: 'med-02',
    title: 'Ilara-Mokin Solar Water Station Commissioning',
    type: 'Photo',
    imageUrl: '/images/past_event_clean_water.jpg',
    category: 'Community Resilience',
    size: '4.1 MB',
    dimensions: '3200 x 2133 px',
    dateAdded: '15 Oct 2026',
    tags: ['Clean Water', 'Ondo', 'Infrastructure'],
  },
  {
    id: 'med-03',
    title: 'Pediatric Medical Screening Camp - Ibadan Outreach',
    type: 'Photo',
    imageUrl: '/images/event_medical_doctor.jpg',
    category: 'Healthcare Pillar',
    size: '2.8 MB',
    dimensions: '1920 x 1280 px',
    dateAdded: '10 Oct 2026',
    tags: ['Medical', 'Oyo', 'Health'],
  },
  {
    id: 'med-04',
    title: 'Primary School Science Kits Distribution',
    type: 'Photo',
    imageUrl: '/images/past_event_school_support.jpg',
    category: 'Education Pillar',
    size: '3.1 MB',
    dimensions: '2800 x 1860 px',
    dateAdded: '02 Oct 2026',
    tags: ['Education', 'Kano', 'Youth'],
  },
  {
    id: 'med-05',
    title: 'Seedling Nursery & Agritech Training Farm',
    type: 'Photo',
    imageUrl: '/images/past_event_seedling_girl.jpg',
    category: 'Community Resilience',
    size: '4.8 MB',
    dimensions: '3600 x 2400 px',
    dateAdded: '24 Sep 2026',
    tags: ['Agriculture', 'Rivers', 'Empowerment'],
  },
  {
    id: 'med-06',
    title: 'Annual Philanthropy Summit Keynote Stage',
    type: 'Photo',
    imageUrl: '/images/event_summit_stage.jpg',
    category: 'Events & Assemblies',
    size: '5.2 MB',
    dimensions: '4000 x 2660 px',
    dateAdded: '18 Sep 2026',
    tags: ['Summit', 'Lagos', 'Stakeholders'],
  },
];

const MEDIA_STEPS = [
  { id: 1, label: 'Asset & File Select' },
  { id: 2, label: 'Pillar Tagging & Geo' },
  { id: 3, label: 'Consent & Index' },
];

const AdminMediaSection = () => {
  const [mediaList, setMediaList] = useState(INITIAL_MEDIA_ASSETS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMedia, setPreviewMedia] = useState(null);

  // Dedicated View State: 'gallery' | 'upload' (NO POPUP MODAL)
  const [currentView, setCurrentView] = useState('gallery');
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [newAsset, setNewAsset] = useState({
    title: '',
    category: 'Education Pillar',
    type: 'Photo',
    tags: 'Ondo, Water, Field Intervention',
    caption: '',
    consentSigned: true,
  });

  const categories = ['All', 'Education Pillar', 'Healthcare Pillar', 'Community Resilience', 'Events & Assemblies'];

  const filteredMedia = mediaList.filter((m) => {
    const matchesCat = activeCategory === 'All' || m.category === activeCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = () => {
    if (!newAsset.title.trim()) {
      toast.error('Asset title is required');
      return;
    }

    const created = {
      id: `med-${Date.now()}`,
      title: newAsset.title.trim(),
      type: newAsset.type,
      imageUrl: '/images/past_event_clean_water.jpg',
      category: newAsset.category,
      size: '4.2 MB',
      dimensions: '3840 x 2160 px',
      dateAdded: 'Today',
      tags: newAsset.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    setMediaList([created, ...mediaList]);
    toast.success(`Media asset "${created.title}" uploaded & catalogued!`);
    setCurrentView('gallery');
    setCurrentStep(1);
    setNewAsset({
      title: '',
      category: 'Education Pillar',
      type: 'Photo',
      tags: '',
      caption: '',
      consentSigned: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    toast.success('Media upload parameters saved to draft.');
  };

  // ─────────────────────────────────────────────────────────────
  // DEDICATED IN-PLACE UPLOAD VIEW (Matches Register Beneficiary Design)
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'upload') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentView('gallery');
                setCurrentStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Media Assets</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Upload High-Res Media</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentView('gallery');
              setCurrentStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Media Gallery</span>
          </button>
        </div>

        {/* 3-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="relative overflow-x-auto pb-1">
            <div className="min-w-[420px]">
              <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />
              <div className="relative z-10 flex items-center justify-between">
                {MEDIA_STEPS.map((step) => {
                  const isPassed = currentStep > step.id;
                  const isCurrent = currentStep === step.id;

                  return (
                    <div
                      key={step.id}
                      onClick={() => {
                        if (step.id < currentStep) setCurrentStep(step.id);
                      }}
                      className="flex flex-col items-center text-center px-1 cursor-pointer group"
                    >
                      {isPassed ? (
                        <div className="w-9 h-9 rounded-full bg-[#06402B] text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-9 h-9 rounded-full bg-[#06402B] text-white flex items-center justify-center font-black text-sm shadow-md ring-4 ring-emerald-100">
                          {step.id}
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-200 text-slate-400 font-bold text-sm flex items-center justify-center ring-4 ring-white group-hover:border-slate-300">
                          {step.id}
                        </div>
                      )}

                      <p
                        className={`text-xs mt-2 font-bold max-w-[120px] leading-tight ${
                          isCurrent
                            ? 'text-[#06402B]'
                            : isPassed
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1: Asset & File Select */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <ImageIcon size={18} className="text-[#06402B]" />
              <span>Media Title & High-Resolution Asset Upload</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Asset Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                  placeholder="e.g. 2026 Scholars Laboratory Hands-on Training & Biotech Workshop"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Asset Type</label>
                  <select
                    value={newAsset.type}
                    onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="Photo">High-Res Photograph (RAW/JPG/PNG)</option>
                    <option value="Video">Documentary B-Roll / Video Clip</option>
                    <option value="Infographic">MEAL Impact Infographic / Diagram</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Pillar Category</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="Education Pillar">Education Pillar</option>
                    <option value="Healthcare Pillar">Healthcare Pillar</option>
                    <option value="Community Resilience">Community Resilience</option>
                    <option value="Events & Assemblies">Events & Assemblies</option>
                  </select>
                </div>
              </div>

              {/* Upload Box */}
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-2 hover:border-[#06402B] cursor-pointer bg-slate-50/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#06402B] flex items-center justify-center mx-auto">
                  <ImageIcon size={24} />
                </div>
                <span className="font-bold text-slate-800 block text-sm">Drop raw image/video file here</span>
                <span className="text-xs text-slate-400 block">Supports PNG, JPG, WebP, MP4 up to 60MB</span>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0B2D6E] shadow-xs hover:bg-slate-50 cursor-pointer"
                >
                  <Upload size={13} />
                  <span>Browse Device Library</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Tagging & Geo */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Tag size={18} className="text-[#06402B]" />
              <span>Taxonomy, Keywords, Geo-location & Captions</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Tags & Metadata Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={newAsset.tags}
                  onChange={(e) => setNewAsset({ ...newAsset, tags: e.target.value })}
                  placeholder="e.g. Ondo State, Ilara-Mokin, Clean Water, Solar Borehole, Community"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Editorial Caption & Context</label>
                <textarea
                  rows={4}
                  value={newAsset.caption}
                  onChange={(e) => setNewAsset({ ...newAsset, caption: e.target.value })}
                  placeholder="Describe the moment, beneficiary individuals shown, date, and field verification location..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Consent & Rights */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Safeguarding Consent & Foundation Intellectual Property</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Media Title</span>
                  <p className="text-base font-extrabold text-[#0B2D6E]">{newAsset.title || 'Untitled Asset'}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                  {newAsset.category}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Asset Type</span>
                  <span className="font-bold text-slate-900 text-sm">{newAsset.type}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Storage Tier</span>
                  <span className="font-bold text-emerald-800 text-xs">High-Resolution Cloud CDN</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Copyright</span>
                  <span className="font-bold text-slate-900 text-xs">Chief Michael Ade.Ojo Foundation</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
              <input
                type="checkbox"
                id="mediaConsent"
                checked={newAsset.consentSigned}
                onChange={(e) => setNewAsset({ ...newAsset, consentSigned: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
              />
              <label htmlFor="mediaConsent" className="text-xs text-slate-700 font-medium cursor-pointer">
                <span className="font-bold text-[#06402B]">Beneficiary Safeguarding Consent:</span> I confirm that signed child safeguarding & adult media release consent forms have been obtained in full compliance with the CMAOF PSEA policy.
              </label>
            </div>
          </div>
        )}

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentStep < 3) {
                  if (currentStep === 1 && !newAsset.title.trim()) {
                    toast.error('Asset title is required');
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                } else {
                  handleUploadSubmit();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentStep === 3 ? 'Index & Save Asset' : 'Next'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT GALLERY VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <ImageIcon size={15} />
            <span>Digital Assets & Photographic Archives</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Media & Story Asset Bank
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Access, download, and index high-resolution field photography, verified intervention reels, and leadership events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('upload');
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={16} />
          <span>Upload Media</span>
        </button>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search media by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#06402B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div
                className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setPreviewMedia(m)}
              >
                <img
                  src={m.imageUrl}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs text-xs font-bold text-slate-800 shadow-md">
                    Click to Preview
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {m.type}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#06402B]">
                  {m.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">{m.title}</h3>
                <div className="flex flex-wrap gap-1 pt-1">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{m.dimensions}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => toast.success(`Downloaded high-res ${m.title}`)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
                  title="Download"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Asset Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">{previewMedia.title}</h2>
              <button
                type="button"
                onClick={() => setPreviewMedia(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-100 max-h-[60vh] flex items-center justify-center">
              <img
                src={previewMedia.imageUrl}
                alt={previewMedia.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>{previewMedia.dimensions} • {previewMedia.size}</span>
              <button
                type="button"
                onClick={() => toast.success('Original master image downloaded')}
                className="px-3 py-1.5 rounded-xl bg-[#06402B] text-white font-bold text-xs cursor-pointer"
              >
                Download Original Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMediaSection;
