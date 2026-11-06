import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminImpactSection from '../components/admin/sections/AdminImpactSection';

const ImpactDashboardPage = () => {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleTabSwitch = (tabId, subItem) => {
    setMobileSidebarOpen(false);
    if (tabId === 'beneficiaries') {
      if (subItem === 'beneficiaries-directory') navigate('/admin/beneficiaries/directory');
      else if (subItem === 'beneficiaries-assessments') navigate('/admin/beneficiaries/assessments');
      else if (subItem === 'beneficiaries-cases') navigate('/admin/beneficiaries/cases');
      else if (subItem === 'beneficiaries-register') navigate('/admin/beneficiaries/register');
      else navigate('/admin/beneficiaries');
    } else if (tabId === 'dashboard') {
      navigate('/admin/dashboard');
    } else if (tabId === 'programmes') {
      navigate('/admin/programmes');
    } else if (tabId === 'donations') {
      navigate('/admin/donations');
    } else if (tabId === 'impact') {
      navigate('/admin/impact');
    } else {
      navigate(`/admin/${tabId}`);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('cmaof_admin_token');
    toast.success('Signed out of admin session');
    navigate('/admin/login');
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* 1. FIXED 100VH LEFT SIDEBAR */}
      <AdminSidebar
        activeTab="impact"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={handleSignOut}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Container Rendering Exact Screenshot Layout & Improvements */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">
          <AdminImpactSection />
        </main>
      </div>
    </div>
  );
};

export default ImpactDashboardPage;
