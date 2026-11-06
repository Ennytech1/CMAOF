import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  BarChart3,
  Maximize2,
  ChevronDown,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminHeader = ({
  searchQuery,
  onSearchChange,
  onToggleMobileSidebar,
  onSignOut,
  onOpenSettings,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-[#E8DEC2] px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs shrink-0">
      {/* Left: Mobile hamburger + Global Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl hover:bg-[#FAF6EE] text-[#5B2E19] transition-colors cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B2E19]/50 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search beneficiaries, grants, pillars, transactions..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF6EE]/50 border border-[#E8DEC2] text-xs sm:text-sm text-[#3D1E10] placeholder:text-[#5B2E19]/40 focus:outline-none focus:border-[#5B2E19] focus:ring-2 focus:ring-[#5B2E19]/10 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions + User Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5 ml-4">
        {/* Analytics button */}
        <button
          type="button"
          onClick={() => toast.success('Analytics overview refreshed with live data.')}
          className="hidden sm:flex p-2 rounded-xl hover:bg-[#FAF6EE] text-[#5B2E19]/70 hover:text-[#5B2E19] transition-colors cursor-pointer"
          title="Quick Analytics"
        >
          <BarChart3 size={18} />
        </button>

        {/* Notifications with Sun Yellow Pill Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl hover:bg-[#FAF6EE] text-[#5B2E19]/70 hover:text-[#5B2E19] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#FCCD37] text-[#3D1E10] font-black text-[10px] flex items-center justify-center px-1 shadow-xs ring-2 ring-white">
              11
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E8DEC2] p-4 z-50 animate-[fadeIn_0.15s_ease]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC2]/60">
                <h4 className="font-bold text-xs text-[#3D1E10]">Notifications</h4>
                <span className="px-2 py-0.5 rounded-full bg-[#FAF0D4] text-[#5B2E19] border border-[#E8DEC2] text-[10px] font-black">
                  11 Unread
                </span>
              </div>
              <div className="divide-y divide-[#E8DEC2]/50 max-h-64 overflow-y-auto my-2 text-xs">
                <div className="py-2.5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#3D1E10]">5 Beneficiary Approvals</p>
                    <span className="text-[10px] text-[#5B2E19]/50">Today</span>
                  </div>
                  <p className="text-[#5B2E19]/70 text-[11px] mt-0.5">Scholarship verification batch awaiting director review</p>
                </div>
                <div className="py-2.5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#3D1E10]">New Donation Inflow</p>
                    <span className="text-[10px] text-[#338C26] font-bold">₦2.5M</span>
                  </div>
                  <p className="text-[#5B2E19]/70 text-[11px] mt-0.5">Allocated for Kaduna Education & Opportunity Pillar</p>
                </div>
                <div className="py-2.5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#3D1E10]">Partner Outreach</p>
                    <span className="text-[10px] text-[#5B2E19]/50">Yesterday</span>
                  </div>
                  <p className="text-[#5B2E19]/70 text-[11px] mt-0.5">Dangote Foundation partnership request received</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsOpen(false)}
                className="w-full text-center py-1.5 text-[11px] font-bold text-[#5B2E19] hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Fullscreen Toggle Button */}
        <button
          type="button"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="hidden sm:flex p-2 rounded-xl hover:bg-[#FAF6EE] text-[#5B2E19]/70 hover:text-[#5B2E19] transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 size={17} />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-6 bg-[#E8DEC2]" />

        {/* User Profile Chip */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-[#FAF6EE] transition-colors text-left cursor-pointer border border-transparent hover:border-[#E8DEC2]"
          >
            <img
              src="/images/leader_director.jpg"
              alt="Abiola Kabiru"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-[#FCCD37] shadow-xs shrink-0"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-xs sm:text-[13px] text-[#3D1E10]">Abiola Kabiru</p>
              <p className="text-[10px] text-[#5B2E19]/70 font-semibold">Executive Director • CMAOF</p>
            </div>
            <ChevronDown size={14} className="text-[#5B2E19]/50" />
          </button>

          {/* User Menu Dropdown */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8DEC2] p-2 z-50 animate-[fadeIn_0.15s_ease]">
              <div className="px-3 py-2 border-b border-[#E8DEC2]/60 mb-1">
                <p className="font-bold text-xs text-[#3D1E10]">Abiola Kabiru</p>
                <p className="text-[11px] text-[#5B2E19]/70">abiola@cmaof.org</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#338C26]" />
                  <span className="text-[10px] font-bold text-[#338C26]">MFA Verified</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(false);
                  if (onOpenSettings) onOpenSettings();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF6EE] text-xs font-semibold text-[#3D1E10] transition-colors cursor-pointer"
              >
                <Settings size={14} className="text-[#5B2E19]" /> Profile & Governance
              </button>
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF6EE] text-xs font-semibold text-[#3D1E10] transition-colors"
              >
                <ExternalLink size={14} className="text-[#5B2E19]" /> Live Public Website
              </Link>
              <div className="my-1 border-t border-[#E8DEC2]/60" />
              <button
                type="button"
                onClick={onSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-50 text-xs font-bold text-rose-600 transition-colors cursor-pointer"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
