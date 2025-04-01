import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { bookingFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, Calendar, Car, Settings, 
  ClipboardList, Clock, DollarSign, X, Check, Droplets, Sparkles, 
  Search, PenTool, Brush, ShieldCheck, Truck, Layers, ChevronsUp } from "lucide-react";
import LocationSearch from "./LocationSearch";
import { ThreeDButton } from "@/components/ui/3d-button";

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

// Vehicle Types
const vehicleTypes = [
  { value: "sedan", label: "Sedan", icon: <Car className="w-6 h-6 text-primary-red" />, description: "Standard 4-door car" },
  { value: "coupe", label: "Coupe", icon: <Car className="w-6 h-6 text-primary-red" />, description: "2-door sporty car" },
  { value: "suv", label: "SUV/Crossover", icon: <Truck className="w-6 h-6 text-primary-red" />, description: "Sport utility vehicle" },
  { value: "truck", label: "Truck", icon: <Truck className="w-6 h-6 text-primary-red" />, description: "Pickup truck" },
  { value: "van", label: "Van/Minivan", icon: <Truck className="w-6 h-6 text-primary-red" />, description: "Family or cargo van" },
  { value: "luxury", label: "Luxury/Sports Car", icon: <Car className="w-6 h-6 text-primary-red" />, description: "High-end performance vehicle" },
];

// Categories 
const serviceCategories = [
  { value: "interior", label: "Interior Only", icon: <Brush className="w-6 h-6 text-primary-red" />, description: "Focus on cleaning the inside of your vehicle" },
  { value: "exterior", label: "Exterior Only", icon: <Droplets className="w-6 h-6 text-primary-red" />, description: "Focus on making the outside shine" },
  { value: "complete", label: "Complete Package", icon: <Sparkles className="w-6 h-6 text-primary-red" />, description: "Full interior and exterior detailing" },
  { value: "specialty", label: "Specialty Services", icon: <Search className="w-6 h-6 text-primary-red" />, description: "Specific treatments for particular issues" }
];

// Service Packages
const servicePackages = {
  interior: [
    { value: "express-interior", label: "Express Interior", price: "$125", duration: "1.5 hours", description: "Quick interior vacuum, wipe down of surfaces, and window cleaning" },
    { value: "deep-clean", label: "Deep Clean", price: "$225", duration: "3 hours", description: "Thorough cleaning of all interior surfaces, carpet & upholstery cleaning, stain removal" },
    { value: "premium-interior", label: "Premium Interior", price: "$350", duration: "4-5 hours", description: "Complete interior restoration with leather conditioning, steam cleaning, and all vents/crevices detailed" }
  ],
  exterior: [
    { value: "express-wash", label: "Express Wash & Wax", price: "$150", duration: "1.5 hours", description: "Hand wash, spray wax, tire shine, and exterior windows" },
    { value: "deluxe-exterior", label: "Deluxe Exterior", price: "$250", duration: "3 hours", description: "Two-step wash process, premium wax, wheel detailing, and trim restoration" },
    { value: "paint-correction", label: "Paint Correction", price: "$450", duration: "5-6 hours", description: "Machine polish to remove scratches, swirls, and oxidation plus premium ceramic wax" }
  ],
  complete: [
    { value: "signature-detail", label: "Signature Detail", price: "$350", duration: "4 hours", description: "Our most popular package with interior deep clean and exterior deluxe service" },
    { value: "luxury-detail", label: "Luxury Detail", price: "$550", duration: "6-7 hours", description: "Premium interior and exterior services with extra attention to detail" },
    { value: "showroom-prep", label: "Showroom Prep", price: "$750", duration: "8+ hours", description: "Comprehensive detailing bringing your vehicle to like-new condition inside and out" }
  ],
  specialty: [
    { value: "ceramic-coating", label: "Ceramic Coating", price: "$600", duration: "6 hours", description: "Professional-grade ceramic coating application with 12-18 month protection" },
    { value: "pet-hair-removal", label: "Pet Hair Removal", price: "$175", duration: "2-3 hours", description: "Specialized extraction process to remove embedded pet hair and odors" },
    { value: "headlight-restoration", label: "Headlight Restoration", price: "$150", duration: "1.5 hours", description: "Restore cloudy, yellow headlights to clear condition" }
  ]
};

// Add-on Services
const addOnServices = [
  { id: "ceramic", label: "Premium Ceramic Coating", price: "+$150", description: "12-month protection against environmental damage" },
  { id: "engine", label: "Engine Bay Detail", price: "+$85", description: "Complete cleaning and dressing of engine compartment" },
  { id: "clay", label: "Clay Bar Treatment", price: "+$65", description: "Removes embedded contaminants from paint" },
  { id: "leather", label: "Leather Conditioning", price: "+$75", description: "Deep conditioning and UV protection for leather surfaces" },
  { id: "odor", label: "Odor Elimination", price: "+$65", description: "Professional-grade odor neutralization treatment" },
  { id: "headlights", label: "Headlight Restoration", price: "+$85", description: "Restore yellowed or cloudy headlights" },
  { id: "trim-restore", label: "Trim Restoration", price: "+$45", description: "Restore faded exterior plastic and rubber" },
  { id: "pet-hair", label: "Pet Hair Treatment", price: "+$75", description: "Extra attention to remove stubborn pet hair" }
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
  
  // Calculate total price
  const calculateTotalPrice = (mainPrice: string, addOns: {id: string, price: string}[]): string => {
    const basePrice = extractPrice(mainPrice);
    const addOnTotal = addOns.reduce((total, addon) => {
      return total + extractPrice(addon.price);
    }, 0);
    
    return `$${(basePrice + addOnTotal).toFixed(2)}`;
  };
  
  // Calculate reference number
  const generateBookingReference = (): string => {
    const prefix = "BK";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
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
      if (watchMainService) {
        // Find the selected service package details
        const selectedServices = servicePackages[watchServiceCategory as keyof typeof servicePackages];
        const selectedService = selectedServices.find(s => s.value === watchMainService);
        
        if (selectedService) {
          // Calculate total price with add-ons
          const totalPrice = calculateTotalPrice(selectedService.price, selectedAddOnDetails);
          
          // Update form values
          form.setValue("totalPrice", totalPrice);
          form.setValue("totalDuration", selectedService.duration);
        }
      }
    }
  }, [watchServiceCategory, watchMainService, selectedAddOnDetails, form]);
  
  // Handle add-on selection
  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    if (checked) {
      const selectedAddOn = addOnServices.find(addon => addon.id === addOnId);
      if (selectedAddOn) {
        setSelectedAddOns(prev => [...prev, addOnId]);
        setSelectedAddOnDetails(prev => [...prev, {id: addOnId, price: selectedAddOn.price}]);
      }
    } else {
      setSelectedAddOns(prev => prev.filter(id => id !== addOnId));
      setSelectedAddOnDetails(prev => prev.filter(item => item.id !== addOnId));
    }
  };
  
  // Booking submission mutation
  const bookingMutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest("POST", "/api/bookings", {
        ...data,
        addOns: selectedAddOns.join(", "),
        bookingReference: bookingReference
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
    
    // Special handling for review step
    if (currentStep === 7) {
      try {
        setIsSubmitting(true);
        setBookingReference(generateBookingReference());
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
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      stepsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Find selected service details
  const getSelectedServiceDetails = () => {
    if (!selectedCategory || !watchMainService) return null;
    
    const services = servicePackages[selectedCategory as keyof typeof servicePackages];
    return services.find(s => s.value === watchMainService);
  };

  return (
    <div className="bg-[#F3F4E6] py-10">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Book Your Mobile Detailing Service</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience premium car detailing at your home or office. Our expert team brings everything needed to transform your vehicle.</p>
        </div>
        
        <div ref={stepsRef} className="relative mb-10">
          <div className="hidden md:flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative flex flex-col items-center ${
                  index <= currentStep ? 'text-primary' : 'text-gray-400'
                }`}
                style={{ width: `${100 / steps.length}%` }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="text-xs mt-2 font-medium hidden md:block">{step.title}</div>
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
          
          <div className="md:hidden flex items-center justify-center space-x-1 mb-4">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'w-8 bg-primary' : 
                  index < currentStep ? 'w-4 bg-primary' : 'w-4 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="text-center md:hidden mb-4">
            <div className="inline-flex items-center justify-center bg-primary text-white p-2 rounded-full mb-2">
              {steps[currentStep].icon}
            </div>
            <h3 className="text-xl font-bold">{steps[currentStep].title}</h3>
            <p className="text-gray-600 text-sm">{steps[currentStep].description}</p>
          </div>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border-gray-200">
          <CardContent className="p-6 md:p-8">
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
                              onValueChange={field.onChange}
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
                                        {service.price}
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
                          {addOnServices.map((addon) => (
                            <div 
                              key={addon.id}
                              className={`relative bg-white rounded-lg cursor-pointer transition-all shadow-sm 
                                ${selectedAddOns.includes(addon.id) 
                                  ? 'border-2 border-primary transform -translate-y-1' 
                                  : 'border border-gray-200 hover:border-gray-300 hover:-translate-y-1'
                                }
                                before:absolute before:rounded-lg before:inset-0 before:bottom-[-5px] 
                                before:bg-gray-100 before:-z-10 before:border before:border-gray-200
                              `}
                            >
                              <div className="p-3">
                                <div className="flex items-start">
                                  <Checkbox
                                    id={addon.id}
                                    checked={selectedAddOns.includes(addon.id)}
                                    onCheckedChange={(checked) => {
                                      handleAddOnChange(addon.id, checked as boolean);
                                    }}
                                    className="mt-1 mr-3"
                                  />
                                  <div className="flex-1">
                                    <label
                                      htmlFor={addon.id}
                                      className="flex justify-between w-full font-medium cursor-pointer"
                                    >
                                      <span>{addon.label}</span>
                                      <span className="text-primary font-bold px-2 py-0.5 bg-primary/5 rounded-md">{addon.price}</span>
                                    </label>
                                    <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
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
                                {...field} 
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
                              onValueChange={field.onChange}
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
                              {...field}
                              value={field.value || ''}
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
                                {...field} 
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
                                {...field} 
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
                                {...field} 
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
                                {...field} 
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
                      <ThreeDButton
                        type="button"
                        onClick={handlePrevious}
                        variant="secondary"
                        className="border-gray-300"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </ThreeDButton>
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
        
        <div className="max-w-3xl mx-auto mt-12">
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
        </div>
      </div>
    </div>
  );
}