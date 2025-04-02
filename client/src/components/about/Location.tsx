import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/LazyImage";

export default function Location() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Our Location</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conveniently located to serve the greater metro area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Card className="bg-gray-50 p-6 rounded-lg shadow-md">
            <CardContent className="p-0">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Our Shop</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span className="text-gray-700">123 Detail Drive, Automotive City, AC 12345</span>
                </li>
                <li className="flex items-start">
                  <Clock className="text-primary mt-1 mr-3 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours:</p>
                    <p className="text-gray-700">Monday-Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-700">Saturday: 9:00 AM - 3:00 PM</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span className="text-gray-700">(555) 555-1234</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button size="sm" asChild>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Map Placeholder */}
          <div className="h-80 bg-gray-50 rounded-lg overflow-hidden shadow-md">
            <div className="h-full w-full relative">
              <LazyImage 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80" 
                alt="Map location" 
                className="absolute inset-0"
                width="100%"
                height="100%"
                placeholderColor="#e5e7eb"
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="font-medium text-gray-900">Interactive map would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
