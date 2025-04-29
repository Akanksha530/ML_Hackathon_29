import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'md',
  border = false,
}) => {
  // Define padding styles
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  // Define shadow styles
  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };
  
  // Define rounded styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };
  
  // Combine styles
  const cardStyles = `
    bg-white
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${roundedStyles[rounded]}
    ${border ? 'border border-gray-200' : ''}
    ${className}
  `;
  
  return (
    <div className={cardStyles}>
      {children}
    </div>
  );
};

export default Card;