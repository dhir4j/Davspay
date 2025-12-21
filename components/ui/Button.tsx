'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  position: relative;
  padding: ${({ size, theme }) =>
    size === 'sm' ? '0.5rem 1rem' :
    size === 'lg' ? '1rem 2rem' :
    '0.75rem 1.5rem'};
  font-size: ${({ size }) =>
    size === 'sm' ? '0.875rem' :
    size === 'lg' ? '1.125rem' :
    '1rem'};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.secondary};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: white;
          &:hover {
            box-shadow: ${theme.shadows.neon};
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          &:hover {
            background: ${theme.colors.primary}20;
            box-shadow: ${theme.shadows.neon};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text};
          &:hover {
            background: ${theme.colors.primary}10;
          }
        `;
      default: // primary
        return `
          background: ${theme.colors.gradient};
          color: white;
          &:hover {
            box-shadow: ${theme.shadows.neonHover};
            transform: translateY(-2px);
          }
          &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: ${theme.colors.gradient};
            border-radius: ${theme.borderRadius.md};
            z-index: -1;
            filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s;
          }
          &:hover::before {
            opacity: 0.7;
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

interface ButtonComponentProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const Button: React.FC<ButtonComponentProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
