import React, { useState, useMemo } from 'react';
import {
  FileBarChart,
  Download,
  Calendar,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  TrendingUp,
  Sparkles,
  Layers,
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  Shield,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  X,
  Copy,
  Eye,
  Trash2,
  DollarSign,
  Users,
  Award,
  HardDrive,
  FileCheck2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  INITIAL_REPORTS,
  REPORT_TYPES,
  REPORT_PILLARS,
} from '../../../data/reportsData';

const COMPILE_STEPS = [
  { id: 1, label: 'Scope & Audit Period' },
  { id: 2, label: 'Metrics & Data Breakdown' },
  { id: 3, label: 'Sign-off & Live Preview' },
];

/* ─────────────────────────────────────────────────────────────────
   REPORT DOSSIER SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const ReportDossierDrawer = ({ report, onClose, onDelete }) => {
  if (!report) return null;

  const copyReference = () => {
    navigator.clipboard.writeText(`${report.title} (Ref: ${report.id})`);
    toast.success('Dossier reference copied to clipboard!');
  };

  const exportMetricsCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Dossier ID,"${report.id}"\nTitle,"${report.title}"\nPeriod,"${report.period}"\nAuditor,"${report.author}"\nPillar,"${report.pillar}"\nFormat,"${report.fileType}"\nSize,"${report.size}"\nStatus,"${report.status}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${report.id}_dossier_manifest.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Dossier manifest exported as CSV!');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {report.id}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 size={11} className="text-emerald-600" />
                <span>{report.status}</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-50 text-[#0B2D6E] border border-blue-200">
                {report.fileType}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-900">Institutional Transparency Dossier</h2>
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
          {/* Cover & Title Preview Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md border border-slate-200 bg-slate-100">
            <img
              src={report.coverThumbnail || '/images/cover_annual_report_2024.jpg'}
              alt={report.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            <div className="absolute top-3 left-3 bg-[#06402B]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border border-emerald-400/30">
              {report.period}
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                {report.pillar}
              </span>
              <h3 className="text-base font-black leading-snug line-clamp-2">{report.title}</h3>
            </div>
          </div>

          {/* Key Verified Metrics 4-Col Grid */}
          {report.metrics && report.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              {report.metrics.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{m.label}</span>
                  <span className="font-extrabold text-slate-900 text-sm">{m.val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Audit Specifications */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3.5 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Audit & Publication Specifications</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Auditing Body</span>
                <span className="font-bold text-[#06402B]">{report.author}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Reporting Scope</span>
                <span className="font-bold text-slate-800">{report.period}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Certified Signatory</span>
                <span className="font-bold text-slate-800">{report.signatory || 'Board of Trustees & Auditor'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Dossier File Size</span>
                <span className="font-bold text-[#0B2D6E]">{report.size} • {report.pages ? `${report.pages} pages` : 'Certified'}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary & Findings */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Executive Findings & Abstract</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-2xs">
              {report.summary || report.subtitle || 'Official audit report documenting statutory allocations, verified milestones, and transparent philanthropic investments across Nigeria.'}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={copyReference}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Copy size={13} />
              <span>Copy Reference</span>
            </button>
            <button
              type="button"
              onClick={exportMetricsCSV}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0B2D6E] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Download size={13} />
              <span>Export Metrics CSV</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete dossier "${report.title}"?`)) {
                onDelete(report.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          <button
            type="button"
            onClick={() => {
              toast.success(`Downloading certified dossier: ${report.title}...`, { icon: '📥' });
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Download Certified PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN REPORTS SECTION COMPONENT
───────────────────────────────────────────────────────────────── */
const AdminReportsSection = () => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPillar, setFilterPillar] = useState('All');
  const [formatFilter, setFormatFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeDossierReport, setActiveDossierReport] = useState(null);

  // Dedicated View State: 'portfolio' | 'generate'
  const [currentView, setCurrentView] = useState('portfolio');
  const [currentStep, setCurrentStep] = useState(1);

  // Custom Report Generator State
  const [genConfig, setGenConfig] = useState({
    title: 'Q4 2026 Interim Field Performance Report',
    subtitle: 'Comprehensive evaluation of secondary school scholar cohort, health outreach, and borehole reticulation.',
    period: 'Oct 2026 – Dec 2026',
    pillar: 'All Strategic Pillars',
    format: 'Executive PDF',
    author: 'Board of Trustees & MEAL Unit',
    signatory: 'Chief Michael Ade.Ojo & Deloitte Engagement Partner',
    includeLedgers: true,
    includePhotos: true,
    includeFinancials: true,
    includeSafeguarding: true,
    governanceCertified: true,
  });

  // KPI Calculations
  const totalReportsCount = reports.length;
  const auditedFundsDisclosed = '₦245.3M';
  const verifiedBeneficiariesCount = '12,480';
  const firsComplianceStatus = '100% Clean';

  // Filtered Reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesPillar =
        filterPillar === 'All' ||
        r.pillar.toLowerCase().includes(filterPillar.toLowerCase()) ||
        (filterPillar === 'Finance' && r.pillar.includes('Finance')) ||
        (filterPillar === 'Education' && r.pillar.includes('Education')) ||
        (filterPillar === 'Health' && r.pillar.includes('Health')) ||
        (filterPillar === 'Community' && r.pillar.includes('Community'));

      const matchesFormat =
        formatFilter === 'All' || r.fileType?.toLowerCase().includes(formatFilter.toLowerCase());

      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.summary && r.summary.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesPillar && matchesFormat && matchesSearch;
    });
  }, [reports, filterPillar, formatFilter, searchQuery]);

  const handleDeleteReport = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    toast.success('Dossier removed from repository.');
  };

  const handleCompile = () => {
    if (!genConfig.title.trim()) {
      toast.error('Dossier title is required');
      return;
    }

    const created = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      title: genConfig.title.trim(),
      subtitle: genConfig.subtitle.trim() || 'Comprehensive statutory verification statement.',
      period: genConfig.period,
      author: genConfig.author || 'Board of Trustees & MEAL Unit',
      auditor: genConfig.author || 'Internal Audit Desk',
      fileType: genConfig.format,
      size: '5.2 MB',
      pages: 36,
      dateGenerated: 'Today',
      status: 'Audited & Signed',
      pillar: genConfig.pillar,
      signatory: genConfig.signatory,
      coverThumbnail: '/images/cover_annual_report_2024.jpg',
      metrics: [
        { label: 'Disbursed', val: '₦65.0M' },
        { label: 'Beneficiaries', val: '3,200' },
        { label: 'Field Hubs', val: '8 Hubs' },
        { label: 'Audit Score', val: 'Certified' },
      ],
      summary: 'Interim operational assessment validating milestones and fund stewardship in accordance with CMAOF statutory guidelines.',
    };

    setReports([created, ...reports]);
    toast.success(`Dossier "${created.title}" compiled and certified!`, {
      icon: '📜',
    });
    setCurrentView('portfolio');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportManifestCSV = () => {
    const headers = ['Dossier Ref', 'Title', 'Reporting Period', 'Auditor', 'Pillar', 'Format', 'Size', 'Status', 'Date Generated'];
    const rows = reports.map((r) => [
      `"${r.id}"`,
      `"${r.title}"`,
      `"${r.period}"`,
      `"${r.author}"`,
      `"${r.pillar}"`,
      `"${r.fileType}"`,
      `"${r.size}"`,
      `"${r.status}"`,
      `"${r.dateGenerated}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cmaof_audit_manifest.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Dossier audit manifest exported as CSV!');
  };

  // ─────────────────────────────────────────────────────────────
  // 3-STEP IN-PLACE COMPILE DOSSIER WIZARD
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'generate') {
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
              <span className="font-semibold text-sky-600">Reports</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Compile Transparency Dossier</span>
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
                {COMPILE_STEPS.map((step) => {
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

        {/* STEP 1: Scope & Audit Period */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <FileBarChart size={18} className="text-[#06402B]" />
              <span>Dossier Scope, Audit Period & Issuing Directorate</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Dossier Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={genConfig.title}
                  onChange={(e) => setGenConfig({ ...genConfig, title: e.target.value })}
                  placeholder="e.g. Q4 2026 Interim Field Performance Report"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Subtitle / Secondary Headline</label>
                <input
                  type="text"
                  value={genConfig.subtitle}
                  onChange={(e) => setGenConfig({ ...genConfig, subtitle: e.target.value })}
                  placeholder="Scope, key intervention milestones, and empirical takeaways..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Reporting Audit Period</label>
                  <input
                    type="text"
                    value={genConfig.period}
                    onChange={(e) => setGenConfig({ ...genConfig, period: e.target.value })}
                    placeholder="e.g. Oct 2026 – Dec 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar Alignment</label>
                  <select
                    value={genConfig.pillar}
                    onChange={(e) => setGenConfig({ ...genConfig, pillar: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    {REPORT_PILLARS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Authoring Entity / Audit Firm</label>
                  <input
                    type="text"
                    value={genConfig.author}
                    onChange={(e) => setGenConfig({ ...genConfig, author: e.target.value })}
                    placeholder="e.g. Deloitte Nigeria / Board of Trustees"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Output Certified Format</label>
                  <select
                    value={genConfig.format}
                    onChange={(e) => setGenConfig({ ...genConfig, format: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    <option value="Executive PDF">Executive PDF (Full Color Print)</option>
                    <option value="Certified PDF">Certified Statutory PDF (Signed)</option>
                    <option value="Financial XLSX">Financial Spreadsheet (Excel Ledger)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Metrics & Data Breakdown */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-[#06402B]" />
              <span>Verified Financial Disclosures & Section Inclusion Controls</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="font-bold text-slate-800 block text-xs">Dossier Inclusion Checklist</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={genConfig.includeFinancials}
                      onChange={(e) => setGenConfig({ ...genConfig, includeFinancials: e.target.checked })}
                      className="w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B]"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 block">Itemized Grants Disbursements</span>
                      <span className="text-[10px] text-slate-400 block">Complete audited transaction lines</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={genConfig.includeLedgers}
                      onChange={(e) => setGenConfig({ ...genConfig, includeLedgers: e.target.checked })}
                      className="w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B]"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 block">Beneficiary Roll Ledger</span>
                      <span className="text-[10px] text-slate-400 block">Verified geocoded headcount numbers</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={genConfig.includePhotos}
                      onChange={(e) => setGenConfig({ ...genConfig, includePhotos: e.target.checked })}
                      className="w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B]"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 block">Photographic Field Testimonials</span>
                      <span className="text-[10px] text-slate-400 block">High-res inspection documentation</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={genConfig.includeSafeguarding}
                      onChange={(e) => setGenConfig({ ...genConfig, includeSafeguarding: e.target.checked })}
                      className="w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B]"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 block">PSEA & Safeguarding Certificate</span>
                      <span className="text-[10px] text-slate-400 block">Zero-tolerance compliance sign-off</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Authorized Signatory Name & Title</label>
                <input
                  type="text"
                  value={genConfig.signatory}
                  onChange={(e) => setGenConfig({ ...genConfig, signatory: e.target.value })}
                  placeholder="e.g. Chief Michael Ade.Ojo & Deloitte Engagement Partner"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Sign-off & Real-Time Live Preview */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Compilation Review & Real-Time Live Certified Dossier Preview</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Review */}
              <div className="lg:col-span-7 space-y-4 text-xs">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Dossier Compilation Parameters
                  </span>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Dossier Title:</span>
                    <span className="font-bold text-slate-900">{genConfig.title}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Audit Period:</span>
                    <span className="font-bold text-[#06402B]">{genConfig.period}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Pillar & Scope:</span>
                    <span className="font-bold text-[#0B2D6E]">{genConfig.pillar}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Certifying Authority:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">{genConfig.signatory}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="govSeal"
                    checked={genConfig.governanceCertified}
                    onChange={(e) => setGenConfig({ ...genConfig, governanceCertified: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <label htmlFor="govSeal" className="text-xs text-slate-700 font-medium cursor-pointer">
                    <span className="font-bold text-[#06402B]">Governance Seal:</span> I certify that this dossier reflects true financial statements, verified field records, and institutional integrity standards under the CMAOF Foundation Charter.
                  </label>
                </div>
              </div>

              {/* Right Column: Real-Time Live Dossier Card Preview */}
              <div className="lg:col-span-5 bg-slate-100/80 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" />
                    <span>Live Certified Card Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Audited Seal
                  </span>
                </div>

                {/* Card Mockup */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-[66px] h-[88px] rounded-lg overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200">
                      <img
                        src="/images/cover_annual_report_2024.jpg"
                        alt="Dossier cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.2 rounded text-[7px] font-black text-white uppercase">
                        SEALED
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                        {genConfig.period}
                      </span>
                      <h4 className="font-bold text-sm text-[#0B2D6E] leading-snug line-clamp-2">
                        {genConfig.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">{genConfig.author}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#06402B]">{genConfig.format}</span>
                    <span className="text-slate-400">Audited & Signed</span>
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
              onClick={() => toast.success('Dossier draft configuration saved.')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentStep < 3) {
                  if (currentStep === 1 && !genConfig.title.trim()) {
                    toast.error('Dossier title is required');
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                } else {
                  handleCompile();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentStep === 3 ? 'Compile & Seal Dossier' : 'Next Step'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT REPORTS OVERVIEW VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      
      {/* 1. Header with Clear Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <FileBarChart size={15} />
            <span>Institutional Accountability & Transparency</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Reports & Transparency Dossiers
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Statutory compliance audits, certified quarterly milestone statements, financial ledgers, and verified donor disclosures.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleExportManifestCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Download size={14} />
            <span>Export Manifest</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentView('generate');
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Compile New Dossier</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Strategic Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Certified Dossiers</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#06402B]">
              <FileCheck2 size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{totalReportsCount} Dossiers</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-bold">
              <CheckCircle2 size={13} />
              <span>100% Audited & Signed</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Audited Disbursements</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0B2D6E]">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-[#0B2D6E]">{auditedFundsDisclosed}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-700 font-bold">
              <Award size={13} />
              <span>Deloitte Independent Clean</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Verified Beneficiaries</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{verifiedBeneficiariesCount}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-700 font-bold">
              <Sparkles size={13} />
              <span>Field Geocoded Headcount</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">FIRS Statutory Status</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Shield size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{firsComplianceStatus}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-800 font-bold">
              <Check size={13} strokeWidth={3} />
              <span>Exempt & Current</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & View Mode Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search dossiers, auditors, periods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Format:</span>
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
          >
            <option value="All">All Formats</option>
            <option value="Executive PDF">Executive PDF</option>
            <option value="Certified PDF">Certified PDF</option>
            <option value="Financial">Financial Brief</option>
            <option value="Engineering">Engineering Report</option>
          </select>
        </div>

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

      {/* 4. Strategic Pillar Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Finance', 'Education', 'Health', 'Community'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilterPillar(p)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterPillar === p
                ? 'bg-[#06402B] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {p === 'All' ? 'All Strategic Pillars' : `${p} Pillar`}
          </button>
        ))}
      </div>

      {/* 5. Content View: Cards Grid vs Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Cover Banner */}
              <div 
                onClick={() => setActiveDossierReport(r)}
                className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 cursor-pointer"
              >
                <img
                  src={r.coverThumbnail || '/images/cover_annual_report_2024.jpg'}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#06402B] shadow-xs">
                    <CheckCircle2 size={11} className="text-[#06402B]" />
                    <span>{r.status}</span>
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#0B2D6E]/90 text-white shadow-xs">
                    {r.period}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase block truncate">
                    {r.pillar}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 truncate">{r.author}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1">
                  <h3
                    onClick={() => setActiveDossierReport(r)}
                    className="font-bold text-[14.5px] text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors cursor-pointer line-clamp-2"
                  >
                    {r.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2">
                    {r.subtitle || r.summary}
                  </p>
                </div>

                {/* Metrics 2x2 Bar */}
                {r.metrics && (
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">{r.metrics[0].label}</span>
                      <span className="font-extrabold text-[#06402B]">{r.metrics[0].val}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">{r.metrics[1].label}</span>
                      <span className="font-extrabold text-slate-900">{r.metrics[1].val}</span>
                    </div>
                  </div>
                )}

                {/* Footer specs & actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] font-mono">{r.fileType} • {r.size}</span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setActiveDossierReport(r)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Inspect Dossier"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success(`Exporting certified PDF for ${r.title}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2D6E] hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Download Certified PDF"
                    >
                      <Download size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete "${r.title}"?`)) {
                          handleDeleteReport(r.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Dossier"
                    >
                      <Trash2 size={15} />
                    </button>
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
                  <th className="py-3 px-4">Dossier Title & Author</th>
                  <th className="py-3 px-4">Pillar</th>
                  <th className="py-3 px-4">Reporting Period</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Generated</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredReports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-13 rounded overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                          <img
                            src={r.coverThumbnail || '/images/cover_annual_report_2024.jpg'}
                            alt={r.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            onClick={() => setActiveDossierReport(r)}
                            className="truncate text-[#0B2D6E] font-bold hover:text-[#06402B] cursor-pointer"
                          >
                            {r.title}
                          </p>
                          <span className="text-[10px] font-normal text-slate-400 block truncate">{r.author}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {r.pillar}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{r.period}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0B2D6E]">{r.fileType}</td>
                    <td className="py-3.5 px-4 text-slate-500">{r.dateGenerated}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 size={11} className="text-emerald-600" />
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveDossierReport(r)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 cursor-pointer"
                          title="View Dossier"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => toast.success(`Exporting "${r.title}" (Certified PDF)`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2D6E] hover:bg-blue-50 cursor-pointer"
                          title="Download PDF"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${r.title}"?`)) {
                              handleDeleteReport(r.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Dossier"
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
      {filteredReports.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3 shadow-xs">
          <FileBarChart size={36} className="mx-auto text-slate-300" />
          <h4 className="text-base font-bold text-slate-700">No dossiers found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, format selector, or pillar filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterPillar('All');
              setFormatFilter('All');
            }}
            className="text-xs font-bold text-[#06402B] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* 6. Slide-Over Report Dossier Drawer */}
      <ReportDossierDrawer
        report={activeDossierReport}
        onClose={() => setActiveDossierReport(null)}
        onDelete={handleDeleteReport}
      />

    </div>
  );
};

export default AdminReportsSection;
