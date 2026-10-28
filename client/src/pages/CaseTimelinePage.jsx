import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Circle,
  FileText,
  UserCheck,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { getBeneficiaryByIdOrCode } from '../data/beneficiariesData';

const CaseTimelinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const beneficiary = getBeneficiaryByIdOrCode(id || 'B-2026-001');

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // 8 Milestones matching Image 5
  const [milestones, setMilestones] = useState(
    beneficiary.timeline || [
      {
        id: 'step-1',
        title: 'Registration',
        date: '05 Oct 2026',
        description: 'Beneficiary registered by Hauwa Bello',
        status: 'Completed',
        statusType: 'completed',
        color: '#06402B',
      },
      {
        id: 'step-2',
        title: 'Assessment',
        date: '08 Oct 2026',
        description: 'Education needs assessment completed',
        status: 'Completed',
        statusType: 'completed',
        color: '#06402B',
      },
      {
        id: 'step-3',
        title: 'Approval',
        date: '10 Oct 2026',
        description: 'Approved for School Support Programme',
        status: 'Completed',
        statusType: 'completed',
        color: '#06402B',
      },
      {
        id: 'step-4',
        title: 'Intervention',
        date: '15 Oct 2026',
        description: 'School fees support provided',
        status: 'Completed',
        statusType: 'completed',
        color: '#0284c7',
      },
      {
        id: 'step-5',
        title: 'Referral',
        date: '02 Nov 2026',
        description: 'Referred for career guidance',
        status: 'In Progress',
        statusType: 'in-progress',
        color: '#f97316',
      },
      {
        id: 'step-6',
        title: 'Follow-up',
        date: '15 Nov 2026',
        description: 'Follow-up scheduled',
        status: 'Pending',
        statusType: 'pending',
        color: '#3b82f6',
      },
      {
        id: 'step-7',
        title: 'Outcome Measurement',
        date: '--',
        description: 'To be completed',
        status: 'Pending',
        statusType: 'pending',
        color: '#64748b',
      },
      {
        id: 'step-8',
        title: 'Closure',
        date: '--',
        description: 'To be completed',
        status: 'Pending',
        statusType: 'pending',
        color: '#475569',
      },
    ]
  );

  const [checkedSteps, setCheckedSteps] = useState(['step-1', 'step-2', 'step-3', 'step-4']);

  const toggleStepCheck = (stepId) => {
    if (checkedSteps.includes(stepId)) {
      setCheckedSteps(checkedSteps.filter((s) => s !== stepId));
    } else {
      setCheckedSteps([...checkedSteps, stepId]);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100/80 text-emerald-800 font-bold border border-emerald-200/60';
      case 'in progress':
        return 'bg-amber-100/90 text-amber-800 font-bold border border-amber-200/60';
      case 'pending':
        return 'bg-sky-50 text-sky-700 font-bold border border-sky-200/60';
      default:
        return 'bg-slate-100 text-slate-600 font-bold';
    }
  };

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

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="beneficiaries"
        activeSubItem="beneficiaries-directory"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={() => {
          localStorage.removeItem('cmaof_admin_token');
          toast.success('Signed out');
          navigate('/admin');
        }}
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
          onSignOut={() => {
            localStorage.removeItem('cmaof_admin_token');
            navigate('/admin');
          }}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          {/* Top Title & Breadcrumb matching Image 5 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-7 rounded-full bg-[#f97316]" />
                <h1 className="text-2xl sm:text-[1.65rem] font-black text-[#0B2D6E] tracking-tight">
                  Case Timeline
                </h1>
              </div>

              {/* Breadcrumb: 🏠 Beneficiaries > B-2026-001 > Case Management */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-1">
                <Link
                  to="/admin/beneficiaries"
                  className="flex items-center gap-1 hover:text-[#06402B] transition-colors"
                >
                  <Home size={13} className="text-slate-400" />
                  <span>Beneficiaries</span>
                </Link>
                <ChevronRight size={13} className="text-slate-300" />
                <Link
                  to={`/admin/beneficiaries/${beneficiary.code}`}
                  className="font-mono text-slate-700 hover:text-[#06402B]"
                >
                  {beneficiary.code}
                </Link>
                <ChevronRight size={13} className="text-slate-300" />
                <span className="font-bold text-[#06402B]">Case Management</span>
              </div>
            </div>

            {/* Right: View All Notes Link matching Image 5 */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toast('All Case Notes: 6 chronological case notes recorded on file.', { icon: '📝' })}
                className="text-xs font-bold text-sky-700 hover:text-[#0B2D6E] underline cursor-pointer"
              >
                View All Notes
              </button>

              <Link
                to={`/admin/beneficiaries/${beneficiary.code}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors ml-2"
              >
                <ArrowLeft size={13} />
                <span>Profile</span>
              </Link>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              3. CONNECTED 8-STEP VERTICAL TIMELINE matching Image 5
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
            <div className="divide-y divide-slate-100/80">
              {milestones.map((milestone, idx) => {
                const isChecked = checkedSteps.includes(milestone.id);
                const isLast = idx === milestones.length - 1;

                return (
                  <div
                    key={milestone.id}
                    className="py-4.5 sm:py-5 flex items-center justify-between gap-4 first:pt-2 last:pb-2 hover:bg-slate-50/50 rounded-xl px-2.5 transition-colors"
                  >
                    {/* Left: Checkbox + Connected Timeline Node */}
                    <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      
                      {/* Checkbox indicator on far left matching screenshot */}
                      <button
                        type="button"
                        onClick={() => toggleStepCheck(milestone.id)}
                        className={`
                          w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0
                          ${
                            isChecked
                              ? 'bg-[#06402B] border-[#06402B] text-white'
                              : 'border-slate-300 bg-white hover:border-slate-400'
                          }
                        `}
                      >
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </button>

                      {/* Connected Icon Node with Vertical Thread */}
                      <div className="relative flex items-center justify-center shrink-0">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xs"
                          style={{ backgroundColor: milestone.color || '#06402B' }}
                        >
                          <CheckCircle2 size={18} />
                        </div>
                      </div>

                      {/* Milestone Title + Date */}
                      <div className="w-36 sm:w-44 shrink-0">
                        <h3 className="text-sm font-black text-slate-900 tracking-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {milestone.date}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="flex-1 text-xs text-slate-600 font-medium truncate sm:whitespace-normal">
                        {milestone.description}
                      </div>

                    </div>

                    {/* Right: Status Pill matching Image 5 */}
                    <div className="shrink-0 pl-2">
                      <span
                        className={`
                          inline-block px-3.5 py-1 rounded-full text-xs font-bold text-center min-w-24
                          ${getStatusBadge(milestone.status)}
                        `}
                      >
                        {milestone.status}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseTimelinePage;
