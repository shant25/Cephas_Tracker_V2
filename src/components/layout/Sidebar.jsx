import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCephas from '../../hooks/useCephas';
import { hasModuleAccess } from '../../utils/accessControl';
import { 
  Search, 
  FileText, 
  Settings, 
  List, 
  Package, 
  Users, 
  File, 
  Download, 
  Upload, 
  Menu, 
  BarChart2,
  Home
} from 'lucide-react';

/**
 * Sidebar component displaying navigation links based on user role
 */
const Sidebar = ({ open }) => {
  const { userRole } = useCephas();
  const location = useLocation();
  
  // Define navigation items with access control
  const navItems = [
    { 
      icon: <Home size={20} />, 
      text: 'DASHBOARD', 
      path: '/dashboard',
      module: 'dashboard'
    },
    { 
      icon: <Search size={20} />, 
      text: 'SEARCH', 
      path: '/search',
      module: 'search'
    },
    { 
      icon: <Settings size={20} />, 
      text: 'ACTIVATION/MODIFICATION', 
      path: '/activation',
      module: 'order'
    },
    { 
      icon: <FileText size={20} />, 
      text: 'ASSURANCE', 
      path: '/assurance',
      module: 'order'
    },
    { 
      icon: <FileText size={20} />, 
      text: 'BUILDING DETAIL', 
      path: '/building-detail',
      module: 'building'
    },
    { 
      icon: <List size={20} />, 
      text: 'BUILDING LIST', 
      path: '/building-list',
      module: 'building'
    },
    { 
      icon: <List size={20} />, 
      text: 'SPLITTER LIST', 
      path: '/splitter-list',
      module: 'splitter'
    },
    { 
      icon: <Package size={20} />, 
      text: 'MATERIALS', 
      path: '/materials',
      module: 'material'
    },
    { 
      icon: <Settings size={20} />, 
      text: 'SERVICE INSTALLERS', 
      path: '/service-installers',
      module: 'service_installer'
    },
    { 
      icon: <Users size={20} />, 
      text: 'ORDERS', 
      path: '/orders',
      module: 'order'
    },
    { 
      icon: <File size={20} />, 
      text: 'INVOICES', 
      path: '/invoices',
      module: 'invoice'
    },
    { 
      icon: <BarChart2 size={20} />, 
      text: 'REPORTS', 
      path: '/reports',
      module: 'report'
    },
    { 
      icon: <Download size={20} />, 
      text: 'IMPORT', 
      path: '/import',
      module: 'import'
    },
    { 
      icon: <Upload size={20} />, 
      text: 'EXPORT', 
      path: '/export',
      module: 'export'
    }
  ];
  
  // Filter nav items based on user role and access permissions
  const filteredNavItems = navItems.filter(item => 
    hasModuleAccess(userRole, item.module)
  );
  
  return (
    <div 
      className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
        open ? 'w-64' : 'w-20'
      } fixed left-0 z-10`}
    >
      {/* Logo area */}
      <div className="p-4 border-b border-gray-800">
        <div className={`flex ${open ? 'justify-center' : 'justify-center'}`}>
          <img src="/api/placeholder/150/50" alt="Cephas Logo" className="h-8" />
        </div>
        {open && (
          <div className="text-xs text-center mt-2 text-gray-400">
            Spark, Reliable, Secure, Perfect
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredNavItems.map((item, index) => {
          const isActive = location.pathname === item.path || 
                          location.pathname.startsWith(`${item.path}/`);
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center py-3 px-4 transition-colors ${
                isActive 
                  ? 'bg-green-500 text-white rounded-lg mx-2' 
                  : 'hover:bg-gray-800 rounded-lg mx-2'
              }`}
            >
              <div className="mr-3 flex-shrink-0">{item.icon}</div>
              {open && (
                <div className={`${isActive ? 'font-bold' : ''} whitespace-nowrap`}>
                  {item.text}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;