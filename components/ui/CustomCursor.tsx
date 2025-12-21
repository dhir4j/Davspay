'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
`;

const CursorGlow = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.5;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primary}40 0%,
    ${({ theme }) => theme.colors.primary}20 40%,
    transparent 70%
  );
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide custom cursor on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <CursorDot
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <CursorGlow
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default CustomCursor;
