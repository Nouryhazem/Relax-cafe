import React from 'react';

interface IllustrationProps {
  className?: string;
  color?: string;
}

/**
 * 01. The Relax Elevator & Floor Seven Line Engraving
 * Architectural single-line cable shaft, gear, and floor 07 indicator.
 */
export const ElevatorShaftIllustration: React.FC<IllustrationProps> = ({
  className = 'w-24 h-24',
  color = '#5C3A28',
}) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="5" x2="20" y2="95" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="80" y1="5" x2="80" y2="95" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="28" y="25" width="44" height="50" rx="3" stroke={color} strokeWidth="1.2" />
      <line x1="50" y1="25" x2="50" y2="75" stroke={color} strokeWidth="0.8" />
      <circle cx="50" cy="14" r="7" stroke={color} strokeWidth="1.2" />
      <path d="M 46 14 L 54 14 M 50 10 L 50 18" stroke={color} strokeWidth="0.8" />
      {/* Floor 07 numeral */}
      <text x="50" y="55" fill={color} fontSize="14" fontFamily="serif" textAnchor="middle" fontWeight="bold">07</text>
      <text x="50" y="66" fill={color} fontSize="6" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">LEVEL</text>
    </svg>
  );
};

/**
 * 02. The Pitched Wooden Ceiling & Timber Beams
 * Café's dark exposed ceiling architecture framing the space.
 */
export const TimberCeilingIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-12',
  color = '#5C3A28',
}) => {
  return (
    <svg viewBox="0 0 400 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M 0 35 L 200 5 L 400 35" stroke={color} strokeWidth="1.2" />
      <line x1="50" y1="27" x2="50" y2="40" stroke={color} strokeWidth="0.8" />
      <line x1="100" y1="20" x2="100" y2="40" stroke={color} strokeWidth="0.8" />
      <line x1="150" y1="12" x2="150" y2="40" stroke={color} strokeWidth="0.8" />
      <line x1="200" y1="5" x2="200" y2="40" stroke={color} strokeWidth="1" />
      <line x1="250" y1="12" x2="250" y2="40" stroke={color} strokeWidth="0.8" />
      <line x1="300" y1="20" x2="300" y2="40" stroke={color} strokeWidth="0.8" />
      <line x1="350" y1="27" x2="350" y2="40" stroke={color} strokeWidth="0.8" />
      {/* Small hanging pendant lamp */}
      <line x1="200" y1="5" x2="200" y2="28" stroke="#B8924E" strokeWidth="0.8" />
      <path d="M 194 32 L 206 32 L 200 28 Z" fill="#B8924E" />
    </svg>
  );
};

/**
 * 03. Hands Sharing Coffee Cups & Glasses
 * The social core of Relax: two hands softly holding artisanal glasses.
 */
export const HandsSharingIllustration: React.FC<IllustrationProps> = ({
  className = 'w-32 h-20',
  color = '#5C3A28',
}) => {
  return (
    <svg viewBox="0 0 160 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Left Hand Holding Stem Glass */}
      <path d="M 10 50 C 25 45 40 40 55 45 C 58 46 62 50 60 55 C 55 60 40 60 30 65 L 10 65" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {/* Left Glass */}
      <path d="M 52 25 L 68 25 L 64 45 C 64 50 56 50 56 45 Z" stroke={color} strokeWidth="1" />
      <line x1="60" y1="20" x2="60" y2="25" stroke={color} strokeWidth="0.8" />

      {/* Right Hand Holding Ceramic Cup */}
      <path d="M 150 50 C 135 45 120 40 105 45 C 102 46 98 50 100 55 C 105 60 120 60 130 65 L 150 65" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {/* Right Cup */}
      <path d="M 94 30 L 110 30 L 107 46 C 107 49 97 49 97 46 Z" stroke={color} strokeWidth="1" />
      <path d="M 110 34 C 114 34 114 42 110 42" stroke={color} strokeWidth="0.8" />

      {/* Center delicate clink sparkle */}
      <path d="M 80 20 L 80 28 M 76 24 L 84 24" stroke="#B8924E" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 04. Single Origin Botanical Arabica Branch & Coffee Cherries
 */
export const ArabicaBranchIllustration: React.FC<IllustrationProps> = ({
  className = 'w-36 h-20',
  color = '#5C3A28',
}) => {
  return (
    <svg viewBox="0 0 160 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 40 Q 60 35 150 40" stroke={color} strokeWidth="1" />
      {/* Leaves */}
      <path d="M 40 38 C 50 20 70 25 80 37 C 65 37 50 35 40 38 Z" stroke={color} strokeWidth="0.9" fill="#FDFBF7" />
      <path d="M 80 37 C 90 55 110 50 120 39 C 105 39 90 40 80 37 Z" stroke={color} strokeWidth="0.9" fill="#FDFBF7" />
      {/* Coffee Cherries */}
      <circle cx="62" cy="40" r="4.5" stroke={color} strokeWidth="1" fill="#FDFBF7" />
      <circle cx="68" cy="36" r="4" stroke={color} strokeWidth="1" fill="#FDFBF7" />
      <circle cx="102" cy="42" r="4.5" stroke={color} strokeWidth="1" fill="#FDFBF7" />
    </svg>
  );
};

/**
 * 05. Terracotta Lounge Chair & Monstera Leaf (The Real Atmosphere)
 */
export const LoungeTerracottaIllustration: React.FC<IllustrationProps> = ({
  className = 'w-24 h-24',
  color = '#5C3A28',
}) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Curved Armchair */}
      <path d="M 25 65 C 25 45 35 35 55 35 C 75 35 85 45 85 65 L 80 75 L 30 75 Z" stroke={color} strokeWidth="1.2" />
      <path d="M 35 55 C 35 48 75 48 75 55 L 72 65 C 72 68 38 68 38 65 Z" stroke={color} strokeWidth="0.8" />
      <line x1="32" y1="75" x2="28" y2="88" stroke={color} strokeWidth="1.2" />
      <line x1="78" y1="75" x2="82" y2="88" stroke={color} strokeWidth="1.2" />

      {/* Monstera Botanical Leaf */}
      <path d="M 12 70 C 8 50 18 35 30 30 C 26 42 22 55 24 70" stroke={color} strokeWidth="0.8" />
      <path d="M 20 40 C 14 36 12 28 16 26 C 20 28 22 34 22 38" stroke={color} strokeWidth="0.7" />
      <path d="M 24 48 C 18 48 15 42 19 40" stroke={color} strokeWidth="0.7" />
    </svg>
  );
};

/**
 * 06. Continuous Story Line: Traveling Flow Connecting Folds
 * Traverses category boundaries with coffee beans, ice cubes, and aroma swirls.
 */
export const ContinuousStoryFoldLine: React.FC<IllustrationProps> = ({
  className = 'w-full h-8',
  color = '#B8924E',
}) => {
  return (
    <svg viewBox="0 0 600 30" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M 0 15 Q 150 5 300 15 T 600 15" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Floating Coffee Bean */}
      <ellipse cx="140" cy="11" rx="4" ry="2.5" transform="rotate(25 140 11)" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <path d="M 138 9 Q 140 11 142 13" stroke={color} strokeWidth="0.6" opacity="0.6" />
      {/* Ice Cube */}
      <rect x="290" y="9" width="8" height="8" rx="1.5" transform="rotate(15 290 9)" stroke={color} strokeWidth="0.8" opacity="0.6" />
      {/* Aroma Swirl */}
      <path d="M 445 18 Q 450 12 447 7 Q 443 3 448 0" stroke={color} strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
};
