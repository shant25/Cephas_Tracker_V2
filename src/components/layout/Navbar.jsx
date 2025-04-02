import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import useCephas from '../../hooks/useCephas';

/**
 * Navbar component for the top navigation bar
 */
const Navbar = ({ toggleSidebar, sidebarOpen, user, notifications }) => {
  const { logout } = useCephas();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Left section */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-700 mr-4"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <Menu size={24} />
        </button>
        
        <div className="text-lg font-semibold uppercase">
          {/* This would be dynamic based on current page */}
          DASHBOARD
        </div>
      </div>
      
      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <input 
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white rounded-full py-1 px-4 pr-8 w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Search size={18} className="text-gray-400" />
          </button>
        </form>
        
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button 
            className="p-1 rounded-full hover:bg-gray-700 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {notifications?.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
              <div className="text-gray-800 p-2 border-b border-gray-200 font-medium">
                Notifications
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications?.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notification.type === 'success' ? 'border-l-4 border-l-green-500' :
                        notification.type === 'error' ? 'border-l-4 border-l-red-500' :
                        notification.type === 'warning' ? 'border-l-4 border-l-yellow-500' :
                        'border-l-4 border-l-blue-500'
                      }`}
                    >
                      <div className="text-gray-800 font-medium">
                        {notification.title || (notification.type === 'success' ? 'Success' :
                         notification.type === 'error' ? 'Error' :
                         notification.type === 'warning' ? 'Warning' : 'Information')}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {notification.message}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button 
            className="flex items-center space-x-2 hover:bg-gray-700 rounded-md p-1 px-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User size={20} />
            <span className="hidden md:block">{user?.name || 'User'}</span>
          </button>
          
          {/* User dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <div className="py-1">
                <button 
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <User size={16} className="mr-2 text-gray-600" />
                  <span>Profile</span>
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <Settings size={16} className="mr-2 text-gray-600" />
                  <span>Settings</span>
                </button>
                
                <button 
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <HelpCircle size={16} className="mr-2 text-gray-600" />
                  <span>Help</span>
                </button>
                
                <hr className="my-1" />
                
                <button 
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;