import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth & Common
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/profile/Profile';

// Super Admin
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import AdminManagement from './pages/super-admin/AdminManagement';
import GlobalClientManagement from './pages/super-admin/GlobalClientManagement';
import SystemAnalytics from './pages/super-admin/SystemAnalytics';
import SecurityCompliance from './pages/super-admin/SecurityCompliance';

// Admin
import AdminDashboard from './pages/admin/Dashboard';
import Clients from './pages/admin/Clients';
import Reports from './pages/admin/Reports';
import DocumentManagement from './pages/admin/DocumentManagement';
import SystemSettings from './pages/admin/SystemSettings';

// Client
import ClientDashboard from './pages/client/Dashboard';
import Upload from './pages/client/Upload';
import Documents from './pages/client/Documents';
import Audit from './pages/client/Audit';
import Compare from './pages/client/Compare';

import { HeaderProvider } from './context/HeaderContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <HeaderProvider>
        <Router>
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
        </Router>
      </HeaderProvider>
    </AuthProvider>
  );
}

export default App;
