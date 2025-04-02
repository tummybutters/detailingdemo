import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { bookingFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, Calendar, Car, Settings, 
  ClipboardList, Clock, DollarSign, X, Check, Droplets, Sparkles, 
  Search, PenTool, Brush, ShieldCheck, Truck, Layers, ChevronsUp } from "lucide-react";
import LocationSearch from "./LocationSearch";
import { ThreeDButton } from "@/components/ui/3d-button";
import { ThreeDStepIcon, BackButton } from "@/components/ui/3d-step-icon";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

type FormValues = z.infer<typeof bookingFormSchema>;

// Vehicle Types with pricing tiers
const vehicleTypes = [
  { value: "sedan", label: "Sedan", icon: <Car className="w-6 h-6 text-primary-red" />, description: "Standard 4-door car", priceTier: "low" },
  { value: "coupe", label: "Coupe", icon: <Car className="w-6 h-6 text-primary-red" />, description: "2-door sporty car", priceTier: "low" },
  { value: "suv", label: "SUV/Crossover", icon: <Truck className="w-6 h-6 text-primary-red" />, description: "Sport utility vehicle", priceTier: "mid" },
  { value: "truck", label: "Truck", icon: <Truck className="w-6 h-6 text-primary-red" />, description: "Pickup truck", priceTier: "mid" },
  { value: "van", label: "Van/Minivan", icon: <Truck className="w-6 h-6 text-primary-red" />, description: "Family or cargo van", priceTier: "high" },
  { value: "luxury", label: "Luxury/Sports Car", icon: <Car className="w-6 h-6 text-primary-red" />, description: "High-end performance vehicle", priceTier: "high" },
];

// Categories 
const serviceCategories = [
  { value: "interior", label: "Interior Only", icon: <Brush className="w-6 h-6 text-primary-red" />, description: "Focus on cleaning the inside of your vehicle" },
  { value: "exterior", label: "Exterior Only", icon: <Droplets className="w-6 h-6 text-primary-red" />, description: "Focus on making the outside shine" },
  { value: "complete", label: "Complete Package", icon: <Sparkles className="w-6 h-6 text-primary-red" />, description: "Full interior and exterior detailing" }
];

// Service prices for each vehicle tier based on image (static pricing)
const servicePrices = {
  // Sedan/Coupe Tier (Tier 1 - lowest prices)
  sedan: {
    interior: {
      "interior-deep-clean": { price: 150, duration: "2-4 hours" }
    },
    exterior: {
      "express-detail": { price: 125, duration: "2 hours" },
      "exterior-wash-wax": { price: 200, duration: "2-4 hours" },
      "exterior-polish-wax": { price: 350, duration: "3-6 hours" }
    },
    complete: {
      "luxury-full-detail": { price: 550, duration: "4-8 hours" },
      "showroom-prep": { price: 699, duration: "7-8 hours" }
    }
  },
  
  // SUV/Truck Tier (Tier 2 - middle range prices)
  suv: {
    interior: {
      "interior-deep-clean": { price: 250, duration: "2-4 hours" }
    },
    exterior: {
      "express-detail": { price: 150, duration: "2 hours" },
      "exterior-wash-wax": { price: 300, duration: "2-4 hours" },
      "exterior-polish-wax": { price: 400, duration: "3-6 hours" }
    },
    complete: {
      "luxury-full-detail": { price: 699, duration: "4-8 hours" },
      "showroom-prep": { price: 849, duration: "7-8 hours" }
    }
  },
  
  // Van/Luxury Tier (Tier 3 - highest prices)
  luxury: {
    interior: {
      "interior-deep-clean": { price: 350, duration: "2-4 hours" }
    },
    exterior: {
      "express-detail": { price: 175, duration: "2 hours" },
      "exterior-wash-wax": { price: 400, duration: "2-4 hours" },
      "exterior-polish-wax": { price: 450, duration: "3-6 hours" }
    },
    complete: {
      "luxury-full-detail": { price: 850, duration: "4-8 hours" },
      "showroom-prep": { price: 999, duration: "7-8 hours" }
    }
  }
};

// Service Packages (displayed options)
const servicePackages = {
  interior: [
    { 
      value: "interior-deep-clean", 
      label: "Interior Detail Deep Clean", 
      basePrice: servicePrices.sedan.interior["interior-deep-clean"].price,
      duration: servicePrices.sedan.interior["interior-deep-clean"].duration, 
      description: "Thorough cleaning of all interior surfaces, carpet & upholstery cleaning, stain removal, leather conditioning, and protection" 
    }
  ],
  exterior: [
    { 
      value: "express-detail", 
      label: "Express Detail", 
      basePrice: servicePrices.sedan.exterior["express-detail"].price,
      duration: servicePrices.sedan.exterior["express-detail"].duration, 
      description: "Quick exterior wash, tire shine, and basic wax protection" 
    },
    { 
      value: "exterior-wash-wax", 
      label: "Exterior Wash & Wax", 
      basePrice: servicePrices.sedan.exterior["exterior-wash-wax"].price,
      duration: servicePrices.sedan.exterior["exterior-wash-wax"].duration, 
      description: "Thorough wash, premium wax application, wheel cleaning, and tire shine" 
    },
    { 
      value: "exterior-polish-wax", 
      label: "Exterior Polish & Wax", 
      basePrice: servicePrices.sedan.exterior["exterior-polish-wax"].price,
      duration: servicePrices.sedan.exterior["exterior-polish-wax"].duration, 
      description: "Full exterior polish to remove minor scratches and swirls, followed by premium wax protection" 
    }
  ],
  complete: [
    { 
      value: "luxury-full-detail", 
      label: "Luxury Full Detail", 
      basePrice: servicePrices.sedan.complete["luxury-full-detail"].price,
      duration: servicePrices.sedan.complete["luxury-full-detail"].duration, 
      description: "Complete interior and exterior detailing with premium products and extra attention to detail" 
    },
    { 
      value: "showroom-prep", 
      label: "Showroom Prep", 
      basePrice: servicePrices.sedan.complete["showroom-prep"].price,
      duration: servicePrices.sedan.complete["showroom-prep"].duration, 
      description: "Our most comprehensive package bringing your vehicle to like-new condition with ceramic coating" 
    }
  ]
};

// Add-on Services
const addOnServices = [
  { id: "carpet", label: "Carpet Conditioning", price: "+$100", description: "Deep conditioning treatment for carpets and floor mats" },
  { id: "leather", label: "Leather Conditioning", price: "+$50", description: "Deep conditioning and UV protection for leather surfaces" },
  { id: "clay", label: "Clay Bar", price: "+$50", description: "Removes embedded contaminants from paint" },
  { id: "spray-wax", label: "Spray Wax", price: "+$65", description: "Additional layer of wax protection for your vehicle" },
  { id: "headlights", label: "Headlight Restoration", price: "+$50-$100", description: "Restore yellowed or cloudy headlights" },
  { id: "headliner", label: "Headliner Restore", price: "+$50-$75", description: "Clean and restore vehicle headliner" },
  { id: "scratch", label: "Scratch Buffing", price: "+$65-$95", description: "Buff out minor scratches from your vehicle's paint" },
  { id: "plastic", label: "Interior Plastic/Chrome Polishing", price: "+$45-$85", description: "Restore and polish interior plastic and chrome surfaces" }
];

// Time Slots
const timeSlots = [
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" }
];

// Steps configuration
const steps = [
  { 
    id: "location", 
    title: "Location", 
    description: "Where should we meet you?", 
    icon: <MapPin className="h-5 w-5" /> 
  },
  { 
    id: "vehicle", 
    title: "Vehicle Type", 
    description: "Tell us about your vehicle", 
    icon: <Car className="h-5 w-5" /> 
  },
  { 
    id: "category", 
    title: "Service Category", 
    description: "What type of service do you need?", 
    icon: <Settings className="h-5 w-5" /> 
  },
  { 
    id: "service", 
    title: "Select Package", 
    description: "Choose your detailing package", 
    icon: <ClipboardList className="h-5 w-5" /> 
  },
  { 
    id: "appointment", 
    title: "Date & Time", 
    description: "When would you like us to come?", 
    icon: <Calendar className="h-5 w-5" /> 
  },
  { 
    id: "condition", 
    title: "Vehicle Condition", 
    description: "Tell us about your vehicle's condition", 
    icon: <Car className="h-5 w-5" /> 
  },
  { 
    id: "contact", 
    title: "Your Details", 
    description: "How can we reach you?", 
    icon: <Clock className="h-5 w-5" /> 
  },
  { 
    id: "review", 
    title: "Review", 
    description: "Confirm your booking details", 
    icon: <DollarSign className="h-5 w-5" /> 
  },
  { 
    id: "confirmation", 
    title: "Confirmation", 
    description: "Your booking is complete!", 
    icon: <CheckCircle className="h-5 w-5" /> 
  }
];

export default function MultiStepBookingForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedAddOnDetails, setSelectedAddOnDetails] = useState<{id: string, price: string}[]>([]);
  const [bookingReference, setBookingReference] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [addressCoordinates, setAddressCoordinates] = useState<[number, number] | undefined>(undefined);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  // Extract price value as numeric
  const extractPrice = (priceString: string): number => {
    // Remove non-numeric characters except for decimal points
    const numericString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };
  
  // Calculate price based on vehicle type
  // Get the price for a service based on the vehicle type
  const getServicePrice = (serviceValue: string, serviceCategory: string, vehicleType: string): number => {
    // Map vehicle type to one of our three pricing tiers
    const priceTier = vehicleType === 'sedan' || vehicleType === 'coupe' ? 'sedan' : 
                     (vehicleType === 'suv' || vehicleType === 'truck') ? 'suv' : 'luxury';
    
    try {
      // Type-safe lookup for sedan/coupe tier
      if (priceTier === 'sedan') {
        if (serviceCategory === 'interior') {
          if (serviceValue === 'interior-deep-clean') {
            return servicePrices.sedan.interior["interior-deep-clean"].price;
          }
        } else if (serviceCategory === 'exterior') {
          if (serviceValue === 'express-detail') {
            return servicePrices.sedan.exterior["express-detail"].price;
          } else if (serviceValue === 'exterior-wash-wax') {
            return servicePrices.sedan.exterior["exterior-wash-wax"].price;
          } else if (serviceValue === 'exterior-polish-wax') {
            return servicePrices.sedan.exterior["exterior-polish-wax"].price;
          }
        } else if (serviceCategory === 'complete') {
          if (serviceValue === 'luxury-full-detail') {
            return servicePrices.sedan.complete["luxury-full-detail"].price;
          } else if (serviceValue === 'showroom-prep') {
            return servicePrices.sedan.complete["showroom-prep"].price;
          }
        }
      } 
      // Type-safe lookup for SUV/truck tier
      else if (priceTier === 'suv') {
        if (serviceCategory === 'interior') {
          if (serviceValue === 'interior-deep-clean') {
            return servicePrices.suv.interior["interior-deep-clean"].price;
          }
        } else if (serviceCategory === 'exterior') {
          if (serviceValue === 'express-detail') {
            return servicePrices.suv.exterior["express-detail"].price;
          } else if (serviceValue === 'exterior-wash-wax') {
            return servicePrices.suv.exterior["exterior-wash-wax"].price;
          } else if (serviceValue === 'exterior-polish-wax') {
            return servicePrices.suv.exterior["exterior-polish-wax"].price;
          }
        } else if (serviceCategory === 'complete') {
          if (serviceValue === 'luxury-full-detail') {
            return servicePrices.suv.complete["luxury-full-detail"].price;
          } else if (serviceValue === 'showroom-prep') {
            return servicePrices.suv.complete["showroom-prep"].price;
          }
        }
      }
      // Type-safe lookup for luxury/van tier
      else if (priceTier === 'luxury') {
        if (serviceCategory === 'interior') {
          if (serviceValue === 'interior-deep-clean') {
            return servicePrices.luxury.interior["interior-deep-clean"].price;
          }
        } else if (serviceCategory === 'exterior') {
          if (serviceValue === 'express-detail') {
            return servicePrices.luxury.exterior["express-detail"].price;
          } else if (serviceValue === 'exterior-wash-wax') {
            return servicePrices.luxury.exterior["exterior-wash-wax"].price;
          } else if (serviceValue === 'exterior-polish-wax') {
            return servicePrices.luxury.exterior["exterior-polish-wax"].price;
          }
        } else if (serviceCategory === 'complete') {
          if (serviceValue === 'luxury-full-detail') {
            return servicePrices.luxury.complete["luxury-full-detail"].price;
          } else if (serviceValue === 'showroom-prep') {
            return servicePrices.luxury.complete["showroom-prep"].price;
          }
        }
      }
      
      console.error('Unable to find price for this service/vehicle combination:', {serviceValue, serviceCategory, vehicleType, priceTier});
      return 0;
    } catch (error) {
      console.error('Error getting service price:', error);
      return 0;
    }
  };

  // Calculate total price including add-ons
  const calculateTotalPrice = (serviceInfo: any, vehicleType: string, addOns: {id: string, price: string}[]): string => {
    // Get the static price based on service and vehicle type
    let basePrice = 0;
    
    if (serviceInfo && vehicleType) {
      // Get price from our fixed price tiers
      basePrice = getServicePrice(serviceInfo.value, form.getValues().serviceCategory, vehicleType);
    }
    
    // Add the add-on costs
    const addOnTotal = addOns.reduce((total, addon) => {
      return total + extractPrice(addon.price);
    }, 0);
    
    // Return price as a whole number (no decimal places)
    return `$${Math.round(basePrice + addOnTotal)}`;
  };
  
  // Calculate reference number
  const generateBookingReference = (): string => {
    const prefix = "BK";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };
  
  // Track user interactions for backend reporting
  const [userInteractions, setUserInteractions] = useState<Array<{
    action: string;
    field?: string;
    value?: string;
    timestamp: number;
  }>>([]);
  
  // Add interaction tracking
  const trackInteraction = (action: string, field?: string, value?: string) => {
    const newInteraction = {
      action,
      field,
      value,
      timestamp: Date.now()
    };
    
    console.log("User interaction:", newInteraction);
    setUserInteractions(prev => [...prev, newInteraction]);
    
    // In a real app, you might want to send this to analytics
  };
  
  // Wrapper function to track form field changes
  const trackFieldChange = (fieldName: string, onChange: any) => {
    return (value: any) => {
      trackInteraction('field_change', fieldName, String(value));
      onChange(value);
    };
  };
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      vehicleType: "",
      serviceCategory: "",
      mainService: "",
      addOns: "",
      totalPrice: "",
      totalDuration: "",
      appointmentDate: "",
      appointmentTime: "",
      conditionNotes: ""
    }
  });
  
  // Watch for selected values to enable conditional rendering
  const watchServiceCategory = form.watch("serviceCategory");
  const watchMainService = form.watch("mainService");
  
  // Check for prefilled address from hero section
  useEffect(() => {
    const prefilledAddress = localStorage.getItem('prefilledAddress');
    const prefilledCoordinatesStr = localStorage.getItem('prefilledCoordinates');
    
    if (prefilledAddress) {
      form.setValue('location', prefilledAddress);
      
      if (prefilledCoordinatesStr) {
        try {
          const coords = JSON.parse(prefilledCoordinatesStr) as [number, number];
          setAddressCoordinates(coords);
          setIsValidAddress(true);
        } catch (e) {
          console.error('Error parsing prefilled coordinates', e);
        }
      }
      
      // Clear localStorage after using
      localStorage.removeItem('prefilledAddress');
      localStorage.removeItem('prefilledCoordinates');
    }
  }, [form]);
  
  // Effects to update form values based on selections
  useEffect(() => {
    if (watchServiceCategory) {
      setSelectedCategory(watchServiceCategory);
      
      // Track category change
      trackInteraction('select_service_category', 'serviceCategory', watchServiceCategory);
      
      if (watchMainService) {
        // Find the selected service package details
        const selectedServices = servicePackages[watchServiceCategory as keyof typeof servicePackages];
        const selectedService = selectedServices.find(s => s.value === watchMainService);
        const vehicleType = form.getValues().vehicleType;
        
        // Track main service selection
        trackInteraction('select_main_service', 'mainService', watchMainService);
        
        if (selectedService && vehicleType) {
          // Calculate total price with add-ons
          const totalPrice = calculateTotalPrice(selectedService, vehicleType, selectedAddOnDetails);
          
          // Track total price calculation
          trackInteraction('total_price_calculated', 'totalPrice', totalPrice);
          
          // Update form values
          form.setValue("totalPrice", totalPrice);
          form.setValue("totalDuration", selectedService.duration);
        }
      }
    }
  }, [watchServiceCategory, watchMainService, selectedAddOnDetails, form]);
  
  // Handle add-on selection
  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    // Track user interaction
    const selectedAddOn = addOnServices.find(addon => addon.id === addOnId);
    trackInteraction(
      checked ? 'addon_added' : 'addon_removed',
      'addOns',
      selectedAddOn?.label || addOnId
    );
    
    if (checked) {
      if (selectedAddOn) {
        setSelectedAddOns(prev => [...prev, addOnId]);
        setSelectedAddOnDetails(prev => [...prev, {id: addOnId, price: selectedAddOn.price}]);
      }
    } else {
      setSelectedAddOns(prev => prev.filter(id => id !== addOnId));
      setSelectedAddOnDetails(prev => prev.filter(item => item.id !== addOnId));
    }
  };
  
  // Function to collect all essential booking data in one place
  const captureBookingData = () => {
    // Get current form data
    const formData = form.getValues();
    
    // Get service details
    const selectedService = getSelectedServiceDetails();
    
    // Get add-ons info
    const addOnDetails = selectedAddOns.map(id => {
      const addon = addOnServices.find(a => a.id === id);
      return { id, name: addon?.label, price: addon?.price };
    });
    
    // Get vehicle type details
    const vehicleTypeDetails = vehicleTypes.find(v => v.value === formData.vehicleType);
    
    // Get time slot details
    const timeSlotDetails = timeSlots.find(slot => slot.value === formData.appointmentTime);
    
    // Comprehensive booking data object
    const bookingData = {
      // Basic info
      reference: bookingReference,
      status: "pending",
      timestamp: new Date().toISOString(),
      
      // Location
      location: formData.location,
      coordinates: addressCoordinates,
      
      // Vehicle info
      vehicleType: formData.vehicleType,
      vehicleTypeName: vehicleTypeDetails?.label || '',
      vehicleCondition: formData.conditionNotes || 'No notes provided',
      
      // Service selection
      serviceCategory: formData.serviceCategory,
      serviceCategoryName: serviceCategories.find(c => c.value === formData.serviceCategory)?.label || '',
      mainService: formData.mainService,
      mainServiceName: selectedService?.label || '',
      mainServicePrice: selectedService?.price || '',
      mainServiceDuration: selectedService?.duration || '',
      
      // Add-ons
      addOns: selectedAddOns.join(", "),
      addOnDetailsList: addOnDetails,
      
      // Appointment details
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      appointmentTimeFormatted: timeSlotDetails?.label || '',
      
      // Pricing
      totalPrice: formData.totalPrice,
      
      // Customer details
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      
      // For backend tracking
      submittedFrom: 'website',
      userAgent: navigator.userAgent,
    };
    
    // Log the comprehensive data (in production, this would be sent to analytics)
    console.log('COMPLETE BOOKING DATA:', bookingData);
    
    return bookingData;
  };

  // Booking submission mutation
  const bookingMutation = useMutation({
    mutationFn: (data: FormValues) => {
      // Capture all booking data when submitting
      const completeBookingData = captureBookingData();
      
      return apiRequest("POST", "/api/bookings", {
        ...data,
        addOns: selectedAddOns.join(", "),
        bookingReference: bookingReference,
        bookingData: completeBookingData // Send the complete data for analytics
      });
    },
    onSuccess: async () => {
      toast({
        title: "Booking Successful",
        description: "Your appointment has been scheduled. We will contact you to confirm the details.",
        variant: "default",
      });
      setCurrentStep(8); // Move to confirmation step
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  // Handle next step and form submission
  const handleNext = async () => {
    const fields = getFieldsForStep(currentStep);
    const stepName = steps[currentStep]?.id || `step_${currentStep}`;
    
    // Special handling for review step
    if (currentStep === 7) {
      try {
        setIsSubmitting(true);
        const ref = generateBookingReference();
        setBookingReference(ref);
        
        // Log the current state of the form
        console.log('SUBMITTING BOOKING:', { step: 'review', reference: ref });
        
        // Submit the form
        await form.handleSubmit((data) => {
          bookingMutation.mutate(data);
        })();
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
      }
      return;
    }
    
    // Validate current step fields
    const isStepValid = await validateStepFields(fields);
    
    if (isStepValid && currentStep < steps.length - 1) {
      // Capture data at each step
      const currentData = form.getValues();
      
      // Log the current step's data
      switch(currentStep) {
        case 0:
          console.log('BOOKING DATA - LOCATION:', {
            location: currentData.location,
            coordinates: addressCoordinates,
            isValidAddress
          });
          break;
        case 1:
          console.log('BOOKING DATA - VEHICLE:', {
            vehicleType: currentData.vehicleType,
            vehicleName: vehicleTypes.find(v => v.value === currentData.vehicleType)?.label
          });
          break;
        case 2:
          console.log('BOOKING DATA - CATEGORY:', {
            serviceCategory: currentData.serviceCategory,
            categoryName: serviceCategories.find(c => c.value === currentData.serviceCategory)?.label
          });
          break;
        case 3:
          console.log('BOOKING DATA - SERVICE:', {
            mainService: currentData.mainService,
            serviceName: getSelectedServiceDetails()?.label,
            price: getSelectedServiceDetails()?.price,
            addOns: selectedAddOns,
            totalPrice: currentData.totalPrice
          });
          break;
        case 4:
          console.log('BOOKING DATA - APPOINTMENT:', {
            date: currentData.appointmentDate,
            time: currentData.appointmentTime,
            formattedTime: timeSlots.find(t => t.value === currentData.appointmentTime)?.label
          });
          break;
        case 5:
          console.log('BOOKING DATA - CONDITION:', {
            conditionNotes: currentData.conditionNotes || 'No notes provided'
          });
          break;
        case 6:
          console.log('BOOKING DATA - CONTACT:', {
            firstName: currentData.firstName,
            lastName: currentData.lastName,
            email: currentData.email,
            phone: currentData.phone
          });
          break;
      }
      
      setCurrentStep(prev => prev + 1);
      // Scroll to top when changing steps
      stepsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get fields that need validation for the current step
  const getFieldsForStep = (step: number): string[] => {
    switch(step) {
      case 0: return ["location"];
      case 1: return ["vehicleType"];
      case 2: return ["serviceCategory"];
      case 3: return ["mainService"];
      case 4: return ["appointmentDate", "appointmentTime"];
      case 5: return []; // Vehicle condition is optional
      case 6: return ["firstName", "lastName", "email", "phone"];
      case 7: return []; // Review page, no new fields
      default: return [];
    }
  };
  
  // Validate fields for a step
  const validateStepFields = async (fields: string[]): Promise<boolean> => {
    if (fields.length === 0) return true;
    
    // Special handling for location step - check if address is in service area
    if (fields.includes("location") && currentStep === 0) {
      const result = await form.trigger(fields as any[]);
      return result && isValidAddress;
    }
    
    const result = await form.trigger(fields as any[]);
    return result;
  };

  // Navigate to previous step
  const handlePrevious = () => {
    // Simple log for navigation tracking
    console.log('NAVIGATION: Going back from step', currentStep, 'to step', currentStep-1);
    
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      stepsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get service price adjusted for vehicle type
  const getAdjustedPrice = (serviceInfo: any, vehicleType: string): string => {
    if (!serviceInfo || !vehicleType) return "$0";
    
    try {
      // Get price from our pricing tiers
      const price = getServicePrice(serviceInfo.value, form.getValues().serviceCategory, vehicleType);
      
      // Format as whole dollar amount (no decimals)
      return `$${price}`;
    } catch (error) {
      console.error('Error in getAdjustedPrice:', error);
      return "$0";
    }
  };
  
  // Find selected service details with adjusted price based on vehicle type
  const getSelectedServiceDetails = () => {
    if (!selectedCategory || !watchMainService) return null;
    
    const services = servicePackages[selectedCategory as keyof typeof servicePackages];
    const serviceInfo = services.find(s => s.value === watchMainService);
    
    if (serviceInfo) {
      const vehicleType = form.getValues().vehicleType;
      // Add the price property adjusted for vehicle type
      return {
        ...serviceInfo,
        price: getAdjustedPrice(serviceInfo, vehicleType)
      };
    }
    
    return null;
  };

  const isMobile = useIsMobile();

  return (
    <div className="bg-[#F3F4E6] py-8 md:py-10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">Book Your Mobile Detailing Service</h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Experience premium car detailing at your home or office. Our expert team brings everything needed to transform your vehicle.</p>
        </div>
        
        <div ref={stepsRef} className="relative mb-6 md:mb-10">
          {/* Desktop progress indicator */}
          <div className="hidden md:flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative flex flex-col items-center ${
                  index <= currentStep ? 'text-primary' : 'text-gray-400'
                }`}
                style={{ width: `${100 / steps.length}%` }}
              >
                <ThreeDStepIcon 
                  status={
                    index < currentStep 
                      ? 'completed' 
                      : index === currentStep 
                        ? 'active' 
                        : 'upcoming'
                  }
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </ThreeDStepIcon>
                <div className="text-xs mt-4 font-medium hidden md:block">{step.title}</div>
              </div>
            ))}
            
            {/* Progress bar */}
            <div 
              className="absolute top-5 h-1 bg-gray-200 left-0 right-0 -z-10"
              style={{ transform: "translateY(-50%)" }}
            ></div>
            <div 
              className="absolute top-5 h-1 bg-primary left-0 -z-10 transition-all duration-300"
              style={{ 
                transform: "translateY(-50%)",
                width: `${(currentStep / (steps.length - 1)) * 100}%` 
              }}
            ></div>
          </div>
          
          {/* Mobile progress indicator - simplified dots */}
          <div className="md:hidden flex items-center justify-center space-x-1 mb-4">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'w-6 bg-primary' : 
                  index < currentStep ? 'w-3 bg-primary' : 'w-3 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          {/* Mobile step indicator */}
          <div className="text-center md:hidden mb-4">
            <div className="flex justify-center mb-2">
              <ThreeDStepIcon status="active">
                {steps[currentStep].icon}
              </ThreeDStepIcon>
            </div>
            <h3 className="text-xl font-bold">{steps[currentStep].title}</h3>
            <p className="text-gray-600 text-sm">{steps[currentStep].description}</p>
          </div>
        </div>
        
        {/* Main form card - adjusted padding for mobile */}
        <Card className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border-gray-200">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <Form {...form}>
              <div className="space-y-6">
                {/* Step 1: Location */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Where should we meet you?</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      We'll come to your location with all the equipment needed for a perfect detail.
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <>
                          <LocationSearch 
                            value={field.value} 
                            onChange={field.onChange}
                            onAddressValidated={(isValid, coordinates) => {
                              setIsValidAddress(isValid);
                              if (coordinates) {
                                setAddressCoordinates(coordinates);
                              }
                              
                              if (!isValid && field.value) {
                                toast({
                                  title: "Location Outside Service Area",
                                  description: "We currently only service areas within California, from Sacramento to San Diego. Please enter a location within our service area.",
                                  variant: "destructive",
                                });
                              } else if (isValid && field.value) {
                                toast({
                                  title: "Address Verified",
                                  description: "Great! Your location is within our service area.",
                                  variant: "default",
                                });
                              }
                            }}
                            field={field}
                            formState={form.formState}
                          />
                          
                          {field.value && !isValidAddress && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                              <div className="flex items-start">
                                <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                <div>
                                  <h4 className="text-sm font-medium text-red-800">Outside Service Area</h4>
                                  <p className="text-sm text-red-700 mt-1">
                                    The address you've entered is outside our service area. We currently only service locations within California, from Sacramento to San Diego. Please enter a different address or contact us for special arrangements.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    />
                  </div>
                )}
                
                {/* Step 2: Vehicle Type */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Select Your Vehicle Type</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      This helps us prepare the right equipment and supplies for your vehicle.
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Vehicle Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                // Track vehicle type selection
                                trackInteraction('select_vehicle_type', 'vehicleType', value);
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                              {vehicleTypes.map((vehicle) => (
                                <div 
                                  key={vehicle.value} 
                                  className={`relative bg-white rounded-lg cursor-pointer transition-all shadow-sm 
                                    ${field.value === vehicle.value 
                                      ? 'border-2 border-primary transform -translate-y-1' 
                                      : 'border border-gray-200 hover:border-gray-300 hover:-translate-y-1'
                                    }
                                    before:absolute before:rounded-lg before:inset-0 before:bottom-[-5px] 
                                    before:bg-gray-100 before:-z-10 before:border before:border-gray-200
                                  `}
                                  onClick={() => field.onChange(vehicle.value)}
                                >
                                  <div className="p-4">
                                    <RadioGroupItem
                                      value={vehicle.value}
                                      id={vehicle.value}
                                      className="sr-only"
                                    />
                                    <div className="flex items-center">
                                      <div className={`mr-3 text-2xl p-2 rounded-full ${field.value === vehicle.value ? 'bg-primary/10' : 'bg-gray-100'}`}>
                                        {vehicle.icon}
                                      </div>
                                      <div>
                                        <label 
                                          htmlFor={vehicle.value}
                                          className="block font-medium cursor-pointer"
                                        >
                                          {vehicle.label}
                                        </label>
                                        <span className="text-sm text-gray-500">{vehicle.description}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {/* Step 3: Service Category */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Select Service Category</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      What type of detailing service are you looking for?
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="serviceCategory"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Service Category</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              {serviceCategories.map((category) => (
                                <div 
                                  key={category.value} 
                                  className={`relative bg-white rounded-lg cursor-pointer transition-all shadow-sm 
                                    ${field.value === category.value 
                                      ? 'border-2 border-primary transform -translate-y-1' 
                                      : 'border border-gray-200 hover:border-gray-300 hover:-translate-y-1'
                                    }
                                    before:absolute before:rounded-lg before:inset-0 before:bottom-[-5px] 
                                    before:bg-gray-100 before:-z-10 before:border before:border-gray-200
                                  `}
                                  onClick={() => field.onChange(category.value)}
                                >
                                  <div className="p-4">
                                    <RadioGroupItem
                                      value={category.value}
                                      id={category.value}
                                      className="sr-only"
                                    />
                                    <div className="flex items-center">
                                      <div className={`mr-3 text-2xl p-2 rounded-full ${field.value === category.value ? 'bg-primary/10' : 'bg-gray-100'}`}>
                                        {category.icon}
                                      </div>
                                      <div>
                                        <label 
                                          htmlFor={category.value}
                                          className="block font-medium cursor-pointer"
                                        >
                                          {category.label}
                                        </label>
                                        <span className="text-sm text-gray-500">{category.description}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {/* Step 4: Service Selection */}
                {currentStep === 3 && selectedCategory && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Select Your Package</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      Choose a detailing package that best fits your needs.
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="mainService"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Service Packages</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              {servicePackages[selectedCategory as keyof typeof servicePackages].map((service) => (
                                <div 
                                  key={service.value} 
                                  className={`relative bg-white rounded-lg cursor-pointer transition-all shadow-sm 
                                    ${field.value === service.value 
                                      ? 'border-2 border-primary transform -translate-y-1' 
                                      : 'border border-gray-200 hover:border-gray-300 hover:-translate-y-1'
                                    }
                                    before:absolute before:rounded-lg before:inset-0 before:bottom-[-5px] 
                                    before:bg-gray-100 before:-z-10 before:border before:border-gray-200
                                  `}
                                  onClick={() => field.onChange(service.value)}
                                >
                                  <div className="p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <RadioGroupItem
                                          value={service.value}
                                          id={service.value}
                                          className="sr-only"
                                        />
                                        <label 
                                          htmlFor={service.value}
                                          className="block font-bold cursor-pointer"
                                        >
                                          {service.label}
                                        </label>
                                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                        <p className="text-sm text-gray-500 mt-1">Duration: {service.duration}</p>
                                      </div>
                                      <span className="text-primary font-bold text-lg bg-primary/5 px-3 py-1 rounded-md">
                                        {form.getValues().vehicleType 
                                          ? getAdjustedPrice(service, form.getValues().vehicleType)
                                          : `$${service.basePrice.toFixed(2)}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Add-on services section */}
                    {watchMainService && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Enhance Your Service with Add-ons</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {addOnServices.map((addon) => {
                            const isSelected = selectedAddOns.includes(addon.id);
                            return (
                              <div 
                                key={addon.id}
                                className={`relative bg-white rounded-lg cursor-pointer transition-all shadow-sm 
                                  ${isSelected 
                                    ? 'border-2 border-primary transform -translate-y-1' 
                                    : 'border border-gray-200 hover:border-gray-300 hover:-translate-y-1'
                                  }
                                  before:absolute before:rounded-lg before:inset-0 before:bottom-[-5px] 
                                  before:bg-gray-100 before:-z-10 before:border before:border-gray-200
                                `}
                                onClick={() => handleAddOnChange(addon.id, !isSelected)}
                              >
                                <div className="p-3">
                                  <div className="flex items-start">
                                    <Checkbox
                                      id={addon.id}
                                      checked={isSelected}
                                      onCheckedChange={(checked) => {
                                        handleAddOnChange(addon.id, checked as boolean);
                                      }}
                                      className={`mt-1 mr-3 ${isSelected ? 'bg-primary text-primary-foreground border-primary' : ''}`}
                                    />
                                    <div className="flex-1">
                                      <div
                                        className="flex justify-between w-full font-medium cursor-pointer"
                                      >
                                        <span>{addon.label}</span>
                                        <span className="text-primary font-bold px-2 py-0.5 bg-primary/5 rounded-md">{addon.price}</span>
                                      </div>
                                      <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Step 5: Appointment Time */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Choose Your Appointment Time</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      Select a date and time that works best for your schedule.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                value={field.value}
                                onChange={(e) => {
                                  // Track date selection
                                  trackInteraction('select_date', 'appointmentDate', e.target.value);
                                  field.onChange(e);
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                className="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appointmentTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                // Track time selection
                                trackInteraction('select_time', 'appointmentTime', value);
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300">
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-2">
                      Appointments available Monday-Friday 8am-5pm and Saturday 9am-3pm
                    </p>
                  </div>
                )}
                
                {/* Step 6: Vehicle Condition */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Tell Us About Your Vehicle's Condition</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      Help us prepare by letting us know about any specific issues or concerns.
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="conditionNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Condition Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Examples: Pet hair in back seat, coffee stains on front seats, scratches on driver side door, heavy pollen on exterior, etc."
                              value={field.value || ''}
                              onChange={(e) => {
                                // Only track when they finish typing (on blur) to avoid excessive tracking
                                field.onChange(e);
                              }}
                              onBlur={() => {
                                if (field.value) {
                                  // Track condition notes
                                  trackInteraction('add_condition_notes', 'conditionNotes', 'provided');
                                }
                              }}
                              rows={4}
                              className="border-gray-300 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {/* Step 7: Contact Information */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold hidden md:block">Your Contact Details</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      We'll use this information to confirm your appointment and send you updates.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="First Name" 
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                                onBlur={() => {
                                  if (field.value) {
                                    trackInteraction('provided_first_name', 'firstName', 'entered');
                                  }
                                }}
                                className="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Last Name" 
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                                onBlur={() => {
                                  if (field.value) {
                                    trackInteraction('provided_last_name', 'lastName', 'entered');
                                  }
                                }}
                                className="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="email@example.com" 
                                type="email"
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                                onBlur={() => {
                                  if (field.value) {
                                    trackInteraction('provided_email', 'email', 'entered');
                                  }
                                }}
                                className="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(555) 555-1234"
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                                onBlur={() => {
                                  if (field.value) {
                                    trackInteraction('provided_phone', 'phone', 'entered');
                                  }
                                }}
                                className="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 8: Review */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold hidden md:block">Review Your Booking</h2>
                    <p className="text-gray-600 mb-6 hidden md:block">
                      Please review your booking details before confirming.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3">Booking Summary</h3>
                      
                      <div className="space-y-4">
                        {/* Service Details */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Selected Service</h4>
                          <div className="mt-1 flex justify-between">
                            <span className="text-gray-900 font-medium">
                              {getSelectedServiceDetails()?.label || "No service selected"}
                            </span>
                            <span className="text-primary font-bold">
                              {getSelectedServiceDetails()?.price || "-"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {getSelectedServiceDetails()?.description || ""}
                          </div>
                        </div>
                        
                        {/* Add-ons */}
                        {selectedAddOns.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Add-on Services</h4>
                            <div className="mt-1 space-y-1">
                              {selectedAddOns.map(id => {
                                const addon = addOnServices.find(a => a.id === id);
                                return (
                                  <div key={id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{addon?.label}</span>
                                    <span className="text-primary font-medium">{addon?.price}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Total */}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between">
                            <span className="font-bold">Total Price</span>
                            <span className="text-primary font-bold text-lg">
                              {form.getValues().totalPrice || "-"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Estimated Duration</span>
                            <span>{form.getValues().totalDuration || "-"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Your Details</h4>
                          <p className="text-gray-900">
                            {form.getValues().firstName} {form.getValues().lastName}
                          </p>
                          <p className="text-gray-600 text-sm">{form.getValues().email}</p>
                          <p className="text-gray-600 text-sm">{form.getValues().phone}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Appointment</h4>
                          <p className="text-gray-900">
                            {form.getValues().appointmentDate && new Date(form.getValues().appointmentDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {form.getValues().appointmentTime && timeSlots.find(
                              slot => slot.value === form.getValues().appointmentTime
                            )?.label}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Service Location</h4>
                        <p className="text-gray-900">{form.getValues().location}</p>
                        <p className="text-gray-600 text-sm">Vehicle Type: {
                          vehicleTypes.find(v => v.value === form.getValues().vehicleType)?.label || "-"
                        }</p>
                      </div>
                      
                      {form.getValues().conditionNotes && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Special Instructions</h4>
                          <p className="text-gray-600 text-sm">{form.getValues().conditionNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Step 9: Confirmation */}
                {currentStep === 8 && (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-full mb-4">
                      <CheckCircle className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Your booking request has been received. We'll send a confirmation email shortly.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold">Booking Reference</h3>
                        <span className="text-primary font-mono font-bold">{bookingReference}</span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date:</span>
                          <span className="font-medium">{form.getValues().appointmentDate && new Date(form.getValues().appointmentDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Time:</span>
                          <span className="font-medium">{
                            timeSlots.find(slot => slot.value === form.getValues().appointmentTime)?.label
                          }</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Service:</span>
                          <span className="font-medium">{getSelectedServiceDetails()?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-bold text-primary">{form.getValues().totalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        type="button"
                        onClick={() => {
                          // Reset form and go back to step 1
                          form.reset();
                          setSelectedAddOns([]);
                          setSelectedAddOnDetails([]);
                          setCurrentStep(0);
                        }}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Book Another Appointment
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons */}
                {currentStep < 8 && (
                  <div className={`flex ${currentStep > 0 ? 'justify-between' : 'justify-end'} mt-8 pt-4 border-t border-gray-200`}>
                    {currentStep > 0 && (
                      <BackButton
                        type="button"
                        onClick={handlePrevious}
                        className="border-gray-300"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </BackButton>
                    )}
                    
                    <ThreeDButton
                      type="button"
                      onClick={handleNext}
                      disabled={isSubmitting}
                      variant="primary"
                    >
                      {currentStep === 7 ? (
                        isSubmitting ? "Processing..." : "Confirm Booking"
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </ThreeDButton>
                  </div>
                )}
              </div>
            </Form>
          </CardContent>
        </Card>
        
        {/* What to Expect section - mobile optimized */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-12">
          {isMobile ? (
            <details className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <summary className="text-lg font-bold text-gray-900 cursor-pointer">
                Mobile Detailing: What to Expect
              </summary>
              <ul className="space-y-3 mt-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  <span>Appointments available Monday-Friday 8am-5pm and Saturday 9am-3pm.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  <span>Ensure vehicle accessibility and water hookups within 100 feet.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  <span>We bring all equipment, water capture systems, and eco-friendly products.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  <span>Payment after service - accept credit cards, cash, and digital payments.</span>
                </li>
              </ul>
            </details>
          ) : (
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Detailing: What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5 shrink-0" />
                  <span>We service Irvine and surrounding areas with appointments available Monday-Friday 8am-5pm and Saturday 9am-3pm.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5 shrink-0" />
                  <span>Please ensure your vehicle is accessible and that you have access to water hookups within 100 feet of your vehicle.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5 shrink-0" />
                  <span>Our team brings all necessary equipment, water capture systems, and eco-friendly cleaning products.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5 shrink-0" />
                  <span>Payment is collected after service completion - we accept all major credit cards, cash, and digital payment apps.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}