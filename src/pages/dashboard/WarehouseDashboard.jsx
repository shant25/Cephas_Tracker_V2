import React from 'react';
import { Link } from 'react-router-dom';
import useCephas from '../../hooks/useCephas';
import { Calendar, Package, AlertCircle, Search, ArrowDown, ArrowUp, BarChart2, AlertTriangle } from 'lucide-react';

/**
 * Warehouse Dashboard Component
 * Focused on materials management, inventory tracking, and stock levels
 */
const WarehouseDashboard = () => {
  // Mock data for inventory metrics
  const inventoryStats = {
    totalMaterials: 13,
    lowStock: 3,
    outOfStock: 2,
    incomingShipments: 1
  };

  // Mock data for recent stock movements
  const stockMovements = [
    { 
      id: 1, 
      type: 'OUT', 
      sapCode: 'CAE-000-0820', 
      description: 'Huawei HG8145X6', 
      quantity: 3,
      assignedTo: 'K. MARIAPPAN A/L KUPPATHAN',
      date: 'Apr 2, 2025'
    },
    { 
      id: 2, 
      type: 'OUT', 
      sapCode: 'CAE-000-0770', 
      description: 'Huawei WA8021V5', 
      quantity: 1,
      assignedTo: 'SARAVANAN A/L I. CHINNIAH',
      date: 'Apr 2, 2025'
    },
    { 
      id: 3, 
      type: 'IN', 
      sapCode: 'CAE-000-0900', 
      description: 'ROUTER ZYXEL EX3300-T0', 
      quantity: 10,
      assignedTo: '-',
      date: 'Apr 1, 2025'
    },
    { 
      id: 4, 
      type: 'RETURN', 
      sapCode: 'CAE-000-0550', 
      description: 'TP Link Mesh Router EC230-G1', 
      quantity: 2,
      assignedTo: 'MUNIANDY A/L SOORINARAYANAN',
      date: 'Apr 1, 2025'
    },
    { 
      id: 5, 
      type: 'OUT', 
      sapCode: 'PON-AHW-0350', 
      description: 'ONU HG8240 H5', 
      quantity: 5,
      assignedTo: 'CHANDRASEKARAN VEERIAH',
      date: 'Mar 31, 2025'
    }
  ];

  // Mock data for low stock materials
  const lowStockItems = [
    { id: 1, sapCode: 'CAE-000-0770', description: 'Huawei WA8021V5', stockKeepingUnit: 3, minRequired: 20 },
    { id: 2, sapCode: 'CAE-000-0290', description: 'DLINK ROUTER 850L', stockKeepingUnit: 1, minRequired: 10 },
    { id: 3, sapCode: 'CAE-000-0350', description: 'D-Link DIR 882', stockKeepingUnit: 1, minRequired: 5 }
  ];

  // Mock data for out of stock materials 
  const outOfStockItems = [
    { id: 1, sapCode: 'CAE-000-0760', description: 'TP-Link HC420', stockKeepingUnit: 0, minRequired: 10 },
    { id: 2, sapCode: 'CAE-000-0750', description: 'TP-Link EC440', stockKeepingUnit: 0, minRequired: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Warehouse Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Materials Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Materials</p>
              <p className="text-2xl font-bold">{inventoryStats.totalMaterials}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Package size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <Link to="/materials" className="text-blue-600 hover:underline">View All Materials</Link>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
              <p className="text-2xl font-bold">{inventoryStats.lowStock}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertTriangle size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <Link to="/materials?status=low" className="text-yellow-600 hover:underline">View Low Stock</Link>
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
              <p className="text-2xl font-bold">{inventoryStats.outOfStock}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <Link to="/materials?status=out" className="text-red-600 hover:underline">View Out of Stock</Link>
          </div>
        </div>

        {/* Incoming Shipments Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Incoming Shipments</p>
              <p className="text-2xl font-bold">{inventoryStats.incomingShipments}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <ArrowDown size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <Link to="/materials/incoming" className="text-green-600 hover:underline">View Shipments</Link>
          </div>
        </div>
      </div>

      {/* Recent Stock Movements and Inventory Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Stock Movements */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <h2 className="font-semibold">Recent Stock Movements</h2>
            <Link to="/materials/movements" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stockMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        movement.type === 'IN' ? 'bg-green-100 text-green-800' :
                        movement.type === 'OUT' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {movement.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{movement.description}</div>
                      <div className="text-xs text-gray-500">{movement.sapCode}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {movement.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.assignedTo}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Issues */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h2 className="font-semibold">Inventory Issues</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Out of Stock Section */}
            <div>
              <h3 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                Out of Stock Items
              </h3>
              {outOfStockItems.length > 0 ? (
                <div className="space-y-2">
                  {outOfStockItems.map((item) => (
                    <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="font-medium text-gray-900">{item.description}</div>
                      <div className="text-xs text-gray-500">{item.sapCode}</div>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-xs text-red-600">Stock: {item.stockKeepingUnit}</span>
                        <span className="text-xs text-gray-500">Min Required: {item.minRequired}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-center text-green-700 text-sm">
                  No out of stock items
                </div>
              )}
            </div>

            {/* Low Stock Section */}
            <div>
              <h3 className="text-sm font-medium text-yellow-600 mb-2 flex items-center">
                <AlertTriangle size={16} className="mr-1" />
                Low Stock Items
              </h3>
              {lowStockItems.length > 0 ? (
                <div className="space-y-2">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="font-medium text-gray-900">{item.description}</div>
                      <div className="text-xs text-gray-500">{item.sapCode}</div>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-xs text-yellow-600">Stock: {item.stockKeepingUnit}</span>
                        <span className="text-xs text-gray-500">Min Required: {item.minRequired}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-center text-green-700 text-sm">
                  No low stock items
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-3 border-t">
            <Link 
              to="/materials?status=issue" 
              className="block w-full py-2 bg-gray-50 text-center text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Manage All Inventory Issues
            </Link>
          </div>
        </div>
      </div>

      {/* Material Search and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Material Search */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h2 className="font-semibold">Quick Material Search</h2>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by SAP code or description..."
                  className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5">
                  <Search size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 mb-2">SEARCH BY:</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">SAP Code</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">Serial No</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">Type</button>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h2 className="font-semibold">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/materials/create"
              className="block p-4 bg-blue-50 border border-blue-200 rounded-lg text-center hover:bg-blue-100"
            >
              <Package size={24} className="inline-block mb-2 text-blue-600" />
              <div className="font-medium">Add Material</div>
            </Link>
            
            <Link
              to="/materials/movements/new?type=in"
              className="block p-4 bg-green-50 border border-green-200 rounded-lg text-center hover:bg-green-100"
            >
              <ArrowDown size={24} className="inline-block mb-2 text-green-600" />
              <div className="font-medium">Record Inbound</div>
            </Link>
            
            <Link
              to="/materials/movements/new?type=out"
              className="block p-4 bg-red-50 border border-red-200 rounded-lg text-center hover:bg-red-100"
            >
              <ArrowUp size={24} className="inline-block mb-2 text-red-600" />
              <div className="font-medium">Record Outbound</div>
            </Link>
            
            <Link
              to="/materials/scan"
              className="block p-4 bg-purple-50 border border-purple-200 rounded-lg text-center hover:bg-purple-100"
            >
              <Search size={24} className="inline-block mb-2 text-purple-600" />
              <div className="font-medium">Scan Material</div>
            </Link>
            
            <Link
              to="/materials/reports"
              className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center hover:bg-yellow-100"
            >
              <BarChart2 size={24} className="inline-block mb-2 text-yellow-600" />
              <div className="font-medium">Inventory Report</div>
            </Link>
            
            <Link
              to="/materials/adjustment"
              className="block p-4 bg-gray-50 border border-gray-200 rounded-lg text-center hover:bg-gray-100"
            >
              <AlertCircle size={24} className="inline-block mb-2 text-gray-600" />
              <div className="font-medium">Stock Adjustment</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;