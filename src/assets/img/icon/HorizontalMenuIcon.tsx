import React from 'react';

interface OverflowMenuHorizontalIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const OverflowMenuHorizontalIcon: React.FC<OverflowMenuHorizontalIconProps> = ({ 
  size = 24, 
  color = '#42526E', 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      role="presentation" 
      focusable="false" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" 
        fill={color}
      />
    </svg>
  );
};