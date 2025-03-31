import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { bookingFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

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
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

type FormValues = z.infer<typeof bookingFormSchema>;

const vehicleTypes = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV/Crossover" },
  { value: "truck", label: "Truck" },
  { value: "luxury", label: "Luxury/Sports Car" },
  { value: "van", label: "Van/Minivan" }
];

const timeSlots = [
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" }
];

const services = [
  { value: "express", label: "Express Detail", price: "$99", description: "Hand wash, wheel cleaning, interior vacuum & wipe down (1 hour)" },
  { value: "essential", label: "Essential Detail", price: "$159", description: "Express + door jambs, windows, dash & console deep clean (2 hours)" },
  { value: "luxury", label: "Luxury Detail", price: "$249", description: "Essential + premium wax, full interior conditioning, & stain removal (3 hours)" },
  { value: "ultimate", label: "Ultimate Detail + Paint Correction", price: "$399", description: "Our flagship service with paint decontamination & correction (5+ hours)" }
];

const addOns = [
  { id: "ceramic", label: "Express Ceramic Coating (3-month)", price: "+$79" },
  { id: "headlight", label: "Headlight Restoration", price: "+$59" },
  { id: "engine", label: "Engine Bay Detailing", price: "+$49" },
  { id: "leather", label: "Premium Leather Conditioning", price: "+$69" },
  { id: "pet", label: "Pet Hair & Odor Treatment", price: "+$45" },
  { id: "sanitize", label: "Interior Sanitization", price: "+$35" }
];

export default function BookingForm() {
  const { toast } = useToast();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: undefined,
      vehicleType: "",
      service: "",
      addOns: "",
      appointmentDate: "",
      appointmentTime: "",
      notes: ""
    }
  });

  const bookingMutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest("POST", "/api/bookings", {
        ...data,
        addOns: selectedAddOns.join(", ")
      });
    },
    onSuccess: async () => {
      toast({
        title: "Booking Successful",
        description: "Your appointment has been scheduled. We will contact you to confirm the details.",
        variant: "default",
      });
      form.reset();
      setSelectedAddOns([]);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    bookingMutation.mutate(data);
  };

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddOns(prev => [...prev, addOnId]);
    } else {
      setSelectedAddOns(prev => prev.filter(id => id !== addOnId));
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Appointment Details</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" {...field} />
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
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 555-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Vehicle Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Vehicle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicleMake"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make*</FormLabel>
                          <FormControl>
                            <Input placeholder="Toyota" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model*</FormLabel>
                          <FormControl>
                            <Input placeholder="Camry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vehicleYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year*</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2022"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value ? parseInt(e.target.value) : undefined;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Vehicle Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Service Selection */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Select Service</h3>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            {services.map((service) => (
                              <div key={service.value} className="bg-white p-4 border border-gray-200 rounded-md flex items-start">
                                <RadioGroupItem
                                  value={service.value}
                                  id={service.value}
                                  className="mt-1"
                                />
                                <label
                                  htmlFor={service.value}
                                  className="flex-1 ml-3 cursor-pointer"
                                >
                                  <span className="block font-bold text-gray-900">{service.label}</span>
                                  <span className="block text-gray-600 text-sm">{service.description}</span>
                                  <span className="block text-primary font-bold mt-1">{service.price}</span>
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="mt-4">
                    <FormLabel>Add-on Services (Optional)</FormLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {addOns.map((addon) => (
                        <div key={addon.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddOns.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              handleAddOnChange(addon.id, checked as boolean);
                            }}
                          />
                          <label
                            htmlFor={addon.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex justify-between w-full"
                          >
                            <span>{addon.label}</span>
                            <span className="text-primary font-semibold">{addon.price}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Appointment Date/Time */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Preferred Appointment Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
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
                          <FormLabel>Time*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Preferred Time" />
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
                </div>
                
                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Let us know if you have any special requests or concerns."
                          {...field}
                          value={field.value || ''}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border-t border-gray-200 pt-6 flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Submitting..." : "Book Appointment"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Detailing: What to Expect</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5" />
                <span>We service Irvine and surrounding areas with appointments available Monday-Friday 8am-5pm and Saturday 9am-3pm.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5" />
                <span>After booking, you'll receive a confirmation text with your exact appointment time within 24 hours.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5" />
                <span>All we need is access to your vehicle and a standard electrical outlet within 100 feet (if possible).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5" />
                <span>Our satisfaction guarantee: If your car isn't the cleanest you've ever seen it, the detail is free—no questions asked.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 mt-1 h-5 w-5" />
                <span>Cancellations must be made at least 24 hours in advance to avoid a $50 cancellation fee.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
