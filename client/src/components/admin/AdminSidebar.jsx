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
    { id: 'beneficiaries-assessments', label: 'Needs Assessment', icon: FileCheck2, iconColor: 'text-[#D97706]', route: '/admin/beneficiaries/assessments' },
    { id: 'beneficiaries-cases', label: 'Case Management', icon: GitBranch, iconColor: 'text-[#0047BA]', route: '/admin/beneficiaries/cases' },
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
          w-64 h-screen max-h-screen bg-white text-[#3D1E10] flex flex-col justify-between
          border-r border-[#E8DEC2] shadow-sm
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header with CMAOF Logo */}
        <div className="p-4 sm:p-5 border-b border-[#E8DEC2] flex items-center justify-between shrink-0 bg-[#FAF6EE]/60">
          <div className="flex flex-col gap-1">
            <CmaofLogo variant="light" asLink={false} imgClassName="h-8.5 w-auto object-contain" />
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#338C26] animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B2E19]/70">Admin Command Center</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#FAF6EE] text-[#5B2E19] cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto scrollbar-none text-xs sm:text-[13px]">
          {/* 1. Dashboard */}
          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
              ${
                activeTab === 'dashboard'
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <LayoutDashboard size={17} className={activeTab === 'dashboard' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
            <span>Dashboard</span>
          </button>

          {/* 2. Beneficiaries (Direct Overview Trigger + Collapsible Submenu) */}
          <div className="space-y-0.5">
            <div
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer text-left
                ${
                  activeTab === 'beneficiaries' && (!activeSubItem || activeSubItem === 'beneficiaries-overview')
                    ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                    : activeTab === 'beneficiaries'
                    ? 'text-[#5B2E19] bg-[#FAF0D4]'
                    : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
                }
              `}
              onClick={() => handleParentClick({ id: 'beneficiaries' })}
            >
              <div className="flex items-center gap-3 flex-1 select-none">
                <Users
                  size={17}
                  className={
                    activeTab === 'beneficiaries' && (!activeSubItem || activeSubItem === 'beneficiaries-overview')
                      ? 'text-[#FCCD37]'
                      : activeTab === 'beneficiaries'
                      ? 'text-[#5B2E19]'
                      : 'text-[#5B2E19]/60'
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
                    ? 'text-[#FAF6EE]/80 hover:text-white hover:bg-white/10'
                    : 'text-[#5B2E19]/50 hover:text-[#5B2E19] hover:bg-[#FAF0D4]'
                }`}
                title="Toggle submenu"
              >
                {beneficiariesExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>

            {/* Sub-items Indented */}
            {beneficiariesExpanded && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#E8DEC2] ml-5 my-0.5 animate-[fadeIn_0.15s_ease]">
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
                            ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-xs font-black'
                            : 'text-[#5B2E19]/75 hover:text-[#3D1E10] hover:bg-[#FAF6EE]'
                        }
                      `}
                    >
                      {sub.icon ? (
                        <sub.icon
                          size={13}
                          className={isSubActive ? 'text-[#FCCD37]' : sub.iconColor || 'text-[#5B2E19]/50'}
                          strokeWidth={sub.hasPlus ? 3 : 2.2}
                        />
                      ) : sub.hasPlus ? (
                        <Plus size={12} strokeWidth={3} className={isSubActive ? 'text-[#FCCD37]' : 'text-[#5B2E19]/50'} />
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
                    ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                    : activeTab === 'programmes'
                    ? 'text-[#5B2E19] bg-[#FAF0D4]'
                    : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
                }
              `}
              onClick={() => handleParentClick({ id: 'programmes' })}
            >
              <div className="flex items-center gap-3 flex-1 select-none">
                <Briefcase
                  size={17}
                  className={
                    activeTab === 'programmes' && (!activeSubItem || activeSubItem === 'programmes-portfolio')
                      ? 'text-[#FCCD37]'
                      : activeTab === 'programmes'
                      ? 'text-[#5B2E19]'
                      : 'text-[#5B2E19]/60'
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
                    ? 'text-[#FAF6EE]/80 hover:text-white hover:bg-white/10'
                    : 'text-[#5B2E19]/50 hover:text-[#5B2E19] hover:bg-[#FAF0D4]'
                }`}
                title="Toggle submenu"
              >
                {programmesExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>

            {/* Sub-items Indented */}
            {programmesExpanded && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#E8DEC2] ml-5 my-0.5 animate-[fadeIn_0.15s_ease]">
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
                            ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-xs font-black'
                            : 'text-[#5B2E19]/75 hover:text-[#3D1E10] hover:bg-[#FAF6EE]'
                        }
                      `}
                    >
                      {sub.hasPlus && <Plus size={12} strokeWidth={3} className={isSubActive ? 'text-[#FCCD37]' : 'text-[#5B2E19]/50'} />}
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <TrendingUp size={17} className={activeTab === 'impact' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <HeartHandshake size={17} className={activeTab === 'donations' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <Send size={17} className={activeTab === 'communications' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <Calendar size={17} className={activeTab === 'events' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <BookOpen size={17} className={activeTab === 'resources' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <ImageIcon size={17} className={activeTab === 'media' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <FileBarChart size={17} className={activeTab === 'reports' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <UserCheck size={17} className={activeTab === 'users' || activeTab === 'team' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={17} className={activeTab === 'approvals' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
              <span>Approvals</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-[#FCCD37] text-[#3D1E10] font-black text-[10px] flex items-center justify-center shadow-xs">
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <ShieldCheck size={17} className={activeTab === 'audit' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
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
                  ? 'bg-[#5B2E19] text-[#FAF6EE] shadow-sm'
                  : 'text-[#5B2E19]/80 hover:bg-[#FAF6EE] hover:text-[#3D1E10]'
              }
            `}
          >
            <Settings size={17} className={activeTab === 'settings' ? 'text-[#FCCD37]' : 'text-[#5B2E19]/60'} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom Sidebar Footer & Logout */}
        <div className="p-3.5 border-t border-[#E8DEC2] bg-[#FAF6EE]/50 shrink-0 space-y-2">
          {/* Quick 1-Click Link to Live Public Website */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-[#FAF0D4] text-[#5B2E19] text-xs font-bold transition-all border border-[#E8DEC2] shadow-2xs group"
            title="Open Live CMAOF Public Website in new tab"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#338C26] animate-pulse shrink-0" />
              <span>Live Website</span>
            </span>
            <ExternalLink size={13} className="text-[#5B2E19]/60 group-hover:text-[#5B2E19] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center justify-between px-1 text-xs">
            <span className="font-semibold text-[11px] text-[#5B2E19]/50">CMAOF v2.6 • 2026</span>
            <button
              type="button"
              onClick={onSignOut}
              className="text-[#5B2E19] hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer transition-colors"
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
          className="fixed inset-0 bg-[#3D1E10]/60 backdrop-blur-xs z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default AdminSidebar;
