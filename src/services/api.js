/**
 * API service to handle all API requests
 * This is a mock implementation for demo purposes
 * In a real app, this would be replaced with actual API calls
 */

// Mock API base URL - would be replaced with real API URL in production
const API_BASE_URL = 'https://api.cephas.example.com/v1';

// Mock delay to simulate network requests
const MOCK_DELAY = 500;

// Mock token handling
const getAuthToken = () => {
  return localStorage.getItem('cephasToken');
};

// Headers with authentication token
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Generic error handler
const handleError = (error) => {
  console.error('API Error:', error);
  
  if (error.status === 401) {
    // Handle unauthorized / token expired
    localStorage.removeItem('cephasToken');
    localStorage.removeItem('cephasUser');
    window.location.href = '/login';
  }
  
  return {
    success: false,
    message: error.message || 'An unexpected error occurred'
  };
};

// Simulated API response delay
const mockDelay = (ms = MOCK_DELAY) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generic function to make API requests
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body for POST/PUT requests
 * @param {object} customHeaders - Additional headers to include
 * @returns {Promise} - Promise that resolves to response data or rejects with error
 */
const apiRequest = async (method, endpoint, data = null, customHeaders = {}) => {
  try {
    // In a mock implementation, we'll just simulate the request
    console.log(`${method} request to ${endpoint}`, data);
    
    // Simulate network delay
    await mockDelay();
    
    // Return mock response data based on the endpoint
    // In a real app, this would be replaced with an actual fetch call
    return getMockResponse(method, endpoint, data);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Mock response generator based on endpoint
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request data
 * @returns {object} - Mock response data
 */
const getMockResponse = (method, endpoint, data) => {
  // Authentication endpoints
  if (endpoint === '/auth/login') {
    if (data.email === 'admin@cephas.com' && data.password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token-for-admin',
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@cephas.com',
          role: 'super_admin'
        }
      };
    } else if (data.email === 'supervisor@cephas.com' && data.password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token-for-supervisor',
        user: {
          id: 2,
          name: 'Supervisor User',
          email: 'supervisor@cephas.com',
          role: 'supervisor'
        }
      };
    } else if (data.email === 'installer@cephas.com' && data.password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token-for-installer',
        user: {
          id: 3,
          name: 'Installer User',
          email: 'installer@cephas.com',
          role: 'installer'
        }
      };
    } else if (data.email === 'accountant@cephas.com' && data.password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token-for-accountant',
        user: {
          id: 4,
          name: 'Accountant User',
          email: 'accountant@cephas.com',
          role: 'accountant'
        }
      };
    } else if (data.email === 'warehouse@cephas.com' && data.password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token-for-warehouse',
        user: {
          id: 5,
          name: 'Warehouse User',
          email: 'warehouse@cephas.com',
          role: 'warehouse'
        }
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
  }
  
  // Dashboard statistics
  if (endpoint === '/dashboard/stats') {
    return {
      success: true,
      data: {
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
      }
    };
  }
  
  // Buildings endpoints
  if (endpoint === '/buildings') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
          { id: 1, name: 'KELANA IMPIAN APARTMENT', location: 'Kuala Lumpur', type: 'Non Prelaid' },
          { id: 2, name: 'THE WESTSIDE II', location: 'Kuala Lumpur', type: 'Prelaid' },
          { id: 3, name: 'THE WESTSIDE I', location: 'Kuala Lumpur', type: 'Prelaid' },
          { id: 4, name: 'TARA 33', location: 'Kuala Lumpur', type: 'Non Prelaid' },
          { id: 5, name: 'LUMI TROPICANA', location: 'Kuala Lumpur', type: 'Prelaid' }
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Building created successfully'
      };
    }
  }
  
  if (endpoint.match(/\/buildings\/\d+/)) {
    const id = parseInt(endpoint.split('/').pop());
    
    if (method === 'GET') {
      return {
        success: true,
        data: {
          id,
          name: `Building ${id}`,
          location: 'Kuala Lumpur',
          type: id % 2 === 0 ? 'Prelaid' : 'Non Prelaid',
          address: '123 Example Street',
          contactPerson: 'John Doe',
          contactNumber: '+60123456789',
          notes: 'Sample building notes'
        }
      };
    } else if (method === 'PUT') {
      return {
        success: true,
        data: {
          id,
          ...data
        },
        message: 'Building updated successfully'
      };
    } else if (method === 'DELETE') {
      return {
        success: true,
        message: 'Building deleted successfully'
      };
    }
  }
  
  // Activation/Modification endpoints
  if (endpoint === '/activations') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
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
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Activation created successfully'
      };
    }
  }
  
  if (endpoint.match(/\/activations\/\d+/)) {
    const id = parseInt(endpoint.split('/').pop());
    
    if (method === 'GET') {
      return {
        success: true,
        data: {
          id,
          trbnNo: `TBBNA${800000 + id}G`, 
          name: 'Sample Customer Name',
          contactNo: '017-3781691',
          serviceInstaller: '-',
          building: 'Sample Building',
          status: 'NOT COMPLETED',
          appointmentDate: 'May 15, 2025 10:00 AM',
          orderType: 'ACTIVATION',
          orderSubType: 'N/A'
        }
      };
    } else if (method === 'PUT') {
      return {
        success: true,
        data: {
          id,
          ...data
        },
        message: 'Activation updated successfully'
      };
    } else if (method === 'DELETE') {
      return {
        success: true,
        message: 'Activation deleted successfully'
      };
    }
  }
  
  // Assurance endpoints
  if (endpoint === '/assurances') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
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
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Assurance created successfully'
      };
    }
  }
  
  // Materials endpoints
  if (endpoint === '/materials') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
          { id: 1, sapCode: 'CAE-000-0820', description: 'Huawei HG8145X6', stockKeepingUnit: -3788 },
          { id: 2, sapCode: 'CAE-000-0780', description: 'Huawei HG8145V5', stockKeepingUnit: -97 },
          { id: 3, sapCode: 'CAE-000-0830', description: 'Huawei HN8245X6s-8N-30 (2GB)', stockKeepingUnit: -35 },
          { id: 4, sapCode: 'CAE-000-0770', description: 'Huawei WA8021V5', stockKeepingUnit: -230 },
          { id: 5, sapCode: 'CAE-000-0760', description: 'TP-Link HC420', stockKeepingUnit: 0 }
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Material created successfully'
      };
    }
  }
  
  // Service Installers endpoints
  if (endpoint === '/service-installers') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
          { id: 1, name: 'K. MARIAPPAN A/L KUPPATHAN @ KM Siva', contactNo: '+60 17-676 7625' },
          { id: 2, name: 'SARAVANAN A/L I. CHINNIAH @ Solo', contactNo: '+60 16-392 3026' },
          { id: 3, name: 'MUNIANDY A/L SOORINARAYANAN @ Mani', contactNo: '+60 16-319 8867' },
          { id: 4, name: 'YELLESHUA JEEVAN A/L AROKKIASAMY @ Jeevan', contactNo: '+60 16-453 2305' },
          { id: 5, name: 'RAVEEN NAIR A/L K RAHMAN @ Raveen', contactNo: '+60 11-1081 8049' }
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Service Installer created successfully'
      };
    }
  }
  
  // Orders endpoints
  if (endpoint === '/orders') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
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
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Order created successfully'
      };
    }
  }
  
  // Invoices endpoints
  if (endpoint === '/invoices') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
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
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Invoice created successfully'
      };
    }
  }
  
  // Splitters endpoints
  if (endpoint === '/splitters') {
    if (method === 'GET') {
      return {
        success: true,
        data: [
          { 
            id: 1, 
            serviceId: 'TBBNA422113G', 
            buildingName: 'THE WESTSIDE I', 
            alias: '', 
            splitterLevel: 'MDF ROOM - PARKING', 
            splitterNumber: '02', 
            splitterPort: '25' 
          },
          { 
            id: 2, 
            serviceId: 'TBBNA287810G', 
            buildingName: 'KELANA PUTERI', 
            alias: '', 
            splitterLevel: '10', 
            splitterNumber: '10', 
            splitterPort: '22' 
          }
        ]
      };
    } else if (method === 'POST') {
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000) + 100,
          ...data
        },
        message: 'Splitter created successfully'
      };
    }
  }
  
  // Default response for unknown endpoints
  return {
    success: false,
    message: `No mock implementation for ${method} ${endpoint}`
  };
};

// Exposed API methods
export default {
  get: (endpoint, customHeaders) => apiRequest('GET', endpoint, null, customHeaders),
  post: (endpoint, data, customHeaders) => apiRequest('POST', endpoint, data, customHeaders),
  put: (endpoint, data, customHeaders) => apiRequest('PUT', endpoint, data, customHeaders),
  delete: (endpoint, customHeaders) => apiRequest('DELETE', endpoint, null, customHeaders)
};