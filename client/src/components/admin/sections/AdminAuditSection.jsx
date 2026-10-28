import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Globe,
  AlertTriangle,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  LogOut,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_LOGS = [
  {
    id: 'log-01',
    event: 'Administrator Authenticated (2FA Verified)',
    actor: 'admin@cmaof.org',
    ipAddress: '102.89.44.12',
    location: 'Victoria Island, Lagos, NG',
    device: 'Chrome on Windows 11',
    timestamp: '28 Oct 2026, 09:12 AM',
    severity: 'Info',
    status: 'Success',
  },
  {
    id: 'log-02',
    event: 'Disbursement Grant Authorized (₦1,450,000)',
    actor: 'admin@cmaof.org',
    ipAddress: '102.89.44.12',
    location: 'Victoria Island, Lagos, NG',
    device: 'Chrome on Windows 11',
    timestamp: '28 Oct 2026, 08:45 AM',
    severity: 'High',
    status: 'Success',
  },
  {
    id: 'log-03',
    event: 'Beneficiary Dossier Biometric Update (B-2026-001)',
    actor: 'hauwa.b@cmaof.org',
    ipAddress: '197.210.65.8',
    location: 'Ikeja, Lagos, NG',
    device: 'Safari on macOS',
    timestamp: '27 Oct 2026, 05:20 PM',
    severity: 'Info',
    status: 'Success',
  },
  {
    id: 'log-04',
    event: 'MFA Hardware Key Registered',
    actor: 'dr.kelechi@cmaof.org',
    ipAddress: '105.112.98.41',
    location: 'Bodija, Ibadan, Oyo, NG',
    device: 'Firefox on Android',
    timestamp: '27 Oct 2026, 02:11 PM',
    severity: 'High',
    status: 'Success',
  },
  {
    id: 'log-05',
    event: 'MEAL Impact Dossier Exported (Q3 2026 PDF)',
    actor: 'babatunde.a@cmaof.org',
    ipAddress: '41.184.22.15',
    location: 'Akure, Ondo, NG',
    device: 'Chrome on Windows',
    timestamp: '26 Oct 2026, 11:34 AM',
    severity: 'Info',
    status: 'Success',
  },
  {
    id: 'log-06',
    event: 'Automated Cloud Database Backup Completed',
    actor: 'System Daemon (PostgreSQL/Mongo)',
    ipAddress: '10.0.0.1 (Internal VPC)',
    location: 'AWS eu-west-1',
    device: 'Automated Cron Job',
    timestamp: '26 Oct 2026, 03:00 AM',
    severity: 'System',
    status: 'Success',
  },
];

const AdminAuditSection = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filteredLogs = logs.filter((l) => {
    const matchesSev = filterSeverity === 'All' || l.severity === filterSeverity;
    const matchesSearch =
      l.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesSearch;
  });

  const handleExportAudit = () => {
    toast.success('Security audit log exported to encrypted CSV');
  };

  const handleTerminateRemote = () => {
    toast.success('All other remote admin sessions terminated. Active session secured.');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#06402B] text-[11px] font-black uppercase tracking-wider">
              System Telemetry & Audit
            </span>
            <span className="text-slate-400 text-xs">Immutable Ledger</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Audit Trail & Security Center
          </h1>
          <p className="text-xs text-slate-500">
            Cryptographic log of all staff authentications, disbursement approvals, beneficiary modifications, and data exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTerminateRemote}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs shadow-xs cursor-pointer transition-all"
          >
            <LogOut size={13} />
            <span>Kill Other Sessions</span>
          </button>
          <button
            type="button"
            onClick={handleExportAudit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-sm cursor-pointer transition-all"
          >
            <Download size={14} />
            <span>Export Audit Trail</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Security Posture</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">Optimal (99.8%)</div>
          <span className="text-[11px] text-emerald-600 font-bold">Zero breached endpoints</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Active Admin Sessions</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">2 Verified Nodes</div>
          <span className="text-[11px] text-slate-500">TLS 1.3 / AES-256 GCM</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Failed Login Attempts (24h)</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">0 Attempts</div>
          <span className="text-[11px] text-emerald-600 font-bold">WAF Protection Active</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Database Daily Backup</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">Successful</div>
          <span className="text-[11px] text-slate-500">Latest snapshot: 03:00 AM</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FILTER & LOG TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['All', 'Info', 'High', 'System'].map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setFilterSeverity(sev)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                  ${
                    filterSeverity === sev
                      ? 'bg-[#06402B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="relative md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search event, actor, or IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="pb-3 pl-2">Logged Event</th>
                <th className="pb-3">Authenticated Actor</th>
                <th className="pb-3">IP & Location</th>
                <th className="pb-3">Client Environment</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3 text-right pr-2">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pl-2 font-sans font-bold text-slate-900 max-w-xs">
                    <span className="block leading-tight">{l.event}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-normal">ID: {l.id}</span>
                  </td>
                  <td className="py-3 font-sans text-slate-700 font-semibold">
                    {l.actor}
                  </td>
                  <td className="py-3 text-slate-600">
                    <span className="font-bold text-slate-800">{l.ipAddress}</span>
                    <span className="block text-[10px] font-sans text-slate-400">{l.location}</span>
                  </td>
                  <td className="py-3 font-sans text-slate-500 text-[11px]">
                    {l.device}
                  </td>
                  <td className="py-3 text-slate-500 font-sans whitespace-nowrap">
                    {l.timestamp}
                  </td>
                  <td className="py-3 text-right pr-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold font-sans text-[10px]">
                      <CheckCircle2 size={11} />
                      {l.status}
                    </span>
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

export default AdminAuditSection;
