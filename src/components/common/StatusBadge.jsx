import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  XCircle, 
  Loader,
  CheckSquare
} from 'lucide-react';

/**
 * StatusBadge component for displaying status information with appropriate styling
 * 
 * @param {string} status - The status to display
 * @param {string} size - The size of the badge (sm, md, lg)
 * @param {boolean} iconOnly - Whether to show only the icon without text
 */
const StatusBadge = ({ status, size = 'md', iconOnly = false }) => {
  // Normalize status by removing underscores, converting to lowercase,
  // and handling common status variations
  const normalizedStatus = (status || '')
    .toString()
    .replace(/_/g, ' ')
    .toLowerCase();
  
  // Define status configurations
  const statusConfig = {
    // Completed/Success states
    completed: {
      icon: <CheckCircle size={getIconSize(size)} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    success: {
      icon: <CheckCircle size={getIconSize(size)} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    paid: {
      icon: <CheckCircle size={getIconSize(size)} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    approved: {
      icon: <CheckCircle size={getIconSize(size)} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    active: {
      icon: <CheckCircle size={getIconSize(size)} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    
    // Pending/Processing states
    pending: {
      icon: <Clock size={getIconSize(size)} />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    processing: {
      icon: <Clock size={getIconSize(size)} />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    waiting: {
      icon: <Clock size={getIconSize(size)} />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    'not completed': {
      icon: <Clock size={getIconSize(size)} />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    
    // In Progress states
    'in progress': {
      icon: <Loader size={getIconSize(size)} />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    ongoing: {
      icon: <Loader size={getIconSize(size)} />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    
    // Warning states
    warning: {
      icon: <AlertTriangle size={getIconSize(size)} />,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    },
    overdue: {
      icon: <AlertTriangle size={getIconSize(size)} />,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    },
    
    // Error/Cancelled states
    error: {
      icon: <XCircle size={getIconSize(size)} />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    },
    failed: {
      icon: <XCircle size={getIconSize(size)} />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    },
    cancelled: {
      icon: <XCircle size={getIconSize(size)} />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    },
    
    // Default state
    default: {
      icon: <CheckSquare size={getIconSize(size)} />,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200'
    }
  };
  
  // Get configuration for current status or use default
  const config = statusConfig[normalizedStatus] || statusConfig.default;
  
  // Get size classes
  const sizeClasses = getSizeClasses(size);
  
  // Format display text
  const displayText = formatStatusText(normalizedStatus);
  
  // Render badge
  return (
    <span 
      className={`inline-flex items-center rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses}`}
    >
      <span className="mr-1">{config.icon}</span>
      {!iconOnly && <span>{displayText}</span>}
    </span>
  );
};

/**
 * Get icon size based on badge size
 */
const getIconSize = (size) => {
  switch(size) {
    case 'sm': return 12;
    case 'lg': return 18;
    case 'md':
    default: return 14;
  }
};

/**
 * Get size classes for badge
 */
const getSizeClasses = (size) => {
  switch(size) {
    case 'sm': return 'text-xs px-2 py-0.5';
    case 'lg': return 'text-sm px-3 py-1.5';
    case 'md':
    default: return 'text-xs px-2.5 py-1';
  }
};

/**
 * Format status text for display
 */
const formatStatusText = (status) => {
  if (!status) return 'Unknown';
  
  // Capitalize first letter of each word
  return status
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default StatusBadge;