import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Sparkles } from "lucide-react";
import HeroLocationSearch from "./HeroLocationSearch";

export default function Hero() {
  return (
    <div className="relative bg-secondary min-h-[90vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1553545985-1e0d8781d5db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80" 
        alt="Luxury car detailing" 
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(90vh-8rem)]">
          {/* Left side content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Luxury Where It Matters Most: 
              <span className="block mt-2">Your Home on the Road</span>
            </h1>
            
            <div className="bg-gradient-to-r from-[#FFB375] to-[#EE432C] text-white inline-block px-3 py-2 my-6 rounded-md">
              <span className="text-lg md:text-xl font-semibold">Detailed Right at Your Door</span>
            </div>
            
            <p className="text-gray-100 text-xl mb-6 font-light">
              "You'll spend thousands of Hours in your Car, Let Us Spend Two making it perfect"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/booking">🚗 Book Your Luxury Detail Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border-transparent">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-[#FFB375] font-bold text-3xl">5★</div>
                <div className="text-white text-sm mt-1">Rated Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-[#FFB375] font-bold text-3xl">2K+</div>
                <div className="text-white text-sm mt-1">Cars Detailed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-[#FFB375] font-bold text-3xl">100%</div>
                <div className="text-white text-sm mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right side with location search */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <HeroLocationSearch />
            </div>
          </div>
        </div>
        
        {/* Features section under the hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-0 mb-8">
          <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg p-6">
            <div className="flex items-start">
              <Sparkles className="text-[#EE432C] mr-3 mt-1 h-6 w-6" />
              <div>
                <span className="font-semibold text-lg">Every Detail, Mastered</span>
                <p className="text-gray-600 mt-2">We bring an obsessive focus to every inch of your car—so it feels brand-new, inside and out.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg p-6">
            <div className="flex items-start">
              <Clock className="text-[#EE432C] mr-3 mt-1 h-6 w-6" />
              <div>
                <span className="font-semibold text-lg">Convenience Without Compromise</span>
                <p className="text-gray-600 mt-2">We come to you, delivering top-tier results at your doorstep while you go about your day.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg p-6">
            <div className="flex items-start">
              <Shield className="text-[#EE432C] mr-3 mt-1 h-6 w-6" />
              <div>
                <span className="font-semibold text-lg">Protect Your Investment</span>
                <p className="text-gray-600 mt-2">Our services safeguard your car's longevity and keep it looking pristine for years to come.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
