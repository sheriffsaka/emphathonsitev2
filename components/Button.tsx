import React from 'react';
import { ComponentVariant } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = ComponentVariant.PRIMARY, 
  children, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    [ComponentVariant.PRIMARY]: "bg-gradient-to-r from-emphathon-rust to-emphathon-rustLight text-white shadow-lg shadow-emphathon-rust/20 hover:shadow-emphathon-rust/40 hover:-translate-y-0.5",
    [ComponentVariant.SECONDARY]: "bg-emphathon-navyLight text-white border border-emphathon-glassBorder hover:bg-emphathon-navy hover:border-emphathon-rust/30",
    [ComponentVariant.GHOST]: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
    [ComponentVariant.GLASS]: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};