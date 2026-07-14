import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: 'default' | 'muted' | 'gradient';
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  bg = 'default',
}) => {
  const backgrounds = {
    default: 'bg-white dark:bg-slate-950',
    muted: 'bg-slate-50/50 dark:bg-slate-900/10',
    gradient: 'bg-gradient-to-b from-white to-slate-50/30 dark:from-slate-950 dark:to-slate-900/20',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 border-b border-slate-100/50 dark:border-slate-900/50 ${backgrounds[bg]} ${className}`}
    >
      {children}
    </section>
  );
};
