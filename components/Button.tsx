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
    [ComponentVariant.PRIMARY]: "bg-gradient-to-r from-empathon-rust to-empathon-rustLight text-white shadow-lg shadow-empathon-rust/20 hover:shadow-empathon-rust/40 hover:-translate-y-0.5",
    [ComponentVariant.SECONDARY]: "bg-empathon-navyLight text-white border border-empathon-glassBorder hover:bg-empathon-navy hover:border-empathon-rust/30",
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