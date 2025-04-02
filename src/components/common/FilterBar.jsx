import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';
import Dropdown from './Dropdown';

/**
 * FilterBar component for filtering data in tables and lists
 * 
 * @param {Array} filters - Array of filter configurations
 * @param {function} onFilter - Function to call when filters are applied
 * @param {function} onReset - Function to call when filters are reset
 * @param {boolean} expandable - Whether the filter bar can be expanded/collapsed
 * @param {boolean} expanded - Whether the filter bar is expanded by default
 * @param {boolean} loading - Whether filters are being applied
 * @param {string} className - Additional CSS classes
 */
const FilterBar = ({
  filters = [],
  onFilter,
  onReset,
  expandable = true,
  expanded = false,
  loading = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [filterValues, setFilterValues] = useState({});
  
  // Handle filter value change
  const handleFilterChange = (key, value) => {
    setFilterValues(prevValues => ({
      ...prevValues,
      [key]: value
    }));
  };
  
  // Handle filter application
  const handleApplyFilters = () => {
    onFilter(filterValues);
  };
  
  // Handle filter reset
  const handleResetFilters = () => {
    setFilterValues({});
    onReset();
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Filter size={20} className="text-gray-500 mr-2" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>
        
        {expandable && (
          <button
            onClick={toggleExpanded}
            className="text-gray-500 hover:text-gray-700"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            {isExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        )}
      </div>
      
      {(!expandable || isExpanded) && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {filters.map((filter) => (
              <div key={filter.key}>
                {filter.type === 'select' && (
                  <Dropdown
                    label={filter.label}
                    options={filter.options}
                    value={filterValues[filter.key] || ''}
                    onChange={(value) => handleFilterChange(filter.key, value)}
                    placeholder={filter.placeholder || `Select ${filter.label}`}
                  />
                )}
                
                {filter.type === 'text' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {filter.label}
                    </label>
                    <input
                      type="text"
                      value={filterValues[filter.key] || ''}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      placeholder={filter.placeholder || `Enter ${filter.label}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                )}
                
                {filter.type === 'date' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {filter.label}
                    </label>
                    <input
                      type="date"
                      value={filterValues[filter.key] || ''}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                )}
                
                {filter.type === 'dateRange' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {filter.label}
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={(filterValues[filter.key] && filterValues[filter.key].from) || ''}
                        onChange={(e) => handleFilterChange(filter.key, { 
                          ...filterValues[filter.key],
                          from: e.target.value 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="From"
                      />
                      <input
                        type="date"
                        value={(filterValues[filter.key] && filterValues[filter.key].to) || ''}
                        onChange={(e) => handleFilterChange(filter.key, { 
                          ...filterValues[filter.key],
                          to: e.target.value 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="To"
                      />
                    </div>
                  </div>
                )}
                
                {filter.type === 'checkbox' && (
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`filter-${filter.key}`}
                        checked={filterValues[filter.key] || false}
                        onChange={(e) => handleFilterChange(filter.key, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`filter-${filter.key}`} className="ml-2 block text-sm text-gray-700">
                        {filter.label}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={handleResetFilters}
              disabled={loading || Object.keys(filterValues).length === 0}
            >
              <X size={16} className="mr-1" /> Clear
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
              loading={loading}
              disabled={loading}
            >
              <Filter size={16} className="mr-1" /> Apply Filters
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterBar;