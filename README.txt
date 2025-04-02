# Cephas Tracker v2 - File Structure

```
cephas-tracker-v2/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.png
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── forms/
│   │   │   ├── ActivationForm.jsx
│   │   │   ├── AssuranceForm.jsx
│   │   │   ├── BuildingForm.jsx
│   │   │   ├── InvoiceForm.jsx
│   │   │   ├── MaterialForm.jsx
│   │   │   ├── OrderForm.jsx
│   │   │   ├── ServiceInstallerForm.jsx
│   │   │   └── SplitterForm.jsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── AppNavigation.jsx
│   │   ├── modals/
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── JobAssignModal.jsx
│   │   │   └── MaterialAssignModal.jsx
│   │   └── widgets/
│   │       ├── JobCard.jsx
│   │       ├── MaterialCard.jsx
│   │       ├── RevenueChart.jsx
│   │       ├── ScheduleSummary.jsx
│   │       └── StatsCard.jsx
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── CephasContext.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCephas.js
│   │   ├── useForm.js
│   │   └── useNotification.js
│   ├── pages/
│   │   ├── activation/
│   │   │   ├── ActivationList.jsx
│   │   │   ├── CreateActivation.jsx
│   │   │   └── EditActivation.jsx
│   │   ├── assurance/
│   │   │   ├── AssuranceList.jsx
│   │   │   ├── CreateAssurance.jsx
│   │   │   └── EditAssurance.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── buildings/
│   │   │   ├── BuildingList.jsx
│   │   │   ├── CreateBuilding.jsx
│   │   │   └── EditBuilding.jsx
│   │   ├── dashboard/
│   │   │   ├── SuperAdminDashboard.jsx
│   │   │   ├── SupervisorDashboard.jsx
│   │   │   ├── ServiceInstallerDashboard.jsx
│   │   │   ├── AccountantDashboard.jsx
│   │   │   └── WarehouseDashboard.jsx
│   │   ├── invoices/
│   │   │   ├── InvoiceList.jsx
│   │   │   ├── CreateInvoice.jsx
│   │   │   └── EditInvoice.jsx
│   │   ├── materials/
│   │   │   ├── MaterialList.jsx
│   │   │   ├── CreateMaterial.jsx
│   │   │   └── EditMaterial.jsx
│   │   ├── orders/
│   │   │   ├── OrderList.jsx
│   │   │   ├── CreateOrder.jsx
│   │   │   └── EditOrder.jsx
│   │   ├── reports/
│   │   │   ├── FinancialReports.jsx
│   │   │   ├── OperationalReports.jsx
│   │   │   └── PerformanceReports.jsx
│   │   ├── search/
│   │   │   └── AdvancedSearch.jsx
│   │   ├── serviceInstallers/
│   │   │   ├── ServiceInstallerList.jsx
│   │   │   ├── CreateServiceInstaller.jsx
│   │   │   └── EditServiceInstaller.jsx
│   │   ├── settings/
│   │   │   ├── UserManagement.jsx
│   │   │   ├── SystemSettings.jsx
│   │   │   └── ProfileSettings.jsx
│   │   └── splitters/
│   │       ├── SplitterList.jsx
│   │       ├── CreateSplitter.jsx
│   │       └── EditSplitter.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── building.service.js
│   │   ├── invoice.service.js
│   │   ├── material.service.js
│   │   ├── order.service.js
│   │   ├── serviceInstaller.service.js
│   │   ├── splitter.service.js
│   │   └── user.service.js
│   ├── utils/
│   │   ├── accessControl.js
│   │   ├── dateUtils.js
│   │   ├── formatters.js
│   │   ├── notification.js
│   │   └── validators.js
│   ├── App.js
│   ├── config.js
│   ├── index.js
│   └── routes.js
├── .env
├── .env.development
├── .env.production
├── .gitignore
├── jsconfig.json
├── package.json
├── README.md
└── tailwind.config.js
```