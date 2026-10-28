import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

// Core Admin Components
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverviewSection from '../components/admin/AdminOverviewSection';
import BeneficiaryDirectorySection from '../components/admin/BeneficiaryDirectorySection';
import BeneficiaryManagementDashboardSection from '../components/admin/beneficiary/BeneficiaryManagementDashboardSection';
import BeneficiaryRegistrationSection from '../components/admin/sections/BeneficiaryRegistrationSection';
import BeneficiaryDossierModal from '../components/admin/BeneficiaryDossierModal';

// Modular Feature Sections
import AdminProgrammesSection from '../components/admin/sections/AdminProgrammesSection';
import ProgrammeRegistrationSection from '../components/admin/sections/ProgrammeRegistrationSection';
import AdminCommunicationsSection from '../components/admin/sections/AdminCommunicationsSection';
import AdminDonationsSection from '../components/admin/sections/AdminDonationsSection';
import AdminImpactSection from '../components/admin/sections/AdminImpactSection';
import AdminEventsSection from '../components/admin/sections/AdminEventsSection';
import AdminResourcesSection from '../components/admin/sections/AdminResourcesSection';
import AdminMediaSection from '../components/admin/sections/AdminMediaSection';
import AdminReportsSection from '../components/admin/sections/AdminReportsSection';
import AdminUsersSection from '../components/admin/sections/AdminUsersSection';
import AdminApprovalsSection from '../components/admin/sections/AdminApprovalsSection';
import AdminAuditSection from '../components/admin/sections/AdminAuditSection';
import AdminSettingsSection from '../components/admin/sections/AdminSettingsSection';

import { BENEFICIARIES_DATA } from '../data/beneficiariesData';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = ({ initialTab, initialSubItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();

  // Protect admin route
  useEffect(() => {
    const token = localStorage.getItem('cmaof_admin_token');
    if (!loading && !isAuthenticated && !token) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Determine initial tab from route or prop
  const getInitialTab = () => {
    if (initialTab) return initialTab;
    const path = location.pathname;
    if (path.includes('/beneficiaries/directory')) return 'beneficiaries';
    if (path.includes('/beneficiaries')) return 'beneficiaries';
    if (path.includes('/dashboard')) return 'dashboard';
    
    // Check if path matches any registered tab
    const segments = path.replace('/admin/', '').split('/');
    const mainSegment = segments[0];
    const knownTabs = [
      'dashboard', 'beneficiaries', 'programmes', 'impact', 'donations',
      'communications', 'events', 'resources', 'media', 'reports',
      'users', 'approvals', 'audit', 'settings'
    ];
    if (knownTabs.includes(mainSegment)) return mainSegment;
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [activeSubItem, setActiveSubItem] = useState(
    initialSubItem || (location.pathname.includes('/directory') ? 'beneficiaries-directory' : 'beneficiaries-overview')
  );

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Beneficiaries State loaded from central dataset
  const [beneficiaries, setBeneficiaries] = useState(BENEFICIARIES_DATA);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedBeneficiaryDetail, setSelectedBeneficiaryDetail] = useState(null);

  // Live stats
  const [stats, setStats] = useState({
    totalBeneficiaries: 12480,
    activeCases: 3260,
    newRegistrations: 1245,
    pendingAssessments: 320,
    openReferrals: 186,
    completedInterventions: 4820,
    measuredOutcomes: 3960,
    donationsReceived: '₦245.3M',
  });

  // Fetch real donation stats & registered beneficiaries from backend
  useEffect(() => {
    const token = localStorage.getItem('cmaof_admin_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch('/api/donations/stats', { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.success && res.data) {
          setStats((prev) => ({
            ...prev,
            donationsReceived: res.data.formattedTotal || '₦245.3M',
          }));
        }
      })
      .catch(() => {});

    // Fetch live beneficiaries if available
    fetch('/api/beneficiaries', { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setBeneficiaries((prev) => {
            const existingCodes = new Set(prev.map((p) => p.code));
            const newRecords = res.data
              .filter((r) => !existingCodes.has(r.code))
              .map((r) => ({
                id: r._id || r.id,
                code: r.code,
                name: r.name || r.fullName,
                photo: r.photoPreview || r.photo || '/images/story_amina.jpg',
                type: r.beneficiaryType || r.type || 'Individual',
                pillar: r.pillar,
                location: r.state || r.location,
                ageGender: `${r.age || '16'}/${r.gender?.[0] || 'F'}`,
                status: r.status || 'Active',
                assignedOfficer: r.assignedOfficer || 'Hauwa Bello',
                dateRegistered: r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB') : '28 Oct 2026',
                phone: r.phone || '+234 800 000 0000',
                gender: r.gender,
                intervention: r.programme || r.intervention || 'Field Intervention Programme',
              }));
            return [...newRecords, ...prev];
          });
        }
      })
      .catch(() => {});
  }, []);

  // Sync route changes when user presses browser back/forward buttons
  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin/beneficiaries/directory') {
      setActiveTab('beneficiaries');
      setActiveSubItem('beneficiaries-directory');
    } else if (path === '/admin/beneficiaries/register') {
      setActiveTab('beneficiaries');
      setActiveSubItem('beneficiaries-register');
    } else if (path === '/admin/beneficiaries') {
      setActiveTab('beneficiaries');
      setActiveSubItem('beneficiaries-overview');
    } else if (path === '/admin/programmes/launch' || path === '/admin/programmes/register') {
      setActiveTab('programmes');
      setActiveSubItem('programmes-register');
    } else if (path === '/admin/programmes') {
      setActiveTab('programmes');
      setActiveSubItem('programmes-portfolio');
    } else if (path === '/admin/dashboard') {
      setActiveTab('dashboard');
      setActiveSubItem(null);
    } else if (path.startsWith('/admin/')) {
      const tab = path.replace('/admin/', '').split('/')[0];
      if (tab && tab !== 'login') {
        setActiveTab(tab);
        setActiveSubItem(null);
      }
    }
  }, [location.pathname]);

  // Tab switch handler with instant in-page state and URL sync
  const handleTabSwitch = (tabId, subItemId) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);

    if (tabId === 'beneficiaries') {
      if (subItemId === 'beneficiaries-directory') {
        setActiveSubItem('beneficiaries-directory');
        window.history.replaceState(null, '', '/admin/beneficiaries/directory');
      } else if (subItemId === 'beneficiaries-register') {
        setActiveSubItem('beneficiaries-register');
        window.history.replaceState(null, '', '/admin/beneficiaries/register');
      } else {
        setActiveSubItem('beneficiaries-overview');
        window.history.replaceState(null, '', '/admin/beneficiaries');
      }
    } else if (tabId === 'programmes') {
      if (subItemId === 'programmes-register') {
        setActiveSubItem('programmes-register');
        window.history.replaceState(null, '', '/admin/programmes/launch');
      } else {
        setActiveSubItem('programmes-portfolio');
        window.history.replaceState(null, '', '/admin/programmes');
      }
    } else if (tabId === 'dashboard') {
      setActiveSubItem(null);
      window.history.replaceState(null, '', '/admin/dashboard');
    } else {
      setActiveSubItem(null);
      window.history.replaceState(null, '', `/admin/${tabId}`);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    await logout();
    toast.success('Signed out of admin session');
    navigate('/admin/login');
  };

  // Add new beneficiary handler with API persistence & fallback
  const handleCreateBeneficiary = async (formData) => {
    const nextId = beneficiaries.length + 1;
    const nextCode = `B-2026-${String(nextId).padStart(3, '0')}`;
    const todayStr = '28 Oct 2026';

    const created = {
      id: nextId,
      code: nextCode,
      name: formData.name.trim(),
      photo: '/images/story_amina.jpg',
      type: formData.type || 'Individual',
      pillar: formData.pillar,
      location: formData.location,
      ageGender: `${formData.age || '16'}/${formData.gender?.[0] || 'F'}`,
      status: formData.status || 'Active',
      assignedOfficer: formData.assignedOfficer || 'Hauwa Bello',
      dateRegistered: todayStr,
      phone: formData.phone || '+234 800 000 0000',
      gender: formData.gender,
      intervention: formData.intervention || 'Field Intervention Programme',
    };

    // Attempt backend persistence
    try {
      const token = localStorage.getItem('cmaof_admin_token');
      await fetch('/api/beneficiaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          fullName: created.name,
          pillar: created.pillar,
          programme: created.intervention,
          state: created.location,
          gender: formData.gender,
          phone: created.phone,
          status: created.status,
        }),
      });
    } catch (err) {
      console.warn('Beneficiary API sync notice (offline mode active):', err.message);
    }

    setBeneficiaries([created, ...beneficiaries]);
    setStats((prev) => ({
      ...prev,
      totalBeneficiaries: prev.totalBeneficiaries + 1,
    }));
    toast.success(`Beneficiary ${created.name} (${created.code}) registered successfully!`);
    setRegisterModalOpen(false);
  };

  // Delete beneficiary handler
  const handleDeleteBeneficiary = (id, name) => {
    setBeneficiaries((prev) => prev.filter((item) => item.id !== id));
    toast.success(`${name} removed from active register`);
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab={activeTab}
        activeSubItem={activeSubItem}
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA (Offset by Sidebar on Desktop)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={handleSignOut}
          onOpenSettings={() => handleTabSwitch('settings')}
        />

        {/* Dynamic Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          {/* 1. Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <AdminOverviewSection
              stats={stats}
              onNavigateToBeneficiaries={() => handleTabSwitch('beneficiaries', 'beneficiaries-overview')}
            />
          )}

          {/* 2. Beneficiaries Overview */}
          {activeTab === 'beneficiaries' && (!activeSubItem || activeSubItem === 'beneficiaries-overview') && (
            <BeneficiaryManagementDashboardSection />
          )}

          {/* 2b. Beneficiaries Directory */}
          {activeTab === 'beneficiaries' && activeSubItem === 'beneficiaries-directory' && (
            <BeneficiaryDirectorySection
              beneficiaries={beneficiaries}
              totalBeneficiariesCount={stats.totalBeneficiaries}
              onOpenRegisterModal={() => handleTabSwitch('beneficiaries', 'beneficiaries-register')}
              onViewDossier={(b) => setSelectedBeneficiaryDetail(b)}
              onDeleteBeneficiary={handleDeleteBeneficiary}
            />
          )}

          {/* 2c. Register New Beneficiary (Dedicated 6-Step Multi-Phase Form) */}
          {activeTab === 'beneficiaries' && activeSubItem === 'beneficiaries-register' && (
            <BeneficiaryRegistrationSection
              onSave={(formData) => {
                handleCreateBeneficiary(formData);
                handleTabSwitch('beneficiaries', 'beneficiaries-directory');
              }}
              onCancel={() => handleTabSwitch('beneficiaries', 'beneficiaries-directory')}
            />
          )}

          {/* 3a. Launch Strategic Programme (Dedicated 5-Step Multi-Phase Form) */}
          {activeTab === 'programmes' && activeSubItem === 'programmes-register' && (
            <ProgrammeRegistrationSection
              onSave={(formData) => {
                toast.success(`Strategic initiative "${formData.name}" launched successfully!`);
                handleTabSwitch('programmes', 'programmes-portfolio');
              }}
              onCancel={() => handleTabSwitch('programmes', 'programmes-portfolio')}
            />
          )}

          {/* 3b. Programmes Portfolio Management */}
          {activeTab === 'programmes' && activeSubItem !== 'programmes-register' && (
            <AdminProgrammesSection
              onSelectProgramme={(progOrSlug) => navigate(`/admin/programmes/${typeof progOrSlug === 'string' ? progOrSlug : progOrSlug.slug || progOrSlug.id}`)}
              onLaunchProgramme={() => handleTabSwitch('programmes', 'programmes-register')}
            />
          )}

          {/* 4. Impact */}
          {activeTab === 'impact' && (
            <AdminImpactSection />
          )}

          {/* 5. Donations */}
          {activeTab === 'donations' && (
            <AdminDonationsSection />
          )}

          {/* 6. Communications */}
          {activeTab === 'communications' && (
            <AdminCommunicationsSection />
          )}

          {/* 7. Events Logistics & Scheduling */}
          {activeTab === 'events' && (
            <AdminEventsSection />
          )}

          {/* 8. Resources & Publications Repository */}
          {activeTab === 'resources' && (
            <AdminResourcesSection />
          )}

          {/* 9. Media & High-Res Story Assets */}
          {activeTab === 'media' && (
            <AdminMediaSection />
          )}

          {/* 10. Reports & Transparency Dossiers */}
          {activeTab === 'reports' && (
            <AdminReportsSection />
          )}

          {/* 11. Staff Users & Role Clearance */}
          {activeTab === 'users' && (
            <AdminUsersSection />
          )}

          {/* 12. Approvals Queue & Authorizations */}
          {activeTab === 'approvals' && (
            <AdminApprovalsSection />
          )}

          {/* 13. Audit & Cryptographic Security */}
          {activeTab === 'audit' && (
            <AdminAuditSection />
          )}

          {/* 14. Foundation Settings & Configuration */}
          {activeTab === 'settings' && (
            <AdminSettingsSection />
          )}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. DOSSIER DETAIL MODAL (No simple register popup!)
      ───────────────────────────────────────────────────────────── */}
      <BeneficiaryDossierModal
        beneficiary={selectedBeneficiaryDetail}
        onClose={() => setSelectedBeneficiaryDetail(null)}
      />
    </div>
  );
};

export default AdminDashboard;
