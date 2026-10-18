import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonateModal from './components/DonateModal';
import SearchModal from './components/SearchModal';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWork from './pages/OurWork';
import EducationPillar from './pages/EducationPillar';
import HealthPillar from './pages/HealthPillar';
import CommunityPillar from './pages/CommunityPillar';
import ImpactPage from './pages/ImpactPage';
import MultimediaGallery from './pages/MultimediaGallery';
import GetInvolved from './pages/GetInvolved';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import PoliciesPage from './pages/PoliciesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleOpenDonate = () => setDonateModalOpen(true);
  const handleOpenSearch = () => setSearchModalOpen(true);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-800 selection:text-white">
        
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
            <Route path="/founder" element={<AboutUs onOpenDonate={handleOpenDonate} />} />
            
            <Route path="/our-work" element={<OurWork onOpenDonate={handleOpenDonate} />} />
            <Route path="/our-work/education" element={<EducationPillar onOpenDonate={handleOpenDonate} />} />
            <Route path="/our-work/health" element={<HealthPillar onOpenDonate={handleOpenDonate} />} />
            <Route path="/our-work/community-resilience" element={<CommunityPillar onOpenDonate={handleOpenDonate} />} />
            
            <Route path="/impact" element={<ImpactPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/gallery" element={<MultimediaGallery onOpenDonate={handleOpenDonate} />} />
            <Route path="/news" element={<MultimediaGallery onOpenDonate={handleOpenDonate} />} />
            <Route path="/event" element={<GetInvolved onOpenDonate={handleOpenDonate} />} />
            <Route path="/events" element={<GetInvolved onOpenDonate={handleOpenDonate} />} />
            <Route path="/get-involved" element={<GetInvolved onOpenDonate={handleOpenDonate} />} />
            <Route path="/resources" element={<ResourcesPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Institutional Footer */}
        <Footer onOpenDonate={handleOpenDonate} />

        {/* Modals */}
        <DonateModal
          isOpen={donateModalOpen}
          onClose={() => setDonateModalOpen(false)}
        />
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />

      </div>
    </Router>
  );
}

export default App;
