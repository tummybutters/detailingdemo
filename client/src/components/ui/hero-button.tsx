import React, { forwardRef } from 'react';
import './custom-hero-button.css';

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

export const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(function HeroButton({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary',
  style
}, ref) {
  return (
    <button
      ref={ref}
      className={`hero-button ${variant === 'secondary' ? 'secondary' : ''} ${className}`}
      onClick={onClick}
      type={type}
      style={style}
    >
      <span className="hero-button-top">{children}</span>
      <span className="hero-button-bottom"></span>
      <span className="hero-button-base"></span>
    </button>
  );
});
