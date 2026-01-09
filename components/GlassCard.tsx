import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = true 
}) => {
  return (
    <div 
      className={`
        bg-empathon-glass 
        backdrop-blur-xl 
        border border-empathon-glassBorder 
        rounded-2xl p-6 
        shadow-2xl shadow-black/20
        ${hoverEffect ? 'transition-all duration-300 hover:scale-[1.01] hover:bg-white/5 hover:border-white/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};