import { Link } from "wouter";
import { HeroButton } from "@/components/ui/hero-button";
import hardyLogoPath from "@assets/hardy logo-Photoroom.png";
import carSunsetBg from "@assets/ChatGPT Image Mar 31, 2025, 05_35_46 PM.png";
import mobileHeroBg from "@assets/mobile hero image.png";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Hero() {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative bg-secondary min-h-[85vh] overflow-hidden">
      {/* Background image with different image for mobile, optimized with loading priority */}
      <img 
        src={isMobile ? mobileHeroBg : carSunsetBg} 
        alt="Luxury car detailing at sunset" 
        className={`absolute inset-0 w-full h-full object-cover`}
        loading="eager"
      />
      
      <div className="relative container mx-auto px-4 py-12 md:py-16 lg:py-24">
        {/* Main headline - optimized for mobile */}
        <h1 className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight text-left mb-6 sm:mb-10 max-w-5xl ${isMobile ? 'mobile-hero-text' : ''}`}>
          Luxury Where It Matters Most:
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center min-h-[calc(70vh-12rem)] lg:min-h-[calc(80vh-12rem)]">
          {/* Left side content */}
          <div className="flex flex-col justify-center">
            <h2 className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight ${isMobile ? 'mobile-hero-text' : ''}`}>
              Your Home on the Road,
              <span className="block mt-2">Detailed Right at Your Door.</span>
            </h2>
            
            <p className={`text-gray-100 text-lg sm:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 font-light ${isMobile ? 'mobile-hero-text' : ''}`}>
              "You'll spend thousands of Hours in your Car, Let Us Spend Two making it perfect"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
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
          
          {/* Right side with mini booking iframe */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'}`}>
              <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg overflow-hidden">
                <div className="py-3 px-4 bg-gradient-to-r from-[#EE432C] to-[#FFB375] text-white">
                  <h3 className="text-lg font-bold">Book Your Detail</h3>
                </div>
                <iframe 
                  src="https://hardyswashnwax.fieldd.co" 
                  style={{
                    width: "100%", 
                    height: "400px",
                    border: "none",
                    overflow: "hidden"
                  }}
                  title="Hardys Wash N' Wax Quick Booking"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section - simplified for mobile */}
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 ${isMobile ? 'max-w-full' : 'max-w-3xl'} mx-auto`}>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border border-white/10">
            <div className={`text-accent-orange font-bold text-xl sm:text-3xl ${isMobile ? 'mobile-hero-text' : ''}`}>5★</div>
            <div className={`text-white text-xs sm:text-sm mt-1 ${isMobile ? 'mobile-hero-text' : ''}`}>Rated Service</div>
          </div>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border border-white/10">
            <div className={`text-accent-orange font-bold text-xl sm:text-3xl ${isMobile ? 'mobile-hero-text' : ''}`}>2K+</div>
            <div className={`text-white text-xs sm:text-sm mt-1 ${isMobile ? 'mobile-hero-text' : ''}`}>Cars Detailed</div>
          </div>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border border-white/10">
            <div className={`text-accent-orange font-bold text-xl sm:text-3xl ${isMobile ? 'mobile-hero-text' : ''}`}>100%</div>
            <div className={`text-white text-xs sm:text-sm mt-1 ${isMobile ? 'mobile-hero-text' : ''}`}>Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
