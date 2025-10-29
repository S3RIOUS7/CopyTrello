import React from 'react';

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
  className?: string;
  ariaHidden?: boolean;
}

export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ 
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
          d="m9.97 1.47-6 6a.75.75 0 0 0-.052 1.004l.052.056 6 6 1.06-1.06L5.56 8l5.47-5.47z"
        />
      </svg>
    </span>
  );
};