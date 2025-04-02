import React from 'react';

/**
 * Card component for displaying content in a card format
 * 
 * @param {React.ReactNode} children - Card content
 * @param {string} title - Card title
 * @param {React.ReactNode} icon - Icon to display in the title
 * @param {React.ReactNode} action - Action component to display in the header
 * @param {boolean} padding - Whether to add padding to the card content
 * @param {string} className - Additional CSS classes
 * @param {string} titleClassName - Additional CSS classes for the title
 * @param {string} bodyClassName - Additional CSS classes for the card body
 * @param {function} onClick - Function to call when card is clicked
 */
const Card = ({
  children,
  title,
  icon,
  action,
  padding = true,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  onClick,
  ...rest
}) => {
  const cardClasses = `
    bg-white rounded-lg shadow-sm ${className}
    ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
  `;
  
  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      {...rest}
    >
      {/* Card header */}
      {(title || action) && (
        <div className={`border-b px-4 py-3 flex items-center justify-between ${titleClassName}`}>
          {/* Title and icon */}
          {title && (
            <div className="flex items-center font-medium">
              {icon && <span className="mr-2">{icon}</span>}
              <h3 className="text-gray-800">{title}</h3>
            </div>
          )}
          
          {/* Action component */}
          {action && (
            <div>{action}</div>
          )}
        </div>
      )}
      
      {/* Card body */}
      <div className={`${padding ? 'p-4' : ''} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;