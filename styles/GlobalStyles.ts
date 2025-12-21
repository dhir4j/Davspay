'use client';

import { createGlobalStyle } from 'styled-components';
import { Theme } from './themes/theme';

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }

  /* Custom scrollbar for cyberpunk feel */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }

  /* Selection color */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  /* Special selection for gradient text - make it visible when selected */
  .gradient-text::selection,
  .text-gradient::selection {
    background: ${({ theme }) => theme.name === 'dark' ? '#FFFFFF' : '#1F2937'};
    color: ${({ theme }) => theme.colors.primary};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
    text-fill-color: ${({ theme }) => theme.colors.primary};
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 700;
    line-height: 1.2;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  /* Focus styles for accessibility */
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Smooth transitions */
  button, a, input, textarea {
    transition: all 0.3s ease;
  }

  /* Animations */
  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}40,
                   0 0 20px ${({ theme }) => theme.colors.primary}30,
                   0 0 30px ${({ theme }) => theme.colors.primary}20;
    }
    50% {
      text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}60,
                   0 0 30px ${({ theme }) => theme.colors.primary}40,
                   0 0 40px ${({ theme }) => theme.colors.primary}30;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes borderGlow {
    0%, 100% {
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary},
                  0 0 10px ${({ theme }) => theme.colors.primary}80;
    }
    50% {
      box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary},
                  0 0 30px ${({ theme }) => theme.colors.primary}60,
                  0 0 40px ${({ theme }) => theme.colors.primary}40;
    }
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  .text-gradient {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export default GlobalStyles;
