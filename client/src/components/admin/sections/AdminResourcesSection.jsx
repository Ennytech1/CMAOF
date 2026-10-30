import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  Shield,
  Upload,
  LayoutGrid,
  Table as TableIcon,
  X,
  Copy,
  Tag,
  Share2,
  Info,
  Award,
  BarChart3,
  HardDrive,
  FileSpreadsheet,
  FileArchive,
  Image as ImageIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  INITIAL_RESOURCES,
  RESOURCE_COVER_PRESETS,
  RESOURCE_CATEGORIES,
  RESOURCE_DOC_TYPES,
} from '../../../data/resourcesData';

const UPLOAD_STEPS = [
  { id: 1, label: 'Identity & Editorial Metadata' },
  { id: 2, label: 'Cover & Digital File Specs' },
  { id: 3, label: 'Clearance & Live Preview' },
];

/* ─────────────────────────────────────────────────────────────────
   RESOURCE DOSSIER SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const ResourceDossierDrawer = ({ resource, onClose, onDelete, onToggleStatus }) => {
  if (!resource) return null;

  const copyPublicLink = () => {
    const link = `${window.location.origin}/resources#${resource.id}`;
    navigator.clipboard.writeText(link);
    toast.success('Public document reference copied to clipboard!');
  };

  const copyCitation = () => {
    const citation = `Chief Michael Ade.Ojo Foundation. (${resource.year}). ${resource.title} (${resource.version}). CMAOF Institutional Repository.`;
    navigator.clipboard.writeText(citation);
    toast.success('APA citation copied to clipboard!');
  };

  const getFormatBadgeColor = (format) => {
    switch (format?.toUpperCase()) {
      case 'PDF':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'XLSX':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ZIP':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {resource.id}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  resource.status === 'Published'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {resource.status === 'Published' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                {resource.status}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${getFormatBadgeColor(resource.format)}`}>
                {resource.format}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-900">Institutional Publication Dossier</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm">
          {/* Cover Preview Card */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-md border border-slate-200/80 bg-slate-100">
            <img
              src={resource.coverImage || resource.thumbnail}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-3 left-3 bg-[#06402B]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow-sm border border-emerald-400/30">
              {resource.categoryName || resource.category}
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                {resource.pillar || 'CMAOF Public Intelligence'}
              </span>
              <h3 className="text-base font-black leading-snug line-clamp-2">{resource.title}</h3>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Downloads</span>
              <span className="text-base font-black text-[#06402B]">
                {resource.downloads?.toLocaleString() || 0}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">File Size</span>
              <span className="text-base font-black text-slate-800">{resource.size || '3.2 MB'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Pages / Scope</span>
              <span className="text-base font-black text-[#0B2D6E]">{resource.pages ? `${resource.pages} pp` : 'Full'}</span>
            </div>
          </div>

          {/* Logistics Specs Grid */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Editorial & Technical Specifications</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Publish Date</span>
                <span className="font-bold text-slate-800">{resource.publishedDate} ({resource.year})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Release Version</span>
                <span className="font-mono font-bold text-slate-800">{resource.version || 'v1.0'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Authoring Authority</span>
                <span className="font-bold text-[#06402B]">{resource.author || 'CMAOF Directorate'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Access Tier</span>
                <span className="font-bold text-emerald-800">{resource.accessLevel || 'Public Institutional Access'}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Executive Summary & Abstract</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/70">
              {resource.summary || resource.subtitle || 'No detailed abstract recorded for this institutional document.'}
            </p>
          </div>

          {/* Action Links */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={copyPublicLink}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Copy size={13} />
              <span>Copy Public Link</span>
            </button>
            <button
              type="button"
              onClick={copyCitation}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0B2D6E] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Share2 size={13} />
              <span>Copy APA Citation</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${resource.title}" from the institutional repository?`)) {
                onDelete(resource.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete Document</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleStatus(resource.id)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              {resource.status === 'Published' ? 'Archive' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success(`Downloading ${resource.title}...`, { icon: '📥' });
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN RESOURCES SECTION COMPONENT
───────────────────────────────────────────────────────────────── */
const AdminResourcesSection = () => {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [formatFilter, setFormatFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeDossierResource, setActiveDossierResource] = useState(null);

  // Dedicated View State: 'portfolio' | 'upload'
  const [currentView, setCurrentView] = useState('portfolio');
  const [currentStep, setCurrentStep] = useState(1);

  // New Resource Form
  const [newResource, setNewResource] = useState({
    title: '',
    subtitle: '',
    category: 'annual-reports',
    categoryName: 'Annual Report',
    format: 'PDF',
    size: '4.2 MB',
    pages: 36,
    version: 'v1.0 Final',
    author: 'Chief Michael Ade.Ojo Foundation Policy Directorate',
    pillar: 'Governance & Accountability',
    coverImage: '/images/cover_annual_report_2024.jpg',
    summary: '',
    accessLevel: 'Public Institutional Access',
    complianceApproved: true,
  });

  const categories = [
    'All',
    'Annual Reports',
    'Impact Reports',
    'Programme Reports',
    'Publications',
    'Governance & Policy',
    'Newsletters',
    'Media Kit',
  ];

  // Calculated Strategic Metrics
  const totalPublications = resources.length;
  const totalDownloads = useMemo(() => {
    return resources.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
  }, [resources]);
  const auditDocuments = useMemo(() => {
    return resources.filter(
      (r) => r.category === 'annual-reports' || r.category === 'policies'
    ).length;
  }, [resources]);
  const totalStorage = '69.4 MB';

  // Filtered List
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory =
        categoryFilter === 'All' ||
        r.categoryName?.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        r.category?.toLowerCase().includes(categoryFilter.toLowerCase());
      
      const matchesFormat =
        formatFilter === 'All' || r.format?.toUpperCase() === formatFilter.toUpperCase();

      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.author && r.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.categoryName && r.categoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.summary && r.summary.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesFormat && matchesSearch;
    });
  }, [resources, categoryFilter, formatFilter, searchQuery]);

  const handleDeleteResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success('Document removed from institutional repository.');
  };

  const handleToggleStatus = (id) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Published' ? 'Archived' : 'Published';
          toast.success(`Resource status updated to "${nextStatus}".`);
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
    if (activeDossierResource && activeDossierResource.id === id) {
      setActiveDossierResource((prev) => ({
        ...prev,
        status: prev.status === 'Published' ? 'Archived' : 'Published',
      }));
    }
  };

  const handlePublish = () => {
    if (!newResource.title.trim()) {
      toast.error('Please enter the publication title');
      return;
    }

    const created = {
      id: `res-${Date.now().toString().slice(-4)}`,
      title: newResource.title.trim(),
      subtitle: newResource.subtitle.trim() || newResource.summary.slice(0, 100),
      category: newResource.category,
      categoryName: newResource.categoryName,
      format: newResource.format,
      type: newResource.format.toLowerCase(),
      size: newResource.size || '3.5 MB',
      pages: Number(newResource.pages) || 24,
      downloads: 0,
      publishedDate: 'Today',
      year: '2026',
      version: newResource.version || 'v1.0',
      author: newResource.author || 'CMAOF Directorate',
      pillar: newResource.pillar,
      coverImage: newResource.coverImage || '/images/cover_annual_report_2024.jpg',
      thumbnail: newResource.coverImage || '/images/cover_annual_report_2024.jpg',
      featured: false,
      accessLevel: newResource.accessLevel,
      status: 'Published',
      summary: newResource.summary || 'Official publication issued by Chief Michael Ade.Ojo Foundation.',
    };

    setResources([created, ...resources]);
    toast.success(`Document "${created.title}" successfully published to CMAOF repository!`);
    setCurrentView('portfolio');
    setCurrentStep(1);
    setNewResource({
      title: '',
      subtitle: '',
      category: 'annual-reports',
      categoryName: 'Annual Report',
      format: 'PDF',
      size: '4.2 MB',
      pages: 36,
      version: 'v1.0 Final',
      author: 'Chief Michael Ade.Ojo Foundation Policy Directorate',
      pillar: 'Governance & Accountability',
      coverImage: '/images/cover_annual_report_2024.jpg',
      summary: '',
      accessLevel: 'Public Institutional Access',
      complianceApproved: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    toast.success('Document parameters saved as local administrative draft.');
  };

  const getFormatBadgeColor = (format) => {
    switch (format?.toUpperCase()) {
      case 'PDF':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'XLSX':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ZIP':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 3-STEP IN-PLACE RESOURCE UPLOAD WIZARD
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'upload') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentView('portfolio');
                setCurrentStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Resources</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Publish Institutional Document</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentView('portfolio');
              setCurrentStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Repository</span>
          </button>
        </div>

        {/* 3-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="relative overflow-x-auto pb-1">
            <div className="min-w-[420px]">
              <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />
              <div className="relative z-10 flex items-center justify-between">
                {UPLOAD_STEPS.map((step) => {
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
                        className={`text-xs mt-2 font-bold max-w-[140px] leading-tight ${
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

        {/* STEP 1: Document Metadata */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <FileText size={18} className="text-[#06402B]" />
              <span>Publication Title, Taxonomy & Authoring Body</span>
            </h2>
            <p className="text-xs text-slate-500">
              Set the official title, thematic category, strategic pillar alignment, and authoring committee.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Document Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g. 2026 Maternal Healthcare & Rural Clinical Operations Whitepaper"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Subtitle / Secondary Headline</label>
                <input
                  type="text"
                  value={newResource.subtitle}
                  onChange={(e) => setNewResource({ ...newResource, subtitle: e.target.value })}
                  placeholder="e.g. Field operations data, clinical outcomes, and policy takeaways for 2,400 screened mothers."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Thematic Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newResource.category}
                    onChange={(e) => {
                      const catSlug = e.target.value;
                      const matched = RESOURCE_CATEGORIES.find((c) => c.id === catSlug);
                      setNewResource({
                        ...newResource,
                        category: catSlug,
                        categoryName: matched ? matched.label : 'Publication',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 cursor-pointer"
                  >
                    <option value="annual-reports">Annual Reports & Audits</option>
                    <option value="impact-reports">Impact Reports & Studies</option>
                    <option value="programme-reports">Programme Reports</option>
                    <option value="publications">Publications & Research</option>
                    <option value="policies">Policies & Governance</option>
                    <option value="newsletters">Newsletters & Bulletins</option>
                    <option value="media-kit">Media & Brand Assets</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar Alignment</label>
                  <select
                    value={newResource.pillar}
                    onChange={(e) => setNewResource({ ...newResource, pillar: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 cursor-pointer"
                  >
                    <option value="Governance & Accountability">Governance & Accountability</option>
                    <option value="Education & Human Capital">Education & Human Capital</option>
                    <option value="Health & Well-being">Health & Well-being</option>
                    <option value="Community Resilience">Community Resilience</option>
                    <option value="Multi-Pillar Intervention">Multi-Pillar Intervention</option>
                    <option value="Media & Institutional Identity">Media & Institutional Identity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Authoring Directorate / Unit</label>
                  <input
                    type="text"
                    value={newResource.author}
                    onChange={(e) => setNewResource({ ...newResource, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Release Version</label>
                  <input
                    type="text"
                    value={newResource.version}
                    onChange={(e) => setNewResource({ ...newResource, version: e.target.value })}
                    placeholder="e.g. v2.1 Final"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Executive Abstract / Summary</label>
                <textarea
                  rows={3}
                  value={newResource.summary}
                  onChange={(e) => setNewResource({ ...newResource, summary: e.target.value })}
                  placeholder="Summarize key empirical findings, policy directives, or institutional scope..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Cover & Digital File Specs */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Upload size={18} className="text-[#06402B]" />
              <span>Publication Cover Image & File Attributes</span>
            </h2>

            {/* Visual Cover Preset Gallery */}
            <div className="space-y-3">
              <label className="block font-bold text-slate-700 text-xs">
                Select Institutional Cover Art Preset <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {RESOURCE_COVER_PRESETS.map((preset) => {
                  const isSelected = newResource.coverImage === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setNewResource({ ...newResource, coverImage: preset.url })}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-1 group ${
                        isSelected
                          ? 'border-[#06402B] ring-2 ring-[#06402B]/20 bg-emerald-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-slate-100">
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#06402B] text-white flex items-center justify-center shadow-md">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 mt-2 px-1 text-center line-clamp-1">
                        {preset.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Cover URL Input */}
            <div className="text-xs space-y-1.5">
              <label className="block font-bold text-slate-700">Or Provide Custom Cover Image URL</label>
              <input
                type="text"
                value={newResource.coverImage}
                onChange={(e) => setNewResource({ ...newResource, coverImage: e.target.value })}
                placeholder="/images/cover_annual_report_2024.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-[#06402B]"
              />
            </div>

            {/* File Format & Size Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Primary Format</label>
                <select
                  value={newResource.format}
                  onChange={(e) => setNewResource({ ...newResource, format: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  <option value="PDF">PDF (Portable Document)</option>
                  <option value="DOCX">DOCX (Microsoft Word)</option>
                  <option value="XLSX">XLSX (Audit Spreadsheet)</option>
                  <option value="ZIP">ZIP (Media Archive)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Document File Size</label>
                <input
                  type="text"
                  value={newResource.size}
                  onChange={(e) => setNewResource({ ...newResource, size: e.target.value })}
                  placeholder="e.g. 5.4 MB"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Total Pages</label>
                <input
                  type="number"
                  value={newResource.pages}
                  onChange={(e) => setNewResource({ ...newResource, pages: e.target.value })}
                  placeholder="e.g. 48"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B]"
                />
              </div>
            </div>

            {/* Drag & Drop Simulation */}
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-2 hover:border-[#06402B] cursor-pointer bg-slate-50/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#06402B] flex items-center justify-center mx-auto shadow-2xs">
                <FileText size={24} />
              </div>
              <span className="font-bold text-slate-800 block text-sm">
                Drop document package here or click to browse files
              </span>
              <span className="text-xs text-slate-400 block">
                Supports PDF, DOCX, XLSX, ZIP files up to 100MB with SHA-256 cloud encryption
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: Clearance, Sign-off & Real-Time Live Preview */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Review Resource Clearance & Real-Time Live Preview</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form & Access Tier */}
              <div className="lg:col-span-7 space-y-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Access Tier Clearance</label>
                  <select
                    value={newResource.accessLevel}
                    onChange={(e) => setNewResource({ ...newResource, accessLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    <option value="Public Institutional Access">Public Institutional Access (Open Download)</option>
                    <option value="Registered Stakeholders Only">Registered Donors & Institutional Partners Only</option>
                    <option value="Board Internal Clearance">Board of Trustees & Internal Audit Only</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Publication Summary
                  </span>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                    <span className="text-slate-500">Thematic Pillar:</span>
                    <span className="font-bold text-[#06402B]">{newResource.pillar}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                    <span className="text-slate-500">Document Size & Pages:</span>
                    <span className="font-bold text-slate-800">{newResource.size} • {newResource.pages} pages</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Authoring Body:</span>
                    <span className="font-bold text-slate-800">{newResource.author}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="docVerify"
                    checked={newResource.complianceApproved}
                    onChange={(e) => setNewResource({ ...newResource, complianceApproved: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <label htmlFor="docVerify" className="text-xs text-slate-700 font-medium cursor-pointer">
                    <span className="font-bold text-[#06402B]">Governance Sign-off:</span> I certify that this document has been reviewed for public dissemination, contains no sensitive beneficiary PII, and represents official foundation intelligence.
                  </label>
                </div>
              </div>

              {/* Right Column: Interactive Real-Time Live Card Preview */}
              <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" />
                    <span>Real-Time Public Card Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    Live Preview
                  </span>
                </div>

                {/* The Exact Card that appears on Public Resources */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-[70px] h-[92px] rounded-lg overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200 shadow-2xs">
                      <img
                        src={newResource.coverImage || '/images/cover_annual_report_2024.jpg'}
                        alt="Preview Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                      <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.2 rounded text-[7px] font-black text-white uppercase tracking-wider">
                        CMAOF
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="font-bold text-[13.5px] text-[#0B2D6E] leading-snug line-clamp-2">
                        {newResource.title || 'Untitled Publication'}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#06402B] block">
                        {newResource.categoryName}
                      </span>
                      <span className="text-[10.5px] font-normal text-slate-500 block">
                        {newResource.pillar}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 pt-0.5">
                        <FileText size={13} className="text-[#DC2626]" strokeWidth={2.3} />
                        <span>{newResource.format} • {newResource.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      disabled
                      className="w-full bg-[#06402B] text-white py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 opacity-90"
                    >
                      <span>Download</span>
                      <Download size={13} strokeWidth={2.3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
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
                  if (currentStep === 1 && !newResource.title.trim()) {
                    toast.error('Publication title is required');
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                } else {
                  handlePublish();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentStep === 3 ? 'Publish Document Now' : 'Next Step'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT REPOSITORY OVERVIEW VIEW (PORTFOLIO)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      
      {/* 1. Header with Breadcrumb & Upload CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <BookOpen size={15} />
            <span>Document Repository & Whitepapers</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Resources & Governance Publications
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Institutional frameworks, annual reports, statutory charters, and verified field evaluation studies.
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
          <span>Upload Publication</span>
        </button>
      </div>

      {/* 2. 4 Strategic Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Total Publications</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#06402B]">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{totalPublications}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-bold">
              <CheckCircle2 size={13} />
              <span>Institutional Whitepapers</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Total Downloads</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0B2D6E]">
              <Download size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-[#0B2D6E]">
              {totalDownloads.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-700 font-bold">
              <BarChart3 size={13} />
              <span>Global Public Reach</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Audits & Governance</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Shield size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{auditDocuments}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-800 font-bold">
              <Check size={13} strokeWidth={3} />
              <span>Audited & Certified</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Cloud Storage</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <HardDrive size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{totalStorage}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-700 font-bold">
              <Sparkles size={13} />
              <span>SHA-256 Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & View Mode Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search publications, authors, pillars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]/20"
          />
        </div>

        {/* Center: Format filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Format:</span>
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
          >
            <option value="All">All Formats</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
            <option value="ZIP">ZIP</option>
          </select>
        </div>

        {/* Right: View mode toggle */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#06402B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Cards Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#06402B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TableIcon size={14} />
              <span className="hidden sm:inline">Table View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Horizontal Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === cat
                ? 'bg-[#06402B] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 5. Content View: Grid Cards vs Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Top Cover Image Area */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={res.coverImage || res.thumbnail}
                  alt={res.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Format Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-black border shadow-xs ${getFormatBadgeColor(res.format)}`}>
                    {res.format}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs ${
                      res.status === 'Published'
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-amber-600/90 text-white'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                {/* Category Pill on Image Bottom */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-bold">
                  <span className="truncate drop-shadow-xs">{res.categoryName}</span>
                  <span className="shrink-0 drop-shadow-xs font-mono">{res.version}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3
                    onClick={() => setActiveDossierResource(res)}
                    className="font-bold text-[14px] text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors cursor-pointer line-clamp-2"
                  >
                    {res.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2">
                    {res.subtitle || res.summary}
                  </p>
                </div>

                {/* Metadata & Downloads */}
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{res.publishedDate}</span>
                    <span className="font-semibold text-slate-700">{res.size}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-[#06402B] flex items-center gap-1">
                      <Download size={12} />
                      <span>{res.downloads?.toLocaleString() || 0} downloads</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveDossierResource(res)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#06402B] hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="View Full Dossier"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          toast.success(`Downloading ${res.title}`);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2D6E] hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Download Document"
                      >
                        <Download size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${res.title}"?`)) {
                            handleDeleteResource(res.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Document"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table Ledger View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Downloads</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredResources.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-13 rounded overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                          <img
                            src={res.coverImage || res.thumbnail}
                            alt={res.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div
                            onClick={() => setActiveDossierResource(res)}
                            className="truncate text-slate-900 font-bold hover:text-[#06402B] cursor-pointer"
                          >
                            {res.title}
                          </div>
                          <span className="text-[10px] font-normal text-slate-400 block truncate">
                            {res.author} • Published {res.publishedDate}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {res.categoryName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getFormatBadgeColor(res.format)}`}>
                        {res.format}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{res.version}</td>
                    <td className="py-3.5 px-4 text-slate-600">{res.size}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{res.downloads?.toLocaleString() || 0}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          res.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveDossierResource(res)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="View Dossier"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => toast.success(`Downloading ${res.title}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2D6E] hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Download"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${res.title}"?`)) {
                              handleDeleteResource(res.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3 shadow-xs">
          <BookOpen size={36} className="mx-auto text-slate-300" />
          <h4 className="text-base font-bold text-slate-700">No resources matched your criteria</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, format selector, or category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('All');
              setFormatFilter('All');
            }}
            className="text-xs font-bold text-[#06402B] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* 6. Slide-Over Resource Dossier Drawer */}
      <ResourceDossierDrawer
        resource={activeDossierResource}
        onClose={() => setActiveDossierResource(null)}
        onDelete={handleDeleteResource}
        onToggleStatus={handleToggleStatus}
      />

    </div>
  );
};

export default AdminResourcesSection;
