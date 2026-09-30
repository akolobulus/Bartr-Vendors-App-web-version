import React from 'react';

interface BartrLogoMarkProps {
  size?: number | string;
  topColor?: string;
  bottomColor?: string;
  className?: string;
}

export const BartrLogoMark: React.FC<BartrLogoMarkProps> = ({
  size = 38,
  topColor = '#0067F5',
  bottomColor = '#0A2E65',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top arrow */}
      <path
        d="M6 12L14 6V10H26V14H14V18L6 12Z"
        fill={topColor}
      />
      {/* Bottom arrow */}
      <path
        d="M26 20L18 26V22H6V18H18V14L26 20Z"
        fill={bottomColor}
      />
    </svg>
  );
};
