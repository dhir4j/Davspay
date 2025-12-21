'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
`;

const TileCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Grid pattern */
  background-image:
    linear-gradient(${({ theme }) => theme.colors.primary}20 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.primary}20 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;

  /* Show tiles with moderate opacity by default */
  opacity: 0.35;
  transition: opacity 0.3s ease;

  /* Mask that reveals tiles on hover */
  mask-image: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    black 0%,
    black 150px,
    rgba(0, 0, 0, 0.35) 300px,
    rgba(0, 0, 0, 0.35) 100%
  );
  -webkit-mask-image: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    black 0%,
    black 150px,
    rgba(0, 0, 0, 0.35) 300px,
    rgba(0, 0, 0, 0.35) 100%
  );

  &.visible {
    opacity: 1;
  }

  @keyframes gridMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }
`;

const GlowOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  /* Radial glow that follows mouse - stronger purple for light theme */
  background: radial-gradient(
    circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    ${({ theme }) => theme.name === 'light' ? theme.colors.primary + '18' : theme.colors.primary + '08'},
    transparent 70%
  );

  /* Show subtle glow by default */
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &.visible {
    opacity: 1;
  }
`;

const TileBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileCanvasRef = useRef<HTMLDivElement>(null);
  const glowOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const tileCanvas = tileCanvasRef.current;
    const glowOverlay = glowOverlayRef.current;

    if (!container || !tileCanvas || !glowOverlay) return;

    let mouseX = 50;
    let mouseY = 50;
    let isMouseInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      mouseX = x;
      mouseY = y;
      isMouseInside = true;

      tileCanvas.style.setProperty('--mouse-x', `${x}%`);
      tileCanvas.style.setProperty('--mouse-y', `${y}%`);
      glowOverlay.style.setProperty('--mouse-x', `${x}%`);
      glowOverlay.style.setProperty('--mouse-y', `${y}%`);

      tileCanvas.classList.add('visible');
      glowOverlay.classList.add('visible');
    };

    const handleMouseLeave = () => {
      isMouseInside = false;

      // Fade out after a delay
      setTimeout(() => {
        if (!isMouseInside) {
          tileCanvas.classList.remove('visible');
          glowOverlay.classList.remove('visible');
        }
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <BackgroundContainer ref={containerRef}>
      <TileCanvas ref={tileCanvasRef} />
      <GlowOverlay ref={glowOverlayRef} />
    </BackgroundContainer>
  );
};

export default TileBackground;
