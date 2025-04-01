import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Linkedin, 
  Facebook, 
  Instagram, 
  CheckCircle 
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThreeDButton } from "@/components/ui/3d-button";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, we would send this data to the server
      console.log("Contact form submission:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
      });
      
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Contact Us | Hardys Wash N' Wax</title>
        <meta name="description" content="Contact Hardys Wash N' Wax for premium mobile detailing services. Reach our team for appointments, questions, or custom detailing needs." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-secondary py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-90"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              We're here to help with all your vehicle detailing needs.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-medium text-green-800">Message Sent!</h3>
                </div>
                <p className="mt-2 text-green-700">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
                <ThreeDButton 
                  onClick={() => setIsSuccess(false)} 
                  className="mt-4"
                  variant="secondary"
                >
                  Send Another Message
                </ThreeDButton>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} className="border-gray-300" />
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
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please tell us how we can help..." 
                            {...field} 
                            rows={5}
                            className="border-gray-300 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <ThreeDButton type="submit" disabled={isSubmitting} variant="primary" className="w-full">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </ThreeDButton>
                </form>
              </Form>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-700 mt-1">+1 949-734-0201</p>
                    <p className="text-sm text-gray-500 mt-1">Monday-Friday: 8am-5pm</p>
                    <p className="text-sm text-gray-500">Saturday: 9am-3pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-700 mt-1">hardyswashnwax@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">For general inquiries and scheduling appointments</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Service Areas</h3>
                    <p className="text-gray-700 mt-1">Irvine, Costa Mesa, Tustin, Newport Beach, Mission Viejo</p>
                    <p className="text-gray-700 mt-2">Sacramento, Davis, Dixon, Woodland, Galt, Alameda, Bonita</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Hours of Operation</h3>
                    <div className="mt-1">
                      <div className="flex justify-between text-gray-700">
                        <span>Monday - Friday:</span>
                        <span>8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Saturday:</span>
                        <span>9:00 AM - 3:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section - In a real app, replace this with an actual map */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Service Areas</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="text-gray-700">
                  We provide mobile detailing services throughout Irvine, Costa Mesa, Tustin, Newport Beach, and surrounding areas.
                </p>
                <p className="mt-3 text-primary font-medium">
                  Contact us to check if we service your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}