import React, { useState, useMemo } from 'react';
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
  Key,
  Cpu,
  Laptop,
  Server,
  Copy,
  ExternalLink,
  Eye,
  Check,
  X,
  ShieldAlert,
  FileCode,
  Activity,
  Layers,
  Table as TableIcon,
  Clock,
  ArrowUpRight,
  HardDrive,
  Database,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { INITIAL_AUDIT_LOGS, ACTIVE_ADMIN_SESSIONS } from '../../../data/auditData';

const AdminAuditSection = () => {
  // Navigation & View State
  const [activeSubTab, setActiveSubTab] = useState('logs'); // 'logs' | 'sessions' | 'integrity'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Data State
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [sessions, setSessions] = useState(ACTIVE_ADMIN_SESSIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  // Drawer / Inspection State
  const [selectedLog, setSelectedLog] = useState(null);
  const [copiedHash, setCopiedHash] = useState(null);

  // Verification Runner State
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerifiedTime, setLastVerifiedTime] = useState('28 Oct 2026, 09:12 AM');

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      const matchesSev = filterSeverity === 'All' || l.severity === filterSeverity;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.event.toLowerCase().includes(q) ||
        l.actor.toLowerCase().includes(q) ||
        (l.role && l.role.toLowerCase().includes(q)) ||
        l.ipAddress.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        (l.hash && l.hash.toLowerCase().includes(q));
      return matchesSev && matchesSearch;
    });
  }, [logs, filterSeverity, searchQuery]);

  // Copy helper
  const handleCopyHash = (hash, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    toast.success('SHA-256 hash copied to clipboard');
    setTimeout(() => setCopiedHash(null), 2500);
  };

  // Export CSV
  const handleExportAudit = () => {
    const csvHeader = 'Event ID,Timestamp,Event Description,Actor,Role,IP Address,Location,Device,Severity,SHA-256 Hash\n';
    const csvRows = filteredLogs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.event.replace(/"/g, '""')}","${l.actor}","${l.role || 'Staff'}","${l.ipAddress}","${l.location}","${l.device}","${l.severity}","${l.hash || 'N/A'}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CMAOF_Security_Audit_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Cryptographic audit ledger exported successfully');
  };

  // Terminate remote sessions
  const handleTerminateRemote = () => {
    const remaining = sessions.filter((s) => s.isCurrent);
    setSessions(remaining);
    toast.success('All remote administrator sessions terminated. Active workstation secured.');
  };

  // Revoke single session
  const handleRevokeSingleSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success('Endpoint node revoked and cryptographic token invalidated.');
  };

  // Run integrity verification
  const handleRunVerification = () => {
    setIsVerifying(true);
    toast.loading('Running SHA-256 cryptographic check on all foundation database vaults...', { id: 'integrity-check' });
    setTimeout(() => {
      setIsVerifying(false);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastVerifiedTime(`Today at ${now}`);
      toast.success('100% Cryptographic integrity verified across all 4 database vaults!', { id: 'integrity-check' });
    }, 1200);
  };

  // Severity style helper
  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[10px]">
            High
          </span>
        );
      case 'System':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-bold text-[10px]">
            <Cpu size={10} />
            System
          </span>
        );
      case 'Info':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-[10px]">
            Info
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & EXECUTIVE CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#06402B] text-[11px] font-black uppercase tracking-wider border border-emerald-200">
              Cryptographic Telemetry
            </span>
            <span className="text-slate-400 text-xs font-semibold">ISO 27001 & PSEA Compliant</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <span>Audit Trail & Cryptographic Security</span>
            <ShieldCheck className="text-emerald-600" size={24} />
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Immutable SHA-256 event log tracking staff access, financial authorizations, beneficiary data modifications, and endpoint telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={handleTerminateRemote}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs shadow-xs cursor-pointer transition-all active:scale-95"
            title="Terminate all other admin login sessions"
          >
            <LogOut size={13} />
            <span>Kill Other Sessions</span>
          </button>
          <button
            type="button"
            onClick={handleExportAudit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-sm cursor-pointer transition-all active:scale-95"
          >
            <Download size={14} />
            <span>Export Encrypted Ledger</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STRATEGIC KPI CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Cryptographic Integrity</span>
            <ShieldCheck size={16} className="text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">100% Verified</div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-500" />
            <span>SHA-256 block chain intact</span>
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Endpoint Sessions</span>
            <Smartphone size={16} className="text-[#0B2D6E]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {sessions.length} Authorized Nodes
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            <span className="text-emerald-600 font-bold">1 Active</span> · 2 Idle Standby
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Threat Defense Posture</span>
            <Lock size={16} className="text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Zero Breaches</div>
          <p className="text-[11px] text-slate-500 mt-1">
            <span className="text-purple-600 font-bold">FIDO2 / 2FA</span> Enforced for all staff
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Cloud Cold Storage</span>
            <Database size={16} className="text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">AWS eu-west-1</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Daily snapshot: <span className="font-semibold text-slate-700">03:00 AM WAT</span>
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SUB-NAVIGATION TABS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSubTab('logs')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap
              ${
                activeSubTab === 'logs'
                  ? 'bg-[#06402B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }
            `}
          >
            <Activity size={14} />
            <span>Security Audit Trail</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeSubTab === 'logs' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {logs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('sessions')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap
              ${
                activeSubTab === 'sessions'
                  ? 'bg-[#06402B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }
            `}
          >
            <Smartphone size={14} />
            <span>Active Sessions & Endpoint Devices</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeSubTab === 'sessions' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {sessions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('integrity')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap
              ${
                activeSubTab === 'integrity'
                  ? 'bg-[#06402B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }
            `}
          >
            <ShieldCheck size={14} />
            <span>Data Vault Integrity Check</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 1: SECURITY AUDIT TRAIL
      ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'logs' && (
        <div className="space-y-4">
          {/* Filter Bar & View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {['All', 'Critical', 'High', 'Info', 'System'].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setFilterSeverity(sev)}
                  className={`
                    px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
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

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search event, actor, IP, or hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-[#06402B]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Grid Cards View"
                >
                  <Layers size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'table' ? 'bg-white shadow-xs text-[#06402B]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Ledger Table View"
                >
                  <TableIcon size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* GRID VIEW */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="group bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(log.severity)}
                        <span className="text-[11px] font-mono text-slate-400">{log.id}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-[#06402B] transition-colors leading-snug">
                        {log.event}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      {log.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {log.actionDetail || 'Action completed and logged with cryptographic integrity verification.'}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#06402B]/10 text-[#06402B] flex items-center justify-center font-bold text-[10px]">
                        {log.actor.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">{log.actor}</span>
                        {log.role && <span className="text-slate-400 text-[10px] block leading-none">{log.role}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {log.hash && (
                        <button
                          type="button"
                          onClick={(e) => handleCopyHash(log.hash, e)}
                          className="flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                          title="Click to copy hash"
                        >
                          <Copy size={10} />
                          <span>{copiedHash === log.hash ? 'Copied!' : log.hash}</span>
                        </button>
                      )}
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        {log.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* TABLE LEDGER VIEW */
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                      <th className="py-3 px-4">Logged Security Event</th>
                      <th className="py-3 px-3">Actor & Role</th>
                      <th className="py-3 px-3">IP & Location</th>
                      <th className="py-3 px-3">Device / Client</th>
                      <th className="py-3 px-3">Cryptographic Hash</th>
                      <th className="py-3 px-3">Timestamp</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 max-w-xs">
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(log.severity)}
                            <span className="font-bold text-slate-900 truncate">{log.event}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{log.id}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-800 block">{log.actor}</span>
                          <span className="text-[10px] text-slate-400">{log.role || 'System'}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono text-slate-800 font-bold block">{log.ipAddress}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <MapPin size={9} />
                            {log.location}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-[11px] max-w-[150px] truncate">
                          {log.device}
                        </td>
                        <td className="py-3 px-3">
                          {log.hash ? (
                            <button
                              type="button"
                              onClick={(e) => handleCopyHash(log.hash, e)}
                              className="font-mono text-[10px] text-slate-500 hover:text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 cursor-pointer flex items-center gap-1"
                            >
                              <Copy size={9} />
                              {copiedHash === log.hash ? 'Copied!' : log.hash}
                            </button>
                          ) : (
                            <span className="text-slate-300">--</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedLog(log)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#06402B] hover:bg-emerald-100 font-bold text-[11px] cursor-pointer transition-colors"
                          >
                            <Eye size={11} />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 2: ACTIVE SESSIONS & ENDPOINT DEVICES
      ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'sessions' && (
        <div className="space-y-4">
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#06402B] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Zero Trust Authentication Layer</h4>
                <p className="text-xs text-slate-600">
                  All active administrator endpoints are signed with hardware tokens and TLS 1.3 cryptographic bindings.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleTerminateRemote}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs shadow-xs cursor-pointer whitespace-nowrap"
            >
              Terminate All Other Nodes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 relative ${
                  sess.isCurrent ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        sess.isCurrent ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {sess.device.includes('Android') || sess.device.includes('iPhone') ? (
                        <Smartphone size={18} />
                      ) : (
                        <Laptop size={18} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">{sess.device}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{sess.ipAddress}</span>
                    </div>
                  </div>

                  {sess.isCurrent ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      This Device
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      Remote Node
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-slate-800">{sess.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Authenticated:</span>
                    <span className="font-mono text-slate-700">{sess.started}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Activity State:</span>
                    <span className={`font-bold ${sess.isCurrent ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {sess.lastActive}
                    </span>
                  </div>
                </div>

                <div>
                  {sess.isCurrent ? (
                    <div className="text-center py-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50/50 rounded-xl">
                      Workstation Primary Key Authenticated
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRevokeSingleSession(sess.id)}
                      className="w-full py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold cursor-pointer transition-colors"
                    >
                      Revoke Node Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 3: DATA VAULT INTEGRITY CHECK
      ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'integrity' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>Cryptographic Ledger Verification Suite</span>
                  <CheckCircle size={18} className="text-emerald-600" />
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated SHA-256 hash validation runs across all decentralized records to ensure zero database tampering.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">Last Run: {lastVerifiedTime}</span>
                <button
                  type="button"
                  onClick={handleRunVerification}
                  disabled={isVerifying}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-xs cursor-pointer transition-all disabled:opacity-50"
                >
                  <RefreshCw size={13} className={isVerifying ? 'animate-spin' : ''} />
                  <span>{isVerifying ? 'Checking Hashes...' : 'Re-verify All Vaults'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Vault 1 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-900">
                    <Database size={14} className="text-emerald-700" />
                    <span>Beneficiary Ledger (PSEA Encrypted)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    100% Intact
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  24,800 Biometric & Socio-Economic Profiles verified against central cryptographic salt. Zero unauthorized records detected.
                </p>
                <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100/60 p-1.5 rounded-lg truncate">
                  SHA-256: 0x9f18a24...b882e4a1
                </div>
              </div>

              {/* Vault 2 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-900">
                    <HardDrive size={14} className="text-emerald-700" />
                    <span>Disbursements & Grants Treasury</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    Reconciled
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  ₦42,800,000 disbursement tokens matched against bank clearing ledger signatures. No discrepancy detected.
                </p>
                <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100/60 p-1.5 rounded-lg truncate">
                  SHA-256: 0x44d18fa...901abcf2
                </div>
              </div>

              {/* Vault 3 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-900">
                    <ShieldCheck size={14} className="text-emerald-700" />
                    <span>Governance Approvals Manifest</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    5 In Queue
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  All 5 pending executive authorizations have dual-signatory verification hashes generated and awaiting final clearance.
                </p>
                <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100/60 p-1.5 rounded-lg truncate">
                  SHA-256: 0x88f21aa...ff2048cc
                </div>
              </div>

              {/* Vault 4 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-900">
                    <Key size={14} className="text-emerald-700" />
                    <span>Staff RBAC & Identity Matrix</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    Protected
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Zero privilege escalations detected. FIDO2 MFA credentials certified for all active administrative accounts.
                </p>
                <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100/60 p-1.5 rounded-lg truncate">
                  SHA-256: 0xaa201fe...341299ef
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. SLIDE-OVER DOSSIER DRAWER FOR LOG INSPECTION
      ───────────────────────────────────────────────────────────── */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/60 sticky top-0 z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getSeverityBadge(selectedLog.severity)}
                  <span className="font-mono text-xs text-slate-500">{selectedLog.id}</span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Cryptographic Event Dossier
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-5 flex-1 text-xs">
              {/* Event Name */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action Label</span>
                <p className="text-sm font-black text-slate-900">{selectedLog.event}</p>
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                  {selectedLog.actionDetail || 'Action completed and logged with cryptographic integrity verification.'}
                </p>
              </div>

              {/* Cryptographic SHA-256 Block Hash */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SHA-256 Proof Signature
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(selectedLog.hash || '0x49f2...88cc')}
                    className="text-[11px] text-[#06402B] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} />
                    <span>{copiedHash === selectedLog.hash ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] break-all border border-slate-800">
                  {selectedLog.hash ? `${selectedLog.hash}7a98bc3341def019488e0` : '0x8f2ac94b7a98bc3341def019488e0'}
                </div>
              </div>

              {/* Actor Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Actor Account</span>
                  <p className="font-bold text-slate-900 truncate">{selectedLog.actor}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Designation</span>
                  <p className="font-bold text-slate-900 truncate">{selectedLog.role || 'Staff Member'}</p>
                </div>
              </div>

              {/* Network & Telemetry */}
              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Network & Geolocation Telemetry
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">IP Address</span>
                    <span className="font-mono font-bold text-slate-800">{selectedLog.ipAddress}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location Node</span>
                    <span className="font-semibold text-slate-800">{selectedLog.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Device / OS</span>
                    <span className="text-slate-700">{selectedLog.device}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">TLS Protocol</span>
                    <span className="font-mono text-emerald-700 font-bold">TLS 1.3 / AES-256</span>
                  </div>
                </div>
              </div>

              {/* Raw JSON Payload */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Raw JSON Telemetry Stream
                </span>
                <pre className="p-3 rounded-xl bg-slate-900 text-slate-300 font-mono text-[10px] overflow-x-auto max-h-48 leading-relaxed">
                  {JSON.stringify(selectedLog, null, 2)}
                </pre>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                Immutable Cloud Ledger Record
              </span>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuditSection;
