import { Link } from "wouter";
import HeroLocationSearch from "./HeroLocationSearch";
import { HeroButton } from "@/components/ui/hero-button";
import hardyLogoPath from "@assets/hardy logo-Photoroom.png";
import carSunsetBg from "@assets/ChatGPT Image Mar 31, 2025, 05_35_46 PM.png";

export default function Hero() {
  return (
    <div className="relative bg-secondary min-h-[85vh] overflow-hidden">
      <img 
        src={carSunsetBg} 
        alt="Luxury car detailing at sunset" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-overlay-gradient"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Main headline - larger and left-aligned */}
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight text-left mb-10 max-w-5xl">
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
                <HeroButton className="text-base sm:text-lg">
                  Book Your Luxury Detail
                </HeroButton>
              </Link>
              <Link href="/services">
                <HeroButton className="text-base sm:text-lg" variant="secondary">
                  View Our Services
                </HeroButton>
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
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <div className="bg-stat rounded-lg p-4 text-center">
            <div className="text-primary-orange font-bold text-3xl">5★</div>
            <div className="text-white text-sm mt-1">Rated Service</div>
          </div>
          <div className="bg-stat rounded-lg p-4 text-center">
            <div className="text-primary-orange font-bold text-3xl">2K+</div>
            <div className="text-white text-sm mt-1">Cars Detailed</div>
          </div>
          <div className="bg-stat rounded-lg p-4 text-center">
            <div className="text-primary-orange font-bold text-3xl">100%</div>
            <div className="text-white text-sm mt-1">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
