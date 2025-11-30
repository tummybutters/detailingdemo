import { useState } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin, Check, X, Info } from 'lucide-react';

// List of service cities
const SERVICE_LOCATIONS = [
  'Davis, CA', 'Irvine, CA', 'Bonita, CA', 'Costa Mesa, CA',
  'Tustin, CA', 'Alameda, CA', 'Mission Viejo, CA',
  'Newport Beach, CA', 'Dixon, CA', 'Woodland, CA',
  'Sacramento, CA', 'Galt, CA'
];

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  onAddressValidated: (isValid: boolean, coordinates?: [number, number]) => void;
  field: any;
  formState: any;
}

export default function LocationSearch({ value, onChange, onAddressValidated, field, formState }: LocationSearchProps) {
  const [isInServiceArea, setIsInServiceArea] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // Check if placeName contains any of our service cities
  const checkServiceCity = (placeName: string): boolean => {
    if (!placeName) return false;

    const normalizedPlace = placeName.toLowerCase();
    return SERVICE_LOCATIONS.some(location =>
      normalizedPlace.includes(location.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (newValue.length > 3) {
      const isValid = checkServiceCity(newValue);
      setIsInServiceArea(isValid);

      if (isValid) {
        setValidationMessage(null);
        onAddressValidated(true, [0, 0]); // Mock coordinates
      } else {
        setValidationMessage("This location is outside our California service area.");
        onAddressValidated(false);
      }
    } else {
      setIsInServiceArea(null);
      setValidationMessage(null);
      onAddressValidated(false);
    }
  };

  return (
    <div className="space-y-4">
      <FormItem className="relative">
        <FormLabel className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-[#EE432C]" />
          Your Location
        </FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              placeholder="Enter your address (e.g. Davis, CA)"
              value={value || ''}
              onChange={handleInputChange}
              className={`pr-10 ${isInServiceArea === false ? 'border-red-500 focus-visible:ring-red-500' :
                  isInServiceArea === true ? 'border-green-500 focus-visible:ring-green-500' :
                    'border-[#FFAA75]'
                }`}
            />

            {isInServiceArea !== null && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                {isInServiceArea ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
          </div>
        </FormControl>

        {validationMessage && (
          <div className={`text-xs flex items-start gap-1 mt-1 ${isInServiceArea ? 'text-amber-600' : 'text-red-500'}`}>
            {isInServiceArea ? (
              <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="h-3 w-3 mt-0.5 flex-shrink-0" />
            )}
            <span>{validationMessage}</span>
          </div>
        )}

        {formState.errors[field.name] && (
          <FormMessage />
        )}
      </FormItem>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          We currently service Davis, Irvine, Bonita, Costa Mesa, Tustin, Alameda, Mission Viejo,
          Newport Beach, Dixon, Woodland, Sacramento, and Galt.
        </div>
      </div>
    </div>
  );
}