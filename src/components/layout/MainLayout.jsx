import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useCephas from '../../hooks/useCephas';

/**
 * Main layout component that wraps all pages
 * Includes the sidebar, navbar, and main content area
 */
const MainLayout = ({ children }) => {
  const { sidebarOpen, toggleSidebar, currentUser, notifications } = useCephas();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
          user={currentUser}
          notifications={notifications}
        />
        
        {/* Content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;