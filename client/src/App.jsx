import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWork from './pages/OurWork';
import EducationPillar from './pages/EducationPillar';
import HealthPillar from './pages/HealthPillar';
import HumanitarianSupportPillar from './pages/HumanitarianSupportPillar';
import EconomicEmpowermentPillar from './pages/EconomicEmpowermentPillar';
import ImpactPage from './pages/ImpactPage';
import MultimediaGallery from './pages/MultimediaGallery';
import GetInvolved from './pages/GetInvolved';
import EventsPage from './pages/EventsPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import PoliciesPage from './pages/PoliciesPage';
import DonatePage from './pages/DonatePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import BeneficiaryProfilePage from './pages/BeneficiaryProfilePage';
import RegisterBeneficiaryPage from './pages/RegisterBeneficiaryPage';
import NeedsAssessmentPage from './pages/NeedsAssessmentPage';
import ProgrammeDetailPage from './pages/ProgrammeDetailPage';
import DonationsPage from './pages/DonationsPage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import CaseTimelinePage from './pages/CaseTimelinePage';
import FounderProfilePage from './pages/FounderProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Global Route Change Scroll-to-Top Handler
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleOpenDonate = () => {
    navigate('/donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleOpenSearch = () => setSearchModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]/20 text-slate-900 font-sans selection:bg-[#FCCD37] selection:text-[#5B2E19]">
      {/* Scroll restoration on every navigation */}
      <ScrollToTop />
      
      {/* Toast Notification Container */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Global Navigation Header */}
      <Navbar
        onOpenDonate={handleOpenDonate}
        onOpenSearch={handleOpenSearch}
      />

      {/* Dynamic Route Pages — pt-[72px] offsets the fixed navbar for all inner pages */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenDonate={handleOpenDonate} />} />
          <Route path="/about" element={<AboutUs onOpenDonate={handleOpenDonate} />} />
          <Route path="/founder" element={<FounderProfilePage onOpenDonate={handleOpenDonate} />} />
          <Route path="/about/founder" element={<FounderProfilePage onOpenDonate={handleOpenDonate} />} />
          
          <Route path="/our-work" element={<OurWork onOpenDonate={handleOpenDonate} />} />
          <Route path="/our-work/education" element={<EducationPillar onOpenDonate={handleOpenDonate} />} />
          <Route path="/our-work/health" element={<HealthPillar onOpenDonate={handleOpenDonate} />} />
          {/* Official Pillar 3: Humanitarian Support (with legacy bookmark alias) */}
          <Route path="/our-work/humanitarian-support" element={<HumanitarianSupportPillar onOpenDonate={handleOpenDonate} />} />
          <Route path="/our-work/community-resilience" element={<HumanitarianSupportPillar onOpenDonate={handleOpenDonate} />} />
          {/* Official Pillar 4: Economic Empowerment */}
          <Route path="/our-work/economic-empowerment" element={<EconomicEmpowermentPillar onOpenDonate={handleOpenDonate} />} />
          
          <Route path="/impact" element={<ImpactPage onOpenDonate={handleOpenDonate} />} />
          <Route path="/gallery" element={<MultimediaGallery onOpenDonate={handleOpenDonate} />} />
          <Route path="/news" element={<MultimediaGallery onOpenDonate={handleOpenDonate} />} />
          <Route path="/event" element={<EventsPage onOpenDonate={handleOpenDonate} />} />
          <Route path="/events" element={<EventsPage onOpenDonate={handleOpenDonate} />} />
          <Route path="/get-involved" element={<GetInvolved onOpenDonate={handleOpenDonate} />} />
          <Route path="/resources" element={<ResourcesPage onOpenDonate={handleOpenDonate} />} />
          <Route path="/contact" element={<ContactPage onOpenDonate={handleOpenDonate} />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/donate" element={<DonatePage />} />
          
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard initialTab="dashboard" />} />
          <Route path="/admin/beneficiaries" element={<AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-overview" />} />
          <Route path="/admin/beneficiaries/directory" element={<AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-directory" />} />
          <Route path="/admin/beneficiaries/assessment" element={<AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-assessments" />} />
          <Route path="/admin/beneficiaries/assessments" element={<AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-assessments" />} />
          <Route path="/admin/beneficiaries/cases" element={<AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-cases" />} />
          <Route path="/admin/beneficiaries/register" element={<AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-register" />} />
          <Route path="/admin/beneficiaries/:id/assessment" element={<NeedsAssessmentPage />} />
          <Route path="/admin/beneficiaries/:id/cases" element={<CaseTimelinePage />} />
          <Route path="/admin/beneficiaries/:id" element={<BeneficiaryProfilePage />} />
          <Route path="/admin/programmes" element={<AdminDashboard initialTab="programmes" />} />
          <Route path="/admin/programmes/:id" element={<ProgrammeDetailPage />} />
          <Route path="/admin/donations" element={<AdminDashboard initialTab="donations" />} />
          <Route path="/admin/impact" element={<AdminDashboard initialTab="impact" />} />
          <Route path="/admin/communications" element={<AdminDashboard initialTab="communications" />} />
          <Route path="/admin/events" element={<AdminDashboard initialTab="events" />} />
          <Route path="/admin/resources" element={<AdminDashboard initialTab="resources" />} />
          <Route path="/admin/media" element={<AdminDashboard initialTab="media" />} />
          <Route path="/admin/reports" element={<AdminDashboard initialTab="reports" />} />
          <Route path="/admin/users" element={<AdminDashboard initialTab="team" />} />
          <Route path="/admin/team" element={<AdminDashboard initialTab="team" />} />
          <Route path="/admin/approvals" element={<AdminDashboard initialTab="approvals" />} />
          <Route path="/admin/audit" element={<AdminDashboard initialTab="audit" />} />
          <Route path="/admin/settings" element={<AdminDashboard initialTab="settings" />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Global Institutional Footer */}
      <Footer onOpenDonate={handleOpenDonate} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
