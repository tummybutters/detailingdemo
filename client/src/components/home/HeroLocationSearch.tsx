import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Check, X, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Set your Mapbox access token
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGJ1dGNoZXIzIiwiYSI6ImNtOHhpOW81YTA0OHYycnEwNnM4MWphZDgifQ.VSLkTQ3yEJBUTqC14kAkcQ';
mapboxgl.accessToken = MAPBOX_TOKEN;

// Service area bounds - covering Sacramento to SoCal
const CALIFORNIA_BOUNDS = {
  north: 39.5, // Sacramento area
  south: 32.5, // San Diego area
  west: -124.4, // Pacific Coast
  east: -114.1 // Eastern California
};

declare global {
  interface Window {
    mapboxsearch?: any;
  }
}

export default function HeroLocationSearch() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const addressRef = useRef<HTMLInputElement>(null);
  const addressContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [isInServiceArea, setIsInServiceArea] = useState<boolean | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [isAutofillInitialized, setIsAutofillInitialized] = useState(false);
  
  // Initialize Mapbox Address Autofill
  useEffect(() => {
    if (!addressRef.current || !formRef.current || isAutofillInitialized) return;

    // Wait for the Mapbox Search JS script to load
    const initMapboxSearch = () => {
      if (window.mapboxsearch && !isAutofillInitialized) {
        window.mapboxsearch.config.accessToken = MAPBOX_TOKEN;
        
        // Create a custom address autofill
        const autofillElement = new window.mapboxsearch.MapboxAddressAutofill({
          accessToken: MAPBOX_TOKEN
        });
        
        autofillElement.options = {
          country: 'us',
          language: 'en'
        };

        // Add event listener for retrieve event
        autofillElement.addEventListener('retrieve', (event: any) => {
          const feature = event.detail;
          if (feature && feature.geometry && feature.geometry.coordinates) {
            const coords: [number, number] = feature.geometry.coordinates;
            handleCoordinates(coords);
          }
        });
        
        // Setup the existing input inside an autofill element
        if (addressContainerRef.current && addressRef.current) {
          // Create a temporary input with the correct attributes
          const tempInput = document.createElement('input');
          tempInput.type = 'text';
          tempInput.placeholder = 'Enter your address';
          tempInput.autocomplete = 'address-line1';
          tempInput.className = addressRef.current.className;
          
          // Set the current value
          tempInput.value = address;
          
          // Add event listener to sync with the React state
          tempInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            setAddress(target.value);
          });

          // Replace the old input with the new one
          if (addressRef.current.parentNode) {
            addressRef.current.parentNode.replaceChild(tempInput, addressRef.current);
          }
          
          // Add the input to the MapboxAddressAutofill element
          autofillElement.appendChild(tempInput);
          
          // Add the autofill element to the container
          addressContainerRef.current.appendChild(autofillElement);
          
          setIsAutofillInitialized(true);
        }
      }
    };
    
    // Check if Mapbox Search JS is already loaded
    if (window.mapboxsearch) {
      initMapboxSearch();
    } else {
      // Wait for the script to load
      const searchScript = document.getElementById('search-js');
      if (searchScript) {
        searchScript.addEventListener('load', initMapboxSearch);
      }
    }
    
    return () => {
      const searchScript = document.getElementById('search-js');
      if (searchScript) {
        searchScript.removeEventListener('load', initMapboxSearch);
      }
    };
  }, [address, isAutofillInitialized]);
  
  // Initialize mini map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-119.4179, 36.7783], // Central California
        zoom: 5,
        interactive: false // Disable map interaction for the hero
      });
      
      // Add California service area polygon
      mapInstance.on('load', () => {
        mapInstance.addSource('california-area', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [CALIFORNIA_BOUNDS.west, CALIFORNIA_BOUNDS.north],
                [CALIFORNIA_BOUNDS.east, CALIFORNIA_BOUNDS.north],
                [CALIFORNIA_BOUNDS.east, CALIFORNIA_BOUNDS.south],
                [CALIFORNIA_BOUNDS.west, CALIFORNIA_BOUNDS.south],
                [CALIFORNIA_BOUNDS.west, CALIFORNIA_BOUNDS.north]
              ]]
            },
            properties: {}
          }
        });
        
        mapInstance.addLayer({
          id: 'california-area-fill',
          type: 'fill',
          source: 'california-area',
          paint: {
            'fill-color': '#FFB375',
            'fill-opacity': 0.2,
            'fill-outline-color': '#EE432C'
          }
        });
      });
      
      setMap(mapInstance);
    };
    
    if (!map) {
      initializeMap();
    }
    
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, []);
  
  // Function to check if coordinates are within California service area
  const checkServiceArea = (coords: [number, number]): boolean => {
    const lon = coords[0];
    const lat = coords[1];
    
    return (
      lat >= CALIFORNIA_BOUNDS.south &&
      lat <= CALIFORNIA_BOUNDS.north &&
      lon >= CALIFORNIA_BOUNDS.west &&
      lon <= CALIFORNIA_BOUNDS.east
    );
  };

  // Handle coordinates from Mapbox
  const handleCoordinates = (coords: [number, number]) => {
    setCoordinates(coords);
    
    // Check if the address is within service area
    const inServiceArea = checkServiceArea(coords);
    setIsInServiceArea(inServiceArea);
    
    // Update map and marker
    if (map) {
      if (marker) {
        marker.remove();
      }
      
      const newMarker = new mapboxgl.Marker({ color: inServiceArea ? '#4CAF50' : '#F44336' })
        .setLngLat(coords)
        .addTo(map);
      
      setMarker(newMarker);
      map.flyTo({ center: coords, zoom: 10, duration: 1500 });
    }
    
    // Show toast notification
    if (inServiceArea) {
      toast({
        title: "Great News!",
        description: "We service your area. Schedule your detailing now!",
        variant: "default",
      });
    } else if (address) {
      toast({
        title: "Outside Service Area",
        description: "We currently only service California locations from Sacramento to San Diego.",
        variant: "destructive",
      });
    }
  };
  
  // Handle submission - redirect to booking page with location
  const handleGetQuote = () => {
    if (isInServiceArea && address) {
      // Store the address in localStorage to pre-fill the booking form
      localStorage.setItem('prefilledAddress', address);
      if (coordinates) {
        localStorage.setItem('prefilledCoordinates', JSON.stringify(coordinates));
      }
      
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

  return (
    <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Transform Your Vehicle?</h3>
      
      <form ref={formRef} className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-[#EE432C]" />
            Your Location
          </label>
          
          <div ref={addressContainerRef} className="relative">
            <Input
              ref={addressRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className={`pr-8 bg-[#FFD7B5]/20 border-[#FFB375] rounded-md focus:ring-[#EE432C] focus:border-[#EE432C] ${
                isInServiceArea === false ? 'border-red-500' : 
                isInServiceArea === true ? 'border-green-500' : 
                'border-[#FFB375]'
              }`}
            />
            
            {isInServiceArea !== null && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isInServiceArea ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          
          {isInServiceArea === false && (
            <p className="text-xs text-red-500">
              This address is outside our service area in California.
            </p>
          )}
        </div>
        
        <div 
          ref={mapContainerRef} 
          className="h-[120px] w-full rounded-md border border-[#FFB375] overflow-hidden"
        />
        
        <div className="pt-2">
          <Button 
            onClick={handleGetQuote}
            disabled={!isInServiceArea || !address}
            className="w-full bg-[#EE432C] hover:bg-[#d93d29] text-white flex items-center justify-center py-2 rounded-md"
          >
            Get an Instant Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}