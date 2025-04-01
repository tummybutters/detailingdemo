import React from 'react';
import { cn } from '@/lib/utils';

interface ThreeDButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function ThreeDButton({
  children,
  className,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
}: ThreeDButtonProps) {
  const gradientBg = variant === 'primary' 
    ? 'radial-gradient(#EE432C, #d93d29)'
    : 'radial-gradient(#FFB375, #e69c64)';
  
  const bottomBg = variant === 'primary'
    ? '#ba3021'
    : '#d98c51';
  
  return (
    <button
      type={type}
      className={cn(
        "button relative border-0 py-0 px-2 pb-3 min-w-[10em] box-border bg-transparent font-inherit cursor-pointer",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span 
        className="button-top flex items-center justify-center relative z-0 px-4 py-2 transform transition-transform duration-200 select-none text-white text-shadow"
        style={{
          textShadow: '0 -1px rgba(0, 0, 0, .25)',
          '--button-gradient': gradientBg
        } as React.CSSProperties}
      >
        {children}
      </span>
      <span 
        className="button-bottom absolute z-[-1] bottom-1 left-1 rounded-lg pt-[6px] w-[calc(100%-8px)] h-[calc(100%-10px)] box-content transition-all duration-200"
        style={{
          backgroundColor: bottomBg,
          boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.5), inset 0 -1px 3px 3px rgba(0, 0, 0, .4)',
          backgroundImage: `
            radial-gradient(4px 8px at 4px calc(100% - 8px), rgba(255, 255, 255, .25), transparent), 
            radial-gradient(4px 8px at calc(100% - 4px) calc(100% - 8px), rgba(255, 255, 255, .25), transparent), 
            radial-gradient(16px at -4px 0, white, transparent), 
            radial-gradient(16px at calc(100% + 4px) 0, white, transparent)
          `
        }}
      />
      <span 
        className="button-base absolute z-[-2] top-1 left-0 rounded-xl w-full h-[calc(100%-4px)] bg-black/15"
        style={{
          boxShadow: '0 1px 1px 0 rgba(255, 255, 255, .75), inset 0 2px 2px rgba(0, 0, 0, .25)'
        }}
      />
    </button>
  );
}