import { Phone } from 'lucide-react';

interface CallOptionProps {
  phone: string;
  text?: string;
  className?: string;
}

export default function CallOption({ 
  phone = "19497340201", 
  text = "Have Questions? Give Us a Call", 
  className = ""
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

  return (
    <div className={`flex items-center ${className}`}>
      <a 
        href={`tel:+${phone}`}
        className="neo-brutalist-button call-button inline-flex items-center gap-2 bg-white border-2 border-black rounded-md py-2 px-3 font-medium text-black transition hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <Phone size={20} className="animate-pulse text-[#EE432C]" />
        <span className="whitespace-nowrap">{formatPhoneForDisplay(phone)}</span>
      </a>
      {text && <span className="ml-3 text-white text-sm hidden sm:inline">{text}</span>}
    </div>
  );
}