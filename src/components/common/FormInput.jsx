import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * FormInput component for form fields with validation support
 * 
 * @param {string} label - Input label
 * @param {string} name - Input name
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} value - Input value
 * @param {function} onChange - Function to handle input change
 * @param {boolean} required - Whether the input is required
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message to display
 * @param {boolean} disabled - Whether the input is disabled
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} icon - Icon to display in the input
 * @param {React.ReactNode} hint - Hint text to display below the input
 * @param {boolean} fullWidth - Whether the input should take full width
 */
const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  error = '',
  disabled = false,
  className = '',
  icon = null,
  hint = '',
  fullWidth = true,
  ...rest
}) => {
  // Base input classes
  const baseInputClasses = `
    border rounded-md shadow-sm py-2 px-3
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
    ${icon ? 'pl-10' : ''}
    ${error ? 'border-red-300' : 'border-gray-300'}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input wrapper */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        {/* Input element */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          {...rest}
        />
      </div>
      
      {/* Error message */}
      {error && (
        <div 
          id={`${name}-error`}
          className="mt-1 flex items-center text-sm text-red-600"
        >
          <AlertCircle size={14} className="mr-1" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Hint text */}
      {!error && hint && (
        <div 
          id={`${name}-hint`}
          className="mt-1 text-sm text-gray-500"
        >
          {hint}
        </div>
      )}
    </div>
  );
};

export default FormInput;