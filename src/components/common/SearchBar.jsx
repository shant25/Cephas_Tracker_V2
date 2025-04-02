import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar component for searching data
 * 
 * @param {string} value - Search value
 * @param {function} onChange - Function to call when search value changes
 * @param {function} onSearch - Function to call when search is submitted
 * @param {string} placeholder - Placeholder text
 * @param {boolean} loading - Whether search is loading
 * @param {string} className - Additional CSS classes
 * @param {boolean} showIcon - Whether to show search icon
 * @param {boolean} showClear - Whether to show clear button
 * @param {boolean} autoSearch - Whether to search automatically on input change
 * @param {number} debounceTime - Time to wait before searching automatically (ms)
 */
const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  loading = false,
  className = '',
  showIcon = true,
  showClear = true,
  autoSearch = false,
  debounceTime = 500,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [timer, setTimer] = useState(null);
  
  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Call onChange immediately
    if (onChange) {
      onChange(newValue);
    }
    
    // Set up debounce for autoSearch
    if (autoSearch && onSearch) {
      if (timer) {
        clearTimeout(timer);
      }
      
      const newTimer = setTimeout(() => {
        onSearch(newValue);
      }, debounceTime);
      
      setTimer(newTimer);
    }
  };
  
  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(localValue);
    }
  };
  
  // Handle clear button click
  const handleClear = () => {
    setLocalValue('');
    
    if (onChange) {
      onChange('');
    }
    
    if (autoSearch && onSearch) {
      onSearch('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        {/* Search icon */}
        {showIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
        )}
        
        {/* Search input */}
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            block w-full border border-gray-300 rounded-md shadow-sm
            focus:ring-green-500 focus:border-green-500
            ${showIcon ? 'pl-10' : 'pl-4'}
            ${showClear && localValue ? 'pr-10' : 'pr-4'}
            py-2
          `}
          disabled={loading}
        />
        
        {/* Clear button */}
        {showClear && localValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handleClear}
          >
            <X size={18} className="text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>
      
      {/* Hidden submit button for form submission */}
      <button type="submit" className="hidden" />
    </form>
  );
};

export default SearchBar;