import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// Auth & Common
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Profile = lazy(() => import('./pages/profile/Profile'));

// Super Admin
const SuperAdminDashboard = lazy(() => import('./pages/super-admin/Dashboard'));
const AdminManagement = lazy(() => import('./pages/super-admin/AdminManagement'));
const GlobalClientManagement = lazy(() => import('./pages/super-admin/GlobalClientManagement'));
const SystemAnalytics = lazy(() => import('./pages/super-admin/SystemAnalytics'));
const SecurityCompliance = lazy(() => import('./pages/super-admin/SecurityCompliance'));

// Admin
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const Clients = lazy(() => import('./pages/admin/Clients'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const DocumentManagement = lazy(() => import('./pages/admin/DocumentManagement'));
const SystemSettings = lazy(() => import('./pages/admin/SystemSettings'));

// Client
const ClientDashboard = lazy(() => import('./pages/client/Dashboard'));
const Upload = lazy(() => import('./pages/client/Upload'));
const Documents = lazy(() => import('./pages/client/Documents'));
const Audit = lazy(() => import('./pages/client/Audit'));
const Compare = lazy(() => import('./pages/client/Compare'));
const DocumentView = lazy(() => import('./pages/client/DocumentView'));

import { HeaderProvider } from './context/HeaderContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Prefetch Manager
const PrefetchRoutes = () => {
  useEffect(() => {
    // Prefetch critical client routes after initial mount
    const prefetch = () => {
      import('./pages/client/Documents');
      import('./pages/client/Audit');
      import('./pages/client/Upload');
      import('./pages/client/Compare');
    };
    
    // Delay slightly to ensure primary page (Dashboard) is fully interactive
    const timer = setTimeout(prefetch, 2000);
    return () => clearTimeout(timer);
  }, []);
  return null;
};

// Premium Minimalist Loader
const PageLoader = () => (
  <div className="fixed inset-0 bg-white dark:bg-[#0c0a09] z-[10000] flex flex-col items-center justify-center gap-6">
    <div className="w-12 h-12 relative">
      <div className="absolute inset-0 border-2 border-slate-100 dark:border-slate-800 rounded-xl" />
      <div className="absolute inset-0 border-t-2 border-primary rounded-xl animate-spin" />
    </div>
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white animate-pulse">Initializing</span>
      <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Mindex Vault Node</span>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <HeaderProvider>
        <Router>
          <PrefetchRoutes />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Super Admin Routes */}
              <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
              <Route path="/super-admin/dashboard" element={<ProtectedRoute role="admin"><DashboardLayout role="super-admin"><SuperAdminDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/super-admin/admins" element={<ProtectedRoute role="admin"><DashboardLayout role="super-admin"><AdminManagement /></DashboardLayout></ProtectedRoute>} />
              <Route path="/super-admin/clients" element={<ProtectedRoute role="admin"><DashboardLayout role="super-admin"><GlobalClientManagement /></DashboardLayout></ProtectedRoute>} />
              <Route path="/super-admin/analytics" element={<ProtectedRoute role="admin"><DashboardLayout role="super-admin"><SystemAnalytics /></DashboardLayout></ProtectedRoute>} />
              <Route path="/super-admin/compliance" element={<ProtectedRoute role="admin"><DashboardLayout role="super-admin"><SecurityCompliance /></DashboardLayout></ProtectedRoute>} />
              <Route path="/super-admin/profile" element={<ProtectedRoute role="admin"><DashboardLayout role="super-admin"><Profile /></DashboardLayout></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><DashboardLayout role="admin"><AdminDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/admin/clients" element={<ProtectedRoute role="admin"><DashboardLayout role="admin"><Clients /></DashboardLayout></ProtectedRoute>} />
              <Route path="/admin/uploads" element={<ProtectedRoute role="admin"><DashboardLayout role="admin"><DocumentManagement /></DashboardLayout></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute role="admin"><DashboardLayout role="admin"><Reports /></DashboardLayout></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute role="admin"><DashboardLayout role="admin"><SystemSettings /></DashboardLayout></ProtectedRoute>} />
              <Route path="/admin/profile" element={<ProtectedRoute role="admin"><DashboardLayout role="admin"><Profile /></DashboardLayout></ProtectedRoute>} />

              {/* Client Routes */}
              <Route path="/dashboard" element={<ProtectedRoute role="user"><DashboardLayout role="client"><ClientDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/upload" element={<ProtectedRoute role="user"><DashboardLayout role="client"><Upload /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/documents" element={<ProtectedRoute role="user"><DashboardLayout role="client"><Documents /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/documents/:id" element={<ProtectedRoute role="user"><DashboardLayout role="client"><DocumentView /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/audit" element={<ProtectedRoute role="user"><DashboardLayout role="client"><Audit /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/audit/:id" element={<ProtectedRoute role="user"><DashboardLayout role="client"><Audit /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/compare" element={<ProtectedRoute role="user"><DashboardLayout role="client"><Compare /></DashboardLayout></ProtectedRoute>} />
              <Route path="/client/profile" element={<ProtectedRoute role="user"><DashboardLayout role="client"><Profile /></DashboardLayout></ProtectedRoute>} />

              {/* Common */}
              <Route path="/profile" element={<Navigate to="/client/profile" replace />} />

              {/* Default Redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Catch-all to 404/Login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
          
          {/* Global Branding Bar */}
          <a 
            href="https://mindbrain.co.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex fixed bottom-0 left-0 right-0 h-6 bg-slate-900/90 backdrop-blur-sm items-center justify-center z-[9999] transition-all hover:h-7 hover:bg-slate-900 border-t border-white/5"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">
              Made by <span className="text-amber-400 hover:text-white transition-colors">MINDBRAIN INNOVATION PVT LTD</span>
            </span>
          </a>
        </Router>
      </HeaderProvider>
    </AuthProvider>
  );
}

export default App;
