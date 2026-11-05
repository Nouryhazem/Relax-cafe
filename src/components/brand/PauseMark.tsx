import React from 'react';

interface PauseMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  color?: string; // e.g. '#B8924E' (Aged Brass) or '#F3E9DA' (Warm Ivory)
  fill?: string;
  animate?: boolean;
}

export const PauseMark: React.FC<PauseMarkProps> = ({
  className = '',
  size = 'md',
  color = '#B8924E',
  fill = 'none',
  animate = false,
}) => {
  const sizeMap = {
    sm: 'w-4 h-6',
    md: 'w-6 h-9',
    lg: 'w-8 h-13',
    xl: 'w-12 h-20',
    custom: '',
  };

  const chosenSize = sizeMap[size] || sizeMap.md;

  return (
    <svg
      viewBox="0 0 32 52"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={`${chosenSize} ${className} ${animate ? 'animate-pulse' : ''} inline-block shrink-0`}
      aria-hidden="true"
    >
      {/* Elongated Chamfered Octagon Outline */}
      <path
        d="M 10 2 L 22 2 L 30 10 L 30 42 L 22 50 L 10 50 L 2 42 L 2 10 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={fill}
      />
      {/* Two Vertical Pause Bars */}
      <line
        x1="13"
        y1="14"
        x2="13"
        y2="38"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="19"
        y1="14"
        x2="19"
        y2="38"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
