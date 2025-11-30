import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Check, X, ArrowRight, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// List of service cities
const SERVICE_LOCATIONS = [
  'Davis, CA', 'Irvine, CA', 'Bonita, CA', 'Costa Mesa, CA',
  'Tustin, CA', 'Alameda, CA', 'Mission Viejo, CA',
  'Newport Beach, CA', 'Dixon, CA', 'Woodland, CA',
  'Sacramento, CA', 'Galt, CA'
];

export default function HeroLocationSearch() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [address, setAddress] = useState("");
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
    setAddress(newValue);

    if (newValue.length > 3) {
      const isValid = checkServiceCity(newValue);
      setIsInServiceArea(isValid);

      if (isValid) {
        setValidationMessage(null);
      } else {
        setValidationMessage("This location is outside our California service area.");
      }
    } else {
      setIsInServiceArea(null);
      setValidationMessage(null);
    }
  };

  // Handle submission - redirect to booking page with location
  const handleGetQuote = () => {
    if (isInServiceArea && address) {
      // Store the address in localStorage to pre-fill the booking form
      localStorage.setItem('prefilledAddress', address);
      // Mock coordinates
      localStorage.setItem('prefilledCoordinates', JSON.stringify([0, 0]));

      // Navigate to booking page
      navigate('/booking');
    } else if (address && !isInServiceArea) {
      toast({
        title: "Cannot Proceed",
        description: "Please enter an address within our service area.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Address Required",
        description: "Please enter your address to continue.",
        variant: "destructive",
      });
    }
  };

  const isMobile = useIsMobile();

  return (
    <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Transform Your Vehicle?</h3>

      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-primary-red" />
            Your Location
          </label>

          <div className="relative">
            <Input
              placeholder="Enter your address (e.g. Davis, CA)"
              value={address}
              onChange={handleInputChange}
              className={`pr-10 ${isInServiceArea === false ? 'border-red-500 focus-visible:ring-red-500' :
                  isInServiceArea === true ? 'border-green-500 focus-visible:ring-green-500' :
                    'border-primary-orange'
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

          {validationMessage && (
            <p className={`text-xs flex items-start gap-1 ${isInServiceArea ? 'text-amber-600' : 'text-red-500'}`}>
              {isInServiceArea ? (
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="h-3 w-3 mt-0.5 flex-shrink-0" />
              )}
              <span>{validationMessage}</span>
            </p>
          )}

          {/* Service locations - collapsed on mobile for cleanliness */}
          {isMobile ? (
            <details className="mt-1">
              <summary className="text-xs text-gray-500 cursor-pointer">
                View service locations
              </summary>
              <p className="text-xs text-gray-500 mt-1 pl-2">
                We currently service Davis, Irvine, Bonita, Costa Mesa, Tustin, Alameda, Mission Viejo,
                Newport Beach, Dixon, Woodland, Sacramento, and Galt.
              </p>
            </details>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              We currently service Davis, Irvine, Bonita, Costa Mesa, Tustin, Alameda, Mission Viejo,
              Newport Beach, Dixon, Woodland, Sacramento, and Galt.
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button
            onClick={handleGetQuote}
            disabled={!isInServiceArea || !address}
            className="w-full bg-primary-red hover:bg-red-600 text-white flex items-center justify-center py-2 rounded-md"
          >
            Get an Instant Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}