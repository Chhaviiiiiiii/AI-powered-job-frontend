import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glass = false,
  header,
  footer,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 border
        ${
          glass
            ? 'glassmorphism shadow-lg'
            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 shadow-sm'
        }
        ${hoverEffect ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200 dark:hover:border-slate-700/50' : ''}
        ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 font-semibold text-slate-800 dark:text-slate-100">
          {header}
        </div>
      )}
      <div className="p-6 text-slate-600 dark:text-slate-350">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
};
