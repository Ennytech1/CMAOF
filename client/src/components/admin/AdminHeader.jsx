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
    <header className="sticky top-0 z-20 w-full bg-white border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs shrink-0">
      {/* Left: Mobile hamburger + Global Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions + User Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5 ml-4">
        {/* Analytics button */}
        <button
          type="button"
          onClick={() => toast.success('Analytics overview updated.')}
          className="hidden sm:flex p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          title="Analytics"
        >
          <BarChart3 size={18} />
        </button>

        {/* Notifications with Red Pill Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center px-1 shadow-xs ring-2 ring-white">
              11
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-[fadeIn_0.15s_ease]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-xs text-[#0B2D6E]">Notifications</h4>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black">
                  11 Unread
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto my-2 text-xs">
                <div className="py-2.5">
                  <p className="font-bold text-slate-800">5 Beneficiary Approvals</p>
                  <p className="text-slate-500 text-[11px]">Scholarship verification batch awaiting director review</p>
                </div>
                <div className="py-2.5">
                  <p className="font-bold text-slate-800">New Donation Inflow</p>
                  <p className="text-slate-500 text-[11px]">₦2.5M allocated for Kaduna Education Pillar</p>
                </div>
                <div className="py-2.5">
                  <p className="font-bold text-slate-800">Partner Inquiry</p>
                  <p className="text-slate-500 text-[11px]">Dangote Foundation partnership request received</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsOpen(false)}
                className="w-full text-center py-1.5 text-[11px] font-bold text-[#06402B] hover:underline cursor-pointer"
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
          className="hidden sm:flex p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 size={17} />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-6 bg-slate-200" />

        {/* User Profile Chip */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer"
          >
            <img
              src="/images/leader_director.jpg"
              alt="Abiola Kabiru"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-emerald-700/20 shadow-xs shrink-0"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-xs sm:text-[13px] text-[#0B2D6E]">Abiola Kabiru</p>
              <p className="text-[10px] text-slate-400 font-medium">Executive Admin</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-[fadeIn_0.15s_ease]">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-xs text-slate-800">Abiola Kabiru</p>
                <p className="text-[11px] text-slate-500">abiola@cmaof.org</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(false);
                  if (onOpenSettings) onOpenSettings();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <Settings size={14} /> Profile Settings
              </button>
              <Link
                to="/"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <ExternalLink size={14} /> View Public Website
              </Link>
              <div className="my-1 border-t border-slate-100" />
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
