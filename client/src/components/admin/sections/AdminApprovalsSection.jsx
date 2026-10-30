import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  DollarSign,
  FileText,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Download,
  Eye,
  Check,
  X,
  Copy,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  Table as TableIcon,
  ShieldCheck,
  Building,
  Award,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  INITIAL_APPROVALS,
  APPROVAL_CATEGORIES,
} from '../../../data/approvalsData';

/* ─────────────────────────────────────────────────────────────────
   APPROVAL DOSSIER SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const ApprovalDossierDrawer = ({ request, onClose, onApprove, onReject }) => {
  if (!request) return null;

  const copyRef = () => {
    navigator.clipboard.writeText(`${request.title} (Ref: ${request.id})`);
    toast.success('Approval reference copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {request.id}
              </span>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  request.priority === 'Critical'
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : request.priority === 'High'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {request.priority} Priority
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  request.status === 'Approved'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : request.status === 'Rejected'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {request.status}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-900">Disbursement Clearance Dossier</h2>
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
          {/* Big Amount & Title Highlight Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Requested Funding Commitment
              </span>
              <span className="text-[11px] font-mono font-bold text-[#06402B] bg-emerald-50 px-2 py-0.5 rounded">
                Ref: {request.beneficiaryCode}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2D6E]">
              ₦{request.amountFormatted}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 pt-1 leading-snug">
              {request.title}
            </h3>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
              {request.category}
            </span>
          </div>

          {/* Logistics Specs Grid */}
          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Request Lineage</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Submitted By</span>
                <span className="font-bold text-[#06402B]">{request.requestor}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Department Unit</span>
                <span className="font-bold text-slate-800">{request.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Submission Timestamp</span>
                <span className="font-bold text-slate-800">{request.dateSubmitted}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Supporting Document</span>
                <button
                  type="button"
                  onClick={() => toast.success(`Viewing attachment: ${request.attachments}`)}
                  className="font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer truncate"
                >
                  <FileText size={12} className="shrink-0" />
                  <span className="truncate">{request.attachments}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Narrative Justification */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Empirical Justification & Impact Need</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-2xs">
              {request.justification}
            </p>
          </div>

          {/* Itemized Cost Breakdown Table */}
          {request.items && request.items.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Itemized Cost Breakdown</h4>
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 divide-y divide-slate-200/60 overflow-hidden text-xs">
                {request.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <span className="font-medium text-slate-700">{item.desc}</span>
                    <span className="font-bold font-mono text-slate-900">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governance Verification Checklist */}
          {request.checklist && request.checklist.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Governance & Due Diligence Clearance</h4>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                {request.checklist.map((chk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#06402B] flex items-center justify-center shrink-0">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          {request.status === 'Pending' ? (
            <>
              <button
                type="button"
                onClick={() => onReject(request.id, request.title)}
                className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
              >
                Reject Request
              </button>

              <button
                type="button"
                onClick={() => onApprove(request.id, request.title)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <CheckCircle2 size={15} />
                <span>Authorize & Sign Disbursement</span>
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold text-slate-500">
                Action finalized: <strong className="text-slate-800">{request.status}</strong>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN APPROVALS SECTION COMPONENT
───────────────────────────────────────────────────────────────── */
const AdminApprovalsSection = () => {
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [selectedApproval, setSelectedApproval] = useState(null);

  const pendingList = approvals.filter((a) => a.status === 'Pending');
  const pendingCount = pendingList.length;
  const totalCommitmentValue = (pendingList.reduce((s, a) => s + a.amount, 0) / 1000000).toFixed(2);

  const filteredApprovals = useMemo(() => {
    return approvals.filter((a) => {
      const matchesPriority = filterPriority === 'All' || a.priority === filterPriority;
      const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.requestor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.justification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPriority && matchesCategory && matchesSearch;
    });
  }, [approvals, filterPriority, categoryFilter, searchQuery]);

  const handleApprove = (id, title) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Approved', approvedAt: 'Just now' } : item
      )
    );
    toast.success(`Disbursement authorized: "${title}"`, { icon: '✅' });
    if (selectedApproval?.id === id) {
      setSelectedApproval((prev) => ({ ...prev, status: 'Approved' }));
    }
  };

  const handleReject = (id, title) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Rejected', rejectedAt: 'Just now' } : item
      )
    );
    toast.error(`Request rejected: "${title}"`);
    if (selectedApproval?.id === id) {
      setSelectedApproval((prev) => ({ ...prev, status: 'Rejected' }));
    }
  };

  const handleBatchApprove = () => {
    setApprovals((prev) =>
      prev.map((item) => (item.status === 'Pending' ? { ...item, status: 'Approved' } : item))
    );
    toast.success('Batch authorized all clean pending grant requests!', { icon: '⚡' });
  };

  const handleExportCSV = () => {
    const headers = ['Approval Ref', 'Title', 'Category', 'Requestor', 'Amount (NGN)', 'Priority', 'Status', 'Date Submitted'];
    const rows = approvals.map((a) => [
      `"${a.id}"`,
      `"${a.title}"`,
      `"${a.category}"`,
      `"${a.requestor}"`,
      a.amount,
      `"${a.priority}"`,
      `"${a.status}"`,
      `"${a.dateSubmitted}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cmaof_approvals_ledger.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Approvals ledger exported as CSV!');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      
      {/* 1. Header with Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <CheckCircle2 size={15} />
            <span>Governance Clearances & Fund Authorizations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Approvals Queue & Fund Authorizations
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Multi-signatory approval workflow for tertiary scholarships, emergency healthcare surgeries, and WASH infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Download size={14} />
            <span>Export Ledger</span>
          </button>

          {pendingCount > 0 && (
            <button
              type="button"
              onClick={handleBatchApprove}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CheckCircle2 size={15} />
              <span>Batch Clear Clean</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. 4 Strategic Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Awaiting Clearance</span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-rose-600">{pendingCount} Requests</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-rose-600 font-bold">
              <AlertTriangle size={13} />
              <span>Action Required</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Total Commitment Value</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0B2D6E]">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-[#0B2D6E]">₦{totalCommitmentValue}M</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-700 font-bold">
              <TrendingUp size={13} />
              <span>Pending Disbursements</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Review Velocity</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#06402B]">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">3.8 Hours</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-bold">
              <Check size={13} strokeWidth={3} />
              <span>100% Within 24h SLA</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Approved This Month</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">₦42.8M</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-700 font-bold">
              <ShieldCheck size={13} />
              <span>38 Grants Cleared</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar, Category & View Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search approvals by title, requestor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Priority:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Critical', 'High', 'Medium', 'Normal'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterPriority === p
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-[#06402B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Workflow Cards</span>
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

      {/* 4. Content View: Workflow Cards vs Table View */}
      {viewMode === 'cards' ? (
        <div className="space-y-3.5">
          {filteredApprovals.map((req) => (
            <div
              key={req.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      req.priority === 'Critical'
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : req.priority === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {req.priority} Priority
                  </span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-slate-600 text-xs font-bold">{req.category}</span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-slate-400 text-[11px]">{req.dateSubmitted}</span>
                </div>

                <h3
                  onClick={() => setSelectedApproval(req)}
                  className="text-base font-black text-[#0B2D6E] leading-snug hover:text-[#06402B] cursor-pointer transition-colors"
                >
                  {req.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl line-clamp-2">
                  {req.justification}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">Submitted by: {req.requestor}</span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => toast.success(`Viewing attachment: ${req.attachments}`)}
                    className="font-mono text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText size={12} />
                    <span>{req.attachments}</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Amount & Action Buttons */}
              <div className="flex sm:flex-row lg:flex-col items-center sm:items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0 gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Disbursement Commitment
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900">
                    ₦{req.amountFormatted}
                  </span>
                </div>

                {req.status === 'Pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedApproval(req)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-[#06402B] hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Inspect Dossier"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(req.id, req.title)}
                      className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(req.id, req.title)}
                      className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs cursor-pointer transition-all shadow-xs hover:shadow-md"
                    >
                      <CheckCircle2 size={14} />
                      <span>Approve Grant</span>
                    </button>
                  </div>
                ) : req.status === 'Approved' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Disbursement Authorized</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
                    <XCircle size={13} className="text-rose-600" />
                    <span>Request Rejected</span>
                  </span>
                )}
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
                  <th className="py-3 px-4">Request Title & Justification</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Submitted By</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredApprovals.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800 max-w-sm">
                      <p
                        onClick={() => setSelectedApproval(req)}
                        className="truncate text-[#0B2D6E] font-bold hover:text-[#06402B] cursor-pointer"
                      >
                        {req.title}
                      </p>
                      <span className="text-[10px] text-slate-400 block truncate">{req.justification}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{req.category}</td>
                    <td className="py-3.5 px-4 text-slate-600">{req.requestor}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">₦{req.amountFormatted}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-700'
                            : req.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {req.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : req.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedApproval(req)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 cursor-pointer"
                          title="View Dossier"
                        >
                          <Eye size={15} />
                        </button>
                        {req.status === 'Pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleReject(req.id, req.title)}
                              className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApprove(req.id, req.title)}
                              className="px-3 py-1 rounded-lg bg-[#06402B] text-white hover:bg-[#042C1D] text-[11px] font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                          </>
                        )}
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
      {filteredApprovals.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3 shadow-xs">
          <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
          <h4 className="text-base font-bold text-slate-700">All Clear! No Pending Approvals</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            There are currently no disbursement authorization requests matching your filter criteria.
          </p>
        </div>
      )}

      {/* 5. Slide-Over Approval Review Drawer */}
      <ApprovalDossierDrawer
        request={selectedApproval}
        onClose={() => setSelectedApproval(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

    </div>
  );
};

export default AdminApprovalsSection;
