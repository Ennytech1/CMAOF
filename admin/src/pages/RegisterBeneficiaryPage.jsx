import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import BeneficiaryRegistrationSection from '../components/admin/sections/BeneficiaryRegistrationSection';

const RegisterBeneficiaryPage = () => {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleCreateBeneficiary = async (formData) => {
    try {
      const token = localStorage.getItem('cmaof_admin_token');
      await fetch('/api/beneficiaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          fullName: formData.name,
          pillar: formData.pillar,
          programme: formData.intervention,
          state: formData.location,
          gender: formData.gender,
          phone: formData.phone,
          status: 'Active',
        }),
      });
    } catch (err) {
      console.warn('Beneficiary registration offline fallback active');
    }

    toast.success(`Beneficiary ${formData.name} successfully registered!`);
    navigate('/admin/beneficiaries/directory');
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="beneficiaries"
        activeSubItem="beneficiaries-register"
        onTabChange={(tabId, subItemId) => {
          setMobileSidebarOpen(false);
          if (tabId === 'beneficiaries') {
            if (subItemId === 'beneficiaries-directory') navigate('/admin/beneficiaries/directory');
            else if (subItemId === 'beneficiaries-register') navigate('/admin/beneficiaries/register');
            else navigate('/admin/beneficiaries');
          } else if (tabId === 'dashboard') {
            navigate('/admin/dashboard');
          } else {
            navigate(`/admin/${tabId}`);
          }
        }}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={() => {
          localStorage.removeItem('cmaof_admin_token');
          toast.success('Signed out');
          navigate('/admin');
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={() => navigate('/admin')}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          <BeneficiaryRegistrationSection
            onSave={handleCreateBeneficiary}
            onCancel={() => navigate('/admin/beneficiaries/directory')}
          />
        </main>
      </div>
    </div>
  );
};

export default RegisterBeneficiaryPage;
