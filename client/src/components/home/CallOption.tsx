import { Phone } from 'lucide-react';

interface CallOptionProps {
  phone: string;
  text?: string;
  className?: string;
  variant?: 'default' | 'header' | 'compact';
}

export default function CallOption({ 
  phone = "19497340201", 
  text = "Have Questions? Give Us a Call", 
  className = "",
  variant = 'default'
}: CallOptionProps) {
  // Format phone number for display: (949) 734-0201
  const formatPhoneForDisplay = (phone: string) => {
    // Remove any non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format the phone number
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits[0] === '1') {
      return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    // If the format is unknown, just return the original
    return phone;
  };

  // Content to display depends on variant
  const getButtonContent = () => {
    switch (variant) {
      case 'compact':
        return (
          <>
            <Phone size={18} className="text-[#EE432C]" />
            <span className="whitespace-nowrap font-semibold">Call Us</span>
          </>
        );
      case 'header':
        return (
          <>
            <Phone size={18} className="text-[#EE432C]" />
            <span className="whitespace-nowrap font-semibold">Call</span>
          </>
        );
      default:
        return (
          <>
            <Phone size={20} className="text-[#EE432C]" />
            <span className="whitespace-nowrap">{formatPhoneForDisplay(phone)}</span>
          </>
        );
    }
  };

  // Button styles depend on variant
  const getButtonStyles = () => {
    const baseStyles = "neo-brutalist-button call-button inline-flex items-center gap-2 border-2 border-black rounded-md font-medium text-black transition";
    
    switch (variant) {
      case 'compact':
        return `${baseStyles} py-1 px-2 text-sm bg-white`;
      case 'header':
        return `${baseStyles} py-1.5 px-3 text-sm bg-[#FFD7B5]`;
      default:
        return `${baseStyles} py-2 px-3 bg-white`;
    }
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <a 
        href={`tel:+${phone}`}
        className={getButtonStyles()}
        aria-label="Call Hardy's Wash N' Wax"
        title={formatPhoneForDisplay(phone)}
      >
        {getButtonContent()}
      </a>
      {text && variant !== 'compact' && (
        <span className="ml-3 text-sm hidden sm:inline">{text}</span>
      )}
    </div>
  );
}