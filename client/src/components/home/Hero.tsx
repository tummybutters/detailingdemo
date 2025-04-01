import { Link } from "wouter";
import { Shield, Clock, Sparkles } from "lucide-react";
import HeroLocationSearch from "./HeroLocationSearch";
import { ThreeDButton } from "@/components/ui/3d-button";
import '../ui/custom-3d-button.css';

export default function Hero() {
  return (
    <div className="relative bg-secondary min-h-[85vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1553545985-1e0d8781d5db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80" 
        alt="Luxury car detailing" 
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Company logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/images/hardy-logo.png" 
            alt="Hardys Wash N' Wax" 
            className="h-24" 
          />
        </div>
        
        {/* Main headline that spans both columns */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-center mb-12">
          Luxury Where It Matters Most:
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(80vh-12rem)]">
          {/* Left side content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
              Your Home on the Road,
              <span className="block mt-2">Detailed Right at Your Door.</span>
            </h2>
            
            <p className="text-gray-100 text-xl mt-6 mb-8 font-light">
              "You'll spend thousands of Hours in your Car, Let Us Spend Two making it perfect"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <Link href="/booking">
                <ThreeDButton variant="primary" className="text-base sm:text-lg py-3 px-5">
                  🚗 Book Your Luxury Detail
                </ThreeDButton>
              </Link>
              <Link href="/services">
                <ThreeDButton variant="secondary" className="text-base sm:text-lg py-3 px-5">
                  View Our Services
                </ThreeDButton>
              </Link>
            </div>
          </div>
          
          {/* Right side with location search */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <HeroLocationSearch />
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
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
        
        {/* Features section under the hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
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
