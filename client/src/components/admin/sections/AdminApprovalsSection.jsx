import React, { useState } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_APPROVALS = [
  {
    id: 'app-01',
    title: 'Special Tertiary STEM Grant - Elizade University (Fatima Yusuf)',
    category: 'Scholarship Disbursement',
    requestor: 'Babatunde Adeleke (Education Lead)',
    amountFormatted: '1,450,000',
    amount: 1450000,
    priority: 'High',
    dateSubmitted: '28 Oct 2026, 08:30 AM',
    justification: 'Tuition, accommodation, and laptop stipend for first-class computer engineering candidate under the Chief Michael Ade.Ojo Founders Scholarship.',
    status: 'Pending',
    attachments: 'Admission_Letter_Fatima.pdf',
  },
  {
    id: 'app-02',
    title: 'Emergency Pediatric Cardiac Surgery Grant (Master Emeka Okafor)',
    category: 'Emergency Healthcare',
    requestor: 'Dr. Kelechi Nwosu (Senior Medical Lead)',
    amountFormatted: '3,800,000',
    amount: 3800000,
    priority: 'Critical',
    dateSubmitted: '27 Oct 2026, 04:15 PM',
    justification: 'Immediate surgical deposit at University College Hospital (UCH) Ibadan for 7-year-old beneficiary referred from field clinic.',
    status: 'Pending',
    attachments: 'UCH_Medical_Referral_Emeka.pdf',
  },
  {
    id: 'app-03',
    title: 'Solar Inverter Replacement & Borehole Rehab (Dawakin Kudu, Kano)',
    category: 'Community Infrastructure',
    requestor: 'Musa Garba (Northern Field Lead)',
    amountFormatted: '920,000',
    amount: 920000,
    priority: 'Medium',
    dateSubmitted: '27 Oct 2026, 11:20 AM',
    justification: 'Replacement of surge-damaged solar pump inverter restoring potable water supply to over 2,200 village residents.',
    status: 'Pending',
    attachments: 'Engineering_Quotation_Dawakin.pdf',
  },
  {
    id: 'app-04',
    title: 'Ajegunle Youth STEM Center Science Lab Robotic Kits',
    category: 'Education Equipment',
    requestor: 'Hauwa Bello (MEAL Director)',
    amountFormatted: '2,650,000',
    amount: 2650000,
    priority: 'High',
    dateSubmitted: '26 Oct 2026, 02:40 PM',
    justification: 'Procurement of 30 programmable robotics kits and micro-controllers for secondary school cohorts in Ajegunle cluster.',
    status: 'Pending',
    attachments: 'Vendor_Invoice_STEMKits.pdf',
  },
  {
    id: 'app-05',
    title: 'Field Team Logistics & Security Escort (Kaduna Rural Outreach)',
    category: 'Operations & Logistics',
    requestor: 'Musa Garba (Northern Field Lead)',
    amountFormatted: '480,000',
    amount: 480000,
    priority: 'Normal',
    dateSubmitted: '25 Oct 2026, 09:00 AM',
    justification: 'Disbursement for field team transportation, verified community liaison honorariums, and security support for maternal health visit.',
    status: 'Pending',
    attachments: 'Logistics_Travel_Plan.pdf',
  },
];

const AdminApprovalsSection = () => {
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS);
  const [filterPriority, setFilterPriority] = useState('All');
  const [selectedApproval, setSelectedApproval] = useState(null);

  const pendingList = approvals.filter((a) => a.status === 'Pending');
  const pendingCount = pendingList.length;

  const filteredApprovals = approvals.filter((a) => {
    return filterPriority === 'All' || a.priority === filterPriority;
  });

  const handleApprove = (id, title) => {
    setApprovals(
      approvals.map((item) =>
        item.id === id ? { ...item, status: 'Approved', approvedAt: 'Just now' } : item
      )
    );
    toast.success(`Disbursement approved: "${title}"`);
    if (selectedApproval?.id === id) {
      setSelectedApproval(null);
    }
  };

  const handleReject = (id, title) => {
    setApprovals(
      approvals.map((item) =>
        item.id === id ? { ...item, status: 'Rejected', rejectedAt: 'Just now' } : item
      )
    );
    toast.error(`Request rejected: "${title}"`);
    if (selectedApproval?.id === id) {
      setSelectedApproval(null);
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-[11px] font-black uppercase tracking-wider">
              {pendingCount} Pending Board Clearances
            </span>
            <span className="text-slate-400 text-xs">Financial Delegations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Approval Queue & Fund Authorizations
          </h1>
          <p className="text-xs text-slate-500">
            Authorizing expenditure, scholarship awards, and emergency healthcare relief according to CMAOF governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Critical', 'High', 'Medium', 'Normal'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilterPriority(p)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                ${
                  filterPriority === p
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Awaiting Clearance</span>
          <div className="text-xl sm:text-2xl font-black text-rose-600">{pendingCount} Requests</div>
          <span className="text-[11px] text-rose-600 font-bold">Action required</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Total Commitment Value</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            ₦{(pendingList.reduce((s, a) => s + a.amount, 0) / 1000000).toFixed(2)}M
          </div>
          <span className="text-[11px] text-slate-500">Pending disbursements</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Avg Turnaround Time</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">4.2 Hours</div>
          <span className="text-[11px] text-emerald-600 font-bold">Within SLA (24h)</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Approved This Month</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">₦34.2M</div>
          <span className="text-[11px] text-emerald-600 font-bold">42 Requests cleared</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. APPROVALS WORKFLOW LIST
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {filteredApprovals.map((req) => (
          <div
            key={req.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    req.priority === 'Critical'
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : req.priority === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {req.priority} Priority
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-500 text-xs font-semibold">{req.category}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-400 text-[11px]">{req.dateSubmitted}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{req.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{req.justification}</p>

              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Submitted by: {req.requestor}</span>
                <span>•</span>
                <span className="font-mono text-slate-400 flex items-center gap-1">
                  <FileText size={12} />
                  {req.attachments}
                </span>
              </div>
            </div>

            {/* Right Side: Amount & Action Buttons */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0 gap-3">
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Requested Amount
                </span>
                <span className="text-lg font-black text-slate-900">₦{req.amountFormatted}</span>
              </div>

              {req.status === 'Pending' ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleReject(req.id, req.title)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(req.id, req.title)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                  >
                    <CheckCircle2 size={13} />
                    <span>Approve Grant</span>
                  </button>
                </div>
              ) : req.status === 'Approved' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                  <CheckCircle2 size={13} />
                  Disbursement Authorized
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs">
                  <XCircle size={13} />
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApprovalsSection;
