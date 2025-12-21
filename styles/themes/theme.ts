export interface Theme {
  name: string;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundSecondary: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
    neonGlow: string;
    gradient: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    neon: string;
    neonHover: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#A78BFA',        // Light violet
    primaryDark: '#7C3AED',
    primaryLight: '#C4B5FD',
    secondary: '#60A5FA',       // Cyan blue
    accent: '#F472B6',          // Pink accent
    background: '#0A0A0F',      // Deep dark
    backgroundSecondary: '#1A1A2E',
    surface: '#16213E',
    text: '#E4E4E7',
    textSecondary: '#A1A1AA',
    border: '#A78BFA40',        // Violet with transparency
    success: '#4ADE80',
    error: '#F87171',
    warning: '#FBBF24',
    neonGlow: '#A78BFA',
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #60A5FA 50%, #F472B6 100%)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    secondary: "'Space Grotesk', sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    neon: '0 0 20px rgba(167, 139, 250, 0.5), 0 0 40px rgba(167, 139, 250, 0.3)',
    neonHover: '0 0 30px rgba(167, 139, 250, 0.8), 0 0 60px rgba(167, 139, 250, 0.5)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
};

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#7C3AED',        // Darker violet for light mode
    primaryDark: '#5B21B6',
    primaryLight: '#A78BFA',
    secondary: '#8B5CF6',      // More purple instead of blue
    accent: '#C026D3',         // More purple-pink accent
    background: '#FAF5FF',     // Purple-tinted background
    backgroundSecondary: '#FEFBFF',  // Subtle purple-tinted white
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#7C3AED30',
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    neonGlow: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #C026D3 100%)',
  },
  fonts: darkTheme.fonts,
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    neon: '0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)',
    neonHover: '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.4)',
  },
  borderRadius: darkTheme.borderRadius,
  spacing: darkTheme.spacing,
};
