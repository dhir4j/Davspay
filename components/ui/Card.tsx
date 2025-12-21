'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  variant?: 'default' | 'gradient' | 'glass';
  hover?: boolean;
  padding?: string;
}

const StyledCard = styled(motion.div)<CardProps>`
  position: relative;
  padding: ${({ padding, theme }) => padding || theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.3s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'gradient':
        return `
          background: ${theme.colors.gradient};
          color: white;
        `;
      case 'glass':
        return `
          background: ${theme.colors.surface}80;
          backdrop-filter: blur(10px);
          border: 1px solid ${theme.colors.border};
        `;
      default:
        return `
          background: ${theme.colors.surface};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}

  ${({ hover, theme }) => hover && `
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.neon};
      border-color: ${theme.colors.primary};
    }
  `}

  /* Cyberpunk corner accents */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &::before {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }

  ${({ hover }) => hover && `
    &:hover::before,
    &:hover::after {
      opacity: 1;
      width: 30px;
      height: 30px;
    }
  `}
`;

interface CardComponentProps extends CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variants?: any;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
}

const Card: React.FC<CardComponentProps> = ({
  children,
  variant = 'default',
  hover = false,
  padding,
  onClick,
  className,
  variants,
  initial,
  whileInView,
  viewport,
  transition,
}) => {
  return (
    <StyledCard
      variant={variant}
      hover={hover}
      padding={padding}
      onClick={onClick}
      className={className}
      variants={variants}
      initial={initial || { opacity: 0, y: 20 }}
      whileInView={whileInView || { opacity: 1, y: 0 }}
      viewport={viewport || { once: true }}
      transition={transition || { duration: 0.5 }}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
