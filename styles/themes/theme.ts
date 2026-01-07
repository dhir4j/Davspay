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
    primary: '#3B82F6',        // Professional blue
    primaryDark: '#2563EB',
    primaryLight: '#60A5FA',
    secondary: '#10B981',       // Emerald green
    accent: '#8B5CF6',          // Purple accent
    background: '#0F172A',      // Slate background
    backgroundSecondary: '#1E293B',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    neonGlow: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
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
    primary: '#2563EB',        // Professional blue
    primaryDark: '#1D4ED8',
    primaryLight: '#3B82F6',
    secondary: '#059669',      // Emerald green
    accent: '#7C3AED',         // Purple accent
    background: '#F8FAFC',     // Slate background
    backgroundSecondary: '#F1F5F9',
    surface: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    neonGlow: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
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
