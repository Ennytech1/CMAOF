import React, { useState } from 'react';
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
  TrendingUp,
  Home,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  Shield,
  Copy,
  CreditCard,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DonationReceiptModal } from '../donations/DonationModals';
import {
  INITIAL_DONATIONS,
  DONATION_STATS,
  CAMPAIGNS_LIST,
} from '../../../data/donationsData';

const RECORD_STEPS = [
  { id: 1, label: 'Donor Identity' },
  { id: 2, label: 'Gift & Channel' },
  { id: 3, label: 'Cause & Receipt' },
];

const AdminDonationsSection = () => {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'recurring', 'corporate', 'campaigns'
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Dedicated View State: 'ledger' | 'record' (NO POPUP MODAL)
  const [currentView, setCurrentView] = useState('ledger');
  const [currentStep, setCurrentStep] = useState(1);

  // Form State for Recording Offline Gift
  const [newGift, setNewGift] = useState({
    donorName: '',
    email: '',
    phone: '',
    donorType: 'Individual',
    amount: '',
    currency: 'NGN (₦)',
    paymentMethod: 'Direct Bank Wire Transfer',
    bankReference: '',
    campaign: 'School Support Programme',
    pillar: 'Education & Human Capital',
    dedicatedNote: '',
    taxReceiptRequired: true,
  });

  // Filter donations
  const filteredDonations = donations.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      d.donorName.toLowerCase().includes(q) ||
      d.reference.toLowerCase().includes(q) ||
      d.campaign.toLowerCase().includes(q);

    const matchesType =
      typeFilter === 'All' || d.type.toLowerCase() === typeFilter.toLowerCase();

    let matchesTab = true;
    if (activeTab === 'recurring') {
      matchesTab = d.campaign === 'Monthly Support' || d.paymentMethod.toLowerCase().includes('recurring');
    } else if (activeTab === 'corporate') {
      matchesTab = d.type.toLowerCase() === 'corporate';
    }

    return matchesSearch && matchesType && matchesTab;
  });

  // Copy reference to clipboard
  const handleCopyRef = (ref, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(ref);
    toast.success(`Copied reference "${ref}" to clipboard!`);
  };

  // Submit new recorded gift
  const handleConfirmRecordGift = () => {
    if (!newGift.donorName.trim()) {
      toast.error('Donor full name or corporate organization is required');
      return;
    }
    if (!newGift.amount.trim()) {
      toast.error('Please enter the donation amount');
      return;
    }

    const cleanedAmount = parseFloat(newGift.amount.replace(/[^0-9.]/g, '')) || 50000;
    const refCode = `CMAOF-TX-${Date.now().toString().slice(-6)}`;

    const created = {
      id: `don-${Date.now()}`,
      reference: refCode,
      donorName: newGift.donorName.trim(),
      email: newGift.email || 'donor@charity-partner.org',
      amount: cleanedAmount,
      amountFormatted: cleanedAmount.toLocaleString(),
      type: newGift.donorType,
      campaign: newGift.campaign,
      date: 'Today',
      status: 'Completed',
      paymentMethod: newGift.paymentMethod,
    };

    setDonations([created, ...donations]);
    toast.success(`Philanthropic gift of ₦${created.amountFormatted} recorded under ${created.reference}!`);
    setCurrentView('ledger');
    setCurrentStep(1);
    setNewGift({
      donorName: '',
      email: '',
      phone: '',
      donorType: 'Individual',
      amount: '',
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

  const handleSaveDraft = () => {
    toast.success('Offline contribution draft stored in session.');
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Reference', 'Donor Name', 'Amount (NGN)', 'Type', 'Campaign', 'Status', 'Payment Method'];
    const rows = filteredDonations.map((d) => [
      `"${d.date}"`,
      `"${d.reference}"`,
      `"${d.donorName}"`,
      `"${d.amount}"`,
      `"${d.type}"`,
      `"${d.campaign}"`,
      `"${d.status}"`,
      `"${d.paymentMethod}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CMAOF_Donations_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Donations ledger exported successfully!');
  };

  // ─────────────────────────────────────────────────────────────
  // DEDICATED IN-PLACE RECORD VIEW (Matches Register Beneficiary Design)
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'record') {
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
                    placeholder="e.g. Chief (Dr.) Michael Ade.Ojo / Toyota Nigeria CSR"
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
                    <option value="Direct Bank Wire Transfer">Direct Bank Wire Transfer (NIP/NIBSS)</option>
                    <option value="Bank Certified Cheque">Bank Certified Cheque / Draft</option>
                    <option value="POS Terminal Settlement">Foundation POS Terminal</option>
                    <option value="International Wire (SWIFT)">International Wire (USD/GBP SWIFT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Banking Transaction Reference</label>
                <input
                  type="text"
                  value={newGift.bankReference}
                  onChange={(e) => setNewGift({ ...newGift, bankReference: e.target.value })}
                  placeholder="e.g. CBN-REF-098274928173 or Cheque No. 0048291"
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
                    onChange={(e) => setNewGift({ ...newGift, campaign: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  >
                    <option value="School Support Programme">School Support Programme (Pillar 1)</option>
                    <option value="Medical Screening & Surgeries">Medical Screening & Surgeries (Pillar 2)</option>
                    <option value="Clean Water & Solar Boreholes">Clean Water & Solar Boreholes (Pillar 3)</option>
                    <option value="General Endowment Fund">Foundation General Endowment Fund</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar Alignment</label>
                  <input
                    type="text"
                    disabled
                    value={
                      newGift.campaign.includes('School')
                        ? 'Education & Human Capital'
                        : newGift.campaign.includes('Medical')
                        ? 'Health & Well-being'
                        : 'Community Resilience'
                    }
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
                  placeholder="e.g. Dedicated in honor of Late Chief Ade.Ojo Education Memorial..."
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
                  <span className="font-bold text-[#06402B]">Generate Tax Compliance Certificate:</span> Issue official signed CMAOF charitable contribution receipt and update the public transparency ledger.
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
              onClick={handleSaveDraft}
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
                  if (currentStep === 2 && !newGift.amount.trim()) {
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
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT DONATIONS LEDGER & CAMPAIGNS VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN EXECUTIVE HEADER (Orange Accent Pill + Controls)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-8 sm:h-9 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Donations & Philanthropic Capital
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Real-time ledger of institutional grants, corporate CSR matching, diaspora patrons, and micro-donations.
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
            onClick={() => {
              setCurrentView('record');
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Record Offline Gift</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 EXECUTIVE KPI FINANCIAL METRICS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Capital Raised */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#06402B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <DollarSign size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
              FY 2026/27
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Capital Raised
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              ₦245.3 Million
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              +28.4% growth vs previous cycle
            </p>
          </div>
        </div>

        {/* Card 2: Monthly Sustaining Patrons */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0B2D6E] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <HeartHandshake size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0B2D6E] border border-blue-100">
              Monthly Active
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recurring Patrons
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              ₦4,250,000 / mo
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              1,280 active sustaining contributors
            </p>
          </div>
        </div>

        {/* Card 3: Corporate & Grants */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Building size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100">
              14 Grants
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Institutional Grants
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              ₦148.0 Million
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
              100% audited programmatic deployment
            </p>
          </div>
        </div>

        {/* Card 4: Average Gift Size */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <TrendingUp size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-100">
              Blended Size
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Average Benefactor Gift
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              ₦185,400
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
              Inclusive micro & endowment contributions
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TABS & FILTER BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'recurring', label: 'Recurring Subscriptions' },
              { id: 'corporate', label: 'Corporate & Grants' },
              { id: 'campaigns', label: 'Campaign Appeals' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                  ${
                    activeTab === tab.id
                      ? 'bg-[#06402B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search donor, reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Corporate">Corporate</option>
              <option value="Individual">Individual</option>
              <option value="Foundation">Foundation</option>
            </select>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. ACTIVE CAMPAIGNS VIEW OR TRANSACTIONS TABLE
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'campaigns' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {CAMPAIGNS_LIST.map((camp) => {
              const pct = Math.min(100, Math.round((camp.raised / camp.target) * 100));
              return (
                <div
                  key={camp.id}
                  className="p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all space-y-3 bg-white flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#06402B] border border-emerald-100 text-[10px] font-bold">
                        {camp.pillar}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">{camp.donorsCount} Donors</span>
                    </div>
                    <h3 className="text-sm font-black text-[#0B2D6E] leading-snug">{camp.name}</h3>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-900 font-mono">₦{(camp.raised / 1000000).toFixed(1)}M raised</span>
                      <span className="text-slate-400">Target: ₦{(camp.target / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#06402B] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{pct}% funded</span>
                      <span className="font-bold text-emerald-600">Active Appeal</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-3">Transaction Reference</th>
                  <th className="py-3 px-3">Donor / Organization</th>
                  <th className="py-3 px-3">Designated Cause</th>
                  <th className="py-3 px-3">Channel</th>
                  <th className="py-3 px-3">Amount (NGN)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right sticky right-0 bg-slate-50/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">Actions</th>
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
                    <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
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
                        <span className="block text-[10px] font-normal text-slate-400 mt-0.5">{d.date}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#06402B] font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200/80">
                            {d.type === 'Corporate' ? <Building size={15} /> : <User size={15} />}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{d.donorName}</span>
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
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          <CheckCircle2 size={11} className="text-emerald-600" />
                          {d.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right sticky right-0 bg-white/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(d)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-[#06402B] hover:text-white text-slate-700 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                          title="Generate Official Receipt"
                        >
                          <Receipt size={13} />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Official Receipt Modal */}
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
