import React, { useState, useMemo } from 'react';
import {
  HeartHandshake,
  Search,
  Plus,
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Receipt,
  Building,
  User,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  Home,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  Shield,
  Copy,
  CreditCard,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  Send,
  Mail,
  Award,
  Zap,
  Share2,
  FileText,
  Clock,
  X,
  ChevronDown,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DonationReceiptModal } from '../donations/DonationModals';
import {
  INITIAL_DONATIONS,
  DONATION_STATS,
  CAMPAIGNS_LIST,
  MONTHLY_INFLOW_DATA,
  QUARTERLY_INFLOW_DATA,
} from '../../../data/donationsData';

const RECORD_STEPS = [
  { id: 1, label: 'Donor Identity' },
  { id: 2, label: 'Gift & Channel' },
  { id: 3, label: 'Cause & Receipt' },
];

const PRESET_AMOUNTS = [
  { label: '₦50,000', value: '50,000' },
  { label: '₦250,000', value: '250,000' },
  { label: '₦1,000,000', value: '1,000,000' },
  { label: '₦5,000,000', value: '5,000,000' },
  { label: '₦25,000,000', value: '25,000,000' },
  { label: '₦50,000,000', value: '50,000,000' },
];

/* ─────────────────────────────────────────────────────────────────
   DONATION AUDIT & LIFECYCLE SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const DonationDetailDrawer = ({ donation, onClose, onOpenReceipt, onSendGratitude }) => {
  if (!donation) return null;

  const copyRef = () => {
    navigator.clipboard.writeText(donation.reference);
    toast.success(`Copied ${donation.reference} to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
                {donation.reference}
              </span>
              <button
                type="button"
                onClick={copyRef}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                title="Copy reference"
              >
                <Copy size={13} />
              </button>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {donation.status || 'Completed'}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-900">Contribution Audit & Lifecycle</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm">
          {/* Main Amount Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#06402B] to-[#0B2D6E] text-white space-y-2 shadow-md">
            <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
              Contribution Valuation
            </span>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="text-3xl font-black font-mono tracking-tight">
                ₦{donation.amountFormatted}
              </span>
              <span className="text-xs bg-white/15 px-3 py-1 rounded-full font-semibold text-emerald-100">
                {donation.type} Benefactor
              </span>
            </div>
            <p className="text-xs text-white/80 pt-1 border-t border-white/10 flex items-center justify-between">
              <span>Channel: {donation.paymentMethod}</span>
              <span>{donation.date}</span>
            </p>
          </div>

          {/* Audit Lifecycle Stepper */}
          <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Audit Settlement Lifecycle
            </h3>
            <div className="space-y-3.5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
              {[
                { title: 'Inflow Authorized', desc: `Authorized via ${donation.paymentMethod}`, time: donation.date, done: true },
                { title: 'Zenith Treasury Settlement', desc: 'Settled to CMAOF Operating Account #1018392014', time: 'Instant verified', done: true },
                { title: 'Pillar Ring-fencing', desc: `Allocated to ${donation.campaign} (${donation.pillar})`, time: 'Ledger cleared', done: true },
                { title: 'Tax Compliance Certificate', desc: '100% Tax-deductible charitable exemption generated', time: 'Certified', done: true },
                { title: 'Gratitude & Impact Dispatch', desc: `Impact notice dispatched to ${donation.email}`, time: 'Delivered', done: true },
              ].map((step, idx) => (
                <div key={idx} className="relative space-y-0.5">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#06402B] text-white flex items-center justify-center ring-4 ring-white shadow-2xs">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-xs">{step.title}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">{step.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Donor Information */}
          <div className="p-5 rounded-2xl border border-slate-200/80 space-y-3 bg-white">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Benefactor Identity & Contact
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Donor / Corporate:</span>
                <span className="font-bold text-slate-900">{donation.donorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Email Address:</span>
                <span className="font-mono text-slate-800">{donation.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Designated Cause:</span>
                <span className="font-bold text-[#06402B]">{donation.campaign}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Strategic Pillar:</span>
                <span className="font-semibold text-slate-700">{donation.pillar}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Internal Audit Notes:</span>
                <span className="text-slate-700 italic max-w-xs text-right">
                  {donation.notes || 'No special grant stipulations attached.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Actions Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSendGratitude(donation)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Send size={13} />
            <span>Resend Receipt Email</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenReceipt(donation);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Receipt size={14} />
            <span>Official Receipt PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN DONATIONS SECTION COMPONENT
───────────────────────────────────────────────────────────────── */
const AdminDonationsSection = () => {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'recurring' | 'corporate' | 'campaigns'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedDonationDetail, setSelectedDonationDetail] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [chartMode, setChartMode] = useState('monthly'); // 'monthly' | 'quarterly'
  const [hoveredMonth, setHoveredMonth] = useState(null);

  // Dedicated View State: 'ledger' | 'record'
  const [currentView, setCurrentView] = useState('ledger');
  const [currentStep, setCurrentStep] = useState(1);

  // Form State for Recording Offline Gift
  const [newGift, setNewGift] = useState({
    donorName: '',
    email: '',
    phone: '',
    donorType: 'Individual',
    amount: '1,000,000',
    currency: 'NGN (₦)',
    paymentMethod: 'Direct Bank Wire Transfer',
    bankReference: `CBN-NIP-${Math.floor(10000000 + Math.random() * 90000000)}`,
    campaign: 'School Support Programme',
    pillar: 'Education & Human Capital',
    dedicatedNote: '',
    taxReceiptRequired: true,
  });

  // Filter donations dynamically
  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.donorName.toLowerCase().includes(q) ||
        d.reference.toLowerCase().includes(q) ||
        d.campaign.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q);

      const matchesType =
        typeFilter === 'All' || d.type.toLowerCase() === typeFilter.toLowerCase();

      const matchesChannel =
        channelFilter === 'All' ||
        (channelFilter === 'Bank Wire' && d.paymentMethod.toLowerCase().includes('wire')) ||
        (channelFilter === 'Paystack' && d.paymentMethod.toLowerCase().includes('paystack')) ||
        (channelFilter === 'SWIFT' && d.paymentMethod.toLowerCase().includes('swift'));

      const matchesStatus =
        statusFilter === 'All' || d.status.toLowerCase() === statusFilter.toLowerCase();

      let matchesTab = true;
      if (activeTab === 'recurring') {
        matchesTab =
          d.paymentMethod.toLowerCase().includes('recurring') ||
          d.campaign.toLowerCase().includes('monthly');
      } else if (activeTab === 'corporate') {
        matchesTab = d.type.toLowerCase() === 'corporate';
      }

      return matchesSearch && matchesType && matchesChannel && matchesStatus && matchesTab;
    });
  }, [donations, searchQuery, typeFilter, channelFilter, statusFilter, activeTab]);

  // Refresh live feed simulation
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Live ledger updated: Synced with Paystack & Zenith Bank settlements.');
    }, 600);
  };

  // Copy reference to clipboard
  const handleCopyRef = (ref, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(ref);
    toast.success(`Copied transaction reference "${ref}"!`);
  };

  // Send Thank You Notification
  const handleSendGratitude = (donor, e) => {
    if (e) e.stopPropagation();
    toast.success(`Gratitude acknowledgment & receipt emailed to ${donor.email}!`);
  };

  // Share campaign appeal link
  const handleShareAppeal = (camp, e) => {
    if (e) e.stopPropagation();
    const link = `${window.location.origin}/donate?campaign=${encodeURIComponent(camp.name)}`;
    navigator.clipboard.writeText(link);
    toast.success(`Appeal link for "${camp.name}" copied to clipboard!`);
  };

  // Submit new recorded gift
  const handleConfirmRecordGift = () => {
    if (!newGift.donorName.trim()) {
      toast.error('Donor full name or organization is required');
      return;
    }
    if (!newGift.amount.toString().trim()) {
      toast.error('Please enter the contribution amount');
      return;
    }

    const cleanedAmount =
      parseFloat(newGift.amount.toString().replace(/[^0-9.]/g, '')) || 1000000;
    const refCode = `DON-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const created = {
      id: Date.now(),
      reference: refCode,
      donorName: newGift.donorName.trim(),
      email: newGift.email || 'benefactor@charity-partner.ng',
      amount: cleanedAmount,
      amountFormatted: cleanedAmount.toLocaleString(),
      type: newGift.donorType,
      campaign: newGift.campaign,
      pillar: newGift.pillar,
      date: 'Just now',
      status: 'Completed',
      taxExempt: newGift.taxReceiptRequired,
      paymentMethod: newGift.paymentMethod,
      notes:
        newGift.dedicatedNote ||
        'Manual institutional record entered by foundation administrator.',
    };

    setDonations([created, ...donations]);
    toast.success(
      `Philanthropic gift of ₦${created.amountFormatted} recorded under ${created.reference}!`
    );
    setCurrentView('ledger');
    setCurrentStep(1);
    setNewGift({
      donorName: '',
      email: '',
      phone: '',
      donorType: 'Individual',
      amount: '1,000,000',
      currency: 'NGN (₦)',
      paymentMethod: 'Direct Bank Wire Transfer',
      bankReference: '',
      campaign: 'School Support Programme',
      pillar: 'Education & Human Capital',
      dedicatedNote: '',
      taxReceiptRequired: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportCSV = () => {
    const headers = [
      'Date',
      'Reference',
      'Donor Name',
      'Email',
      'Amount (NGN)',
      'Type',
      'Campaign',
      'Pillar',
      'Status',
      'Payment Method',
    ];
    const rows = filteredDonations.map((d) => [
      `"${d.date}"`,
      `"${d.reference}"`,
      `"${d.donorName}"`,
      `"${d.email}"`,
      `"${d.amount}"`,
      `"${d.type}"`,
      `"${d.campaign}"`,
      `"${d.pillar}"`,
      `"${d.status}"`,
      `"${d.paymentMethod}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `CMAOF_Donations_Ledger_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Donations ledger exported successfully!');
  };

  // ─────────────────────────────────────────────────────────────
  // VIEW: RECORD OFFLINE PHILANTHROPIC CONTRIBUTION
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'record') {
    const previewCleanedAmount =
      parseFloat(newGift.amount.toString().replace(/[^0-9.]/g, '')) || 0;

    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentView('ledger');
                setCurrentStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Donations</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Record Philanthropic Contribution</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentView('ledger');
              setCurrentStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Ledger</span>
          </button>
        </div>

        {/* 3-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="relative overflow-x-auto pb-1">
            <div className="min-w-[420px]">
              <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />
              <div className="relative z-10 flex items-center justify-between">
                {RECORD_STEPS.map((step) => {
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

        {/* Form Container with Live Receipt Preview on Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Steps (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: Donor Identity */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
                  <User size={18} className="text-[#06402B]" />
                  <span>Benefactor Identity & Philanthropic Classification</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Record individual donor details, institutional sponsor identity, and contact channels.
                </p>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Donor / Organization Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newGift.donorName}
                        onChange={(e) => setNewGift({ ...newGift, donorName: e.target.value })}
                        placeholder="e.g. Chief (Dr.) Michael Ade.Ojo / Access Bank CSR"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Donor Classification <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newGift.donorType}
                        onChange={(e) => setNewGift({ ...newGift, donorType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      >
                        <option value="Individual">Individual Benefactor</option>
                        <option value="Corporate">Corporate / CSR Partner</option>
                        <option value="Foundation">Philanthropic Foundation / Trust</option>
                        <option value="Diaspora">Nigerian Diaspora Patron</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={newGift.email}
                        onChange={(e) => setNewGift({ ...newGift, email: e.target.value })}
                        placeholder="e.g. benefactor@organization.ng"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="text"
                        value={newGift.phone}
                        onChange={(e) => setNewGift({ ...newGift, phone: e.target.value })}
                        placeholder="e.g. +234 803 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Gift & Channel */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
                  <CreditCard size={18} className="text-[#06402B]" />
                  <span>Gift Valuation, Currency & Settlement Channel</span>
                </h2>

                <div className="space-y-4 text-xs">
                  {/* Quick Preset Buttons */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-2">Quick Amount Presets</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PRESET_AMOUNTS.map((amt) => (
                        <button
                          key={amt.value}
                          type="button"
                          onClick={() => setNewGift({ ...newGift, amount: amt.value })}
                          className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            newGift.amount === amt.value
                              ? 'bg-[#06402B] text-white border-[#06402B] shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {amt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Gift Amount (NGN) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newGift.amount}
                        onChange={(e) => setNewGift({ ...newGift, amount: e.target.value })}
                        placeholder="e.g. 5,000,000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-mono text-sm font-bold text-[#0B2D6E] focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Payment Method Channel</label>
                      <select
                        value={newGift.paymentMethod}
                        onChange={(e) => setNewGift({ ...newGift, paymentMethod: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      >
                        <option value="Direct Bank Wire Transfer">Direct Bank Wire Transfer (Zenith Bank)</option>
                        <option value="Bank Certified Cheque">Bank Certified Cheque / Draft</option>
                        <option value="POS Terminal Settlement">Foundation POS Terminal Settlement</option>
                        <option value="International Wire (SWIFT)">International Wire (USD/GBP SWIFT)</option>
                        <option value="Founder Endowment Tranche">Founder Endowment Direct Injection</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Banking Transaction Reference</label>
                    <input
                      type="text"
                      value={newGift.bankReference}
                      onChange={(e) => setNewGift({ ...newGift, bankReference: e.target.value })}
                      placeholder="e.g. CBN-NIP-098274928173 or Cheque No. 0048291"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-mono text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Cause & Receipt */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
                  <Shield size={18} className="text-[#06402B]" />
                  <span>Designated Cause, Transparency & Official Receipt</span>
                </h2>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Designated Foundation Cause</label>
                      <select
                        value={newGift.campaign}
                        onChange={(e) => {
                          const camp = e.target.value;
                          const pillar = camp.includes('School')
                            ? 'Education & Human Capital'
                            : camp.includes('Medical') || camp.includes('Maternal')
                            ? 'Health & Well-being'
                            : 'Community Resilience';
                          setNewGift({ ...newGift, campaign: camp, pillar });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      >
                        <option value="School Support Programme">School Support Programme (Pillar 1)</option>
                        <option value="Primary Maternal & Child Health">Primary Maternal & Child Health (Pillar 2)</option>
                        <option value="Clean Water & Solar Boreholes">Clean Water & Solar Boreholes (Pillar 3)</option>
                        <option value="Vocational Skills & Digital Youth Hub">Vocational Skills & Youth Hub (Pillar 1)</option>
                        <option value="Women Agro-Cooperative Micro-Grants">Women Agro-Cooperative Micro-Grants (Pillar 3)</option>
                        <option value="General Endowment Fund">Foundation General Endowment Fund</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar Alignment</label>
                      <input
                        type="text"
                        disabled
                        value={newGift.pillar}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Special Dedication / Donor Notes</label>
                    <textarea
                      rows={3}
                      value={newGift.dedicatedNote}
                      onChange={(e) => setNewGift({ ...newGift, dedicatedNote: e.target.value })}
                      placeholder="e.g. Dedicated in support of girl-child STEM scholarships across target primary schools..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="taxReceipt"
                      checked={newGift.taxReceiptRequired}
                      onChange={(e) => setNewGift({ ...newGift, taxReceiptRequired: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <label htmlFor="taxReceipt" className="text-xs text-slate-700 font-medium cursor-pointer">
                      <span className="font-bold text-[#06402B]">Generate Tax Compliance Certificate:</span> Issue official
                      signed CMAOF charitable contribution receipt and update the public transparency ledger.
                    </label>
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
                  onClick={() => toast.success('Offline contribution draft stored in session.')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (currentStep < 3) {
                      if (currentStep === 1 && !newGift.donorName.trim()) {
                        toast.error('Donor name is required');
                        return;
                      }
                      if (currentStep === 2 && !newGift.amount.toString().trim()) {
                        toast.error('Donation amount is required');
                        return;
                      }
                      setCurrentStep((prev) => prev + 1);
                    } else {
                      handleConfirmRecordGift();
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  <span>{currentStep === 3 ? 'Confirm & Issue Receipt' : 'Next'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Receipt Preview Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Live Receipt Preview
              </span>
              <Receipt size={16} className="text-emerald-700" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Benefactor</span>
                <p className="font-extrabold text-[#0B2D6E] text-sm">
                  {newGift.donorName || 'Donor / Organization'}
                </p>
                <span className="text-[11px] text-slate-500 font-medium">
                  {newGift.email || 'donor@charity-partner.ng'} • {newGift.donorType}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Gift Valuation</span>
                <p className="font-black text-emerald-800 text-xl font-mono">
                  ₦{previewCleanedAmount.toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-500 font-semibold">{newGift.paymentMethod}</span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Allocated Cause</span>
                <p className="font-bold text-slate-800">{newGift.campaign}</p>
                <span className="text-[11px] text-emerald-700 font-semibold">{newGift.pillar}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Ref: Auto-Generated</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={11} /> 100% Tax Deductible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT: ACTIVE DONATIONS LEDGER & ANALYTICS VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. EXECUTIVE HEADER WITH CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Title & Gateway Status Indicator */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-1.5 h-7 rounded-full bg-[#f97316]" />
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Donations & Philanthropic Capital
            </h1>
            {/* Live Gateway Pulse Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>Live Paystack & Bank Gateway Connected</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-4">
            Audited real-time ledger of institutional grants, corporate CSR matching, diaspora patrons, and micro-donations.
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="2026">FY 2026</option>
            <option value="2025">FY 2025</option>
            <option value="2024">FY 2024</option>
          </select>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefreshFeed}
            className={`p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer ${
              isRefreshing ? 'animate-spin text-[#06402B]' : ''
            }`}
            title="Refresh Live Ledger"
          >
            <RefreshCw size={15} />
          </button>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Record Offline Gift CTA */}
          <button
            type="button"
            onClick={() => {
              setCurrentView('record');
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Record Offline Gift</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. 4 CLICKABLE EXECUTIVE FINANCIAL METRIC CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Capital Raised */}
        <div
          onClick={() => {
            setActiveTab('all');
            setTypeFilter('All');
            toast.success('Displaying all philanthropic transactions.');
          }}
          className={`bg-white rounded-3xl p-5 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group ${
            activeTab === 'all' && typeFilter === 'All'
              ? 'border-[#06402B] ring-2 ring-[#06402B]/15 bg-emerald-50/20'
              : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#06402B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs">
              <DollarSign size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
              <TrendingUp size={11} /> +28.4% YoY
            </span>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Total Capital Raised
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1 font-mono">
              ₦333.4M
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              1,420 contributions across Nigeria
            </p>
          </div>
        </div>

        {/* Card 2: Monthly Sustaining Patrons */}
        <div
          onClick={() => {
            setActiveTab('recurring');
            toast.success('Filtered by monthly recurring patrons.');
          }}
          className={`bg-white rounded-3xl p-5 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group ${
            activeTab === 'recurring'
              ? 'border-blue-600 ring-2 ring-blue-500/15 bg-blue-50/20'
              : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-[#0B2D6E] flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs">
              <HeartHandshake size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0B2D6E] border border-blue-200/60">
              Monthly Active
            </span>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Recurring Patrons
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1 font-mono">
              ₦4,250,000 <span className="text-xs text-slate-400 font-sans font-bold">/ mo</span>
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              1,280 active sustaining contributors (98.4%)
            </p>
          </div>
        </div>

        {/* Card 3: Corporate CSR & Grants */}
        <div
          onClick={() => {
            setActiveTab('corporate');
            setTypeFilter('Corporate');
            toast.success('Filtered by corporate CSR partners & institutional trusts.');
          }}
          className={`bg-white rounded-3xl p-5 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group ${
            activeTab === 'corporate'
              ? 'border-amber-600 ring-2 ring-amber-500/15 bg-amber-50/20'
              : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs">
              <Building size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
              14 Grants
            </span>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Corporate & CSR Grants
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1 font-mono">
              ₦220.0M
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
              100% audited programmatic allocation
            </p>
          </div>
        </div>

        {/* Card 4: Average Gift Velocity */}
        <div
          onClick={() => {
            toast.success('Settlement gateway speed: Average 3.8s settlement velocity via NIP.');
          }}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 text-purple-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs">
              <Zap size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200/60">
              Instant Settle
            </span>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Average Benefactor Gift
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1 font-mono">
              ₦234,800
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
              3.8s settlement velocity • 0 failed gates
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ACTIVE INFLOW TRAJECTORY & PILLAR ALLOCATION VISUALIZER
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Interactive Chart with Monthly / Quarterly Toggle */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-[#0B2D6E] tracking-tight">
                  Capital Inflow Trajectory & Target Velocity
                </h2>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md uppercase">
                  ₦ Millions
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {chartMode === 'monthly'
                  ? '12-month rolling philanthropic inflow measured against target velocity.'
                  : 'Quarterly aggregates comparing actual grants realized vs quarterly targets.'}
              </p>
            </div>

            {/* Chart Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setChartMode('monthly')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    chartMode === 'monthly'
                      ? 'bg-white text-[#06402B] shadow-2xs font-black'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setChartMode('quarterly')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    chartMode === 'quarterly'
                      ? 'bg-white text-[#06402B] shadow-2xs font-black'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Quarterly
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs font-bold pl-2">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <span className="w-3 h-3 rounded-md bg-[#06402B]" /> Inflow
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-1 rounded-full bg-slate-300" /> Target
                </span>
              </div>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2">
            {(chartMode === 'monthly' ? MONTHLY_INFLOW_DATA : QUARTERLY_INFLOW_DATA).map(
              (item, idx) => {
                const maxVal = chartMode === 'monthly' ? 55 : 120;
                const label = item.month || item.quarter;
                const barHeightPct = Math.round((item.amount / maxVal) * 100);
                const targetHeightPct = Math.round((item.target / maxVal) * 100);
                const isHovered = hoveredMonth === label;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredMonth(label)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    onClick={() => {
                      toast.success(
                        `${label}: ₦${item.amount}M realized (Target: ₦${item.target}M)`
                      );
                    }}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-2.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none border border-slate-700">
                        <span className="text-emerald-400 font-mono font-black">
                          ₦{item.amount}M
                        </span>{' '}
                        / Target: ₦{item.target}M
                        <span className="block text-[9px] text-slate-300 font-normal">
                          {Math.round((item.amount / item.target) * 100)}% of target met
                        </span>
                      </div>
                    )}

                    {/* Target Reference Dot */}
                    <div
                      className="absolute w-full flex justify-center pointer-events-none"
                      style={{ bottom: `${targetHeightPct}%` }}
                    >
                      <span className="w-2.5 h-0.5 bg-slate-400 rounded-full" />
                    </div>

                    {/* Main Inflow Bar */}
                    <div className="w-full max-w-[32px] h-full flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#f97316] shadow-md shadow-orange-500/20'
                            : 'bg-[#06402B] group-hover:bg-[#0B2D6E]'
                        }`}
                        style={{ height: `${barHeightPct}%` }}
                      />
                    </div>

                    {/* Month / Quarter Label */}
                    <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center group-hover:text-slate-800 transition-colors">
                      {label.split(' ')[0]}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Right 4 Cols: Pillar Allocation Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-[#0B2D6E] tracking-tight">
              Pillar Capital Deployment
            </h2>
            <p className="text-xs text-slate-500">
              Approved distribution of donor capital across strategic thematic areas.
            </p>
          </div>

          <div className="space-y-4 py-1">
            {/* Pillar 1: Education */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">Education & Human Capital</span>
                <span className="font-bold text-[#06402B]">45% (₦150.0M)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#06402B]" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Pillar 2: Health */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">Health & Well-being</span>
                <span className="font-bold text-[#0284c7]">32% (₦106.7M)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#0284c7]" style={{ width: '32%' }} />
              </div>
            </div>

            {/* Pillar 3: Resilience */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">Community Resilience</span>
                <span className="font-bold text-[#f97316]">23% (₦76.7M)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#f97316]" style={{ width: '23%' }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>External Audit: KPMG Verified</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> Clean Audit Opinion
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. TABS, SEARCH & FILTER CONTROL BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          {/* Sub-tabs with counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Transactions', count: donations.length },
              { id: 'campaigns', label: 'Active Appeals', count: CAMPAIGNS_LIST.length },
              {
                id: 'corporate',
                label: 'Corporate & Grants',
                count: donations.filter((d) => d.type === 'Corporate').length,
              },
              {
                id: 'recurring',
                label: 'Recurring Patrons',
                count: donations.filter((d) => d.paymentMethod.includes('Recurring')).length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5
                  ${
                    activeTab === tab.id
                      ? 'bg-[#06402B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    activeTab === tab.id
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search, Type Filter, Channel Filter, Status & View Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-52">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search donor, ref, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Donors</option>
              <option value="Corporate">Corporate</option>
              <option value="Individual">Individual</option>
              <option value="Foundation">Foundation</option>
            </select>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Channels</option>
              <option value="Bank Wire">Bank Wire</option>
              <option value="Paystack">Paystack</option>
              <option value="SWIFT">SWIFT</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#0B2D6E] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Table View"
              >
                <TableIcon size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0B2D6E] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            6. ACTIVE APPEALS VIEW OR TRANSACTIONS LEDGER
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'campaigns' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
            {CAMPAIGNS_LIST.map((camp) => {
              const pct = Math.min(100, Math.round((camp.raised / camp.target) * 100));

              return (
                <div
                  key={camp.id}
                  className="p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all space-y-3.5 bg-white flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#06402B] border border-emerald-100 text-[10px] font-bold">
                        {camp.pillar}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {camp.donorsCount} Donors
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors">
                      {camp.name}
                    </h3>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-900 font-mono">{camp.raisedFormatted} raised</span>
                      <span className="text-slate-400">Goal: {camp.targetFormatted}</span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#06402B] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-emerald-800">{pct}% funded</span>
                      <span className="text-slate-400 font-medium">{camp.daysLeft} days remaining</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery(camp.name);
                          setActiveTab('all');
                        }}
                        className="text-xs font-bold text-[#0B2D6E] hover:underline cursor-pointer"
                      >
                        Ledger →
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleShareAppeal(camp, e)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                        title="Copy shareable donation appeal link"
                      >
                        <Share2 size={13} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setNewGift((prev) => ({
                          ...prev,
                          campaign: camp.name,
                          pillar: camp.pillar,
                        }));
                        setCurrentView('record');
                        setCurrentStep(2);
                      }}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#06402B] hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      + Allocate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid Cards View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {filteredDonations.map((d) => (
              <div
                key={d.id}
                onClick={() => setSelectedDonationDetail(d)}
                className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#06402B] font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs group-hover:bg-[#06402B] group-hover:text-white transition-colors">
                        {d.type === 'Corporate' ? <Building size={16} /> : <User size={16} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs leading-tight line-clamp-1 group-hover:text-[#06402B] transition-colors">
                          {d.donorName}
                        </h4>
                        <span className="text-[10px] text-slate-400 truncate block">{d.email}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">{d.date}</span>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Valuation
                    </span>
                    <p className="font-black text-[#0B2D6E] font-mono text-lg">
                      ₦{d.amountFormatted}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-slate-600 font-semibold line-clamp-1">{d.campaign}</p>
                    <span className="text-[11px] text-slate-400 block">{d.paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCopyRef(d.reference, e)}
                    className="font-mono text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{d.reference}</span>
                    <Copy size={10} />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDonationDetail(d);
                      }}
                      className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-[#06402B] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="View Full Audit Lifecycle"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReceipt(d);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-[#06402B] hover:text-white transition-colors cursor-pointer shadow-2xs"
                    >
                      <Receipt size={13} />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-3">Transaction Reference</th>
                  <th className="py-3 px-3">Donor / Organization</th>
                  <th className="py-3 px-3">Designated Cause</th>
                  <th className="py-3 px-3">Channel</th>
                  <th className="py-3 px-3">Amount (NGN)</th>
                  <th className="py-3 px-3">Gateway Status</th>
                  <th className="py-3 px-3 text-right sticky right-0 bg-slate-50/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                      No donation records matching your filter parameters.
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDonationDetail(d)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-3">
                        <button
                          type="button"
                          onClick={(e) => handleCopyRef(d.reference, e)}
                          className="font-mono font-bold text-slate-800 hover:text-[#06402B] flex items-center gap-1.5 cursor-pointer text-left"
                          title="Click to copy reference"
                        >
                          <span>{d.reference}</span>
                          <Copy size={11} className="text-slate-400 hover:text-slate-600 shrink-0" />
                        </button>
                        <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                          {d.date}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#06402B] font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200/80 group-hover:bg-[#06402B] group-hover:text-white transition-colors">
                            {d.type === 'Corporate' ? <Building size={15} /> : <User size={15} />}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block group-hover:text-[#06402B] transition-colors">
                              {d.donorName}
                            </span>
                            <span className="text-[10px] text-slate-400">{d.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {d.campaign}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {d.paymentMethod}
                      </td>

                      <td className="py-3.5 px-3 font-black text-[#0B2D6E] font-mono text-sm">
                        ₦{d.amountFormatted}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {d.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right sticky right-0 bg-white/95 group-hover:bg-slate-50/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleSendGratitude(d, e)}
                            className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer transition-colors"
                            title="Send Gratitude Acknowledgment"
                          >
                            <Send size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReceipt(d);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-[#06402B] hover:text-white text-slate-700 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                            title="Generate Official Receipt"
                          >
                            <Receipt size={13} />
                            <span>Receipt</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over Detailed Audit Drawer */}
      {selectedDonationDetail && (
        <DonationDetailDrawer
          donation={selectedDonationDetail}
          onClose={() => setSelectedDonationDetail(null)}
          onOpenReceipt={(d) => setSelectedReceipt(d)}
          onSendGratitude={(d) => handleSendGratitude(d)}
        />
      )}

      {/* Official Signed Receipt Modal */}
      {selectedReceipt && (
        <DonationReceiptModal
          donation={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};

export default AdminDonationsSection;
