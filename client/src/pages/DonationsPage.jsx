import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Download,
  FileText,
  Plus,
  Search,
  Calendar,
  Filter,
  User,
  Users,
  Clock,
  Bell,
  ChevronLeft,
  ChevronRight,
  Receipt,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import {
  DonationReceiptModal,
  RecordDonationModal,
} from '../components/admin/donations/DonationModals';
import {
  INITIAL_DONATIONS,
  DONATION_STATS,
  CAMPAIGNS_LIST,
} from '../data/donationsData';

const SUB_TABS = [
  { id: 'all', label: 'All Donations' },
  { id: 'recurring', label: 'Recurrings' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'donors', label: 'Donors' },
];

const DonationsPage = () => {
  const navigate = useNavigate();

  const [activeSubTab, setActiveSubTab] = useState('all');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Donations data & filters
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [recordModalOpen, setRecordModalOpen] = useState(false);

  const handleTabSwitch = (tabId) => {
    setMobileSidebarOpen(false);
    if (tabId === 'beneficiaries') navigate('/admin/beneficiaries');
    else if (tabId === 'dashboard') navigate('/admin/dashboard');
    else if (tabId === 'programmes') navigate('/admin/programmes');
    else if (tabId === 'donations') navigate('/admin/donations');
    else navigate(`/admin/${tabId}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('cmaof_admin_token');
    toast.success('Signed out of admin session');
    navigate('/admin');
  };

  // Filter donations
  const filteredDonations = donations.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      d.donorName.toLowerCase().includes(q) ||
      d.reference.toLowerCase().includes(q) ||
      d.campaign.toLowerCase().includes(q);

    const matchesType =
      selectedType === 'All' || d.type.toLowerCase() === selectedType.toLowerCase();

    const matchesCampaign =
      selectedCampaign === 'All' || d.campaign.toLowerCase() === selectedCampaign.toLowerCase();

    const matchesSubTab =
      activeSubTab === 'all' ||
      (activeSubTab === 'recurring' && d.campaign === 'Monthly Support') ||
      (activeSubTab === 'campaigns') ||
      (activeSubTab === 'donors');

    return matchesSearch && matchesType && matchesCampaign && matchesSubTab;
  });

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['Date', 'Reference', 'Donor Name', 'Amount (NGN)', 'Type', 'Campaign', 'Status', 'Payment Method'];
    const rows = filteredDonations.map((d) => [
      d.date,
      d.reference,
      `"${d.donorName}"`,
      d.amount,
      d.type,
      `"${d.campaign}"`,
      d.status,
      `"${d.paymentMethod}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CMAOF_Donations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Donations directory exported as CSV!');
  };

  const handleRecordSave = (newRecord) => {
    const nextId = donations.length + 1;
    const ref = `DON-2026-${String(nextId).padStart(3, '0')}`;
    const todayStr = '21 Oct 2026';

    const created = {
      id: nextId,
      reference: ref,
      date: todayStr,
      donorName: newRecord.donorName,
      email: newRecord.email,
      amount: newRecord.amount,
      amountFormatted: newRecord.amountFormatted,
      type: newRecord.type,
      campaign: newRecord.campaign,
      paymentMethod: newRecord.paymentMethod,
      status: 'Completed',
      notes: newRecord.notes,
    };

    setDonations([created, ...donations]);
    toast.success(`Donation of ₦${created.amountFormatted} from ${created.donorName} recorded!`);
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="donations"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={handleSignOut}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">
          {/* ─────────────────────────────────────────────────────────────
              3. PAGE HEADER & TOP ACTIONS
          ───────────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight">
                Donations
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Track and manage all donations and donor records.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Export Button */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Download size={15} className="text-slate-500" />
                <span>Export</span>
              </button>

              {/* Reports Button */}
              <button
                type="button"
                onClick={() => {
                  toast.success('Generated Q3 & Q4 Financial Audit Summary Report.');
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <FileText size={15} className="text-slate-500" />
                <span>Reports</span>
              </button>

              {/* + Record Donation Button */}
              <button
                type="button"
                onClick={() => setRecordModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-emerald-950/20 transition-all cursor-pointer active:scale-[0.98]"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Record Donation</span>
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. SUB-TABS FILTER BAR
          ───────────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUB_TABS.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
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
              5. 4 KPI SUMMARY CARDS (Matches Screenshot)
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
            {/* Card 1: Total Donations */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shrink-0">
                <User size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  Total Donations
                </p>
                <p className="text-xl sm:text-[1.35rem] font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
                  {DONATION_STATS.totalDonations}
                </p>
                <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  {DONATION_STATS.totalDonationsTrend}
                </p>
              </div>
            </div>

            {/* Card 2: Total Donors */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <Users size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  Total Donors
                </p>
                <p className="text-xl sm:text-[1.35rem] font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
                  {DONATION_STATS.totalDonors}
                </p>
                <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  {DONATION_STATS.totalDonorsTrend}
                </p>
              </div>
            </div>

            {/* Card 3: Recurring Donations */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
                <Clock size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  Recurring Donations
                </p>
                <p className="text-xl sm:text-[1.35rem] font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
                  {DONATION_STATS.recurringDonations}
                </p>
                <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  {DONATION_STATS.recurringTrend}
                </p>
              </div>
            </div>

            {/* Card 4: Active Campaigns */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">
                <Bell size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  Active Campaigns
                </p>
                <p className="text-xl sm:text-[1.35rem] font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
                  {DONATION_STATS.activeCampaigns}
                </p>
                <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  {DONATION_STATS.campaignsTrend}
                </p>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              6. FILTERS BAR (Search, Date Range, Donation Type, Campaign, More Filters)
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 flex-1 w-full md:w-auto flex-wrap">
              {/* Search by donor name, reference */}
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by donor name, reference..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              {/* Date Range Dropdown */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="All">Date Range</option>
                <option value="This Month">October 2026</option>
                <option value="Last Month">September 2026</option>
                <option value="2026 Year">2026 Fiscal Year</option>
              </select>

              {/* Donation Type Dropdown */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="All">Donation Type</option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
              </select>

              {/* Campaign Dropdown */}
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="All">Campaign</option>
                <option value="Education Fund">Education Fund</option>
                <option value="Health Outreach">Health Outreach</option>
                <option value="Community Resilience">Community Resilience</option>
                <option value="General Support">General Support</option>
                <option value="Monthly Support">Monthly Support</option>
              </select>
            </div>

            {/* More Filters button */}
            <button
              type="button"
              onClick={() => toast.success('Advanced fiscal and audit filters active.')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0284c7] hover:bg-sky-50 transition-colors cursor-pointer shrink-0"
            >
              <Filter size={14} />
              <span>More Filters</span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              7. DONATIONS DATA TABLE (Matches Screenshot Exactly)
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Donor Name</th>
                    <th className="py-3 px-4">Amount (₦)</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Campaign</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                  {filteredDonations.map((d) => (
                    <tr
                      key={d.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-default"
                    >
                      {/* Date */}
                      <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                        {d.date}
                      </td>

                      {/* Reference */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                        {d.reference}
                      </td>

                      {/* Donor Name */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {d.donorName}
                      </td>

                      {/* Amount (₦) */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {d.amountFormatted}
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {d.type}
                      </td>

                      {/* Campaign */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {d.campaign}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {d.status}
                        </span>
                      </td>

                      {/* Receipt Action Button */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(d)}
                          className="px-3 py-1 rounded-lg border border-slate-200 hover:border-emerald-600 text-[#0284c7] hover:text-[#06402B] hover:bg-emerald-50 text-xs font-bold transition-all cursor-pointer shadow-xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                8. BOTTOM PAGINATION BAR (Matches Screenshot)
            ───────────────────────────────────────────────────────────── */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-end flex-wrap gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer ${
                  currentPage === 1
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                1
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer ${
                  currentPage === 2
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                2
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer ${
                  currentPage === 3
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                3
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(4)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer ${
                  currentPage === 4
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                4
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(5)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer ${
                  currentPage === 5
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                5
              </button>

              <span className="px-1 text-slate-400 font-bold text-xs">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(124)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer ${
                  currentPage === 124
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                124
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          9. MODALS: OFFICIAL RECEIPT & RECORD NEW DONATION
      ───────────────────────────────────────────────────────────── */}
      <DonationReceiptModal
        donation={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      <RecordDonationModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onSave={handleRecordSave}
      />
    </div>
  );
};

export default DonationsPage;
