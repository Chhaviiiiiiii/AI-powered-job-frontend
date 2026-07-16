import React from 'react';
import { Sun, Moon, Bell, Search, Menu, LogOut } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from './Avatar';

interface HeaderProps {
  onMenuToggle?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, title = 'Dashboard' }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 transition-colors duration-300">
      {/* Left side: Hamburger (mobile) & Title */}
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 capitalize">
          {title}
        </h1>
      </div>

      {/* Center Search Bar */}
      <div className="hidden sm:flex items-center max-w-md w-64 md:w-80 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search jobs, events, tracking..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-205"
        />
      </div>

      {/* Right actions: theme, notifications, avatar, logout */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        <button className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-3">
          <Avatar name={user?.name || 'John Doe'} status="online" size="sm" />
          
          <button
            onClick={logout}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-900/30 transition-all duration-200"
            title="Log Out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
