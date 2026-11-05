import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

interface RelaxVideoPlayerProps {
  isArabic: boolean;
}

export const RelaxVideoPlayer: React.FC<RelaxVideoPlayerProps> = ({ isArabic }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(35);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Simulated ambient playback timer for rich sensory feel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(p => !p);
  const toggleMute = () => setIsMuted(m => !m);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#120804] border border-[#B8924E]/40 shadow-2xl group select-none"
    >
      {/* Cinematic Ambient Canvas / Video Simulation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Cafe Atmosphere Layers */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-[#1B0F0A] via-[#3B1F14] to-[#120804] transition-all duration-1000 ${
            isPlaying ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Ambient Moving Sunlight Beam */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(234, 179, 94, 0.45) 0%, rgba(184, 146, 78, 0.15) 45%, transparent 70%)',
            transform: `translateX(${(progress - 50) * 0.4}%)`,
          }}
        />

        {/* Cinematic Cafe Scene (SVG Graphic representation) */}
        <svg
          viewBox="0 0 960 540"
          className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="warmLightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#B8924E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1B0F0A" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="cupSteamGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F9DF98" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1B0F0A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Lounge with Panorama Window */}
          <rect width="960" height="540" fill="#140804" />
          <path d="M 120 40 L 840 40 L 840 420 L 120 420 Z" fill="#24120B" stroke="#B8924E" strokeWidth="2" strokeOpacity="0.4" />
          {/* Panoramic Window Panes */}
          <line x1="360" y1="40" x2="360" y2="420" stroke="#B8924E" strokeWidth="1.5" strokeOpacity="0.3" />
          <line x1="600" y1="40" x2="600" y2="420" stroke="#B8924E" strokeWidth="1.5" strokeOpacity="0.3" />

          {/* Cairo Horizon Silhouette at Twilight */}
          <path
            d="M 120 340 L 220 330 L 260 300 L 300 300 L 320 340 L 450 340 L 490 280 L 530 280 L 560 340 L 700 340 L 740 310 L 780 310 L 840 340 L 840 420 L 120 420 Z"
            fill="#1B0D07"
            opacity="0.9"
          />

          {/* Cafe Dark Walnut Counter */}
          <path d="M 0 380 L 960 380 L 960 540 L 0 540 Z" fill="#1C0E07" />
          <rect x="0" y="378" width="960" height="3" fill="#B8924E" opacity="0.7" />

          {/* Steaming Ceramic Cup & Pour-over Drip in Foreground */}
          <g transform="translate(430, 290)">
            <circle cx="50" cy="50" r="70" fill="url(#cupSteamGlow)" />
            {/* Ceramic Cup */}
            <path d="M 20 40 L 80 40 L 72 85 C 72 95 28 95 28 85 Z" fill="#FAF7F2" stroke="#B8924E" strokeWidth="2" />
            <ellipse cx="50" cy="40" rx="30" ry="8" fill="#3B1F14" />
            <ellipse cx="50" cy="40" rx="26" ry="6" fill="#251108" />
            {/* Cup Handle */}
            <path d="M 76 50 C 92 50 92 75 74 75" stroke="#FAF7F2" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Animated Steam curls */}
            <path
              d="M 45 32 Q 40 18 48 8 Q 54 -4 46 -18"
              stroke="#FAF7F2"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={isPlaying ? 0.6 : 0.2}
              className="transition-opacity duration-500"
            />
            <path
              d="M 55 32 Q 62 16 54 4 Q 48 -10 56 -24"
              stroke="#FAF7F2"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={isPlaying ? 0.5 : 0.15}
              className="transition-opacity duration-500"
            />
          </g>

          {/* Light flare sweeping */}
          <rect width="960" height="540" fill="url(#warmLightBeam)" pointerEvents="none" />
        </svg>

        {/* Film Grain & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F0A] via-transparent to-[#1B0F0A]/40 pointer-events-none" />
      </div>

      {/* Floating Center Play/Pause Trigger if Paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-[#B8924E] text-[#1B0F0A] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Play Video"
          >
            <Play className="w-7 h-7 fill-current ms-1" />
          </button>
        </div>
      )}

      {/* Video Overlay Info Header */}
      <div className="absolute top-4 start-4 end-4 flex items-center justify-between text-xs pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B0F0A]/80 backdrop-blur-md border border-[#B8924E]/40 text-[#F3E9DA]">
          <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
          <span className="font-messiri font-semibold">
            {isArabic ? 'أجواء ريلاكس كافيه · الدور السابع' : 'Relax Café Atmosphere · Level Seven'}
          </span>
        </div>
        <div className="font-cormorant tracking-widest text-[#B8924E] text-[11px] uppercase bg-[#1B0F0A]/70 px-2.5 py-1 rounded border border-[#3B1F14]">
          4K CINEMATIC
        </div>
      </div>

      {/* Player Bottom Control Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#1B0F0A] via-[#1B0F0A]/85 to-transparent transition-opacity duration-300 ${
          isHovered || !isPlaying ? 'opacity-100' : 'opacity-80 md:opacity-0'
        }`}
      >
        {/* Scrub Bar */}
        <div
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.max(0, Math.min(100, clickPos * 100)));
          }}
          className="relative w-full h-1.5 bg-[#3B1F14] hover:h-2 rounded-full overflow-hidden mb-3 cursor-pointer transition-all"
        >
          <div
            className="h-full bg-gradient-to-r from-[#B8924E] to-[#F3E9DA] rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between text-xs text-[#F3E9DA]">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-[#F3E9DA] hover:text-[#B8924E] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="text-[#F3E9DA]/70 hover:text-[#B8924E] transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="font-mono text-[11px] text-[#F3E9DA]/60">
              00:{Math.floor(progress * 0.6).toString().padStart(2, '0')} / 01:00
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-[#B8924E]/80">
              {isArabic ? 'هدوء، تحميص طازج، وروقان' : 'Quiet, Fresh Roast, Serenity'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
