import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Modal component for displaying content in a dialog
 * 
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when the modal is closed
 * @param {React.ReactNode} children - Modal content
 * @param {string} title - Modal title
 * @param {boolean} showClose - Whether to show the close button
 * @param {string} size - Modal size (sm, md, lg, xl, full)
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  showClose = true,
  size = 'md'
}) => {
  const modalRef = useRef(null);
  
  // Add event listeners when the modal opens
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus the modal for accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Add escape key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape' && showClose) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      // Clean up
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose, showClose]);
  
  // Handle clicking outside the modal
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && showClose) {
      onClose();
    }
  };
  
  // Get modal size classes
  const sizeClasses = getSizeClasses(size);
  
  // Don't render anything if the modal is not open
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={handleOutsideClick}
      ></div>
      
      {/* Modal content wrapper */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div 
          ref={modalRef}
          className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${sizeClasses}`}
          tabIndex="-1"
        >
          {/* Modal header */}
          {title && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                {title}
              </h3>
              
              {showClose && (
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}
          
          {/* Modal body */}
          <div className="bg-white px-4 py-5 sm:px-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Get size classes based on modal size
 * @param {string} size - Modal size (sm, md, lg, xl, full)
 * @returns {string} - CSS classes for modal size
 */
const getSizeClasses = (size) => {
  switch (size) {
    case 'sm':
      return 'sm:max-w-sm sm:w-full';
    case 'md':
      return 'sm:max-w-md sm:w-full';
    case 'lg':
      return 'sm:max-w-lg sm:w-full';
    case 'xl':
      return 'sm:max-w-xl sm:w-full';
    case '2xl':
      return 'sm:max-w-2xl sm:w-full';
    case '3xl':
      return 'sm:max-w-3xl sm:w-full';
    case '4xl':
      return 'sm:max-w-4xl sm:w-full';
    case '5xl':
      return 'sm:max-w-5xl sm:w-full';
    case '6xl':
      return 'sm:max-w-6xl sm:w-full';
    case '7xl':
      return 'sm:max-w-7xl sm:w-full';
    case 'full':
      return 'sm:max-w-full sm:w-full';
    default:
      return 'sm:max-w-md sm:w-full';
  }
};

export default Modal;