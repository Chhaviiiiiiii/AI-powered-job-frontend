import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
}) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const colors = {
    primary: 'border-t-primary-600 border-primary-100 dark:border-primary-950',
    secondary: 'border-t-pink-600 border-pink-100 dark:border-pink-950',
    white: 'border-t-white border-white/20',
  };

  const spinner = (
    <div
      className={`rounded-full animate-spin ${sizes[size]} ${colors[color]}`}
      role="status"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center items-center p-4">{spinner}</div>;
};
