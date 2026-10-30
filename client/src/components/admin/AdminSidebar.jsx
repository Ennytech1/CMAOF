import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  TrendingUp,
  HeartHandshake,
  MessageSquare,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  FileBarChart,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronUp,
  Plus,
  LogOut,
  X,
  FileCheck2,
  GitBranch,
  ExternalLink,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CmaofLogo from '../CmaofLogo';

const AdminSidebar = ({
  activeTab,
  activeSubItem,
  onTabChange,
  mobileOpen,
  onMobileClose,
  onSignOut,
}) => {
  // Collapsible state for Beneficiaries and Programmes
  const [beneficiariesExpanded, setBeneficiariesExpanded] = useState(true);
  const [programmesExpanded, setProgrammesExpanded] = useState(false);

  // Beneficiaries sub-navigation items
  const beneficiarySubItems = [
    { id: 'beneficiaries-overview', label: 'Overview & Metrics', icon: LayoutDashboard, route: '/admin/beneficiaries' },
    { id: 'beneficiaries-directory', label: 'Beneficiary Directory', icon: Users, route: '/admin/beneficiaries/directory' },
    { id: 'beneficiaries-assessments', label: 'Needs Assessment', icon: FileCheck2, iconColor: 'text-amber-500', route: '/admin/beneficiaries/assessments' },
    { id: 'beneficiaries-cases', label: 'Case Management', icon: GitBranch, iconColor: 'text-sky-500', route: '/admin/beneficiaries/cases' },
    { id: 'beneficiaries-register', label: 'Register Beneficiary', icon: Plus, hasPlus: true, route: '/admin/beneficiaries/register' },
  ];

  // Programmes sub-navigation items (Portfolio is accessed directly by clicking 'Programmes')
  const programmesSubItems = [
    { id: 'programmes-register', label: 'Launch Programme', hasPlus: true, route: '/admin/programmes/launch' },
    { id: 'programmes-portfolio', label: 'Programmes Portfolio', route: '/admin/programmes' },
  ];

  const handleParentClick = (item) => {
    if (item.id === 'beneficiaries') {
      setBeneficiariesExpanded(true);
      onTabChange('beneficiaries', 'beneficiaries-overview');
    } else if (item.id === 'programmes') {
      setProgrammesExpanded(true);
      onTabChange('programmes', 'programmes-portfolio');
    } else {
      onTabChange(item.id);
    }
  };

  return (
    <>
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40
          w-64 h-screen max-h-screen bg-white text-slate-800 flex flex-col justify-between
          border-r border-slate-200/90 shadow-sm
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header with CMAOF Logo */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <CmaofLogo variant="light" asLink={false} imgClassName="h-9 w-auto object-contain" />
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-none text-xs sm:text-[13px]">
          {/* 1. Dashboard */}
          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'dashboard'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <LayoutDashboard size={17} className={activeTab === 'dashboard' ? 'text-white' : 'text-slate-500'} />
            <span>Dashboard</span>
          </button>

          {/* 2. Beneficiaries (Direct Overview Trigger + Collapsible Submenu) */}
          <div className="space-y-0.5">
            <div
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
                ${
                  activeTab === 'beneficiaries' && (!activeSubItem || activeSubItem === 'beneficiaries-overview')
                    ? 'bg-[#06402B] text-white shadow-sm'
                    : activeTab === 'beneficiaries'
                    ? 'text-[#06402B] bg-emerald-50/70'
                    : 'text-slate-700 hover:bg-slate-100'
                }
              `}
              onClick={() => handleParentClick({ id: 'beneficiaries' })}
            >
              <div className="flex items-center gap-3 flex-1 select-none">
                <Users
                  size={17}
                  className={
                    activeTab === 'beneficiaries' && (!activeSubItem || activeSubItem === 'beneficiaries-overview')
                      ? 'text-white'
                      : activeTab === 'beneficiaries'
                      ? 'text-[#06402B]'
                      : 'text-slate-500'
                  }
                />
                <span>Beneficiaries</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBeneficiariesExpanded(!beneficiariesExpanded);
                }}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'beneficiaries' && (!activeSubItem || activeSubItem === 'beneficiaries-overview')
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
                }`}
                title="Toggle submenu"
              >
                {beneficiariesExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>

            {/* Sub-items Indented */}
            {beneficiariesExpanded && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-slate-200 ml-5 my-0.5 animate-[fadeIn_0.15s_ease]">
                {beneficiarySubItems.map((sub) => {
                  const isSubActive =
                    activeTab === 'beneficiaries' && activeSubItem === sub.id;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onTabChange('beneficiaries', sub.id)}
                      className={`
                        w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left
                        ${
                          isSubActive
                            ? 'bg-[#06402B] text-white shadow-xs font-black'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }
                      `}
                    >
                      {sub.icon ? (
                        <sub.icon
                          size={13}
                          className={isSubActive ? 'text-white' : sub.iconColor || 'text-slate-400'}
                          strokeWidth={sub.hasPlus ? 3 : 2.2}
                        />
                      ) : sub.hasPlus ? (
                        <Plus size={12} strokeWidth={3} className={isSubActive ? 'text-white' : 'text-slate-400'} />
                      ) : null}
                      <span className="truncate">{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Programmes (Direct Portfolio Trigger + Collapsible Submenu) */}
          <div className="space-y-0.5">
            <div
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
                ${
                  activeTab === 'programmes' && (!activeSubItem || activeSubItem === 'programmes-portfolio')
                    ? 'bg-[#06402B] text-white shadow-sm'
                    : activeTab === 'programmes'
                    ? 'text-[#06402B] bg-emerald-50/70'
                    : 'text-slate-700 hover:bg-slate-100'
                }
              `}
              onClick={() => handleParentClick({ id: 'programmes' })}
            >
              <div className="flex items-center gap-3 flex-1 select-none">
                <Briefcase
                  size={17}
                  className={
                    activeTab === 'programmes' && (!activeSubItem || activeSubItem === 'programmes-portfolio')
                      ? 'text-white'
                      : activeTab === 'programmes'
                      ? 'text-[#06402B]'
                      : 'text-slate-500'
                  }
                />
                <span>Programmes</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProgrammesExpanded(!programmesExpanded);
                }}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'programmes' && (!activeSubItem || activeSubItem === 'programmes-portfolio')
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
                }`}
                title="Toggle submenu"
              >
                {programmesExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>

            {/* Sub-items Indented */}
            {programmesExpanded && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-slate-200 ml-5 my-0.5 animate-[fadeIn_0.15s_ease]">
                {programmesSubItems.map((sub) => {
                  const isSubActive =
                    activeTab === 'programmes' && activeSubItem === sub.id;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onTabChange('programmes', sub.id)}
                      className={`
                        w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left
                        ${
                          isSubActive
                            ? 'bg-[#06402B] text-white shadow-xs font-black'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }
                      `}
                    >
                      {sub.hasPlus && <Plus size={12} strokeWidth={3} className={isSubActive ? 'text-white' : 'text-slate-400'} />}
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Impact */}
          <button
            type="button"
            onClick={() => onTabChange('impact')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'impact'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <TrendingUp size={17} className={activeTab === 'impact' ? 'text-white' : 'text-slate-500'} />
            <span>Impact</span>
          </button>

          {/* 5. Donations */}
          <button
            type="button"
            onClick={() => onTabChange('donations')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'donations'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <HeartHandshake size={17} className={activeTab === 'donations' ? 'text-white' : 'text-slate-500'} />
            <span>Donations</span>
          </button>

          {/* 6. Newsletters & Broadcasts */}
          <button
            type="button"
            onClick={() => onTabChange('communications')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'communications'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <Send size={17} className={activeTab === 'communications' ? 'text-white' : 'text-slate-500'} />
            <div className="flex items-center justify-between flex-1">
              <span>Newsletters & Broadcasts</span>
            </div>
          </button>

          {/* 7. Events */}
          <button
            type="button"
            onClick={() => onTabChange('events')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'events'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <Calendar size={17} className={activeTab === 'events' ? 'text-white' : 'text-slate-500'} />
            <span>Events</span>
          </button>

          {/* 8. Resources */}
          <button
            type="button"
            onClick={() => onTabChange('resources')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'resources'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <BookOpen size={17} className={activeTab === 'resources' ? 'text-white' : 'text-slate-500'} />
            <span>Resources</span>
          </button>

          {/* 9. Media */}
          <button
            type="button"
            onClick={() => onTabChange('media')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'media'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <ImageIcon size={17} className={activeTab === 'media' ? 'text-white' : 'text-slate-500'} />
            <span>Media</span>
          </button>

          {/* 10. Reports */}
          <button
            type="button"
            onClick={() => onTabChange('reports')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'reports'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <FileBarChart size={17} className={activeTab === 'reports' ? 'text-white' : 'text-slate-500'} />
            <span>Reports</span>
          </button>

          {/* 11. Team */}
          <button
            type="button"
            onClick={() => onTabChange('team')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'users' || activeTab === 'team'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <UserCheck size={17} className={activeTab === 'users' || activeTab === 'team' ? 'text-white' : 'text-slate-500'} />
            <span>Team</span>
          </button>

          {/* 12. Approvals */}
          <button
            type="button"
            onClick={() => onTabChange('approvals')}
            className={`
              w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'approvals'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={17} className={activeTab === 'approvals' ? 'text-white' : 'text-slate-500'} />
              <span>Approvals</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
              5
            </span>
          </button>

          {/* 13. Audit */}
          <button
            type="button"
            onClick={() => onTabChange('audit')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'audit'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <ShieldCheck size={17} className={activeTab === 'audit' ? 'text-white' : 'text-slate-500'} />
            <span>Audit</span>
          </button>

          {/* 14. Settings */}
          <button
            type="button"
            onClick={() => onTabChange('settings')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'settings'
                  ? 'bg-[#06402B] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <Settings size={17} className={activeTab === 'settings' ? 'text-white' : 'text-slate-500'} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom Sidebar Footer & Logout */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-2">
          {/* Quick 1-Click Link to Live Public Website */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#06402B] text-xs font-bold transition-all border border-slate-200/80 hover:border-emerald-200 shadow-2xs group"
            title="Open Live CMAOF Public Website in new tab"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Live Website</span>
            </span>
            <ExternalLink size={13} className="text-slate-400 group-hover:text-[#06402B] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center justify-between px-1 text-xs">
            <span className="font-semibold text-[11px] text-slate-400">System v1.0 • 2026</span>
            <button
              type="button"
              onClick={onSignOut}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer transition-colors"
              title="Sign out"
            >
              <LogOut size={13} />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default AdminSidebar;
