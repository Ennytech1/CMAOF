import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import BeneficiaryProfilePage from './pages/BeneficiaryProfilePage';
import RegisterBeneficiaryPage from './pages/RegisterBeneficiaryPage';
import NeedsAssessmentPage from './pages/NeedsAssessmentPage';
import CaseTimelinePage from './pages/CaseTimelinePage';
import ProgrammeDetailPage from './pages/ProgrammeDetailPage';
import DonationsPage from './pages/DonationsPage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const token = localStorage.getItem('cmaof_admin_token');

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-10 h-10 border-4 border-[#5B2E19]/20 border-t-[#5B2E19] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Login Route Guard: if already logged in, go to dashboard
const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('cmaof_admin_token');

  if (isAuthenticated || token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AdminLoginPage />;
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#3D1E10',
            color: '#FAF6EE',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '12px',
            border: '1px solid rgba(252, 205, 55, 0.25)',
          },
        }}
      />

      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/admin/login" element={<LoginRoute />} />

        {/* ── 1. DEDICATED DETAIL PAGES (Must be declared before catch-all wildcards) ── */}
        {/* Beneficiary Needs Assessment */}
        <Route
          path="/admin/beneficiaries/:id/assessment"
          element={
            <ProtectedRoute>
              <NeedsAssessmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/:id/assessment"
          element={
            <ProtectedRoute>
              <NeedsAssessmentPage />
            </ProtectedRoute>
          }
        />

        {/* Beneficiary Case Timeline */}
        <Route
          path="/admin/beneficiaries/:id/cases"
          element={
            <ProtectedRoute>
              <CaseTimelinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/:id/cases"
          element={
            <ProtectedRoute>
              <CaseTimelinePage />
            </ProtectedRoute>
          }
        />

        {/* Beneficiary Full Profile Dossier */}
        <Route
          path="/admin/beneficiaries/:id"
          element={
            <ProtectedRoute>
              <BeneficiaryProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/:id"
          element={
            <ProtectedRoute>
              <BeneficiaryProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Programme Detail Page */}
        <Route
          path="/admin/programmes/:slug"
          element={
            <ProtectedRoute>
              <ProgrammeDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/programmes/:slug"
          element={
            <ProtectedRoute>
              <ProgrammeDetailPage />
            </ProtectedRoute>
          }
        />

        {/* ── 2. DASHBOARD SPECIFIC SUB-SECTIONS (Clean URL & In-Dashboard routing) ── */}
        <Route
          path="/admin/beneficiaries/directory"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-directory" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/directory"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-directory" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/beneficiaries/assessments"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-assessments" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/assessments"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-assessments" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/beneficiaries/cases"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-cases" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/cases"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-cases" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/beneficiaries/register"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-register" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/register"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-register" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/beneficiaries"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-overview" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" initialSubItem="beneficiaries-overview" />
            </ProtectedRoute>
          }
        />

        {/* ── 3. GENERAL DASHBOARD SECTIONS ── */}
        {['donations', 'programmes', 'events', 'users', 'team', 'communications', 'reports', 'audit', 'settings', 'impact', 'approvals', 'resources', 'media'].map((tab) => (
          <React.Fragment key={tab}>
            <Route
              path={`/${tab}`}
              element={
                <ProtectedRoute>
                  <AdminDashboard initialTab={tab === 'team' ? 'users' : tab} />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/admin/${tab}`}
              element={
                <ProtectedRoute>
                  <AdminDashboard initialTab={tab === 'team' ? 'users' : tab} />
                </ProtectedRoute>
              }
            />
          </React.Fragment>
        ))}

        {/* Dashboard Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="dashboard" />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Wildcards */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/*"
          element={
            <ProtectedRoute>
              <AdminDashboard initialTab="beneficiaries" />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
