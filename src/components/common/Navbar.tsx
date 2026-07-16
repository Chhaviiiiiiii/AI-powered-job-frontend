import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Sparkles, LayoutDashboard } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './Button';
import { Container } from './Container';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-45 w-full glassmorphism border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-800 dark:text-slate-150">
              Auto<span className="text-primary-555 text-primary-500">Career</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-primary-500 dark:text-slate-350 dark:hover:text-primary-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-primary-500 dark:text-slate-350 dark:hover:text-primary-400 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-600 hover:text-primary-500 dark:text-slate-350 dark:hover:text-primary-400 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-primary-500 dark:text-slate-350 dark:hover:text-primary-400 transition-colors">
              Pricing
            </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {isAuthenticated ? (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                leftIcon={<LayoutDashboard className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => openAuthModal('login')}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={() => openAuthModal('signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            Pricing
          </a>
          <div className="h-px bg-slate-100 dark:bg-slate-850 my-1" />
          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <Button 
                variant="primary" 
                className="w-full" 
                onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
                leftIcon={<LayoutDashboard className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" className="w-full" onClick={() => { setIsOpen(false); openAuthModal('login'); }}>
                  Sign In
                </Button>
                <Button variant="primary" className="w-full" onClick={() => { setIsOpen(false); openAuthModal('signup'); }}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
