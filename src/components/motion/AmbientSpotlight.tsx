import React, { useEffect, useState, useRef } from 'react';

/**
 * AmbientSpotlight & Studio Cursor:
 * Provides an ultra-subtle warm amber lighting presence tracking mouse movement,
 * plus a delicate aged-brass trailing dot and halo on desktop pointers.
 */
export const AmbientSpotlight: React.FC = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [trailPos, setTrailPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check if hovering clickable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [visible]);

  // Smooth lerp trailing animation for cursor halo
  useEffect(() => {
    if (isTouchDevice) return;

    const animateTrail = () => {
      setTrailPos(prev => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pos, isTouchDevice]);

  if (!visible) return null;

  return (
    <>
      {/* Ambient Warm Amber Light Bloom */}
      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700"
        style={{
          background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(184, 146, 78, 0.07), rgba(59, 31, 20, 0.04) 40%, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Leading Studio Cursor Dot (Desktop Only) */}
      {!isTouchDevice && (
        <>
          <div
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8924E] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_8px_#B8924E]"
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHoveringClickable ? 0.6 : 1})`,
            }}
            aria-hidden="true"
          />

          {/* Smooth Trailing Halo Ring */}
          <div
            className={`fixed top-0 left-0 rounded-full border border-[#B8924E]/50 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
              isHoveringClickable
                ? 'w-11 h-11 bg-[#B8924E]/15 border-[#B8924E] shadow-[0_0_15px_rgba(184,146,78,0.3)]'
                : 'w-7 h-7 bg-transparent'
            }`}
            style={{
              transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0)`,
            }}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
};
