import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Upload,
  Download,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  FileCheck2,
  GitBranch,
  X,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';

const getPillarBadge = (pillar) => {
  switch (pillar?.toLowerCase()) {
    case 'education':
      return 'bg-amber-50 text-amber-700 border border-amber-200/80 font-semibold';
    case 'health':
      return 'bg-rose-50 text-rose-600 border border-rose-200/80 font-semibold';
    case 'community':
      return 'bg-orange-50 text-orange-700 border border-orange-200/80 font-semibold';
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-200 font-semibold';
  }
};

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case 'assessment':
      return 'bg-amber-100/90 text-amber-800 font-bold border border-amber-200/60';
    case 'active':
      return 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-200/60';
    case 'follow-up':
      return 'bg-orange-100 text-orange-800 font-bold border border-orange-200/60';
    case 'approved':
      return 'bg-teal-100 text-teal-800 font-bold border border-teal-200/60';
    case 'referral':
      return 'bg-blue-100 text-blue-800 font-bold border border-blue-200/60';
    case 'closed':
      return 'bg-slate-100 text-slate-600 font-bold border border-slate-200/60';
    case 'new':
      return 'bg-sky-100 text-sky-800 font-bold border border-sky-200/60';
    default:
      return 'bg-slate-100 text-slate-700 font-bold border border-slate-200/60';
  }
};

const BeneficiaryDirectorySection = ({
  beneficiaries = [],
  totalBeneficiariesCount = 2480,
  onOpenRegisterModal,
  onViewDossier,
  onDeleteBeneficiary,
}) => {
  const navigate = useNavigate();

  // Filters State matching Image 2
  const [selectedPillar, setSelectedPillar] = useState('All Pillars');
  const [selectedProgramme, setSelectedProgramme] = useState('All Programmes');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All Ages');
  const [selectedGender, setSelectedGender] = useState('All Genders');
  const [selectedCaseStatus, setSelectedCaseStatus] = useState('All Statuses');
  const [selectedDateRange, setSelectedDateRange] = useState('Select date range');
  const [selectedAssignedStaff, setSelectedAssignedStaff] = useState('All Staff');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Table selection & pagination
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter computation
  const filtered = beneficiaries.filter((b) => {
    // Search query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.name?.toLowerCase().includes(query) ||
      b.code?.toLowerCase().includes(query) ||
      b.phone?.includes(query) ||
      b.location?.toLowerCase().includes(query) ||
      b.assignedOfficer?.toLowerCase().includes(query);

    // Dropdowns
    const matchesPillar =
      selectedPillar === 'All Pillars' ||
      b.pillar?.toLowerCase() === selectedPillar.toLowerCase();

    const matchesProgramme =
      selectedProgramme === 'All Programmes' ||
      b.programme?.toLowerCase() === selectedProgramme.toLowerCase();

    const matchesLocation =
      selectedLocation === 'All Locations' ||
      b.location?.toLowerCase() === selectedLocation.toLowerCase() ||
      b.state?.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesType =
      selectedType === 'All Types' ||
      b.type?.toLowerCase() === selectedType.toLowerCase();

    const matchesGender =
      selectedGender === 'All Genders' ||
      b.gender?.toLowerCase() === selectedGender.toLowerCase();

    const matchesStatus =
      selectedCaseStatus === 'All Statuses' ||
      b.status?.toLowerCase() === selectedCaseStatus.toLowerCase();

    const matchesStaff =
      selectedAssignedStaff === 'All Staff' ||
      b.assignedOfficer?.toLowerCase() === selectedAssignedStaff.toLowerCase();

    return (
      matchesSearch &&
      matchesPillar &&
      matchesProgramme &&
      matchesLocation &&
      matchesType &&
      matchesGender &&
      matchesStatus &&
      matchesStaff
    );
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleResetFilters = () => {
    setSelectedPillar('All Pillars');
    setSelectedProgramme('All Programmes');
    setSelectedLocation('All Locations');
    setSelectedType('All Types');
    setSelectedAgeGroup('All Ages');
    setSelectedGender('All Genders');
    setSelectedCaseStatus('All Statuses');
    setSelectedDateRange('Select date range');
    setSelectedAssignedStaff('All Staff');
    setSearchQuery('');
    toast.success('Filters cleared');
  };

  const handleExportCSV = () => {
    const headers = [
      'Beneficiary ID',
      'Name',
      'Pillar',
      'Type',
      'Location',
      'Age/Gender',
      'Status',
      'Assigned Officer',
      'Date Registered',
      'Phone',
    ];
    const rows = filtered.map((b) => [
      b.code,
      `"${b.name}"`,
      b.pillar,
      b.type || 'Individual',
      b.location,
      b.ageGender || `${b.age || ''}/${b.gender?.[0] || ''}`,
      b.status,
      `"${b.assignedOfficer || ''}"`,
      b.dateRegistered,
      b.phone || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CMAOF_Beneficiary_Directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filtered.length} beneficiaries to CSV`);
  };

  const handleImportModal = () => {
    toast('Import tool: Ready to accept CSV or Excel roster', {
      icon: '📂',
    });
  };

  return (
    <div className="space-y-5 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER (Orange Accent Bar + Title + Actions) matching Image 2
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-8 rounded-full bg-[#f97316] shrink-0 mt-0.5" />
          <div>
            <h1 className="text-2xl sm:text-[1.65rem] font-black text-[#0B2D6E] tracking-tight">
              Beneficiary Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Search, filter and manage registered beneficiaries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleImportModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Upload size={14} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenRegisterModal) onOpenRegisterModal();
              else navigate('/admin/beneficiaries/register');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Register Beneficiary</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MULTI-TIER FILTER BAR matching Image 2
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-3.5">
        {/* Row 1: Pillar, Programme, Location, Type */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Pillar</label>
            <select
              value={selectedPillar}
              onChange={(e) => setSelectedPillar(e.target.value)}
              aria-label="Filter by Pillar"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Pillars</option>
              <option>Education</option>
              <option>Health</option>
              <option>Community</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Programme</label>
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              aria-label="Filter by Programme"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Programmes</option>
              <option>School Support Programme</option>
              <option>Medical Assistance Scheme</option>
              <option>Clean Borehole Water Access</option>
              <option>Primary Eye Care Outreach</option>
              <option>Women Agro-Enterprise Grant</option>
              <option>Vocational Technical Scholarship</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter by Location"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Locations</option>
              <option>Kano</option>
              <option>Lagos</option>
              <option>Kaduna</option>
              <option>Oyo</option>
              <option>Enugu</option>
              <option>Sokoto</option>
              <option>Delta</option>
              <option>Rivers</option>
              <option>Niger</option>
              <option>Ogun</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by Beneficiary Type"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Types</option>
              <option>Student</option>
              <option>Individual</option>
              <option>Household</option>
            </select>
          </div>
        </div>

        {/* Row 2: Age Group, Gender, Case Status, Date Range, Assigned Staff */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Age Group</label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              aria-label="Filter by Age Group"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Ages</option>
              <option>Under 18</option>
              <option>18 - 35</option>
              <option>36 - 55</option>
              <option>55+</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Gender</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              aria-label="Filter by Gender"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Genders</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Case Status</label>
            <select
              value={selectedCaseStatus}
              onChange={(e) => setSelectedCaseStatus(e.target.value)}
              aria-label="Filter by Case Status"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Assessment</option>
              <option>Active</option>
              <option>Follow-up</option>
              <option>Approved</option>
              <option>Referral</option>
              <option>Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Date Range</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              aria-label="Filter by Date Range"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>Select date range</option>
              <option>Oct 2026</option>
              <option>Last 30 Days</option>
              <option>Year to Date (2026)</option>
              <option>All Time</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Assigned Staff</label>
            <select
              value={selectedAssignedStaff}
              onChange={(e) => setSelectedAssignedStaff(e.target.value)}
              aria-label="Filter by Assigned Staff"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
            >
              <option>All Staff</option>
              <option>Hauwa Bello</option>
              <option>Tunde Ayo</option>
              <option>Maryam Ali</option>
              <option>John Adeyemi</option>
              <option>Ngozi Okafor</option>
              <option>Aisha Lawal</option>
            </select>
          </div>
        </div>

        {/* Row 3: Search Bar with Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, phone, or keywords..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-[#0B2D6E] hover:bg-blue-100 text-xs font-bold border border-blue-200/60 transition-colors cursor-pointer"
            >
              <Filter size={13} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BENEFICIARIES TABLE matching Image 2
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all beneficiaries"
                    className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3">Photo</th>
                <th className="py-3.5 px-3">Beneficiary ID</th>
                <th className="py-3.5 px-3">Name</th>
                <th className="py-3.5 px-3">Pillar</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3">Location</th>
                <th className="py-3.5 px-3">Age / Gender</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Assigned Officer</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-4 text-right sticky right-0 bg-slate-50 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)] z-20 min-w-[190px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No beneficiaries found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search keywords</p>
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const isChecked = selectedIds.includes(b.id);

                  return (
                    <tr
                      key={b.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${isChecked ? 'bg-emerald-50/30' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(b.id)}
                          aria-label={`Select beneficiary ${b.name}`}
                          className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                        />
                      </td>

                      {/* Photo Avatar */}
                      <td className="py-3 px-3">
                        <Link to={`/admin/beneficiaries/${b.code}`}>
                          <img
                            src={b.photo || '/images/story_amina.jpg'}
                            alt={b.name}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 hover:ring-[#06402B] transition-all cursor-pointer shadow-xs"
                          />
                        </Link>
                      </td>

                      {/* Beneficiary ID */}
                      <td className="py-3 px-3 font-mono font-bold text-slate-700">
                        <Link
                          to={`/admin/beneficiaries/${b.code}`}
                          className="hover:text-[#06402B] hover:underline"
                        >
                          {b.code}
                        </Link>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3 font-bold text-slate-900">
                        <Link
                          to={`/admin/beneficiaries/${b.code}`}
                          className="hover:text-[#06402B] hover:underline"
                        >
                          {b.name}
                        </Link>
                      </td>

                      {/* Pillar */}
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] ${getPillarBadge(b.pillar)}`}>
                          {b.pillar}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-3 px-3 text-slate-600 font-semibold">
                        {b.type || 'Individual'}
                      </td>

                      {/* Location */}
                      <td className="py-3 px-3 text-slate-600">
                        {b.location}
                      </td>

                      {/* Age / Gender */}
                      <td className="py-3 px-3 font-mono text-slate-700 font-semibold">
                        {b.ageGender || `${b.age || '16'}/${b.gender?.[0] || 'F'}`}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] ${getStatusBadge(b.status)}`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Assigned Officer */}
                      <td className="py-3 px-3 text-slate-700 font-semibold">
                        {b.assignedOfficer || 'Hauwa Bello'}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {b.dateRegistered}
                      </td>

                      {/* Sticky, Always-Visible Action Toolbar */}
                      <td className={`py-2.5 px-4 text-right sticky right-0 backdrop-blur-xs group-hover:bg-slate-50 transition-colors shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)] z-10 min-w-[190px] ${isChecked ? 'bg-emerald-50/90' : 'bg-white'}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1. Primary Action: View Profile */}
                          <Link
                            to={`/admin/beneficiaries/${b.code}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#06402B] hover:bg-[#06402B] hover:text-white font-bold text-xs transition-all shadow-2xs border border-emerald-200/70"
                            title="View Full Profile"
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </Link>

                          {/* 2. Needs Assessment Quick Action */}
                          <Link
                            to={`/admin/beneficiaries/${b.code}/assessment`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                            title="Needs Assessment"
                          >
                            <FileCheck2 size={15} />
                          </Link>

                          {/* 3. Case Timeline Quick Action */}
                          <Link
                            to={`/admin/beneficiaries/${b.code}/cases`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2D6E] hover:bg-blue-50 transition-colors"
                            title="Case Timeline"
                          >
                            <GitBranch size={15} />
                          </Link>

                          {/* 4. Remove / Delete Beneficiary */}
                          <button
                            type="button"
                            onClick={() => {
                              if (onDeleteBeneficiary) onDeleteBeneficiary(b.id, b.name);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove Beneficiary"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. PAGINATION FOOTER matching Image 2
        ───────────────────────────────────────────────────────────── */}
        <div className="p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div>
            Showing <span className="font-bold text-slate-800">1 - {Math.min(filtered.length, 10)}</span> of{' '}
            <span className="font-bold text-slate-800">{totalBeneficiariesCount.toLocaleString()}</span> beneficiaries
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                aria-label="Previous Page"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>

              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-[#06402B] text-white font-bold flex items-center justify-center cursor-pointer shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
              >
                3
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
              >
                4
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
              >
                5
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
              >
                248
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next Page"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              aria-label="Items per page"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDirectorySection;
