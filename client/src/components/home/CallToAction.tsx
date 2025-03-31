import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="relative py-16 bg-secondary overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80" 
        alt="Professional car detailing" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">Act Now: Limited Appointments Available</h2>
          <p className="text-gray-100/90 text-lg mb-6">
            Irvine's best-kept secret for luxury car care is quickly becoming everyone's favorite. Secure your spot today—don't wait for your car to lose its shine.
          </p>
          <p className="text-gray-100/80 text-md mb-8">
            Our Promise: If your car isn't the cleanest you've ever seen it, the detail is free—no questions asked.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="/booking">🚗 Book Your Luxury Detail Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
