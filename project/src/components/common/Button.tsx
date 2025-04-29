import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  // Define base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Define variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  // Define size styles
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Combine styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;