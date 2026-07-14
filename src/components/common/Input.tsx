import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={id} className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none
              bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200
              ${leftIcon ? 'pl-11' : ''} 
              ${rightIcon ? 'pr-11' : ''}
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                  : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10'
              }
              disabled:opacity-60 disabled:cursor-not-allowed`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span className={`text-xs ${error ? 'text-red-500' : 'text-slate-400'}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
