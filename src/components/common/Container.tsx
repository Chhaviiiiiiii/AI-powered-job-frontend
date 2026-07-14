import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  clean?: boolean;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  className = '',
}) => {
  return (
    <div
      className={`${
        clean ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};
