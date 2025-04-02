import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Button component with variants and loading state
 * 
 * @param {React.ReactNode} children - Button content
 * @param {string} variant - Button variant (primary, secondary, danger, success, warning, info)
 * @param {string} size - Button size (sm, md, lg)
 * @param {boolean} fullWidth - Whether the button should take full width
 * @param {boolean} loading - Whether the button is in loading state
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} icon - Icon to display in the button
 * @param {string} type - Button type (button, submit, reset)
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  icon = null,
  type = 'button',
  ...rest
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    info: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500',
    'outline-primary': 'bg-white hover:bg-green-50 text-green-700 border border-green-300 focus:ring-green-500',
    'outline-danger': 'bg-white hover:bg-red-50 text-red-700 border border-red-300 focus:ring-red-500',
    'outline-success': 'bg-white hover:bg-green-50 text-green-700 border border-green-300 focus:ring-green-500',
    'outline-warning': 'bg-white hover:bg-yellow-50 text-yellow-700 border border-yellow-300 focus:ring-yellow-500',
    'outline-info': 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 focus:ring-blue-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    'ghost-primary': 'bg-transparent hover:bg-green-100 text-green-700 focus:ring-green-500',
    'ghost-danger': 'bg-transparent hover:bg-red-100 text-red-700 focus:ring-red-500',
    link: 'bg-transparent hover:underline text-blue-600 focus:ring-blue-500 p-0 shadow-none'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  // Base button classes
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-colors
    ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    ${fullWidth ? 'w-full' : ''}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <Loader size={sizeIconMap[size]} className="animate-spin mr-2" />
      )}
      {!loading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

// Icon size mapping based on button size
const sizeIconMap = {
  sm: 14,
  md: 16,
  lg: 20
};

export default Button;