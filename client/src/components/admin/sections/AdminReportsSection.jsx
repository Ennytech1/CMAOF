import React, { useState } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_REPORTS = [
  {
    id: 'rep-01',
    title: 'Q3 2026 Executive Summary & Intervention Milestone Report',
    period: 'Jul 2026 - Sep 2026',
    author: 'Board of Trustees & MEAL Unit',
    fileType: 'Executive PDF',
    size: '4.8 MB',
    dateGenerated: '05 Oct 2026',
    status: 'Audited & Signed',
    pillar: 'All Pillars',
  },
  {
    id: 'rep-02',
    title: 'Statutory Financial Audit & Grants Disbursement Statement 2025/2026',
    period: 'FY 2025/2026',
    author: 'External Auditors (Deloitte Nigeria)',
    fileType: 'Financial PDF',
    size: '12.4 MB',
    dateGenerated: '15 Sep 2026',
    status: 'Audited & Signed',
    pillar: 'Finance & Governance',
  },
  {
    id: 'rep-03',
    title: 'Donor Transparency Dossier: Access Bank PLC STEM Partnership',
    period: 'Jan 2026 - Sep 2026',
    author: 'Institutional Partnerships Desk',
    fileType: 'Partnership Brief',
    size: '3.1 MB',
    dateGenerated: '28 Sep 2026',
    status: 'Delivered',
    pillar: 'Education & Human Capital',
  },
  {
    id: 'rep-04',
    title: 'Kano & Ibadan Primary Health Center Drug Log & Surgeries Ledger',
    period: 'Q2 - Q3 2026',
    author: 'Dr. Kelechi Nwosu & Field Clinics',
    fileType: 'Medical Log',
    size: '6.5 MB',
    dateGenerated: '20 Sep 2026',
    status: 'Verified',
    pillar: 'Health & Well-being',
  },
  {
    id: 'rep-05',
    title: 'Ilara-Mokin Clean Water Borehole Water Quality & Yield Assessment',
    period: 'Aug 2026',
    author: 'Infrastructure Technical Committee',
    fileType: 'Engineering Report',
    size: '2.9 MB',
    dateGenerated: '12 Sep 2026',
    status: 'Approved',
    pillar: 'Community Resilience',
  },
];

const COMPILE_STEPS = [
  { id: 1, label: 'Scope & Audit Period' },
  { id: 2, label: 'Metrics & Data Breakdown' },
  { id: 3, label: 'Sign-off & Compile' },
];

const AdminReportsSection = () => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPillar, setFilterPillar] = useState('All');
  
  // Dedicated View State: 'portfolio' | 'generate' (NO POPUP MODAL)
  const [currentView, setCurrentView] = useState('portfolio');
  const [currentStep, setCurrentStep] = useState(1);

  // Custom Report Generator State
  const [genConfig, setGenConfig] = useState({
    title: 'Q4 2026 Interim Field Performance Report',
    period: 'Oct 2026 - Dec 2026',
    pillar: 'All Pillars',
    format: 'Executive PDF',
    author: 'MEAL Accountability Taskforce',
    includeLedgers: true,
    includePhotos: true,
    includeFinancials: true,
  });

  const filteredReports = reports.filter((r) => {
    const matchesPillar = filterPillar === 'All' || r.pillar === filterPillar;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  const handleCompile = () => {
    if (!genConfig.title.trim()) {
      toast.error('Report title is required');
      return;
    }

    const created = {
      id: `rep-${Date.now()}`,
      title: genConfig.title,
      period: genConfig.period,
      author: genConfig.author || 'Board of Trustees & MEAL Unit',
      fileType: genConfig.format,
      size: '5.2 MB',
      dateGenerated: 'Today',
      status: 'Audited & Signed',
      pillar: genConfig.pillar,
    };

    setReports([created, ...reports]);
    toast.success(`Dossier "${created.title}" compiled and certified!`);
    setCurrentView('portfolio');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    toast.success('Audit report parameters saved to session draft.');
  };

  // ─────────────────────────────────────────────────────────────
  // DEDICATED IN-PLACE GENERATE VIEW (Matches Register Beneficiary Design)
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
            <span className="font-bold text-[#0B2D6E]">Compile Foundation Audit Dossier</span>
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
            <span>Back to Dossiers</span>
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

        {/* STEP 1: Scope & Period */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <FileBarChart size={18} className="text-[#06402B]" />
              <span>Audit Scope, Target Period & Institutional Format</span>
            </h2>
            <p className="text-xs text-slate-500">
              Establish the reporting boundaries, calendar windows, and statutory audit parameters.
            </p>

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
                  placeholder="e.g. Q4 2026 Executive Field Milestone & Financial Audit Dossier"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Target Audit Period <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={genConfig.period}
                    onChange={(e) => setGenConfig({ ...genConfig, period: e.target.value })}
                    placeholder="e.g. Oct 2026 - Dec 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Export Format <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={genConfig.format}
                    onChange={(e) => setGenConfig({ ...genConfig, format: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="Executive PDF">Executive PDF (Deloitte / Board Verified)</option>
                    <option value="Audit XLSX">Audit Spreadsheet (Ledgers & Banking Refs)</option>
                    <option value="MEAL Verification Dossier">MEAL Field Verification Dossier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar Scope</label>
                <select
                  value={genConfig.pillar}
                  onChange={(e) => setGenConfig({ ...genConfig, pillar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                >
                  <option value="All Pillars">All Strategic Pillars (Holistic Foundation)</option>
                  <option value="Education & Human Capital">Education & Human Capital (Pillar 1)</option>
                  <option value="Health & Well-being">Health & Well-being (Pillar 2)</option>
                  <option value="Community Resilience">Community Resilience (Pillar 3)</option>
                  <option value="Finance & Governance">Finance & Statutory Governance</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Metrics & Breakdown */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Layers size={18} className="text-[#06402B]" />
              <span>Data Subsystems, Verification Feeds & Ledger Integration</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="incLedger"
                    checked={genConfig.includeLedgers}
                    onChange={(e) => setGenConfig({ ...genConfig, includeLedgers: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="incLedger" className="font-bold text-slate-800 block cursor-pointer">
                      Individual Beneficiary Verification Records
                    </label>
                    <span className="text-slate-500 text-[11px]">
                      Include 12,480 verified beneficiary profiles, state coordinates, and enrolled intervention dates.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="incPhotos"
                    checked={genConfig.includePhotos}
                    onChange={(e) => setGenConfig({ ...genConfig, includePhotos: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="incPhotos" className="font-bold text-slate-800 block cursor-pointer">
                      Field Photographic Proof & Geotagged Milestones
                    </label>
                    <span className="text-slate-500 text-[11px]">
                      Attach high-resolution before/after intervention photographs from rural health camps and schools.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="incFin"
                    checked={genConfig.includeFinancials}
                    onChange={(e) => setGenConfig({ ...genConfig, includeFinancials: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="incFin" className="font-bold text-slate-800 block cursor-pointer">
                      Capital Disbursement & Banking Audit Traces
                    </label>
                    <span className="text-slate-500 text-[11px]">
                      Embed Nigerian banking payment references, escrow releases, and vendor procurement vouchers.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Sign-off & Compile */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Review Audit Parameters & Execute Compilation</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Report Title</span>
                  <p className="text-base font-extrabold text-[#0B2D6E]">{genConfig.title}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                  {genConfig.format}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Audit Period</span>
                  <span className="font-bold text-slate-900 text-sm">{genConfig.period}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pillar Coverage</span>
                  <span className="font-bold text-slate-900 text-sm">{genConfig.pillar}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Security Sign-off</span>
                  <span className="font-bold text-emerald-800 text-xs">MEAL Directorate Certified</span>
                </div>
              </div>
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
              <span>{currentStep === 3 ? 'Compile & Seal Dossier' : 'Next'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT REPORTS REPOSITORY VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* 1. Header Bar */}
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
            Formal audit logs, statutory returns, financial statements, and verified donor transparency dossiers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('generate');
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={16} />
          <span>Compile New Dossier</span>
        </button>
      </div>

      {/* 2. Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Education & Human Capital', 'Health & Well-being', 'Community Resilience', 'Finance & Governance'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFilterPillar(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterPillar === p
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p === 'All' ? 'All Dossiers' : p.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

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
                  <td className="py-3.5 px-4 font-bold text-slate-800 max-w-xs">
                    <div className="truncate">{r.title}</div>
                    <span className="text-[10px] font-normal text-slate-400">{r.author}</span>
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
                    <button
                      type="button"
                      onClick={() => toast.success(`Exporting "${r.title}" (Certified PDF)`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#06402B] hover:text-white font-bold text-slate-700 text-[11px] transition-colors cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Download</span>
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

export default AdminReportsSection;
