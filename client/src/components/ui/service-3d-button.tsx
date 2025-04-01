import React from 'react';
import './service-3d-button.css';

interface Service3DButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Service3DButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false
}: Service3DButtonProps) {
  return (
    <button
      className={`service-3d-button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <div className="service-3d-button-face">
        {children}
      </div>
      <div className="service-3d-button-shadow"></div>
    </button>
  );
}