import React from 'react';
import './custom-checkbox.css';

interface CustomCheckboxProps {
  id: string;
  label: string;
  price?: string;
  description?: string | React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CustomCheckbox({
  id,
  label,
  price,
  description,
  checked,
  onChange,
  disabled = false
}: CustomCheckboxProps) {
  return (
    <div className="cl-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span
        onClick={() => !disabled && onChange(!checked)}
        className="flex items-start gap-2"
      >
        <div className="flex-1">
          <div className="font-medium flex items-center justify-between">
            <span>{label}</span>
            {price && <span className="text-red-primary font-semibold">{price}</span>}
          </div>
          {description && (
            <div className="text-sm text-gray-600 mt-1">{description}</div>
          )}
        </div>
      </span>
    </div>
  );
}

interface SelectCardProps {
  id: string;
  label: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  price?: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectCard({
  id,
  label,
  description,
  icon,
  price,
  selected,
  onClick
}: SelectCardProps) {
  return (
    <div 
      className={`select-card p-4 ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-2">
          {icon && (
            <div className={`mr-3 text-2xl p-2 rounded-full ${selected ? 'bg-red-primary/10' : 'bg-gray-100'}`}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="font-medium">{label}</div>
            {price && <div className="text-red-primary font-semibold">{price}</div>}
          </div>
          <div className="cl-checkbox mr-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              id={`select-${id}`}
              checked={selected}
              onChange={() => onClick()}
            />
            <span></span>
          </div>
        </div>
        {description && (
          <div className="text-sm text-gray-600">{description}</div>
        )}
      </div>
    </div>
  );
}