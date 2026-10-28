import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Award,
  Users,
  Edit2,
  Printer,
  Plus,
  ChevronDown,
  Building,
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import BeneficiaryHeroCard from '../components/admin/beneficiary/BeneficiaryHeroCard';
import BeneficiaryTabsNav from '../components/admin/beneficiary/BeneficiaryTabsNav';
import BeneficiaryOverviewTab from '../components/admin/beneficiary/BeneficiaryOverviewTab';
import {
  BeneficiaryInterventionsTab,
  BeneficiaryReferralsTab,
  BeneficiaryFollowupTab,
  BeneficiaryDocumentsTab,
  BeneficiarySafeguardingTab,
} from '../components/admin/beneficiary/BeneficiaryOtherTabs';
import {
  EditProfileModal,
  RegisterInterventionModal,
} from '../components/admin/beneficiary/BeneficiaryActionModals';

import { getBeneficiaryByIdOrCode } from '../data/beneficiariesData';

const BeneficiaryProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load target beneficiary or default to Aisha Mohammed (B-2026-001)
  const [beneficiary, setBeneficiary] = useState(() => getBeneficiaryByIdOrCode(id || 'B-2026-001'));
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [moreActionsOpen, setMoreActionsOpen] = useState(false);

  // Modals state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setBeneficiary(getBeneficiaryByIdOrCode(id));
    }
  }, [id]);

  const handleTabSwitch = (tabId, subItem) => {
    setMobileSidebarOpen(false);
    if (tabId === 'beneficiaries') {
      if (subItem === 'beneficiaries-directory') navigate('/admin/beneficiaries/directory');
      else if (subItem === 'beneficiaries-register') navigate('/admin/beneficiaries/register');
      else navigate('/admin/beneficiaries');
    } else if (tabId === 'dashboard') {
      navigate('/admin/dashboard');
    } else {
      navigate(`/admin/${tabId}`);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('cmaof_admin_token');
    toast.success('Signed out of admin session');
    navigate('/admin');
  };

  const handleProfileSave = (updatedData) => {
    setBeneficiary((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="beneficiaries"
        activeSubItem="beneficiaries-overview"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT MAIN CONTENT AREA
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

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">
          {/* Top Breadcrumb & Actions matching Image 3 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
              <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
              <Link
                to="/admin/beneficiaries"
                className="flex items-center gap-1.5 hover:text-[#06402B] text-slate-500 transition-colors"
              >
                <Home size={14} className="text-slate-400" />
                <span>Beneficiaries</span>
              </Link>
              <ChevronRight size={13} className="text-slate-300" />
              <span className="font-mono font-bold text-[#0B2D6E]">
                {beneficiary.code}
              </span>
            </div>

            {/* Actions: Edit, Print, + More Actions matching Image 3 */}
            <div className="flex items-center gap-2 relative">
              <button
                type="button"
                onClick={() => setEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Edit2 size={13} className="text-slate-500" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success(`Printing dossier for ${beneficiary.name}...`);
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer size={13} className="text-slate-500" />
                <span>Print</span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreActionsOpen(!moreActionsOpen)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus size={13} />
                  <span>More Actions</span>
                  <ChevronDown size={13} />
                </button>

                {moreActionsOpen && (
                  <div
                    className="absolute right-0 top-10 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-xs text-left animate-[fadeIn_0.15s_ease]"
                    onMouseLeave={() => setMoreActionsOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMoreActionsOpen(false);
                        setInterventionModalOpen(true);
                      }}
                      className="w-full px-3.5 py-2 hover:bg-slate-50 font-semibold text-slate-700 text-left flex items-center gap-2"
                    >
                      <Plus size={13} className="text-[#06402B]" />
                      <span>Record New Intervention</span>
                    </button>

                    <Link
                      to={`/admin/beneficiaries/${beneficiary.code}/assessment`}
                      className="w-full px-3.5 py-2 hover:bg-slate-50 font-semibold text-slate-700 text-left flex items-center gap-2"
                    >
                      <FileText size={13} className="text-sky-600" />
                      <span>Needs Assessment Form</span>
                    </Link>

                    <Link
                      to={`/admin/beneficiaries/${beneficiary.code}/cases`}
                      className="w-full px-3.5 py-2 hover:bg-slate-50 font-semibold text-slate-700 text-left flex items-center gap-2"
                    >
                      <Calendar size={13} className="text-amber-600" />
                      <span>View Case Timeline</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hero Profile Card */}
          <BeneficiaryHeroCard
            beneficiary={beneficiary}
            onEditProfile={() => setEditModalOpen(true)}
            onPrint={() => window.print()}
          />

          {/* Sub-Tabs Navigation Bar matching Image 3 */}
          <BeneficiaryTabsNav
            activeTab={activeTab}
            onSelectTab={(tabId) => {
              if (tabId === 'needs-assessment') {
                navigate(`/admin/beneficiaries/${beneficiary.code}/assessment`);
              } else {
                setActiveTab(tabId);
              }
            }}
          />

          {/* Tab 1: Overview (3 Cards + Intervention History Table) */}
          {activeTab === 'overview' && (
            <BeneficiaryOverviewTab
              beneficiary={beneficiary}
              onOpenAddIntervention={() => setInterventionModalOpen(true)}
            />
          )}

          {/* Tab 2: Household Info Detailed View */}
          {activeTab === 'household' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                <h2 className="text-lg font-bold text-[#0B2D6E]">Household Composition & Guardian</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Head of Household</span>
                  <p className="text-sm font-bold text-slate-800 mt-1">{beneficiary.household?.head || 'Father'}</p>
                  <p className="text-slate-500 mt-0.5">{beneficiary.household?.guardianName || 'Mohammed Yusuf'}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Contact Details</span>
                  <p className="text-sm font-bold font-mono text-slate-800 mt-1">{beneficiary.household?.contactNumber || '0803 987 6543'}</p>
                  <p className="text-slate-500 mt-0.5">Verified Primary Phone</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Household Category</span>
                  <p className="text-sm font-bold text-amber-700 mt-1">{beneficiary.household?.householdType || 'Low-income'}</p>
                  <p className="text-slate-500 mt-0.5">{beneficiary.household?.size || 5} Total Dependents</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Interventions */}
          {activeTab === 'interventions' && (
            <BeneficiaryInterventionsTab beneficiary={beneficiary} />
          )}

          {/* Tab: Referrals */}
          {activeTab === 'referrals' && (
            <BeneficiaryReferralsTab beneficiary={beneficiary} />
          )}

          {/* Tab: Follow-up */}
          {activeTab === 'follow-up' && (
            <BeneficiaryFollowupTab beneficiary={beneficiary} />
          )}

          {/* Tab: Outcomes */}
          {activeTab === 'outcomes' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                <h2 className="text-lg font-bold text-[#0B2D6E]">Measured Outcomes & Indicators</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-2xl font-black text-emerald-800">96.4%</p>
                  <p className="text-xs font-bold text-emerald-950 mt-1">Class Attendance</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">+22% improvement from baseline</p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-center">
                  <p className="text-2xl font-black text-sky-800">B+ (78%)</p>
                  <p className="text-xs font-bold text-sky-950 mt-1">Academic Grade</p>
                  <p className="text-[11px] text-sky-700 mt-0.5">SS2 Terminal Examination</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                  <p className="text-2xl font-black text-amber-800">Tier 1</p>
                  <p className="text-xs font-bold text-amber-950 mt-1">Retention Stability</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Zero risk of school dropout</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Documents */}
          {activeTab === 'documents' && (
            <BeneficiaryDocumentsTab beneficiary={beneficiary} />
          )}

          {/* Tab: Safeguarding */}
          {activeTab === 'safeguarding' && (
            <BeneficiarySafeguardingTab beneficiary={beneficiary} />
          )}
        </main>
      </div>

      {/* Action Modals */}
      <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        beneficiary={beneficiary}
        onSave={handleProfileSave}
      />

      <RegisterInterventionModal
        isOpen={interventionModalOpen}
        onClose={() => setInterventionModalOpen(false)}
        beneficiary={beneficiary}
      />
    </div>
  );
};

export default BeneficiaryProfilePage;
