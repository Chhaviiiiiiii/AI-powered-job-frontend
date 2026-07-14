import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Sparkles, 
  LayoutDashboard, 
  Briefcase, 
  FileCheck, 
  User, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Job Search', icon: Briefcase, path: '/jobs' },
    { name: 'Applications', icon: FileCheck, path: '/applications' },
    { name: 'Analytics', icon: TrendingUp, path: '/analytics' },
    { name: 'Profile Setup', icon: User, path: '/profile/setup' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center flex-shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-extrabold text-base tracking-tight text-slate-800 dark:text-slate-100 whitespace-nowrap">
              Auto<span className="text-primary-500">Career</span>
            </span>
          )}
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
              ${isActive 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                : 'text-slate-655 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="transition-opacity duration-200">{item.name}</span>}
            {isCollapsed && (
              <div className="absolute left-20 bg-slate-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-normal whitespace-nowrap shadow-lg">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Profile Mini */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-350 flex-shrink-0">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">John Doe</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 truncate">john.doe@gmail.com</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
