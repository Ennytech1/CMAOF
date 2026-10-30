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
  Search,
  Filter,
  Download,
  Eye,
  Award,
  Check,
  Image as ImageIcon,
  Folder,
  Phone,
  Mail,
  Sparkles,
  ArrowUpRight,
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
  const initialProg = getProgrammeByIdOrSlug(id || 'school-support-programme');

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Editable programme state
  const [programme, setProgramme] = useState(initialProg);

  // Synchronize when route id changes
  useEffect(() => {
    const loaded = getProgrammeByIdOrSlug(id || 'school-support-programme');
    setProgramme(loaded);
  }, [id]);

  // Tab-specific filters & states
  const [beneficiarySearch, setBeneficiarySearch] = useState('');
  const [activityFilter, setActivityFilter] = useState('All');
  const [mediaTagFilter, setMediaTagFilter] = useState('All');
  const [docCategoryFilter, setDocCategoryFilter] = useState('All');

  // Preview modals
  const [previewMedia, setPreviewMedia] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Creation / Add Modals
  const [addObjectiveModal, setAddObjectiveModal] = useState(false);
  const [newObjectiveText, setNewObjectiveText] = useState('');

  const [addActivityModal, setAddActivityModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    frequency: 'Termly',
    lead: 'Education Operations Unit',
    status: 'Scheduled',
    targetDate: 'Nov 2026',
    budgetShare: '15%',
  });

  const [addPartnerModal, setAddPartnerModal] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    role: '',
    tier: 'Strategic Partner',
    contactPerson: '',
    mouStatus: 'Signed & Valid',
  });

  const [addKpiModal, setAddKpiModal] = useState(false);
  const [newKpi, setNewKpi] = useState({
    indicator: '',
    baseline: '0',
    target: '100',
    achieved: '25',
    unit: 'Percentage',
    status: 'On Track',
    trend: '+25% vs Baseline',
    verification: 'M&E Field Audited',
  });

  // Action Modals: Edit, Duplicate, Archive
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: programme.name,
    pillar: programme.pillar,
    objective: programme.objective,
    programmeManager: programme.programmeManager,
    budgetFormatted: programme.budgetFormatted,
    locations: programme.locations,
  });

  useEffect(() => {
    setEditFormData({
      name: programme.name,
      pillar: programme.pillar,
      objective: programme.objective,
      programmeManager: programme.programmeManager,
      budgetFormatted: programme.budgetFormatted,
      locations: programme.locations,
    });
  }, [programme]);

  // Body scroll lock
  useEffect(() => {
    const isAnyModalOpen =
      editModalOpen ||
      duplicateModalOpen ||
      archiveModalOpen ||
      previewMedia ||
      previewDoc ||
      addObjectiveModal ||
      addActivityModal ||
      addPartnerModal ||
      addKpiModal;

    if (isAnyModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setEditModalOpen(false);
          setDuplicateModalOpen(false);
          setArchiveModalOpen(false);
          setPreviewMedia(null);
          setPreviewDoc(null);
          setAddObjectiveModal(false);
          setAddActivityModal(false);
          setAddPartnerModal(false);
          setAddKpiModal(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [
    editModalOpen,
    duplicateModalOpen,
    archiveModalOpen,
    previewMedia,
    previewDoc,
    addObjectiveModal,
    addActivityModal,
    addPartnerModal,
    addKpiModal,
  ]);

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

  // Add Objective Handler
  const handleSaveObjective = (e) => {
    e.preventDefault();
    if (!newObjectiveText.trim()) return;
    const updated = [...(programme.objectivesList || []), newObjectiveText.trim()];
    setProgramme((prev) => ({ ...prev, objectivesList: updated }));
    setNewObjectiveText('');
    setAddObjectiveModal(false);
    toast.success('Strategic objective added successfully!');
  };

  // Add Activity Handler
  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title.trim()) return;
    const updated = [...(programme.activities || []), { ...newActivity }];
    setProgramme((prev) => ({ ...prev, activities: updated }));
    setNewActivity({
      title: '',
      frequency: 'Termly',
      lead: 'Education Operations Unit',
      status: 'Scheduled',
      targetDate: 'Nov 2026',
      budgetShare: '15%',
    });
    setAddActivityModal(false);
    toast.success('Programme activity added to schedule!');
  };

  // Add Partner Handler
  const handleSavePartner = (e) => {
    e.preventDefault();
    if (!newPartner.name.trim()) return;
    const updated = [...(programme.partners || []), { ...newPartner }];
    setProgramme((prev) => ({ ...prev, partners: updated }));
    setNewPartner({
      name: '',
      role: '',
      tier: 'Strategic Partner',
      contactPerson: '',
      mouStatus: 'Signed & Valid',
    });
    setAddPartnerModal(false);
    toast.success('Strategic partner attached to programme!');
  };

  // Add KPI Handler
  const handleSaveKpi = (e) => {
    e.preventDefault();
    if (!newKpi.indicator.trim()) return;
    const updated = [...(programme.kpis || []), { ...newKpi }];
    setProgramme((prev) => ({ ...prev, kpis: updated }));
    setNewKpi({
      indicator: '',
      baseline: '0',
      target: '100',
      achieved: '25',
      unit: 'Percentage',
      status: 'On Track',
      trend: '+25% vs Baseline',
      verification: 'M&E Field Audited',
    });
    setAddKpiModal(false);
    toast.success('Outcome KPI registered successfully!');
  };

  // Trigger Fake Download
  const handleDownloadDoc = (doc) => {
    const element = document.createElement('a');
    const fileContent = `CMAOF OFFICIAL GOVERNANCE DOCUMENT\n\nTitle: ${doc.title}\nCategory: ${doc.category}\nVersion: ${doc.version}\nStatus: ${doc.status}\nDate: ${doc.date}\nProgramme: ${programme.name}\n\nThis file is certified authentic and registered within the CMAOF Foundation Data Repository.`;
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${doc.type.toLowerCase() === 'xlsx' ? 'csv' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Downloaded: ${doc.title}`);
  };

  // Filtered lists
  const filteredBeneficiaries = (programme.beneficiariesList || []).filter((b) => {
    if (!beneficiarySearch.trim()) return true;
    const q = beneficiarySearch.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.code?.toLowerCase().includes(q) ||
      b.school?.toLowerCase().includes(q) ||
      b.location?.toLowerCase().includes(q)
    );
  });

  const filteredActivities = (programme.activities || []).filter((a) => {
    if (activityFilter === 'All') return true;
    return a.status?.toLowerCase().includes(activityFilter.toLowerCase());
  });

  const mediaTags = ['All', ...new Set((programme.mediaList || []).map((m) => m.tag))];
  const filteredMedia = (programme.mediaList || []).filter((m) => {
    if (mediaTagFilter === 'All') return true;
    return m.tag === mediaTagFilter;
  });

  const docCategories = ['All', ...new Set((programme.documentsList || []).map((d) => d.category))];
  const filteredDocs = (programme.documentsList || []).filter((d) => {
    if (docCategoryFilter === 'All') return true;
    return d.category === docCategoryFilter;
  });

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
          {/* Top Breadcrumb: 🏠 Programmes > Programme Name */}
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
                  Pillar: <strong className="text-slate-700">{programme.pillar}</strong> • ID:{' '}
                  {programme.slug?.toUpperCase() || 'PRG-2024-001'}
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
              let badgeCount = null;
              if (tab.id === 'objectives') badgeCount = programme.objectivesList?.length;
              if (tab.id === 'activities') badgeCount = programme.activities?.length;
              if (tab.id === 'beneficiaries') badgeCount = programme.beneficiariesList?.length;
              if (tab.id === 'locations') badgeCount = programme.locationsList?.length;
              if (tab.id === 'partners') badgeCount = programme.partners?.length;
              if (tab.id === 'kpis') badgeCount = programme.kpis?.length;
              if (tab.id === 'media') badgeCount = programme.mediaList?.length;
              if (tab.id === 'documents') badgeCount = programme.documentsList?.length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5
                    ${
                      isActive
                        ? 'bg-[#06402B] text-white shadow-xs shadow-emerald-950/20'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 hover:text-slate-900'
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  {badgeCount !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isActive
                          ? 'bg-emerald-800 text-emerald-100'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              5. TAB CONTENT: OVERVIEW (3-COLUMN SECTION)
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                {/* Column 1 (Left 4 Cols): Big Featured Photo Card */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs flex flex-col">
                  <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden shadow-xs">
                    <img
                      src={programme.featuredImage}
                      alt={programme.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                        Active Field Deployment
                      </span>
                      <p className="text-sm font-bold mt-0.5">
                        {programme.locations}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 2 (Middle 5 Cols): Programme Details Card */}
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
                            {programme.stats?.beneficiaries || '2,340'}
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
                            {programme.stats?.communities || programme.locationsCount || '24'}
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
                            Schools / Centers
                          </p>
                          <p className="text-xl font-black text-[#0B2D6E] leading-tight">
                            {programme.stats?.schools || programme.schoolsCount || '56'}
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
                            {programme.stats?.completionRate || '86%'}
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

              {/* Quick Jump Previews */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Objectives Quick Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#06402B] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Strategic Objectives
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('objectives')}
                      className="text-xs font-bold text-slate-500 hover:text-[#06402B] flex items-center gap-1 cursor-pointer"
                    >
                      View all ({programme.objectivesList?.length || 0}) <ChevronRight size={12} />
                    </button>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {programme.objectivesList?.slice(0, 2).map((obj, i) => (
                      <li key={i} className="line-clamp-2 pl-3 border-l-2 border-emerald-500">
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Upcoming Activities Quick Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={14} /> Scheduled Activities
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('activities')}
                      className="text-xs font-bold text-slate-500 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                    >
                      View all ({programme.activities?.length || 0}) <ChevronRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    {programme.activities?.slice(0, 2).map((act, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-800 truncate">{act.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold shrink-0">
                          {act.frequency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Partners Quick Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Shield size={14} /> Strategic Partners
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('partners')}
                      className="text-xs font-bold text-slate-500 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                    >
                      View all ({programme.partners?.length || 0}) <ChevronRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    {programme.partners?.slice(0, 2).map((p, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-800 truncate">{p.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold shrink-0">
                          {p.tier?.split(' ')[0] || 'Partner'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              6. TAB CONTENT: OBJECTIVES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'objectives' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Strategic Development Objectives
                  </h2>
                  <p className="text-xs text-slate-500">
                    Core institutional milestones guiding resource allocation and field delivery.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddObjectiveModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={14} />
                  <span>Add Objective</span>
                </button>
              </div>

              {/* Objectives List */}
              <div className="space-y-3.5">
                {programme.objectivesList?.map((obj, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        {obj}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Active Tracking
                        </span>
                        <span>•</span>
                        <span>SDG Target Aligned</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alignment Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#06402B] text-white flex items-center justify-center shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#06402B]">
                      CMAOF Institutional Thematic Focus: {programme.pillar}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      All strategic objectives are audited bi-annually by the Independent M&E Advisory Committee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              7. TAB CONTENT: ACTIVITIES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'activities' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Core Operational Activities & Schedule
                  </h2>
                  <p className="text-xs text-slate-500">
                    Structured field interventions, frequency cadence, lead accountability units, and status.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {/* Filter Pills */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                    {['All', 'Ongoing', 'Active', 'Scheduled', 'Completed'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setActivityFilter(st)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          activityFilter === st ? 'bg-white text-[#0B2D6E] font-bold shadow-xs' : 'hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setAddActivityModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Activity</span>
                  </button>
                </div>
              </div>

              {/* Activities Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3">Activity Description</th>
                      <th className="pb-3">Frequency</th>
                      <th className="pb-3">Lead Unit / Lead Officer</th>
                      <th className="pb-3">Scheduled Target</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredActivities.map((act, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 pr-4 font-bold text-slate-800 max-w-xs sm:max-w-md">
                          {act.title}
                          {act.budgetShare && (
                            <span className="block text-[11px] font-medium text-slate-400 mt-0.5">
                              Budget Allocation Share: {act.budgetShare}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                            {act.frequency}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-semibold">{act.lead}</td>
                        <td className="py-3.5 pr-4 text-slate-500 font-medium">{act.targetDate || 'Rolling'}</td>
                        <td className="py-3.5 text-right">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                              act.status?.includes('Completed')
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : act.status?.includes('Ongoing') || act.status?.includes('Active')
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {act.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              8. TAB CONTENT: BENEFICIARIES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'beneficiaries' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Programme Beneficiary Roster
                  </h2>
                  <p className="text-xs text-slate-500">
                    {programme.stats?.beneficiaries || '2,340'} verified individuals registered under {programme.name}.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  {/* Beneficiary Search Bar */}
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={beneficiarySearch}
                      onChange={(e) => setBeneficiarySearch(e.target.value)}
                      placeholder="Search pupil name, code..."
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-48 sm:w-60 focus:outline-none focus:border-[#06402B]"
                    />
                  </div>
                  <Link
                    to="/admin/beneficiaries"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors shrink-0"
                  >
                    <Plus size={14} />
                    <span>Intake New</span>
                  </Link>
                </div>
              </div>

              {/* Beneficiary Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3">Beneficiary</th>
                      <th className="pb-3">Demographics</th>
                      <th className="pb-3">Enrolled Facility / Location</th>
                      <th className="pb-3">Support Package</th>
                      <th className="pb-3">Attendance / Velocity</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Dossier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBeneficiaries.map((b, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={b.photo || '/images/story_amina.jpg'}
                              alt={b.name}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                            />
                            <div>
                              <Link
                                to={`/admin/beneficiaries/${b.code}`}
                                className="font-bold text-slate-900 hover:text-[#06402B] hover:underline"
                              >
                                {b.name}
                              </Link>
                              <span className="block text-[11px] font-mono text-slate-400">{b.code}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium">{b.ageGender}</td>
                        <td className="py-3.5 pr-4">
                          <p className="font-semibold text-slate-800">{b.school}</p>
                          <span className="text-[11px] text-slate-400">{b.location}</span>
                        </td>
                        <td className="py-3.5 pr-4 text-slate-700 font-medium">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                            {b.supportType}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-emerald-600 h-full rounded-full"
                                style={{ width: b.attendance || '90%' }}
                              />
                            </div>
                            <span className="font-bold text-slate-700 text-xs">{b.attendance}</span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <Link
                            to={`/admin/beneficiaries/${b.code}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                          >
                            <span>View</span>
                            <ArrowUpRight size={13} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              9. TAB CONTENT: LOCATIONS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'locations' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Operational Field Hubs & Geographic Centers
                  </h2>
                  <p className="text-xs text-slate-500">
                    Active footprint across {programme.locationsCount || '24'} communities and{' '}
                    {programme.schoolsCount || '56'} facilities in Nigeria.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success('New operational field hub mapping ready.')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Operating Center</span>
                </button>
              </div>

              {/* Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {programme.locationsList?.map((loc, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3.5 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                          {loc.state}
                        </span>
                        <h3 className="text-sm font-black text-[#0B2D6E] mt-1.5">{loc.hubName}</h3>
                        <p className="text-xs text-slate-500 font-medium">LGA: {loc.lga}</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-200/60 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Schools / Sites</span>
                        <span className="font-black text-slate-800 text-sm">{loc.schoolsCount} Facilities</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrolled Reach</span>
                        <span className="font-black text-emerald-800 text-sm">{loc.pupilsCount} Individuals</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="text-slate-600">
                        <strong className="text-slate-800">Lead Coordinator:</strong> {loc.leadCoordinator}
                      </p>
                      <p className="text-slate-500 text-[11px] flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        <span>{loc.contact}</span>
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                        {loc.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => toast.success(`Viewing hub: ${loc.hubName}`)}
                        className="text-xs font-bold text-[#0B2D6E] hover:underline cursor-pointer"
                      >
                        Center Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              10. TAB CONTENT: PARTNERS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'partners' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Institutional Delivery & Funding Partners
                  </h2>
                  <p className="text-xs text-slate-500">
                    Government agencies, universities, philanthropic foundations, and corporate co-funders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddPartnerModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Partner Organization</span>
                </button>
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {programme.partners?.map((p, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-3 hover:shadow-xs transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
                          {p.tier || 'Strategic Partner'}
                        </span>
                        <Shield size={14} className="text-purple-600" />
                      </div>
                      <h3 className="text-sm font-black text-[#0B2D6E] leading-snug">{p.name}</h3>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{p.role}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 space-y-1.5 text-xs">
                      {p.contactPerson && (
                        <p className="text-slate-600 text-[11px]">
                          <strong className="text-slate-700">Liaison:</strong> {p.contactPerson}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> {p.mouStatus || 'Signed MoU'}
                        </span>
                        <button
                          type="button"
                          onClick={() => toast.success(`Viewing MoU with ${p.name}`)}
                          className="font-bold text-[#0B2D6E] hover:underline cursor-pointer"
                        >
                          Agreement File
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              11. TAB CONTENT: KPIS & OUTCOMES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'kpis' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Key Performance Indicators & Verified Outcomes
                  </h2>
                  <p className="text-xs text-slate-500">
                    Quantitative development indicators measured against baseline goals with third-party verification.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddKpiModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add KPI Indicator</span>
                </button>
              </div>

              {/* KPIs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3">Strategic Outcome Indicator</th>
                      <th className="pb-3">Baseline</th>
                      <th className="pb-3">Target Goal</th>
                      <th className="pb-3">Achieved Value</th>
                      <th className="pb-3">Progress (% Goal)</th>
                      <th className="pb-3">Verification Source</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {programme.kpis?.map((kpi, i) => {
                      const numTarget = parseFloat(String(kpi.target).replace(/[^0-9.]/g, '')) || 100;
                      const numAchieved = parseFloat(String(kpi.achieved).replace(/[^0-9.]/g, '')) || 85;
                      const percent = Math.min(100, Math.round((numAchieved / numTarget) * 100));

                      return (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 pr-4 font-bold text-slate-800 max-w-xs sm:max-w-sm">
                            {kpi.indicator}
                            <span className="block text-[11px] font-normal text-slate-400">
                              Unit: {kpi.unit} • Trend: {kpi.trend}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 font-mono text-slate-500">{kpi.baseline}</td>
                          <td className="py-3.5 pr-4 font-mono font-bold text-slate-800">{kpi.target}</td>
                          <td className="py-3.5 pr-4 font-mono font-black text-emerald-800 text-sm">
                            {kpi.achieved}
                          </td>
                          <td className="py-3.5 pr-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-emerald-600 h-full rounded-full"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className="font-extrabold text-xs text-slate-700">{percent}%</span>
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 text-slate-600 text-xs font-semibold">
                            {kpi.verification}
                          </td>
                          <td className="py-3.5 text-right">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                kpi.status === 'Achieved' || kpi.status === 'Target Exceeded'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-sky-100 text-sky-800'
                              }`}
                            >
                              {kpi.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              12. TAB CONTENT: MEDIA GALLERY
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Programme Field Media & Photo Gallery
                  </h2>
                  <p className="text-xs text-slate-500">
                    High-resolution photo and video assets documented from field interventions.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {/* Media Category Tags */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                    {mediaTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setMediaTagFilter(tag)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          mediaTagFilter === tag ? 'bg-white text-[#0B2D6E] font-bold shadow-xs' : 'hover:text-slate-900'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.success('Media upload storage ready.')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Upload Media</span>
                  </button>
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMedia.map((m, i) => (
                  <div
                    key={i}
                    onClick={() => setPreviewMedia(m)}
                    className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={m.url}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-900/70 text-white backdrop-blur-xs">
                          {m.tag}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Eye size={24} />
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                      <div>
                        <h4 className="text-xs sm:text-[13px] font-bold text-[#0B2D6E] leading-snug line-clamp-1">
                          {m.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{m.caption}</p>
                      </div>
                      <div className="pt-2 text-[10px] font-semibold text-slate-400">{m.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              13. TAB CONTENT: DOCUMENTS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0B2D6E] tracking-tight">
                    Governance Documents & Institutional Charters
                  </h2>
                  <p className="text-xs text-slate-500">
                    Approved BoT charters, signed inter-agency MoUs, child safeguarding policies, and expenditure audits.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {/* Category Pills */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                    {docCategories.slice(0, 4).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setDocCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          docCategoryFilter === cat ? 'bg-white text-[#0B2D6E] font-bold shadow-xs' : 'hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.success('Secure document repository ready for upload.')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Upload Document</span>
                  </button>
                </div>
              </div>

              {/* Documents Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3">Document Title</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Format & Size</th>
                      <th className="pb-3">Version / Date</th>
                      <th className="pb-3">Audit Clearance</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDocs.map((doc, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 ${
                                doc.type === 'PDF'
                                  ? 'bg-rose-100 text-rose-700'
                                  : doc.type === 'XLSX'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {doc.type}
                            </div>
                            <span className="font-bold text-slate-800 max-w-xs sm:max-w-md">{doc.title}</span>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-slate-500 font-mono text-[11px]">{doc.size}</td>
                        <td className="py-3.5 pr-4 text-slate-500">
                          <p className="font-semibold text-slate-700">{doc.version}</p>
                          <span className="text-[10px] text-slate-400">{doc.date}</span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
                              title="Preview"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadDoc(doc)}
                              className="p-1.5 rounded-lg bg-[#06402B] text-white hover:bg-[#042A1D] cursor-pointer"
                              title="Download"
                            >
                              <Download size={14} />
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
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: MEDIA PREVIEW (LIGHTBOX)
      ───────────────────────────────────────────────────────────── */}
      {previewMedia && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={previewMedia.url}
                alt={previewMedia.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setPreviewMedia(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {previewMedia.tag}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{previewMedia.date}</span>
              </div>
              <h3 className="text-base font-black text-[#0B2D6E]">{previewMedia.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{previewMedia.caption}</p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: DOCUMENT PREVIEW
      ───────────────────────────────────────────────────────────── */}
      {previewDoc && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  {previewDoc.type}
                </span>
                <div>
                  <h3 className="text-sm font-black text-[#0B2D6E] line-clamp-1">{previewDoc.title}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">{previewDoc.category}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 text-xs space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Document Version:</span>
                <span className="font-bold text-slate-700">{previewDoc.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">File Size:</span>
                <span className="font-mono text-slate-700">{previewDoc.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Clearance Status:</span>
                <span className="font-bold text-emerald-800">{previewDoc.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Uploaded Date:</span>
                <span className="text-slate-700">{previewDoc.date}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadDoc(previewDoc);
                  setPreviewDoc(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer text-xs"
              >
                <Download size={14} />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD OBJECTIVE
      ───────────────────────────────────────────────────────────── */}
      {addObjectiveModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setAddObjectiveModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0B2D6E]">Add Strategic Objective</h3>
              <button
                type="button"
                onClick={() => setAddObjectiveModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveObjective} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Strategic Objective Statement <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={newObjectiveText}
                  onChange={(e) => setNewObjectiveText(e.target.value)}
                  placeholder="e.g. Provide 2,000 learning kits to primary school pupils across rural communities..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddObjectiveModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white font-bold cursor-pointer"
                >
                  Save Objective
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD ACTIVITY
      ───────────────────────────────────────────────────────────── */}
      {addActivityModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setAddActivityModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0B2D6E]">Schedule Core Activity</h3>
              <button
                type="button"
                onClick={() => setAddActivityModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveActivity} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="e.g. Distribution of STEM Kits"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={newActivity.frequency}
                    onChange={(e) => setNewActivity({ ...newActivity, frequency: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Termly">Termly</option>
                    <option value="Bi-annual">Bi-annual</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={newActivity.status}
                    onChange={(e) => setNewActivity({ ...newActivity, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Lead Officer / Unit</label>
                <input
                  type="text"
                  value={newActivity.lead}
                  onChange={(e) => setNewActivity({ ...newActivity, lead: e.target.value })}
                  placeholder="e.g. Field Operations Unit"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddActivityModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white font-bold cursor-pointer"
                >
                  Schedule Activity
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD PARTNER
      ───────────────────────────────────────────────────────────── */}
      {addPartnerModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setAddPartnerModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0B2D6E]">Add Delivery Partner</h3>
              <button
                type="button"
                onClick={() => setAddPartnerModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSavePartner} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Organization Name *</label>
                <input
                  type="text"
                  required
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  placeholder="e.g. State Universal Basic Education Board"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Collaboration Role / Scope</label>
                <input
                  type="text"
                  value={newPartner.role}
                  onChange={(e) => setNewPartner({ ...newPartner, role: e.target.value })}
                  placeholder="e.g. Accreditation, Monitoring & Field Facility Access"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Partner Tier</label>
                  <select
                    value={newPartner.tier}
                    onChange={(e) => setNewPartner({ ...newPartner, tier: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Strategic Government Partner">Government Partner</option>
                    <option value="Corporate CSR Co-Funder">Corporate Co-Funder</option>
                    <option value="Academic Partner">Academic Partner</option>
                    <option value="Technical Partner">Technical Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Liaison Contact</label>
                  <input
                    type="text"
                    value={newPartner.contactPerson}
                    onChange={(e) => setNewPartner({ ...newPartner, contactPerson: e.target.value })}
                    placeholder="e.g. Director of Operations"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddPartnerModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white font-bold cursor-pointer"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ADD KPI
      ───────────────────────────────────────────────────────────── */}
      {addKpiModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setAddKpiModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0B2D6E]">Register Outcome KPI</h3>
              <button
                type="button"
                onClick={() => setAddKpiModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveKpi} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Indicator Title *</label>
                <input
                  type="text"
                  required
                  value={newKpi.indicator}
                  onChange={(e) => setNewKpi({ ...newKpi, indicator: e.target.value })}
                  placeholder="e.g. Primary School Net Retention Rate"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Baseline</label>
                  <input
                    type="text"
                    value={newKpi.baseline}
                    onChange={(e) => setNewKpi({ ...newKpi, baseline: e.target.value })}
                    placeholder="40%"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target</label>
                  <input
                    type="text"
                    value={newKpi.target}
                    onChange={(e) => setNewKpi({ ...newKpi, target: e.target.value })}
                    placeholder="85%"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Achieved</label>
                  <input
                    type="text"
                    value={newKpi.achieved}
                    onChange={(e) => setNewKpi({ ...newKpi, achieved: e.target.value })}
                    placeholder="78%"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={newKpi.unit}
                    onChange={(e) => setNewKpi({ ...newKpi, unit: e.target.value })}
                    placeholder="Percentage"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verification Body</label>
                  <input
                    type="text"
                    value={newKpi.verification}
                    onChange={(e) => setNewKpi({ ...newKpi, verification: e.target.value })}
                    placeholder="SUBEB Verified"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddKpiModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white font-bold cursor-pointer"
                >
                  Save KPI
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT PROGRAMME
      ───────────────────────────────────────────────────────────── */}
      {editModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0B2D6E]">Edit Programme Parameters</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 pt-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Programme Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pillar Alignment</label>
                  <select
                    value={editFormData.pillar}
                    onChange={(e) => setEditFormData({ ...editFormData, pillar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Education & Human Capital">Education & Human Capital</option>
                    <option value="Health & Well-being">Health & Well-being</option>
                    <option value="Community Resilience">Community Resilience</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Allocated Capital Budget</label>
                  <input
                    type="text"
                    value={editFormData.budgetFormatted}
                    onChange={(e) => setEditFormData({ ...editFormData, budgetFormatted: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Lead Programme Manager</label>
                <input
                  type="text"
                  value={editFormData.programmeManager}
                  onChange={(e) => setEditFormData({ ...editFormData, programmeManager: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Geographic Footprint</label>
                <input
                  type="text"
                  value={editFormData.locations}
                  onChange={(e) => setEditFormData({ ...editFormData, locations: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Core Objective Statement</label>
                <textarea
                  rows={3}
                  value={editFormData.objective}
                  onChange={(e) => setEditFormData({ ...editFormData, objective: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProgramme((prev) => ({
                      ...prev,
                      name: editFormData.name,
                      pillar: editFormData.pillar,
                      budgetFormatted: editFormData.budgetFormatted,
                      programmeManager: editFormData.programmeManager,
                      locations: editFormData.locations,
                      objective: editFormData.objective,
                    }));
                    toast.success('Programme parameters updated successfully!');
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

      {/* ─────────────────────────────────────────────────────────────
          MODAL: DUPLICATE
      ───────────────────────────────────────────────────────────── */}
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
              Create a clone of "{programme.name}" with all 8 dimension templates intact?
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
                  toast.success(`Cloned: ${programme.name} (Draft Copy) created.`);
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

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ARCHIVE
      ───────────────────────────────────────────────────────────── */}
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
