import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
  Edit,
  Trash2,
  ChevronRight,
  Layers,
  Sparkles,
  Download,
  LayoutGrid,
  Table as TableIcon,
  TrendingUp,
  Award,
  Eye,
  Calendar,
  Building,
  School,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PROGRAMMES_DATA, enrichProgrammeData } from '../../../data/programmesData';
import ProgrammeRegistrationSection from './ProgrammeRegistrationSection';

const AdminProgrammesSection = ({ onSelectProgramme, onLaunchProgramme }) => {
  const [programmes, setProgrammes] = useState(PROGRAMMES_DATA);
  const [selectedPillar, setSelectedPillar] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('budget-desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // View state: 'portfolio' | 'register' | 'edit'
  const [currentView, setCurrentView] = useState('portfolio');
  const [selectedProgrammeForEdit, setSelectedProgrammeForEdit] = useState(null);

  // Fetch real programmes from API on mount
  useEffect(() => {
    fetch('/api/programmes')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProgrammes((prev) => {
            const existingSlugs = new Set(prev.map((p) => p.slug));
            const newItems = res.data
              .filter((p) => !existingSlugs.has(p.slug))
              .map((p) => ({
                id: p._id || p.id,
                slug: p.slug,
                name: p.name,
                pillar: p.pillar,
                status: p.status || 'Active',
                thumbnail: p.thumbnail || '/images/past_event_school_support.jpg',
                objective: p.objective,
                locations: p.locations,
                programmeManager: p.programmeManager,
                budgetFormatted: p.budgetFormatted,
                stats: {
                  beneficiaries: (p.beneficiariesReached || 1200).toLocaleString(),
                  communities: p.locationsCount || 12,
                  schools: p.schoolsCount || 18,
                  completionRate: `${p.percentageComplete || 75}%`,
                },
              }));
            return [...newItems, ...prev];
          });
        }
      })
      .catch(() => {});
  }, []);

  const pillars = [
    { label: 'All', id: 'All' },
    { label: 'Education & Human Capital', id: 'Education' },
    { label: 'Health & Well-being', id: 'Health' },
    { label: 'Community Resilience', id: 'Community' },
  ];

  // Helper to parse numeric budget for sorting
  const parseBudget = (budgetStr) => {
    if (!budgetStr) return 0;
    const cleaned = budgetStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned) || 0;
    if (budgetStr.toLowerCase().includes('billion') || budgetStr.toLowerCase().includes('b')) return num * 1_000_000_000;
    if (budgetStr.toLowerCase().includes('million') || budgetStr.toLowerCase().includes('m')) return num * 1_000_000;
    return num;
  };

  // Filter & Sort Logic
  const filteredProgrammes = programmes
    .filter((p) => {
      const matchesPillar =
        selectedPillar === 'All' ||
        p.pillar?.toLowerCase().includes(selectedPillar.toLowerCase().split(' ')[0]);

      const matchesStatus =
        selectedStatus === 'All' ||
        p.status?.toLowerCase() === selectedStatus.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.locations?.toLowerCase().includes(query) ||
        p.programmeManager?.toLowerCase().includes(query) ||
        p.objective?.toLowerCase().includes(query);

      return matchesPillar && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'budget-desc') return parseBudget(b.budgetFormatted) - parseBudget(a.budgetFormatted);
      if (sortBy === 'budget-asc') return parseBudget(a.budgetFormatted) - parseBudget(b.budgetFormatted);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'completion-desc') {
        const compA = parseInt(a.stats?.completionRate || '0', 10);
        const compB = parseInt(b.stats?.completionRate || '0', 10);
        return compB - compA;
      }
      return 0;
    });

  // Pillar counts
  const getPillarCount = (pillarKey) => {
    if (pillarKey === 'All') return programmes.length;
    return programmes.filter((p) =>
      p.pillar?.toLowerCase().includes(pillarKey.toLowerCase())
    ).length;
  };

  // Portfolio Totals Calculation
  const totalBeneficiaries = programmes.reduce((acc, curr) => {
    const raw = curr.stats?.beneficiaries || '0';
    return acc + (parseInt(raw.replace(/,/g, ''), 10) || 0);
  }, 0);

  const totalCommunities = programmes.reduce((acc, curr) => {
    return acc + (curr.stats?.communities || curr.locationsCount || 0);
  }, 0);

  // Pillar badge color helper
  const getPillarBadgeStyle = (pillar) => {
    const p = pillar?.toLowerCase() || '';
    if (p.includes('education')) return 'bg-amber-50 text-amber-800 border-amber-200/80';
    if (p.includes('health')) return 'bg-rose-50 text-rose-800 border-rose-200/80';
    return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
  };

  // Status badge style helper
  const getStatusBadgeStyle = (status) => {
    const s = status?.toLowerCase() || 'active';
    if (s === 'completed') return 'bg-slate-100 text-slate-700 border-slate-200';
    if (s === 'in planning' || s === 'planning') return 'bg-sky-50 text-sky-700 border-sky-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  // Open Launch Section
  const handleOpenLaunch = () => {
    if (onLaunchProgramme) {
      onLaunchProgramme();
      return;
    }
    setSelectedProgrammeForEdit(null);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Edit Section
  const handleOpenEdit = (prog, e) => {
    if (e) e.stopPropagation();
    setSelectedProgrammeForEdit(prog);
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save or Update Programme from Dedicated Section
  const handleSaveProgramme = async (formData) => {
    if (selectedProgrammeForEdit) {
      // Update existing programme
      setProgrammes((prev) =>
        prev.map((p) => {
          if (p.id === selectedProgrammeForEdit.id) {
            const updated = enrichProgrammeData({
              ...p,
              name: formData.name,
              pillar: formData.pillar,
              budgetFormatted: formData.budgetFormatted,
              locations: formData.locations,
              locationsCount: Number(formData.locationsCount) || p.locationsCount,
              schoolsCount: Number(formData.schoolsCount) || p.schoolsCount,
              programmeManager: formData.programmeManager,
              targetBeneficiaries: formData.targetBeneficiaries,
              status: formData.status,
              objective: formData.objective,
              startDate: formData.startDate,
              endDate: formData.endDate,
              objectivesList: formData.objectivesList || p.objectivesList,
              activities: formData.activities || p.activities,
              beneficiariesList: formData.beneficiariesList || p.beneficiariesList,
              locationsList: formData.locationsList || p.locationsList,
              partners: formData.partners || p.partners,
              kpis: formData.kpis || p.kpis,
              mediaList: formData.mediaList || p.mediaList,
              documentsList: formData.documentsList || p.documentsList,
              stats: {
                ...p.stats,
                beneficiaries: formData.beneficiariesCount || p.stats?.beneficiaries,
                communities: Number(formData.locationsCount) || p.stats?.communities,
                schools: Number(formData.schoolsCount) || p.stats?.schools,
                completionRate: formData.completionRate || p.stats?.completionRate,
              },
            });
            return updated;
          }
          return p;
        })
      );
      toast.success(`Programme "${formData.name}" parameters updated successfully!`);
    } else {
      // Create new programme
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const rawCreated = {
        id: `prog-${Date.now()}`,
        slug: slug || `programme-${Date.now()}`,
        name: formData.name,
        pillar: formData.pillar,
        status: formData.status,
        thumbnail:
          formData.thumbnail ||
          (formData.pillar.includes('Education')
            ? '/images/past_event_school_support.jpg'
            : formData.pillar.includes('Health')
            ? '/images/past_event_health_screening.jpg'
            : '/images/past_event_community_hall.jpg'),
        featuredImage: formData.featuredImage || '/images/past_event_clean_water.jpg',
        objective:
          formData.objective || 'Empower individuals and communities through targeted foundation initiatives.',
        targetBeneficiaries: formData.targetBeneficiaries,
        locations: formData.locations,
        locationsCount: Number(formData.locationsCount) || 18,
        schoolsCount: Number(formData.schoolsCount) || 12,
        programmeManager: formData.programmeManager,
        budgetFormatted: formData.budgetFormatted,
        startDate: formData.startDate,
        endDate: formData.endDate,
        objectivesList: formData.objectivesList || [],
        activities: formData.activities || [],
        beneficiariesList: formData.beneficiariesList || [],
        locationsList: formData.locationsList || [],
        partners: formData.partners || [],
        kpis: formData.kpis || [],
        mediaList: formData.mediaList || [],
        documentsList: formData.documentsList || [],
        stats: {
          beneficiaries: formData.beneficiariesCount || '4,500',
          communities: Number(formData.locationsCount) || 18,
          schools: Number(formData.schoolsCount) || 12,
          completionRate: formData.completionRate || '85%',
        },
      };

      const created = enrichProgrammeData(rawCreated);

      // Backend API sync attempt
      try {
        const token = localStorage.getItem('cmaof_admin_token');
        await fetch('/api/programmes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            slug: created.slug,
            name: created.name,
            pillar: created.pillar,
            objective: created.objective,
            locations: created.locations,
            programmeManager: created.programmeManager,
            budgetFormatted: created.budgetFormatted,
            objectivesList: created.objectivesList,
            activities: created.activities,
            partners: created.partners,
          }),
        });
      } catch (err) {
        console.warn('Programme API sync offline notice:', err.message);
      }

      setProgrammes([created, ...programmes]);
      toast.success(`Programme "${created.name}" launched successfully!`);
    }

    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Archive / Delete handler
  const handleArchive = (id, name, e) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Are you sure you want to archive "${name}"?`)) {
      setProgrammes(programmes.filter((p) => p.id !== id));
      toast.success(`"${name}" moved to institutional archives.`);
    }
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Programme Name', 'Pillar', 'Status', 'Allocated Budget', 'Lead Manager', 'Locations', 'Beneficiaries', 'Completion Rate'];
    const rows = filteredProgrammes.map((p) => [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.pillar}"`,
      `"${p.status}"`,
      `"${p.budgetFormatted}"`,
      `"${p.programmeManager}"`,
      `"${p.locations}"`,
      `"${p.stats?.beneficiaries || '0'}"`,
      `"${p.stats?.completionRate || '0%'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cmaof_programmes_portfolio_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Programmes portfolio exported as CSV!');
  };

  // If in 'register' or 'edit' view, render the dedicated multi-step section (NO POPUP)
  if (currentView === 'register' || currentView === 'edit') {
    return (
      <ProgrammeRegistrationSection
        initialData={selectedProgrammeForEdit}
        onSave={handleSaveProgramme}
        onCancel={() => {
          setCurrentView('portfolio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN HEADER (Title, Subtitle & Action Buttons)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-8 sm:h-9 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Programmes Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Manage strategic initiatives, capital budgets, and field milestone operations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleOpenLaunch}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Launch Programme</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 SIMPLE, CLEAN KPI METRIC CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Initiatives */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#06402B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Layers size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
              3 Pillars
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Initiatives
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              {programmes.length}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Strategic foundation initiatives
            </p>
          </div>
        </div>

        {/* Card 2: Portfolio Capital */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0B2D6E] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <DollarSign size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0B2D6E] border border-blue-100">
              89.4% Executed
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Portfolio Capital
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              ₦2.03 Billion
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              Multi-year approved funding
            </p>
          </div>
        </div>

        {/* Card 3: Targeted Reach */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Users size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100">
              +18% Verified
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target Beneficiaries
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              {totalBeneficiaries.toLocaleString()}+
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              Directly supported individuals
            </p>
          </div>
        </div>

        {/* Card 4: Operational Footprint */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <MapPin size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
              14 States & FCT
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Operational Footprint
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              {totalCommunities} Communities
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              Rural & peri-urban clusters
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FILTERS, SEARCH, SORT & VIEW SWITCHER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Pillar Category Tabs with Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {pillars.map((pillar) => {
            const count = getPillarCount(pillar.id);
            const isActive = selectedPillar === pillar.id;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setSelectedPillar(pillar.id)}
                className={`
                  inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#06402B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }
                `}
              >
                <span>{pillar.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Search, Status, Sort & View Mode */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search initiatives, locations..."
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white transition-all"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 cursor-pointer shadow-xs focus:outline-none focus:border-[#06402B]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="In Planning">In Planning</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 cursor-pointer shadow-xs focus:outline-none focus:border-[#06402B]"
          >
            <option value="budget-desc">Sort: Budget (High to Low)</option>
            <option value="budget-asc">Sort: Budget (Low to High)</option>
            <option value="completion-desc">Sort: Completion Rate</option>
            <option value="name-asc">Sort: Name (A-Z)</option>
          </select>

          {/* View Switcher: Grid vs Table */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#06402B] shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#06402B] shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Ledger Table View"
            >
              <TableIcon size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CONTENT: GRID VIEW OR TABLE VIEW
      ───────────────────────────────────────────────────────────── */}
      {filteredProgrammes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <Briefcase size={36} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No programmes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            No initiatives matched your selected filters or search terms. Try clearing your filters or launch a new initiative.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedPillar('All');
              setSelectedStatus('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* ── GRID MODE ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProgrammes.map((prog) => {
            const completionVal = parseInt(prog.stats?.completionRate || '80', 10);

            return (
              <div
                key={prog.id}
                onClick={() => {
                  if (onSelectProgramme) onSelectProgramme(prog.slug || prog.id);
                }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-200/90 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Card Cover Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={prog.thumbnail || '/images/past_event_school_support.jpg'}
                      alt={prog.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Pillar Badge */}
                    <span
                      className={`absolute top-3.5 left-3.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm backdrop-blur-xs ${getPillarBadgeStyle(
                        prog.pillar
                      )}`}
                    >
                      {prog.pillar.split('&')[0]}
                    </span>

                    {/* Status Pill */}
                    <span
                      className={`absolute top-3.5 right-3.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs flex items-center gap-1.5 backdrop-blur-xs ${getStatusBadgeStyle(
                        prog.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {prog.status || 'Active'}
                    </span>

                    {/* Location Badge on Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px] font-bold">
                      <div className="flex items-center gap-1.5 drop-shadow-sm truncate">
                        <MapPin size={13} className="text-[#f97316] shrink-0" />
                        <span className="truncate">{prog.locations}</span>
                      </div>
                      <span className="shrink-0 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {prog.stats?.communities || prog.locationsCount || 12} Communities
                      </span>
                    </div>
                  </div>

                  {/* Card Main Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-extrabold text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-snug line-clamp-1">
                        {prog.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                        {prog.objective}
                      </p>
                    </div>

                    {/* Progress Bar with Completion % */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Milestone Velocity
                        </span>
                        <span className="font-extrabold text-[#06402B]">{completionVal}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-500"
                          style={{ width: `${Math.min(completionVal, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight">
                          Allocated Budget
                        </span>
                        <span className="font-black text-[#0B2D6E] text-[13px] block mt-0.5">
                          {prog.budgetFormatted}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight">
                          Target Beneficiaries
                        </span>
                        <span className="font-black text-emerald-800 text-[13px] block mt-0.5">
                          {prog.stats?.beneficiaries || '2,500'}
                        </span>
                      </div>
                    </div>

                    {/* Lead Manager Footnote */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#06402B] font-bold flex items-center justify-center text-[10px]">
                          {prog.programmeManager?.charAt(0) || 'M'}
                        </div>
                        <span className="font-semibold text-slate-700 truncate max-w-[130px]">
                          {prog.programmeManager}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">Lead Officer</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06402B] group-hover:text-[#0B2D6E] transition-colors">
                    <span>Open Programme Dossier</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => handleOpenEdit(prog, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-white transition-colors cursor-pointer"
                      title="Edit Programme Parameters"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleArchive(prog.id, prog.name, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                      title="Archive Initiative"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── TABLE / LEDGER MODE ── */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <th className="py-3.5 px-4">Programme & Pillar</th>
                  <th className="py-3.5 px-3">Lead Manager</th>
                  <th className="py-3.5 px-3">Locations</th>
                  <th className="py-3.5 px-3">Allocated Budget</th>
                  <th className="py-3.5 px-3">Beneficiaries</th>
                  <th className="py-3.5 px-3">Milestone Velocity</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right sticky right-0 bg-slate-50 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)] z-20 min-w-[170px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredProgrammes.map((prog) => {
                  const compVal = parseInt(prog.stats?.completionRate || '80', 10);

                  return (
                    <tr
                      key={prog.id}
                      onClick={() => {
                        if (onSelectProgramme) onSelectProgramme(prog.slug || prog.id);
                      }}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    >
                      {/* Programme Name & Pillar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prog.thumbnail || '/images/past_event_school_support.jpg'}
                            alt={prog.name}
                            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-extrabold text-[#0B2D6E] group-hover:text-[#06402B] transition-colors leading-tight">
                              {prog.name}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPillarBadgeStyle(
                                prog.pillar
                              )}`}
                            >
                              {prog.pillar.split('&')[0]}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Lead Manager */}
                      <td className="py-3.5 px-3 font-semibold text-slate-800">
                        {prog.programmeManager}
                      </td>

                      {/* Locations */}
                      <td className="py-3.5 px-3 text-slate-600 max-w-[160px] truncate" title={prog.locations}>
                        {prog.locations}
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-3 font-mono font-bold text-[#0B2D6E]">
                        {prog.budgetFormatted}
                      </td>

                      {/* Beneficiaries */}
                      <td className="py-3.5 px-3 font-mono font-bold text-emerald-800">
                        {prog.stats?.beneficiaries || '2,500'}
                      </td>

                      {/* Velocity Progress Bar */}
                      <td className="py-3.5 px-3 min-w-[130px]">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                          <span className="text-slate-500">Execution</span>
                          <span className="text-[#06402B]">{compVal}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-600"
                            style={{ width: `${Math.min(compVal, 100)}%` }}
                          />
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(
                            prog.status
                          )}`}
                        >
                          {prog.status || 'Active'}
                        </span>
                      </td>

                      {/* Sticky Right Action Toolbar */}
                      <td
                        className="py-3 px-4 text-right sticky right-0 bg-white/95 group-hover:bg-slate-50 transition-colors shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)] z-10 min-w-[170px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectProgramme) onSelectProgramme(prog.slug || prog.id);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#06402B] hover:bg-[#06402B] hover:text-white font-bold text-xs transition-all border border-emerald-200/70 cursor-pointer shadow-2xs"
                            title="Open Dossier"
                          >
                            <Eye size={13} />
                            <span>Dossier</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleOpenEdit(prog, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Edit Programme"
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleArchive(prog.id, prog.name, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Archive Initiative"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing all {filteredProgrammes.length} initiatives</span>
            <span className="font-semibold text-slate-700">Audit-Ready Ledger</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProgrammesSection;
