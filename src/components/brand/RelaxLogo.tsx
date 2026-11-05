import React from 'react';
import { PauseMark } from './PauseMark';

interface RelaxLogoProps {
  layout?: 'vertical' | 'horizontal' | 'wordmark_only' | 'symbol_only';
  color?: 'brass' | 'ivory' | 'espresso';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const RelaxLogo: React.FC<RelaxLogoProps> = ({
  layout = 'horizontal',
  color = 'brass',
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const brassHex = '#B8924E';
  const ivoryHex = '#F3E9DA';
  const espressoHex = '#1B0F0A';

  const activeColor = color === 'brass' ? brassHex : color === 'ivory' ? ivoryHex : espressoHex;
  const textColorClass = color === 'brass' ? 'text-[#B8924E]' : color === 'ivory' ? 'text-[#F3E9DA]' : 'text-[#1B0F0A]';

  if (layout === 'symbol_only') {
    return <PauseMark size={size} color={activeColor} className={className} />;
  }

  if (layout === 'wordmark_only') {
    return (
      <span
        onClick={onClick}
        className={`font-pinyon tracking-wide select-none ${
          size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
        } ${textColorClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      >
        Relax
      </span>
    );
  }

  if (layout === 'vertical') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center text-center select-none ${className} ${
          onClick ? 'cursor-pointer' : ''
        }`}
      >
        <PauseMark size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} color={activeColor} />
        <span
          className={`font-pinyon mt-2 tracking-wide leading-none ${
            size === 'sm' ? 'text-3xl' : size === 'lg' ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'
          } ${textColorClass}`}
        >
          Relax
        </span>
        <span className="font-cormorant text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#F3E9DA]/70 mt-1">
          Café · Level Seven
        </span>
        {showTagline && (
          <span className="font-messiri text-sm md:text-base text-[#B8924E] mt-2 font-medium">
            فوق الزحمة
          </span>
        )}
      </div>
    );
  }

  // Horizontal lockup: Pause symbol beside "Relax"
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <PauseMark size={size === 'sm' ? 'sm' : 'md'} color={activeColor} />
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-pinyon tracking-wide ${
            size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-3xl'
          } ${textColorClass}`}
        >
          Relax
        </span>
        <span className="font-cormorant text-[9px] tracking-[0.2em] uppercase text-[#F3E9DA]/60 -mt-1">
          Level Seven
        </span>
      </div>
    </div>
  );
};
