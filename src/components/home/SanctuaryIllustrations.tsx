import React from 'react';

interface VisualProps {
  className?: string;
}

/**
 * 01. The Sunset Glass Terrace (شرفة الغروب والبانوراما)
 * High-end architectural view from Level Seven looking out over the glowing city skyline.
 */
export const SunsetTerraceVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#140B07] border border-[#B8924E]/30 shadow-2xl group ${className}`}>
      <svg
        viewBox="0 0 800 520"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sunset sky gradient */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B1425" />
            <stop offset="35%" stopColor="#4A1E28" />
            <stop offset="70%" stopColor="#9C4A28" />
            <stop offset="90%" stopColor="#D98236" />
            <stop offset="100%" stopColor="#EAB35E" />
          </linearGradient>

          {/* Golden sun glow */}
          <radialGradient id="sunGlow" cx="62%" cy="68%" r="45%">
            <stop offset="0%" stopColor="#FFF2D4" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#F4A247" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#B85D28" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1B0F0A" stopOpacity="0" />
          </radialGradient>

          {/* Warm room lighting */}
          <radialGradient id="roomLight" cx="15%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#B8924E" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#3B1F14" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1B0F0A" stopOpacity="0.7" />
          </radialGradient>

          {/* Glass reflection gradient */}
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#B8924E" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          {/* Brass beam gradient */}
          <linearGradient id="brassBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5E431E" />
            <stop offset="50%" stopColor="#D4A75E" />
            <stop offset="100%" stopColor="#8C6B2D" />
          </linearGradient>
        </defs>

        {/* 1. Sky backdrop */}
        <rect width="800" height="520" fill="url(#skyGrad)" />
        <rect width="800" height="520" fill="url(#sunGlow)" />

        {/* 2. City horizon silhouette */}
        <path
          d="M 0 380 L 40 375 L 45 350 L 75 350 L 80 375 L 120 375 L 125 320 L 155 320 L 160 375 L 210 375 L 215 340 L 235 340 L 240 375 L 310 375 L 315 295 L 345 295 L 350 375 L 420 375 L 430 330 L 460 330 L 465 375 L 530 375 L 535 310 L 565 310 L 570 375 L 640 375 L 650 345 L 680 345 L 685 375 L 800 375 L 800 520 L 0 520 Z"
          fill="#1F0D07"
          opacity="0.9"
        />

        {/* Twinkling city lights */}
        <g fill="#F3E9DA" opacity="0.6">
          <circle cx="135" cy="335" r="1.5" />
          <circle cx="145" cy="345" r="1.2" />
          <circle cx="325" cy="310" r="1.5" />
          <circle cx="335" cy="325" r="1.2" />
          <circle cx="440" cy="345" r="1.5" />
          <circle cx="545" cy="325" r="1.5" />
          <circle cx="555" cy="340" r="1.2" />
          <circle cx="660" cy="355" r="1.5" />
        </g>

        {/* Distant river / horizon sheen */}
        <path d="M 0 378 Q 400 372 800 378 L 800 395 Q 400 388 0 395 Z" fill="#F4A247" opacity="0.4" />

        {/* 3. Floor Terrace (Travertine & Dark Timber) */}
        <path d="M 0 395 L 800 395 L 800 520 L 0 520 Z" fill="#180C07" />
        {/* Floor perspective lines */}
        <line x1="120" y1="520" x2="260" y2="395" stroke="#3B1F14" strokeWidth="1.5" />
        <line x1="380" y1="520" x2="420" y2="395" stroke="#3B1F14" strokeWidth="1.5" />
        <line x1="640" y1="520" x2="560" y2="395" stroke="#3B1F14" strokeWidth="1.5" />

        {/* 4. Panoramic Glass Floor-To-Ceiling Mullions */}
        <rect x="0" y="0" width="800" height="520" fill="url(#glassReflect)" />
        <rect x="250" y="0" width="10" height="395" fill="url(#brassBeam)" opacity="0.8" />
        <rect x="530" y="0" width="10" height="395" fill="url(#brassBeam)" opacity="0.8" />
        {/* Top header beam */}
        <rect x="0" y="0" width="800" height="24" fill="#140804" />
        <rect x="0" y="22" width="800" height="3" fill="url(#brassBeam)" />

        {/* 5. Indoor Cozy Lounge Seating & Table Silhouette */}
        {/* Brass pendant lamp hanging on left */}
        <line x1="140" y1="0" x2="140" y2="160" stroke="#8C6B2D" strokeWidth="2" />
        <path d="M 115 175 L 165 175 L 150 160 L 130 160 Z" fill="#D4A75E" />
        <circle cx="140" cy="180" r="7" fill="#FFF4D0" />
        <radialGradient id="lampGlow" cx="140" cy="180" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2D4" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#B8924E" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1B0F0A" stopOpacity="0" />
        </radialGradient>
        <circle cx="140" cy="180" r="110" fill="url(#lampGlow)" />

        {/* Espresso Lounge Armchair on left */}
        <path
          d="M 60 480 C 60 420 80 380 130 380 C 180 380 200 420 200 480 L 190 510 L 70 510 Z"
          fill="#2C160E"
          stroke="#4A2518"
          strokeWidth="2"
        />
        <path d="M 80 430 C 80 400 180 400 180 430 L 175 470 C 175 475 85 475 85 470 Z" fill="#3B1F14" />

        {/* Low Dark Walnut Coffee Table */}
        <ellipse cx="260" cy="460" rx="60" ry="16" fill="#1E0D07" stroke="#8C6B2D" strokeWidth="1.5" />
        <line x1="260" y1="460" x2="260" y2="505" stroke="#1E0D07" strokeWidth="5" />
        <line x1="220" y1="458" x2="215" y2="500" stroke="#1E0D07" strokeWidth="4" />
        <line x1="300" y1="458" x2="305" y2="500" stroke="#1E0D07" strokeWidth="4" />

        {/* Steaming Ceramic Coffee Cup on Table */}
        <rect x="250" y="442" width="16" height="12" rx="2" fill="#E6DAC8" />
        <ellipse cx="258" cy="442" rx="8" ry="2.5" fill="#3B1F14" />
        <path d="M 266 445 C 270 445 270 451 266 451" stroke="#E6DAC8" strokeWidth="1.5" fill="none" />
        {/* Steam */}
        <path d="M 256 438 Q 254 430 258 424" stroke="#FAF7F2" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
        <path d="M 260 438 Q 262 432 259 422" stroke="#FAF7F2" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />

        {/* Ambient interior vignette overlay */}
        <rect width="800" height="520" fill="url(#roomLight)" pointerEvents="none" />
      </svg>

      {/* Editorial Badge Overlay */}
      <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between p-3 rounded-xl bg-[#1B0F0A]/85 backdrop-blur-md border border-[#B8924E]/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
          <span className="font-messiri font-bold text-[#F3E9DA]">شرفة الغروب والبانوراما</span>
          <span className="text-[#F3E9DA]/40">·</span>
          <span className="font-cormorant text-[#B8924E] text-[11px] tracking-wider uppercase">Level 07 Skyline</span>
        </div>
        <span className="font-mono text-[11px] text-[#B8924E]">18:30 DUSK</span>
      </div>
    </div>
  );
};

/**
 * 02. The Slow Bar & Roasting Altar (بار القهوة المختصة والتحميص)
 * Handcrafted pour-over station, steam wisps, vintage brass scale, dark walnut wood bar.
 */
export const SlowBarVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#140B07] border border-[#B8924E]/30 shadow-2xl group ${className}`}>
      <svg
        viewBox="0 0 800 520"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="barSpotlight" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFF0D4" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#B8924E" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#1B0F0A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#120703" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="walnutWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B1F14" />
            <stop offset="50%" stopColor="#2A140B" />
            <stop offset="100%" stopColor="#1A0A04" />
          </linearGradient>

          <linearGradient id="brassKettle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9DF98" />
            <stop offset="40%" stopColor="#B8924E" />
            <stop offset="80%" stopColor="#6E4F1B" />
            <stop offset="100%" stopColor="#3E2807" />
          </linearGradient>

          <linearGradient id="glassCarafe" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#5C341E" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#351C0E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* 1. Dark ambient background */}
        <rect width="800" height="520" fill="#120703" />
        <rect width="800" height="520" fill="url(#barSpotlight)" />

        {/* Background wall shelves with glowing specialty coffee bottles & jars */}
        <rect x="100" y="100" width="600" height="8" fill="#3B1F14" />
        <rect x="100" y="106" width="600" height="2" fill="#B8924E" opacity="0.6" />

        {/* Coffee Bean Canisters */}
        <rect x="160" y="55" width="35" height="45" rx="3" fill="#1B0F0A" stroke="#8C6B2D" strokeWidth="1" />
        <rect x="210" y="50" width="30" height="50" rx="3" fill="#2C160E" stroke="#8C6B2D" strokeWidth="1" />
        <rect x="255" y="60" width="35" height="40" rx="3" fill="#1B0F0A" stroke="#8C6B2D" strokeWidth="1" />
        <rect x="520" y="52" width="38" height="48" rx="3" fill="#241108" stroke="#8C6B2D" strokeWidth="1" />
        <rect x="575" y="48" width="32" height="52" rx="3" fill="#1B0F0A" stroke="#8C6B2D" strokeWidth="1" />

        {/* 2. Walnut Slow Bar Countertop */}
        <path d="M 0 320 L 800 320 L 800 520 L 0 520 Z" fill="url(#walnutWood)" />
        <rect x="0" y="318" width="800" height="3" fill="#B8924E" opacity="0.8" />

        {/* 3. Centerpiece: Precision Pour-Over Stand (Aged Brass & Dripper) */}
        {/* Brass Stand Base */}
        <rect x="330" y="310" width="140" height="8" rx="2" fill="url(#brassKettle)" />
        {/* Brass Stand Vertical Rods */}
        <rect x="345" y="180" width="6" height="130" fill="url(#brassKettle)" />
        <rect x="340" y="180" width="80" height="6" fill="url(#brassKettle)" />

        {/* Ceramic V60 Dripper */}
        <path d="M 370 186 L 430 186 L 412 225 L 388 225 Z" fill="#F4EADB" stroke="#B8924E" strokeWidth="1.5" />
        {/* Ribs on dripper */}
        <line x1="385" y1="190" x2="394" y2="220" stroke="#D1C0AA" strokeWidth="1" />
        <line x1="400" y1="190" x2="400" y2="220" stroke="#D1C0AA" strokeWidth="1" />
        <line x1="415" y1="190" x2="406" y2="220" stroke="#D1C0AA" strokeWidth="1" />

        {/* Glass Carafe Server below */}
        <path
          d="M 390 238 L 410 238 L 426 295 L 374 295 Z"
          fill="url(#glassCarafe)"
          stroke="#FAF7F2"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Liquid coffee in carafe */}
        <path d="M 378 275 Q 400 273 422 275 L 425 293 L 375 293 Z" fill="#240F06" />

        {/* 4. Gooseneck Pouring Kettle (Aged Brass) pouring a delicate stream */}
        <g transform="translate(435, 140) rotate(-18)">
          <path
            d="M 20 20 C 40 10 70 15 80 40 L 75 80 C 70 88 30 88 25 80 Z"
            fill="url(#brassKettle)"
            stroke="#8C6B2D"
            strokeWidth="1.5"
          />
          {/* Gooseneck spout */}
          <path
            d="M 22 70 C -5 65 -15 30 5 15"
            stroke="url(#brassKettle)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Wooden handle */}
          <path d="M 75 30 C 100 25 105 60 72 75" stroke="#3B1F14" strokeWidth="5" fill="none" />
        </g>

        {/* Delicate golden water stream from gooseneck into dripper */}
        <path d="M 425 158 Q 405 168 400 190" stroke="#FFE9B3" strokeWidth="1.8" opacity="0.9" fill="none" />

        {/* Aromatic Steam spirals */}
        <path d="M 395 180 Q 388 160 396 142 Q 402 125 394 105" stroke="#FFF7ED" strokeWidth="1.5" opacity="0.4" fill="none" strokeLinecap="round" />
        <path d="M 405 180 Q 415 162 408 140 Q 402 120 412 95" stroke="#FFF7ED" strokeWidth="1.8" opacity="0.35" fill="none" strokeLinecap="round" />

        {/* Digital Precision Scale */}
        <rect x="365" y="296" width="70" height="12" rx="3" fill="#0D0704" stroke="#4A2518" strokeWidth="1" />
        <rect x="385" y="300" width="30" height="5" rx="1" fill="#1F120A" />
        <text x="400" y="304" fill="#B8924E" fontSize="4.5" fontFamily="monospace" textAnchor="middle">02:45 · 240g</text>

        {/* Brass Tamper & Single Origin Bean Bowl */}
        <circle cx="270" cy="360" r="28" fill="#1C0E07" stroke="#8C6B2D" strokeWidth="1" />
        {/* Coffee beans scattered */}
        <ellipse cx="265" cy="355" rx="4" ry="2.5" fill="#422214" transform="rotate(30, 265, 355)" />
        <ellipse cx="275" cy="360" rx="4" ry="2.5" fill="#361A0E" transform="rotate(-20, 275, 360)" />
        <ellipse cx="268" cy="366" rx="4" ry="2.5" fill="#4B2717" transform="rotate(45, 268, 366)" />

        {/* Brass Portafilter resting on tamping mat */}
        <rect x="520" y="340" width="70" height="10" rx="3" fill="#3B1F14" />
        <circle cx="595" cy="345" r="16" fill="url(#brassKettle)" />
        <circle cx="595" cy="345" r="12" fill="#1A0B05" />
      </svg>

      <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between p-3 rounded-xl bg-[#1B0F0A]/85 backdrop-blur-md border border-[#B8924E]/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
          <span className="font-messiri font-bold text-[#F3E9DA]">بار القهوة المختصة والتحميص</span>
          <span className="text-[#F3E9DA]/40">·</span>
          <span className="font-cormorant text-[#B8924E] text-[11px] tracking-wider uppercase">Single-Origin Slow Bar</span>
        </div>
        <span className="font-mono text-[11px] text-[#B8924E]">V60 / CHEMEX</span>
      </div>
    </div>
  );
};

/**
 * 03. The Secluded Lounge Alcove (جلسات الخصوصية والهدوء)
 * Dark timber ceiling beams, plush espresso velvet seating, warm low pendant lamps.
 */
export const QuietAlcoveVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#140B07] border border-[#B8924E]/30 shadow-2xl group ${className}`}>
      <svg
        viewBox="0 0 800 520"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="alcoveGlow" cx="65%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2D4" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#B8924E" stopOpacity="0.2" />
            <stop offset="75%" stopColor="#1B0F0A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0E0502" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="timberBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2F180F" />
            <stop offset="100%" stopColor="#180A04" />
          </linearGradient>
        </defs>

        {/* Ambient Room */}
        <rect width="800" height="520" fill="#0E0502" />
        <rect width="800" height="520" fill="url(#alcoveGlow)" />

        {/* Ceiling Exposed Timber Beams */}
        <g fill="url(#timberBeam)">
          <rect x="0" y="0" width="800" height="30" />
          <rect x="80" y="0" width="40" height="70" />
          <rect x="220" y="0" width="40" height="70" />
          <rect x="360" y="0" width="40" height="70" />
          <rect x="500" y="0" width="40" height="70" />
          <rect x="640" y="0" width="40" height="70" />
        </g>
        {/* Brass accent trim on timber */}
        <line x1="0" y1="30" x2="800" y2="30" stroke="#B8924E" strokeWidth="2" opacity="0.7" />

        {/* Textured Wall Paneling */}
        <g stroke="#1F0E08" strokeWidth="1.5">
          <line x1="160" y1="30" x2="160" y2="400" />
          <line x1="300" y1="30" x2="300" y2="400" />
          <line x1="440" y1="30" x2="440" y2="400" />
          <line x1="580" y1="30" x2="580" y2="400" />
        </g>

        {/* Glowing Brass Fluted Sconce Lamp on Wall */}
        <rect x="510" y="160" width="12" height="70" rx="3" fill="#D4A75E" stroke="#8C6B2D" strokeWidth="1" />
        <circle cx="516" cy="195" r="45" fill="#FFF2D4" opacity="0.3" filter="blur(8px)" />

        {/* Deep Plush Velvet Sofa (Espresso & Terracotta) */}
        <path
          d="M 120 480 C 120 380 160 320 280 320 L 600 320 C 680 320 720 380 720 480 Z"
          fill="#2C150D"
          stroke="#422013"
          strokeWidth="2"
        />
        {/* Velvet Cushions */}
        <rect x="180" y="340" width="120" height="110" rx="10" fill="#3D1E12" stroke="#522B1B" strokeWidth="1.5" />
        <rect x="320" y="340" width="120" height="110" rx="10" fill="#3D1E12" stroke="#522B1B" strokeWidth="1.5" />
        <rect x="460" y="340" width="120" height="110" rx="10" fill="#3D1E12" stroke="#522B1B" strokeWidth="1.5" />

        {/* Linen decorative throw pillow (Terracotta & Gold) */}
        <rect x="200" y="380" width="60" height="60" rx="6" fill="#8C4324" transform="rotate(-12, 230, 410)" />
        <rect x="510" y="385" width="55" height="55" rx="6" fill="#B8924E" transform="rotate(15, 537, 412)" opacity="0.9" />

        {/* Travertine Stone Table with Book & Cup */}
        <ellipse cx="400" cy="460" rx="110" ry="28" fill="#EDE4D3" stroke="#D1C3AB" strokeWidth="2" />
        <ellipse cx="400" cy="458" rx="105" ry="24" fill="#F5EFEB" />
        {/* Table leg */}
        <rect x="390" y="475" width="20" height="45" fill="#8C6B2D" />

        {/* Open Hardcover Book on Table */}
        <path d="M 350 452 Q 375 448 400 454 Q 425 448 450 452 L 448 460 Q 425 456 400 462 Q 375 456 352 460 Z" fill="#FDFBF7" stroke="#1B0F0A" strokeWidth="0.8" />
        <line x1="400" y1="454" x2="400" y2="462" stroke="#8C6B2D" strokeWidth="1.2" />

        {/* Quiet Botanical Monstera leaf silhouette in background corner */}
        <g fill="#2D3A29" opacity="0.6">
          <path d="M 80 340 C 60 280 20 250 10 240 C 30 250 60 290 80 340 Z" />
          <path d="M 90 350 C 130 290 140 230 145 210 C 135 240 110 300 90 350 Z" />
          <path d="M 75 360 C 20 340 0 310 -10 300 C 10 310 45 330 75 360 Z" />
        </g>
      </svg>

      <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between p-3 rounded-xl bg-[#1B0F0A]/85 backdrop-blur-md border border-[#B8924E]/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
          <span className="font-messiri font-bold text-[#F3E9DA]">جلسات الخصوصية والسكينة</span>
          <span className="text-[#F3E9DA]/40">·</span>
          <span className="font-cormorant text-[#B8924E] text-[11px] tracking-wider uppercase">Quiet Living Alcove</span>
        </div>
        <span className="font-mono text-[11px] text-[#B8924E]">ACOUSTIC ZERO</span>
      </div>
    </div>
  );
};
