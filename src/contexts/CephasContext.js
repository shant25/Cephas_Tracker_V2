import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const CephasContext = createContext();

// Initial state with more comprehensive data structure
const initialState = {
  // User data
  currentUser: null,
  userRole: null,
  isAuthenticated: false,
  
  // Module data
  buildings: [],
  activations: [],
  assurances: [],
  splitters: [],
  materials: [],
  serviceInstallers: [],
  orders: [],
  invoices: [],
  
  // UI state
  isLoading: false,
  sidebarOpen: true,
  notifications: [],
  
  // Filters and search state
  currentFilters: {},
  searchQuery: '',
  
  // Dashboard stats
  dashboardStats: {
    today: {
      activations: 0,
      modifications: 0,
      assurances: 0,
      totalJobs: 0,
      assignedJobs: 0,
      unassignedJobs: 0
    },
    tomorrow: {
      activations: 0,
      modifications: 0,
      assurances: 0,
      totalJobs: 0,
      assignedJobs: 0,
      unassignedJobs: 0
    },
    future: {
      activations: 0,
      modifications: 0,
      assurances: 0,
      totalJobs: 0,
      assignedJobs: 0,
      unassignedJobs: 0
    }
  }
};

export const CephasProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  
  // Initialize app state
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        // Check if user is logged in (from localStorage or cookies)
        const token = localStorage.getItem('cephasToken');
        const userData = localStorage.getItem('cephasUser');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          
          // Set authenticated state
          setState(prev => ({
            ...prev,
            currentUser: user,
            userRole: user.role,
            isAuthenticated: true,
            isLoading: false
          }));
          
          // Load initial data based on user role
          await loadInitialData(user.role);
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false
          }));
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    initializeApp();
  }, []);
  
  // Load initial data based on user role
  const loadInitialData = async (role) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulated API calls - replace with actual API services in production
      
      // Common data for all roles
      const dashboardStats = await fetchDashboardStats();
      
      // Role-specific data
      let roleSpecificData = {};
      
      switch (role) {
        case 'super_admin':
          roleSpecificData = {
            buildings: await fetchBuildings(),
            serviceInstallers: await fetchServiceInstallers(),
            materials: await fetchMaterials(),
            orders: await fetchOrders(),
            invoices: await fetchInvoices()
          };
          break;
        case 'supervisor':
          roleSpecificData = {
            buildings: await fetchBuildings(),
            serviceInstallers: await fetchServiceInstallers(),
            activations: await fetchActivations(),
            assurances: await fetchAssurances()
          };
          break;
        case 'installer':
          roleSpecificData = {
            activations: await fetchInstallerJobs('activation'),
            assurances: await fetchInstallerJobs('assurance'),
            materials: await fetchInstallerMaterials()
          };
          break;
        case 'accountant':
          roleSpecificData = {
            invoices: await fetchInvoices()
          };
          break;
        case 'warehouse':
          roleSpecificData = {
            materials: await fetchMaterials()
          };
          break;
        default:
          break;
      }
      
      setState(prev => ({
        ...prev,
        ...roleSpecificData,
        dashboardStats,
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to load initial data:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  // Simulated API functions
  // These would be replaced with actual API calls
  const fetchDashboardStats = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      today: {
        activations: 16,
        modifications: 4,
        assurances: 6,
        totalJobs: 28,
        assignedJobs: 6,
        unassignedJobs: 23
      },
      tomorrow: {
        activations: 8,
        modifications: 4,
        assurances: 2,
        totalJobs: 15,
        assignedJobs: 0,
        unassignedJobs: 16
      },
      future: {
        activations: 69,
        modifications: 14,
        assurances: 2,
        totalJobs: 88,
        assignedJobs: 0,
        unassignedJobs: 88
      }
    };
  };
  
  const fetchBuildings = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: 1, name: 'KELANA IMPIAN APARTMENT', location: 'Kuala Lumpur', type: 'Non Prelaid' },
      { id: 2, name: 'THE WESTSIDE II', location: 'Kuala Lumpur', type: 'Prelaid' },
      { id: 3, name: 'THE WESTSIDE I', location: 'Kuala Lumpur', type: 'Prelaid' },
      { id: 4, name: 'TARA 33', location: 'Kuala Lumpur', type: 'Non Prelaid' },
      { id: 5, name: 'LUMI TROPICANA', location: 'Kuala Lumpur', type: 'Prelaid' }
    ];
  };
  
  const fetchActivations = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { 
        id: 1, 
        trbnNo: 'TBBNA870523G', 
        name: 'TAN PUI YEE',
        contactNo: '017-3781691 / 60173781691',
        serviceInstaller: '-',
        building: 'SOLARIS PARQ RESIDENSI',
        status: 'NOT COMPLETED',
        appointmentDate: 'May 10, 2025 10:00 AM',
        orderType: 'ACTIVATION',
        orderSubType: 'RESCHEDULE'
      },
      { 
        id: 2, 
        trbnNo: 'TBBNA872851G', 
        name: 'CHOY YUEN LENG',
        contactNo: '012-2239707 / 0122539707',
        serviceInstaller: '-',
        building: 'RESIDENSI M LUNA',
        status: 'NOT COMPLETED',
        appointmentDate: 'May 3, 2025 10:00 AM',
        orderType: 'ACTIVATION',
        orderSubType: 'N/A'
      }
    ];
  };
  
  const fetchAssurances = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { 
        id: 1, 
        trbnNo: 'TBBNA578554G', 
        ticketNumber: 'TTKT202503248410309',
        awoNo: 'AWO390312',
        name: 'ZHENG ZILONG',
        contactNo: '017-5216863',
        serviceInstaller: '-',
        building: '9 SEPUTEH - VIVO RESIDENCE',
        status: 'NOT_COMPLETED',
        remarks: '-',
        appointmentDate: 'Apr 2, 2025 1:00 PM',
        recDate: 'Mar 17, 2025 6:55 PM',
      },
      { 
        id: 2, 
        trbnNo: 'TBBNA13194G', 
        ticketNumber: 'TTKT202503178405332',
        awoNo: 'AWO389109',
        name: 'THEIVESREE RAJENDRAN',
        contactNo: '60177145536',
        serviceInstaller: '-',
        building: 'ARMANEE CONDOMINIUM',
        status: 'NOT_COMPLETED',
        remarks: '-',
        appointmentDate: 'Apr 2, 2025 11:00 AM',
        recDate: 'Mar 17, 2025 6:55 PM',
      }
    ];
  };
  
  const fetchServiceInstallers = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: 1, name: 'K. MARIAPPAN A/L KUPPATHAN @ KM Siva', contactNo: '+60 17-676 7625' },
      { id: 2, name: 'SARAVANAN A/L I. CHINNIAH @ Solo', contactNo: '+60 16-392 3026' },
      { id: 3, name: 'MUNIANDY A/L SOORINARAYANAN @ Mani', contactNo: '+60 16-319 8867' }
    ];
  };
  
  const fetchMaterials = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: 1, sapCode: 'CAE-000-0820', description: 'Huawei HG8145X6', stockKeepingUnit: -3788 },
      { id: 2, sapCode: 'CAE-000-0780', description: 'Huawei HG8145V5', stockKeepingUnit: -97 },
      { id: 3, sapCode: 'CAE-000-0830', description: 'Huawei HN8245X6s-8N-30 (2GB)', stockKeepingUnit: -35 }
    ];
  };
  
  const fetchOrders = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { 
        id: 1, 
        tbbnoId: '0327015981 / 0327015980/ 0327015982 / 0327015983', 
        name: 'BADAN PENGURUSAN BERSAMA PUSAT PERDAGANGAN BERPADU & RES', 
        email: '', 
        address: 'BLOCK A, LEVEL 7, UNIT MANAGEMENT',
        contactNo: '0392129733 🌀 Olivia/ MS NURUL @ 0322459013'
      },
      { 
        id: 2, 
        tbbnoId: 'TBBNB8358G', 
        name: 'OW WAI SIONG',
        email: '', 
        address: 'BLOCK C LEVEL 27 UNIT 02, UNITED POINT RESIDENCE- BLOCK C',
        contactNo: '014-3280280 / 0146266838'
      }
    ];
  };
  
  const fetchInvoices = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { 
        id: 1, 
        invoiceNumber: 'GPON25/03/515', 
        submissionNumber: '-', 
        customer: 'RUPESH A/L MUNIANDY', 
        date: 'Mar 27, 2025', 
        totalAmount: 'RM 150.00', 
        description: 'Prelaid Activation', 
        paid: 'No', 
        createdBy: 'Cephas Admin' 
      },
      { 
        id: 2, 
        invoiceNumber: 'GPON25/03/514', 
        submissionNumber: '-', 
        customer: 'KEN CITY DEVELOPMENT SDN BHD', 
        date: 'Mar 27, 2025', 
        totalAmount: 'RM 150.00', 
        description: 'Prelaid Activation', 
        paid: 'No', 
        createdBy: 'Cephas Admin' 
      }
    ];
  };
  
  const fetchInstallerJobs = async (type) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (type === 'activation') {
      return [
        { 
          id: 1, 
          trbnNo: 'TBBNA870523G', 
          name: 'TAN PUI YEE',
          contactNo: '017-3781691',
          building: 'SOLARIS PARQ RESIDENSI',
          status: 'ASSIGNED',
          appointmentDate: 'Mar 29, 2025 10:00 AM',
          orderType: 'ACTIVATION'
        }
      ];
    } else {
      return [
        { 
          id: 1, 
          trbnNo: 'TBBNA578554G', 
          ticketNumber: 'TTKT202503248410309',
          awoNo: 'AWO390312',
          name: 'ZHENG ZILONG',
          contactNo: '017-5216863',
          building: '9 SEPUTEH - VIVO RESIDENCE',
          status: 'ASSIGNED',
          appointmentDate: 'Mar 29, 2025 1:00 PM'
        }
      ];
    }
  };
  
  const fetchInstallerMaterials = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { 
        id: 1, 
        sapCode: 'CAE-000-0820', 
        description: 'Huawei HG8145X6', 
        serialNo: 'HW1234567890',
        assignedDate: 'Mar 27, 2025',
        jobId: 'TBBNA870523G'
      }
    ];
  };
  
  // Authentication functions
  const login = async (email, password) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Dummy login - would be replaced with actual API call
      if (email === 'admin@cephas.com' && password === 'password') {
        const user = {
          id: 1,
          name: 'Admin User',
          email: 'admin@cephas.com',
          role: 'super_admin'
        };
        
        // Store in localStorage
        localStorage.setItem('cephasToken', 'dummy-token-12345');
        localStorage.setItem('cephasUser', JSON.stringify(user));
        
        // Update state
        setState(prev => ({
          ...prev,
          currentUser: user,
          userRole: user.role,
          isAuthenticated: true,
          isLoading: false
        }));
        
        // Load initial data
        await loadInitialData(user.role);
        
        // Redirect to dashboard
        navigate('/dashboard');
        
        return { success: true };
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };
  
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('cephasToken');
    localStorage.removeItem('cephasUser');
    
    // Reset state
    setState(initialState);
    
    // Redirect to login
    navigate('/login');
  };
  
  // CRUD operations for different entities
  // Here we'll define generic functions that can be used for any entity type
  
  const addItem = (collection, item) => {
    setState(prevState => ({
      ...prevState,
      [collection]: [...prevState[collection], { id: Date.now(), ...item }]
    }));
  };
  
  const updateItem = (collection, id, updatedData) => {
    setState(prevState => ({
      ...prevState,
      [collection]: prevState[collection].map(item => 
        item.id === id ? { ...item, ...updatedData } : item
      )
    }));
  };
  
  const deleteItem = (collection, id) => {
    setState(prevState => ({
      ...prevState,
      [collection]: prevState[collection].filter(item => item.id !== id)
    }));
  };
  
  const getItemById = (collection, id) => {
    return state[collection].find(item => item.id === id) || null;
  };
  
  // Specialized operations
  
  const assignServiceInstaller = (collection, id, installerId) => {
    const installer = state.serviceInstallers.find(si => si.id === installerId);
    if (!installer) return;
    
    updateItem(collection, id, { 
      serviceInstaller: installer.name,
      status: 'ASSIGNED'
    });
    
    // Add a notification
    addNotification({
      type: 'success',
      message: `Job #${id} assigned to ${installer.name}`
    });
  };
  
  const changeStatus = (collection, id, status) => {
    updateItem(collection, id, { status });
    
    // Add a notification
    addNotification({
      type: 'info',
      message: `Status changed to ${status} for ${collection} #${id}`
    });
  };
  
  // Notification system
  const addNotification = (notification) => {
    const id = Date.now();
    setState(prevState => ({
      ...prevState,
      notifications: [
        ...prevState.notifications, 
        { id, timestamp: new Date(), ...notification }
      ]
    }));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };
  
  const removeNotification = (id) => {
    setState(prevState => ({
      ...prevState,
      notifications: prevState.notifications.filter(n => n.id !== id)
    }));
  };
  
  // UI state management
  const toggleSidebar = () => {
    setState(prevState => ({
      ...prevState,
      sidebarOpen: !prevState.sidebarOpen
    }));
  };
  
  // Search and filter functions
  const setSearchQuery = (query) => {
    setState(prevState => ({
      ...prevState,
      searchQuery: query
    }));
  };
  
  const setFilters = (filters) => {
    setState(prevState => ({
      ...prevState,
      currentFilters: filters
    }));
  };
  
  // Return context provider
  return (
    <CephasContext.Provider value={{
      // State
      ...state,
      
      // Authentication
      login,
      logout,
      
      // CRUD operations
      addItem,
      updateItem,
      deleteItem,
      getItemById,
      
      // Specialized operations
      assignServiceInstaller,
      changeStatus,
      
      // Notification system
      addNotification,
      removeNotification,
      
      // UI state management
      toggleSidebar,
      
      // Search and filter
      setSearchQuery,
      setFilters
    }}>
      {children}
    </CephasContext.Provider>
  );
};

export default CephasContext;