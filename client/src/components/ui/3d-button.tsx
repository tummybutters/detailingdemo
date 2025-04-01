import React from 'react';
import './custom-3d-button.css';
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
  return (
    <button
      type={type}
      className={cn(
        'button-3d learn-more',
        variant === 'primary' ? 'primary' : 'secondary',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}