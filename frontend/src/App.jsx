import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth & Common
import Login from './pages/auth/Login';
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

function App() {
  return (
    <HeaderProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="/super-admin/dashboard" element={<DashboardLayout role="super-admin"><SuperAdminDashboard /></DashboardLayout>} />
          <Route path="/super-admin/admins" element={<DashboardLayout role="super-admin"><AdminManagement /></DashboardLayout>} />
          <Route path="/super-admin/clients" element={<DashboardLayout role="super-admin"><GlobalClientManagement /></DashboardLayout>} />
          <Route path="/super-admin/analytics" element={<DashboardLayout role="super-admin"><SystemAnalytics /></DashboardLayout>} />
          <Route path="/super-admin/compliance" element={<DashboardLayout role="super-admin"><SecurityCompliance /></DashboardLayout>} />
          <Route path="/super-admin/profile" element={<DashboardLayout role="super-admin"><Profile /></DashboardLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>} />
          <Route path="/admin/clients" element={<DashboardLayout role="admin"><Clients /></DashboardLayout>} />
          <Route path="/admin/uploads" element={<DashboardLayout role="admin"><DocumentManagement /></DashboardLayout>} />
          <Route path="/admin/reports" element={<DashboardLayout role="admin"><Reports /></DashboardLayout>} />
          <Route path="/admin/settings" element={<DashboardLayout role="admin"><SystemSettings /></DashboardLayout>} />
          <Route path="/admin/profile" element={<DashboardLayout role="admin"><Profile /></DashboardLayout>} />

          {/* Client Routes */}
          <Route path="/dashboard" element={<DashboardLayout role="client"><ClientDashboard /></DashboardLayout>} />
          <Route path="/client/upload" element={<DashboardLayout role="client"><Upload /></DashboardLayout>} />
          <Route path="/client/documents" element={<DashboardLayout role="client"><Documents /></DashboardLayout>} />
          <Route path="/client/audit" element={<DashboardLayout role="client"><Audit /></DashboardLayout>} />
          <Route path="/client/compare" element={<DashboardLayout role="client"><Compare /></DashboardLayout>} />
          <Route path="/client/profile" element={<DashboardLayout role="client"><Profile /></DashboardLayout>} />

          {/* Common */}
          <Route path="/profile" element={<Navigate to="/client/profile" replace />} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all to 404/Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </HeaderProvider>
  );
}

export default App;
