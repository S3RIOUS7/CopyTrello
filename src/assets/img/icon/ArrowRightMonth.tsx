import React from 'react';

interface ArrowRightIconProps {
  size?: number;
  color?: string;
  className?: string;
  ariaHidden?: boolean;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ 
  size = 16, 
  color = 'currentColor', 
  className = '',
  ariaHidden = true
}) => {
  return (
    <span 
      aria-hidden={ariaHidden}
      className={className}
      style={{ color }}
    >
      <svg 
        width={size} 
        height={size} 
        fill="none" 
        viewBox="0 0 16 16" 
        role="presentation"
        focusable="false"
      >
        <path 
          fill="currentColor" 
          d="m6.03 1.47 6 6a.75.75 0 0 1 .052 1.004l-.052.056-6 6-1.06-1.06L10.44 8 4.97 2.53z"
        />
      </svg>
    </span>
  );
};