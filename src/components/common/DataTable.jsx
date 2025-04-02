import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * DataTable component for displaying tabular data with sorting, filtering, and pagination
 * 
 * @param {Array} data - Array of objects to display in the table
 * @param {Array} columns - Column definitions for the table
 * @param {string} keyField - Field to use as the key for each row
 * @param {boolean} selectable - Whether rows can be selected
 * @param {Array} selectedRows - Array of selected row keys
 * @param {Function} onRowSelect - Callback when a row is selected
 * @param {Function} onSelectAll - Callback when all rows are selected
 * @param {Function} onRowClick - Callback when a row is clicked
 * @param {boolean} pagination - Whether to enable pagination
 * @param {number} pageSize - Number of rows per page
 * @param {boolean} searchable - Whether to enable search
 * @param {boolean} loading - Whether data is loading
 */
const DataTable = ({
  data = [],
  columns = [],
  keyField = 'id',
  selectable = false,
  selectedRows = [],
  onRowSelect = () => {},
  onSelectAll = () => {},
  onRowClick = null,
  pagination = true,
  pageSize = 10,
  searchable = true,
  loading = false
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  // Update filtered data when props change
  useEffect(() => {
    let result = [...data];
    
    // Apply search filter if searchable
    if (searchable && searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      result = result.filter(item => {
        // Search through all column values
        return columns.some(column => {
          const value = item[column.field];
          if (value == null) return false;
          
          return String(value).toLowerCase().includes(lowerCaseQuery);
        });
      });
    }
    
    // Apply sorting if sort field is set
    if (sortField) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
        if (bValue == null) return sortDirection === 'asc' ? -1 : 1;
        
        // Handle different data types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when data changes
  }, [data, searchQuery, sortField, sortDirection, columns, searchable]);
  
  // Handle sort column click
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const currentData = pagination ? filteredData.slice(startIndex, endIndex) : filteredData;
  
  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  // Handle "select all" checkbox
  const handleSelectAll = () => {
    const allKeys = filteredData.map(row => row[keyField]);
    const allSelected = selectedRows.length === filteredData.length;
    
    onSelectAll(allSelected ? [] : allKeys);
  };
  
  // Check if all items are selected
  const allSelected = filteredData.length > 0 && selectedRows.length === filteredData.length;
  
  return (
    <div className="w-full">
      {/* Search Bar */}
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Selection checkbox column */}
              {selectable && (
                <th scope="col" className="px-6 py-3 w-10">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
              )}
              
              {/* Column headers */}
              {columns.map((column) => (
                <th
                  key={column.field}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.field)}
                >
                  <div className="flex items-center">
                    <span>{column.header}</span>
                    {sortField === column.field && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              // Loading state
              <tr>
                <td
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  Loading data...
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              // Empty state
              <tr>
                <td
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              // Data rows
              currentData.map((row) => (
                <tr
                  key={row[keyField]}
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {/* Selection checkbox */}
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap w-10">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          checked={selectedRows.includes(row[keyField])}
                          onChange={(e) => {
                            e.stopPropagation(); // Prevent row click event
                            onRowSelect(row[keyField]);
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent row click event
                        />
                      </div>
                    </td>
                  )}
                  
                  {/* Data cells */}
                  {columns.map((column) => (
                    <td
                      key={`${row[keyField]}-${column.field}`}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {column.render ? (
                        // Custom cell rendering function
                        column.render(row[column.field], row)
                      ) : (
                        // Default rendering
                        <div className="text-sm text-gray-900">
                          {row[column.field] === null || row[column.field] === undefined
                            ? '-'
                            : row[column.field]}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                    currentPage === 1
                      ? 'cursor-not-allowed'
                      : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                
                {/* Page number buttons */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to show current page, 2 pages before and 2 pages after
                  let pageNumber;
                  
                  if (totalPages <= 5) {
                    // If 5 or fewer total pages, show all
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    // If near the start, show first 5 pages
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // If near the end, show last 5 pages
                    pageNumber = totalPages - 4 + i;
                  } else {
                    // Otherwise, show 2 before and 2 after current page
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === pageNumber
                          ? 'z-10 bg-green-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                    currentPage === totalPages
                      ? 'cursor-not-allowed'
                      : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;