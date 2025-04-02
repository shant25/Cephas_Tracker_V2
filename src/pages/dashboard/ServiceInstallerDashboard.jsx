import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCephas from '../../hooks/useCephas';
import { Calendar, Package, FileText, Clock, CheckCircle, DollarSign, AlertTriangle, MapPin } from 'lucide-react';

/**
 * Service Installer Dashboard Component
 * Shows assigned jobs, material tracking, and personal income stats
 */
const ServiceInstallerDashboard = () => {
  const { currentUser } = useCephas();
  const [selectedTab, setSelectedTab] = useState('today');
  
  // Mock data for assigned jobs
  const assignedJobs = {
    today: [
      { 
        id: 1, 
        type: 'Activation', 
        customer: 'TAN PUI YEE', 
        address: 'SOLARIS PARQ RESIDENSI, Block A, Level 5, Unit 12', 
        time: '10:00 AM',
        status: 'PENDING',
        materialsAssigned: true
      },
      { 
        id: 2, 
        type: 'Assurance', 
        customer: 'ZHENG ZILONG', 
        address: '9 SEPUTEH - VIVO RESIDENCE, Block B, Level 8, Unit 15', 
        time: '1:00 PM',
        status: 'PENDING',
        materialsAssigned: true
      }
    ],
    tomorrow: [
      { 
        id: 3, 
        type: 'Activation', 
        customer: 'CHOY YUEN LENG', 
        address: 'RESIDENSI M LUNA, Block B, Level 12, Unit 7', 
        time: '11:30 AM',
        status: 'PENDING',
        materialsAssigned: false
      }
    ],
    future: [
      { 
        id: 4, 
        type: 'Modification', 
        customer: 'CHEAH MENG YEE', 
        address: 'KELANA PUTERI, Block C, Level 9, Unit 3', 
        time: '2:30 PM',
        status: 'PENDING',
        materialsAssigned: false,
        date: 'Apr 30, 2025'
      },
      { 
        id: 5, 
        type: 'Activation', 
        customer: 'NORFAHANA BINTI AZHAR', 
        address: 'RESIDENSI M LUNA, Block A, Level 10, Unit 5', 
        time: '10:00 AM',
        status: 'PENDING',
        materialsAssigned: false,
        date: 'Apr 26, 2025'
      }
    ]
  };
  
  // Mock data for assigned materials
  const assignedMaterials = [
    { 
      id: 1, 
      name: 'Huawei HG8145X6', 
      serialNo: 'HW1234567890',
      jobId: 1,
      assignedDate: 'Apr 1, 2025'
    },
    { 
      id: 2, 
      name: 'TP-Link ARCHER C1200', 
      serialNo: 'TP9876543210',
      jobId: 1,
      assignedDate: 'Apr 1, 2025'
    },
    { 
      id: 3, 
      name: 'Optical Power Meter', 
      serialNo: 'OPM5678901234',
      jobId: 2,
      assignedDate: 'Apr 1, 2025'
    }
  ];
  
  // Mock data for income statistics
  const incomeStats = {
    daily: { jobs: 2, amount: 180 },
    weekly: { jobs: 8, amount: 720 },
    monthly: { jobs: 35, amount: 3150 }
  };
  
  // Get jobs based on the selected tab
  const getJobs = () => {
    switch (selectedTab) {
      case 'today':
        return assignedJobs.today;
      case 'tomorrow':
        return assignedJobs.tomorrow;
      case 'future':
        return assignedJobs.future;
      default:
        return assignedJobs.today;
    }
  };
  
  const jobs = getJobs();
  
  // Update job status function
  const updateJobStatus = (jobId, newStatus) => {
    console.log(`Updating job #${jobId} to status: ${newStatus}`);
    // Would actually update the job status via an API call
  };

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Service Installer Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Jobs Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Today's Jobs</p>
              <p className="text-2xl font-bold">{assignedJobs.today.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-gray-600">
              {assignedJobs.today.filter(job => job.status === 'COMPLETED').length} completed
            </span>
          </div>
        </div>

        {/* Materials Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Assigned Materials</p>
              <p className="text-2xl font-bold">{assignedMaterials.length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Package size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <Link to="/materials" className="text-green-600 hover:underline">View Materials</Link>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold">RM {incomeStats.monthly.amount}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <DollarSign size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <Link to="/my-income" className="text-purple-600 hover:underline">Income Details</Link>
          </div>
        </div>
      </div>

      {/* Jobs Tabs */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              selectedTab === 'today'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('today')}
          >
            Today
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              selectedTab === 'tomorrow'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('tomorrow')}
          >
            Tomorrow
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              selectedTab === 'future'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('future')}
          >
            Future
          </button>
        </div>

        {/* Jobs List */}
        <div className="p-4">
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="border rounded-lg overflow-hidden">
                  <div className={`p-3 text-white ${
                    job.type === 'Activation' ? 'bg-blue-600' :
                    job.type === 'Assurance' ? 'bg-yellow-600' : 
                    'bg-green-600'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">
                        {job.type} - {job.customer}
                      </div>
                      <div className="text-sm">
                        {selectedTab === 'future' ? job.date : ''} {job.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start mb-3">
                      <MapPin size={18} className="mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{job.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4">
                      {job.materialsAssigned ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Materials Assigned
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          Waiting for Materials
                        </span>
                      )}
                      
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center ${
                        job.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        job.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    
                    {selectedTab === 'today' && job.status !== 'COMPLETED' && (
                      <div className="mt-4 flex items-center space-x-2">
                        <button 
                          onClick={() => updateJobStatus(job.id, 'IN_PROGRESS')}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200"
                        >
                          Start Job
                        </button>
                        <button 
                          onClick={() => updateJobStatus(job.id, 'COMPLETED')}
                          className="px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200"
                        >
                          Complete
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200"
                        >
                          Report Issue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No jobs scheduled for {selectedTab}
            </div>
          )}
        </div>
      </div>

      {/* Material List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h2 className="font-semibold">Assigned Materials</h2>
          <button className="text-sm text-blue-600 hover:underline">Scan QR Code</button>
        </div>
        
        <div className="p-4">
          {assignedMaterials.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial No.
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      For Job
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignedMaterials.map(material => (
                    <tr key={material.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-1 bg-gray-100 rounded mr-2">
                            <Package size={16} className="text-gray-500" />
                          </div>
                          {material.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {material.serialNo}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {material.assignedDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        Job #{material.jobId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No materials assigned
            </div>
          )}
        </div>
      </div>

      {/* Income Statistics */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold">Income Statistics</h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Daily Income</div>
                <div className="text-2xl font-bold text-gray-800">RM {incomeStats.daily.amount}</div>
                <div className="text-xs text-gray-500 mt-2">{incomeStats.daily.jobs} jobs today</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Weekly Income</div>
                <div className="text-2xl font-bold text-gray-800">RM {incomeStats.weekly.amount}</div>
                <div className="text-xs text-gray-500 mt-2">{incomeStats.weekly.jobs} jobs this week</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Monthly Income</div>
                <div className="text-2xl font-bold text-gray-800">RM {incomeStats.monthly.amount}</div>
                <div className="text-xs text-gray-500 mt-2">{incomeStats.monthly.jobs} jobs this month</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-center">
            <Link to="/my-income" className="text-blue-600 hover:underline">View Detailed Income Report</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInstallerDashboard;