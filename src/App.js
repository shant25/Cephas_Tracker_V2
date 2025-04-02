import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CephasProvider } from './contexts/CephasContext';
import MainLayout from './components/layout/MainLayout';
import useCephas from './hooks/useCephas';
import { hasModuleAccess } from './utils/accessControl';

// Auth pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard pages
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import SupervisorDashboard from './pages/dashboard/SupervisorDashboard';
import ServiceInstallerDashboard from './pages/dashboard/ServiceInstallerDashboard';
import AccountantDashboard from './pages/dashboard/AccountantDashboard';
import WarehouseDashboard from './pages/dashboard/WarehouseDashboard';

// Building pages
import BuildingList from './pages/buildings/BuildingList';
import CreateBuilding from './pages/buildings/CreateBuilding';
import EditBuilding from './pages/buildings/EditBuilding';

// Activation/Modification pages
import ActivationList from './pages/activation/ActivationList';
import CreateActivation from './pages/activation/CreateActivation';
import EditActivation from './pages/activation/EditActivation';

// Assurance pages
import AssuranceList from './pages/assurance/AssuranceList';
import CreateAssurance from './pages/assurance/CreateAssurance';
import EditAssurance from './pages/assurance/EditAssurance';

// Splitter pages
import SplitterList from './pages/splitters/SplitterList';
import CreateSplitter from './pages/splitters/CreateSplitter';
import EditSplitter from './pages/splitters/EditSplitter';

// Materials pages
import MaterialList from './pages/materials/MaterialList';
import CreateMaterial from './pages/materials/CreateMaterial';
import EditMaterial from './pages/materials/EditMaterial';

// Service Installer pages
import ServiceInstallerList from './pages/serviceInstallers/ServiceInstallerList';
import CreateServiceInstaller from './pages/serviceInstallers/CreateServiceInstaller';
import EditServiceInstaller from './pages/serviceInstallers/EditServiceInstaller';

// Orders pages
import OrderList from './pages/orders/OrderList';
import CreateOrder from './pages/orders/CreateOrder';
import EditOrder from './pages/orders/EditOrder';

// Invoice pages
import InvoiceList from './pages/invoices/InvoiceList';
import CreateInvoice from './pages/invoices/CreateInvoice';
import EditInvoice from './pages/invoices/EditInvoice';

// Reports pages
import FinancialReports from './pages/reports/FinancialReports';
import OperationalReports from './pages/reports/OperationalReports';
import PerformanceReports from './pages/reports/PerformanceReports';

// Search page
import AdvancedSearch from './pages/search/AdvancedSearch';

// Import/Export pages
import ImportData from './pages/import/ImportData';
import ExportData from './pages/export/ExportData';

// Protected route component
const ProtectedRoute = ({ element, requiredModule }) => {
  const { isAuthenticated, userRole } = useCephas();
  
  // Check if user is authenticated and has access to the module
  const hasAccess = isAuthenticated && hasModuleAccess(userRole, requiredModule);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated but doesn't have access, redirect to dashboard
  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If authenticated and has access, render the element
  return element;
};

// AppRoutes component to use the useCephas hook
// App wrapper component to provide context
const App = () => {
  return (
    <Router>
      <CephasProvider>
        <AppRoutes />
      </CephasProvider>
    </Router>
  );
};

// AppRoutes component to use the useCephas hook
const AppRoutes = () => {
  const { isAuthenticated, userRole } = useCephas();
  
  // Function to get the appropriate dashboard based on user role
  const getDashboardByRole = () => {
    switch (userRole) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'supervisor':
        return <SupervisorDashboard />;
      case 'installer':
        return <ServiceInstallerDashboard />;
      case 'accountant':
        return <AccountantDashboard />;
      case 'warehouse':
        return <WarehouseDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };
  
  // Only render private routes if authenticated
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      {/* Dashboard route */}
      <Route path="/dashboard" element={
        <MainLayout>
          {getDashboardByRole()}
        </MainLayout>
      } />
      
      {/* Building routes */}
      <Route path="/building-list" element={
        <ProtectedRoute 
          element={<MainLayout><BuildingList /></MainLayout>} 
          requiredModule="building" 
        />
      } />
      <Route path="/building-detail" element={
        <ProtectedRoute 
          element={<MainLayout><CreateBuilding /></MainLayout>} 
          requiredModule="building" 
        />
      } />
      <Route path="/building-detail/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditBuilding /></MainLayout>} 
          requiredModule="building" 
        />
      } />
      
      {/* Activation/Modification routes */}
      <Route path="/activation" element={
        <ProtectedRoute 
          element={<MainLayout><ActivationList /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      <Route path="/activation/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateActivation /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      <Route path="/activation/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditActivation /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      
      {/* Assurance routes */}
      <Route path="/assurance" element={
        <ProtectedRoute 
          element={<MainLayout><AssuranceList /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      <Route path="/assurance/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateAssurance /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      <Route path="/assurance/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditAssurance /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      
      {/* Splitter routes */}
      <Route path="/splitter-list" element={
        <ProtectedRoute 
          element={<MainLayout><SplitterList /></MainLayout>} 
          requiredModule="splitter" 
        />
      } />
      <Route path="/splitter-list/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateSplitter /></MainLayout>} 
          requiredModule="splitter" 
        />
      } />
      <Route path="/splitter-list/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditSplitter /></MainLayout>} 
          requiredModule="splitter" 
        />
      } />
      
      {/* Materials routes */}
      <Route path="/materials" element={
        <ProtectedRoute 
          element={<MainLayout><MaterialList /></MainLayout>} 
          requiredModule="material" 
        />
      } />
      <Route path="/materials/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateMaterial /></MainLayout>} 
          requiredModule="material" 
        />
      } />
      <Route path="/materials/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditMaterial /></MainLayout>} 
          requiredModule="material" 
        />
      } />
      
      {/* Service Installer routes */}
      <Route path="/service-installers" element={
        <ProtectedRoute 
          element={<MainLayout><ServiceInstallerList /></MainLayout>} 
          requiredModule="service_installer" 
        />
      } />
      <Route path="/service-installers/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateServiceInstaller /></MainLayout>} 
          requiredModule="service_installer" 
        />
      } />
      <Route path="/service-installers/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditServiceInstaller /></MainLayout>} 
          requiredModule="service_installer" 
        />
      } />
      
      {/* Orders routes */}
      <Route path="/orders" element={
        <ProtectedRoute 
          element={<MainLayout><OrderList /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      <Route path="/orders/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateOrder /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      <Route path="/orders/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditOrder /></MainLayout>} 
          requiredModule="order" 
        />
      } />
      
      {/* Invoice routes */}
      <Route path="/invoices" element={
        <ProtectedRoute 
          element={<MainLayout><InvoiceList /></MainLayout>} 
          requiredModule="invoice" 
        />
      } />
      <Route path="/invoices/create" element={
        <ProtectedRoute 
          element={<MainLayout><CreateInvoice /></MainLayout>} 
          requiredModule="invoice" 
        />
      } />
      <Route path="/invoices/:id" element={
        <ProtectedRoute 
          element={<MainLayout><EditInvoice /></MainLayout>} 
          requiredModule="invoice" 
        />
      } />
      
      {/* Reports routes */}
      <Route path="/reports" element={
        <ProtectedRoute 
          element={<MainLayout><FinancialReports /></MainLayout>} 
          requiredModule="report" 
        />
      } />
      <Route path="/reports/financial" element={
        <ProtectedRoute 
          element={<MainLayout><FinancialReports /></MainLayout>} 
          requiredModule="report" 
        />
      } />
      <Route path="/reports/operational" element={
        <ProtectedRoute 
          element={<MainLayout><OperationalReports /></MainLayout>} 
          requiredModule="report" 
        />
      } />
      <Route path="/reports/performance" element={
        <ProtectedRoute 
          element={<MainLayout><PerformanceReports /></MainLayout>} 
          requiredModule="report" 
        />
      } />
      
      {/* Search route */}
      <Route path="/search" element={
        <ProtectedRoute 
          element={<MainLayout><AdvancedSearch /></MainLayout>} 
          requiredModule="search" 
        />
      } />
      
      {/* Import/Export routes */}
      <Route path="/import" element={
        <ProtectedRoute 
          element={<MainLayout><ImportData /></MainLayout>} 
          requiredModule="import" 
        />
      } />
      <Route path="/export" element={
        <ProtectedRoute 
          element={<MainLayout><ExportData /></MainLayout>} 
          requiredModule="export" 
        />
      } />
      
      {/* Redirect to dashboard by default */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Catch-all route - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;