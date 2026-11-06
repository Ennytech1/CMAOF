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
import FounderProfilePage from './pages/FounderProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Redirects /admin visitors to the dedicated Admin Portal Subdomain
function AdminRedirect() {
  useEffect(() => {
    const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
    window.location.href = adminUrl;
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF6EE]/50 font-sans">
      <div className="w-10 h-10 border-4 border-[#5B2E19]/20 border-t-[#5B2E19] rounded-full animate-spin mb-4" />
      <h2 className="text-lg font-black text-[#5B2E19]">Redirecting to CMAOF Admin Portal...</h2>
      <p className="text-xs text-slate-500 mt-1">Please wait while we transfer you to the secure management console.</p>
    </div>
  );
}

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
          
          {/* Admin Portal Redirect (Routes to the separated Admin Subdomain) */}
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="/admin/*" element={<AdminRedirect />} />
          
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
