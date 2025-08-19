import React from 'react';

interface TrashIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const TrashIcon: React.FC<TrashIconProps> = ({ 
  size = 16, 
  color = 'currentColor',
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 4H14M5.5 4V3C5.5 2.44772 5.94772 2 6.5 2H9.5C10.0523 2 10.5 2.44772 10.5 3V4M6.5 7.5V11.5M9.5 7.5V11.5M3 4H13V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};