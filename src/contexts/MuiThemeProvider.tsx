import React, { useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useThemeStore } from '@/store/themeStore';

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

export const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Sync theme class on HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const muiTheme = useMemo(() => {
    const isDark = theme === 'dark';
    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: '#8b5cf6', // Violet
          light: '#a78bfa',
          dark: '#6d28d9',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#ec4899', // Pink
          light: '#f472b6',
          dark: '#be185d',
        },
        background: {
          default: isDark ? '#090d16' : '#f8fafc',
          paper: isDark ? '#111827' : '#ffffff',
        },
        text: {
          primary: isDark ? '#f8fafc' : '#0f172a',
          secondary: isDark ? '#94a3b8' : '#475569',
        },
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        h1: {
          fontWeight: 800,
        },
        h2: {
          fontWeight: 700,
        },
        button: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              padding: '8px 16px',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
    });
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
