import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Dropdown component for selecting from a list of options
 * 
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {Array} options - Array of options to display
 * @param {string|number} value - Selected value
 * @param {function} onChange - Function to call when selection changes
 * @param {boolean} disabled - Whether the dropdown is disabled
 * @param {string} error - Error message to display
 * @param {string} className - Additional CSS classes
 * @param {boolean} required - Whether the input is required
 * @param {boolean} fullWidth - Whether the dropdown should take full width
 * @param {React.ReactNode} icon - Icon to display in the dropdown
 */
const Dropdown = ({
  label,
  placeholder = 'Select an option',
  options = [],
  value,
  onChange,
  disabled = false,
  error = '',
  className = '',
  required = false,
  fullWidth = true,
  icon = null,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle option selection
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  // Find selected option
  const selectedOption = options.find(option => 
    option.value === value
  );
  
  // Base classes
  const baseClasses = `
    relative bg-white border rounded-md shadow-sm py-2 px-3
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'cursor-pointer'}
    ${icon ? 'pl-10' : ''}
    ${error ? 'border-red-300' : 'border-gray-300'}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Dropdown button */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <button
          type="button"
          className={baseClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          {...rest}
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </button>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ul
              className="divide-y divide-gray-100"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-0"
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`
                    cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50
                    ${option.value === value ? 'bg-green-50 text-green-900' : 'text-gray-900'}
                  `}
                  id={`listbox-option-${index}`}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelect(option)}
                >
                  <span className="font-normal block truncate">
                    {option.label}
                  </span>
                  
                  {option.value === value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;