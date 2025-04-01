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
          <Button asChild size="lg" className="btn-gradient-primary hover:brightness-105">
            <Link href="/booking">
              <span className="flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"/>
                    <path d="M9 17h6"/>
                    <circle cx="17" cy="17" r="2"/>
                  </svg>
                </span>
                Book Your Luxury Detail Now
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
