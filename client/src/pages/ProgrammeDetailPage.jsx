import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Edit,
  Copy,
  Archive,
  BookOpen,
  Users,
  Building2,
  School,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Shield,
  FileText,
  X,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { getProgrammeByIdOrSlug } from '../data/programmesData';

const SUB_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'activities', label: 'Activities' },
  { id: 'beneficiaries', label: 'Beneficiaries' },
  { id: 'locations', label: 'Locations' },
  { id: 'partners', label: 'Partners' },
  { id: 'kpis', label: 'KPIs & Outcomes' },
  { id: 'media', label: 'Media' },
  { id: 'documents', label: 'Documents' },
];

const ProgrammeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const programme = getProgrammeByIdOrSlug(id || 'school-support-programme');

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  // Body scroll lock and Escape key listener
  useEffect(() => {
    const isAnyModalOpen = editModalOpen || duplicateModalOpen || archiveModalOpen;
    if (isAnyModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setEditModalOpen(false);
          setDuplicateModalOpen(false);
          setArchiveModalOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [editModalOpen, duplicateModalOpen, archiveModalOpen]);

  const handleTabSwitch = (tabId) => {
    setMobileSidebarOpen(false);
    if (tabId === 'beneficiaries') navigate('/admin/beneficiaries');
    else if (tabId === 'dashboard') navigate('/admin/dashboard');
    else if (tabId === 'programmes') navigate('/admin/programmes');
    else navigate(`/admin/${tabId}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('cmaof_admin_token');
    toast.success('Signed out of admin session');
    navigate('/admin');
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="programmes"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={handleSignOut}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">
          {/* Top Breadcrumb: 🏠 Programmes > School Support Programme */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <Link
              to="/admin/programmes"
              className="flex items-center gap-1.5 hover:text-[#06402B] text-slate-500 transition-colors"
            >
              <Home size={14} className="text-slate-400" />
              <span>Programmes</span>
            </Link>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">{programme.name}</span>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              3. HERO PROGRAMME HEADER CARD (Matches Screenshot)
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Thumbnail & Title & Active Badge */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <img
                src={programme.thumbnail}
                alt={programme.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
                    {programme.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{programme.status}</span>
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400">
                  Pillar: <strong className="text-slate-700">{programme.pillar}</strong> • ID: PRG-2024-001
                </p>
              </div>
            </div>

            {/* Right: Action Buttons (Edit, Duplicate, Archive) */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => setEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Edit size={14} className="text-slate-500" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setDuplicateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Copy size={14} className="text-slate-500" />
                <span>Duplicate</span>
              </button>

              <button
                type="button"
                onClick={() => setArchiveModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Archive size={14} className="text-slate-500" />
                <span>Archive</span>
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. SUB-TABS NAVIGATION BAR (Matches Screenshot)
          ───────────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUB_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer
                    ${
                      isActive
                        ? 'bg-[#06402B] text-white shadow-xs shadow-emerald-950/20'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 hover:text-slate-900'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              5. TAB CONTENT: OVERVIEW (3-COLUMN SECTION FROM SCREENSHOT)
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 animate-[fadeIn_0.2s_ease] items-stretch">
              {/* Column 1 (Left 3.5 Cols): Big Featured Photo Card */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs flex flex-col">
                <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden shadow-xs">
                  <img
                    src={programme.featuredImage}
                    alt="School Support Classroom"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Active Classroom Session
                    </span>
                    <p className="text-sm font-bold mt-0.5">
                      Ajegunle Primary School, Lagos State
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2 (Middle 5.5 Cols): Programme Details Card */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight mb-4">
                    Programme Details
                  </h2>

                  <div className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Programme Name</span>
                      <span className="font-bold text-slate-800 text-right">{programme.name}</span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Pillar</span>
                      <span className="font-bold text-[#06402B] text-right flex items-center gap-1.5">
                        <BookOpen size={13} className="text-emerald-700" />
                        {programme.pillar}
                      </span>
                    </div>

                    <div className="py-2.5 flex flex-col gap-1">
                      <span className="text-slate-400 font-medium">Objective</span>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {programme.objective}
                      </p>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Target Beneficiaries</span>
                      <span className="font-semibold text-slate-700 text-right">
                        {programme.targetBeneficiaries}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Locations</span>
                      <span className="font-semibold text-slate-700 text-right">
                        {programme.locations}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Start Date</span>
                      <span className="font-semibold text-slate-700 text-right">
                        {programme.startDate}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">End Date</span>
                      <span className="font-semibold text-slate-700 text-right">
                        {programme.endDate}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Programme Manager</span>
                      <span className="font-bold text-[#0B2D6E] text-right">
                        {programme.programmeManager}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="text-slate-400 font-medium shrink-0">Budget (₦)</span>
                      <span className="font-black text-emerald-800 text-right text-sm">
                        {programme.budgetFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Authorized by Board of Trustees</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active Grant Cycle
                  </span>
                </div>
              </div>

              {/* Column 3 (Right 3 Cols): Quick Stats 4-Stack Card */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-base font-black text-[#0B2D6E] tracking-tight mb-4">
                    Quick Stats
                  </h2>

                  <div className="space-y-3.5">
                    {/* Stat 1: Beneficiaries */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                          Beneficiaries
                        </p>
                        <p className="text-xl font-black text-[#0B2D6E] leading-tight">
                          {programme.stats.beneficiaries}
                        </p>
                      </div>
                    </div>

                    {/* Stat 2: Communities */}
                    <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                          Communities
                        </p>
                        <p className="text-xl font-black text-[#0B2D6E] leading-tight">
                          {programme.stats.communities}
                        </p>
                      </div>
                    </div>

                    {/* Stat 3: Schools */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <School size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                          Schools
                        </p>
                        <p className="text-xl font-black text-[#0B2D6E] leading-tight">
                          {programme.stats.schools}
                        </p>
                      </div>
                    </div>

                    {/* Stat 4: Completion Rate */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#0B2D6E] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                          Completion Rate
                        </p>
                        <p className="text-xl font-black text-[#0B2D6E] leading-tight">
                          {programme.stats.completionRate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                  Live synchronized metrics
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              OTHER SUB-TABS VIEWS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'objectives' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
              <h2 className="text-lg font-black text-[#0B2D6E]">Strategic Objectives</h2>
              <div className="space-y-3 pt-1 text-xs sm:text-sm">
                {programme.objectivesList?.map((obj, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                    <p className="text-slate-800 font-medium">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-[#0B2D6E]">Core Programme Activities</h2>
                <button
                  type="button"
                  onClick={() => toast.success('Activity scheduler ready.')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#06402B] text-white text-xs font-bold"
                >
                  + Add Activity
                </button>
              </div>
              <div className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                {programme.activities?.map((act, i) => (
                  <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-800">{act.title}</p>
                      <p className="text-slate-500 text-xs">Frequency: {act.frequency} • Lead: {act.lead}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 self-start sm:self-auto">
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'beneficiaries' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E]">Programme Beneficiary Roster</h2>
                  <p className="text-xs text-slate-500">2,340 pupils registered under School Support Programme.</p>
                </div>
                <Link
                  to="/admin/beneficiaries"
                  className="px-4 py-2 rounded-xl bg-[#06402B] text-white text-xs font-bold"
                >
                  Open Full Directory →
                </Link>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/story_adeyemi.jpg"
                    alt="Emeka Okafor"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <Link
                      to="/admin/beneficiaries/B-2026-002"
                      className="font-bold text-xs sm:text-sm text-[#0B2D6E] hover:underline"
                    >
                      Emeka Okafor (B-2026-002)
                    </Link>
                    <p className="text-[11px] text-slate-500">Ajegunle Primary School • Primary 4</p>
                  </div>
                </div>
                <Link
                  to="/admin/beneficiaries/B-2026-002"
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  View Dossier →
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
              <h2 className="text-lg font-black text-[#0B2D6E]">Institutional Delivery Partners</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {programme.partners?.map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <p className="font-bold text-xs text-slate-800">{p.name}</p>
                    <p className="text-[11px] text-slate-500">{p.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'objectives' && activeTab !== 'activities' && activeTab !== 'beneficiaries' && activeTab !== 'partners' && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center space-y-3">
              <h3 className="text-base font-bold text-[#0B2D6E] capitalize">{activeTab} Section</h3>
              <p className="text-xs text-slate-500">Live synchronized with CMAOF monitoring data.</p>
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 rounded-xl bg-[#06402B] text-white text-xs font-bold"
              >
                Return to Overview
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODALS: EDIT, DUPLICATE, ARCHIVE - PORTALS
      ───────────────────────────────────────────────────────────── */}
      {editModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setEditModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0B2D6E]">Edit Programme</h3>
              <button type="button" onClick={() => setEditModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 pt-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Programme Name</label>
                <input type="text" defaultValue={programme.name} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Programme Manager</label>
                <input type="text" defaultValue={programme.programmeManager} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Allocated Budget</label>
                <input type="text" defaultValue={programme.budgetFormatted} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success('Programme parameters updated!');
                    setEditModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white font-bold cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {duplicateModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setDuplicateModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-black text-[#0B2D6E]">Duplicate Programme</h3>
            <p className="text-xs text-slate-500">
              Create a clone of "{programme.name}" with initial draft status?
            </p>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDuplicateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success('Cloned: School Support Programme (Copy 1) created.');
                  setDuplicateModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Confirm Clone
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {archiveModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setArchiveModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-black text-rose-600">Archive Programme</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to archive "{programme.name}"? Active beneficiaries will remain preserved in historical records.
            </p>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setArchiveModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success('Programme moved to archive storage.');
                  setArchiveModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Archive
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProgrammeDetailPage;
