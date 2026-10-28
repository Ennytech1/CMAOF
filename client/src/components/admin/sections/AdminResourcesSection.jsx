import React, { useState } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_RESOURCES = [
  {
    id: 'res-01',
    title: 'CMAOF Annual Report & Audited Financials 2025/2026',
    category: 'Annual Reports',
    fileType: 'PDF',
    size: '8.4 MB',
    downloads: 3420,
    publishedDate: '15 Sep 2026',
    version: 'v2.1 Final',
    status: 'Published',
  },
  {
    id: 'res-02',
    title: 'Beneficiary Safeguarding, PSEA & Child Protection Policy',
    category: 'Governance & Policy',
    fileType: 'PDF',
    size: '1.8 MB',
    downloads: 1250,
    publishedDate: '01 Jun 2026',
    version: 'v1.4',
    status: 'Published',
  },
  {
    id: 'res-03',
    title: 'Monitoring, Evaluation, Accountability & Learning (MEAL) Framework',
    category: 'Technical Frameworks',
    fileType: 'DOCX',
    size: '3.2 MB',
    downloads: 980,
    publishedDate: '20 Aug 2026',
    version: 'v3.0',
    status: 'Published',
  },
  {
    id: 'res-04',
    title: 'Kano & Ondo State Clean Water Solar Infrastructure Impact Study',
    category: 'Research & Field Studies',
    fileType: 'PDF',
    size: '5.1 MB',
    downloads: 870,
    publishedDate: '10 Oct 2026',
    version: 'v1.0',
    status: 'Published',
  },
  {
    id: 'res-05',
    title: 'Chief Michael Ade.Ojo Tertiary Scholarship Handbook & Eligibility Guide',
    category: 'Student Guidelines',
    fileType: 'PDF',
    size: '2.4 MB',
    downloads: 4890,
    publishedDate: '01 Aug 2026',
    version: 'v2.0',
    status: 'Published',
  },
  {
    id: 'res-06',
    title: 'Anti-Bribery, Anti-Corruption and Whistleblower Protection Charter',
    category: 'Governance & Policy',
    fileType: 'PDF',
    size: '1.2 MB',
    downloads: 640,
    publishedDate: '14 May 2026',
    version: 'v1.1',
    status: 'Published',
  },
];

const UPLOAD_STEPS = [
  { id: 1, label: 'Document Metadata' },
  { id: 2, label: 'File Upload & Format' },
  { id: 3, label: 'Clearance & Publish' },
];

const AdminResourcesSection = () => {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dedicated View State: 'portfolio' | 'upload' (NO POPUP MODAL)
  const [currentView, setCurrentView] = useState('portfolio');
  const [currentStep, setCurrentStep] = useState(1);

  // New Resource Form
  const [newResource, setNewResource] = useState({
    title: '',
    category: 'Annual Reports',
    fileType: 'PDF',
    version: 'v1.0',
    author: 'Chief Michael Ade.Ojo Foundation Policy Directorate',
    summary: '',
    accessLevel: 'Public Institutional Access',
    complianceApproved: true,
  });

  const categories = ['All', 'Annual Reports', 'Governance & Policy', 'Technical Frameworks', 'Research & Field Studies', 'Student Guidelines'];

  const filteredResources = resources.filter((r) => {
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePublish = () => {
    if (!newResource.title.trim()) {
      toast.error('Please enter the document title');
      return;
    }

    const created = {
      id: `res-${Date.now()}`,
      title: newResource.title.trim(),
      category: newResource.category,
      fileType: newResource.fileType,
      size: '3.6 MB',
      downloads: 0,
      publishedDate: 'Today',
      version: newResource.version,
      status: 'Published',
    };

    setResources([created, ...resources]);
    toast.success(`Resource "${created.title}" published to institutional repository!`);
    setCurrentView('portfolio');
    setCurrentStep(1);
    setNewResource({
      title: '',
      category: 'Annual Reports',
      fileType: 'PDF',
      version: 'v1.0',
      author: 'Chief Michael Ade.Ojo Foundation Policy Directorate',
      summary: '',
      accessLevel: 'Public Institutional Access',
      complianceApproved: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    toast.success('Resource document draft saved.');
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
                setCurrentView('portfolio');
                setCurrentStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Resources</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Upload Institutional Publication</span>
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

        {/* STEP 1: Metadata */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <FileText size={18} className="text-[#06402B]" />
              <span>Publication Title, Category & Editorial Details</span>
            </h2>
            <p className="text-xs text-slate-500">
              Provide the publication name, thematic taxonomy, and issuing committee attribution.
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Thematic Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="Annual Reports">Annual Reports & Audits</option>
                    <option value="Governance & Policy">Governance & Policy Charters</option>
                    <option value="Technical Frameworks">Technical & MEAL Frameworks</option>
                    <option value="Research & Field Studies">Research & Field Studies</option>
                    <option value="Student Guidelines">Scholarship & Student Guidelines</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Release Version</label>
                  <input
                    type="text"
                    value={newResource.version}
                    onChange={(e) => setNewResource({ ...newResource, version: e.target.value })}
                    placeholder="e.g. v2.1 Final"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Authoring Unit / Committee</label>
                <input
                  type="text"
                  value={newResource.author}
                  onChange={(e) => setNewResource({ ...newResource, author: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Executive Summary</label>
                <textarea
                  rows={3}
                  value={newResource.summary}
                  onChange={(e) => setNewResource({ ...newResource, summary: e.target.value })}
                  placeholder="Summarize the core findings, policy scope, or target academic audience..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: File Upload & Format */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Upload size={18} className="text-[#06402B]" />
              <span>Digital File Attachment & File Attributes</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Primary File Format</label>
                  <select
                    value={newResource.fileType}
                    onChange={(e) => setNewResource({ ...newResource, fileType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="PDF">PDF (Portable Document Format)</option>
                    <option value="DOCX">DOCX (Microsoft Word Document)</option>
                    <option value="XLSX">XLSX (Audit Spreadsheet)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Access Clearance</label>
                  <select
                    value={newResource.accessLevel}
                    onChange={(e) => setNewResource({ ...newResource, accessLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="Public Institutional Access">Public Institutional Access (Open Download)</option>
                    <option value="Stakeholder Only">Registered Donors & Partners Only</option>
                    <option value="Internal Executive">Board & Internal Audit Clearance</option>
                  </select>
                </div>
              </div>

              {/* Upload Drag & Drop Box */}
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-2 hover:border-[#06402B] cursor-pointer bg-slate-50/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#06402B] flex items-center justify-center mx-auto">
                  <FileText size={24} />
                </div>
                <span className="font-bold text-slate-800 block text-sm">Drop document here or click to browse files</span>
                <span className="text-xs text-slate-400 block">Supports PDF, DOCX, XLSX files up to 50MB</span>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0B2D6E] shadow-xs hover:bg-slate-50 cursor-pointer"
                >
                  <Upload size={13} />
                  <span>Choose File from Local Storage</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Publish */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Review Resource Parameters & Confirm Publication</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Document Title</span>
                  <p className="text-base font-extrabold text-[#0B2D6E]">{newResource.title || 'Untitled Document'}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                  {newResource.category}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Format</span>
                  <span className="font-bold text-slate-900 text-sm">{newResource.fileType}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Version</span>
                  <span className="font-mono text-slate-900 text-sm">{newResource.version}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Access Tier</span>
                  <span className="font-bold text-emerald-800 text-xs">{newResource.accessLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Issuing Authority</span>
                  <span className="font-bold text-slate-900 text-xs">{newResource.author}</span>
                </div>
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
                  if (currentStep === 1 && !newResource.title.trim()) {
                    toast.error('Document title is required');
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                } else {
                  handlePublish();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentStep === 3 ? 'Publish Document Now' : 'Next'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT REPOSITORY VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* 1. Header */}
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

      {/* 2. Repository Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

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
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredResources.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800 max-w-xs">
                    <div className="truncate">{res.title}</div>
                    <span className="text-[10px] font-normal text-slate-400">Published {res.publishedDate}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {res.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B2D6E]">{res.fileType}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{res.version}</td>
                  <td className="py-3.5 px-4 text-slate-500">{res.size}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{res.downloads.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toast.success(`Downloading ${res.title}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 cursor-pointer inline-flex items-center gap-1"
                      title="Download"
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminResourcesSection;
