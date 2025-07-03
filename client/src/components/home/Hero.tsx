import { Link } from "wouter";
import { HeroButton } from "@/components/ui/hero-button";
import hardyLogoPath from "@assets/hardy logo-Photoroom.png";
import carSunsetBg from "@assets/ChatGPT Image Mar 31, 2025, 05_35_46 PM.png";
import mobileHeroBg from "@assets/mobile hero image.png";
import { useIsMobile } from "@/hooks/use-mobile";
import CallOption from "./CallOption";

interface HeroProps {
  location?: "davis" | "orange-county";
}

export default function Hero({ location = "davis" }: HeroProps) {
  const isMobile = useIsMobile();
  
  // Location-specific content
  const locationContent = {
    davis: {
      title: "Mobile Car Detailing Davis, CA",
      subtitle: "Providing Interior Detailing, Exterior Detailing, Paint Correction, Ceramic Coating, and more!",
      description: "Serving Davis, Woodland, Dixon, Winters, Sacramento, and more surrounding areas — all delivered with precision, care, and professional-grade results."
    },
    "orange-county": {
      title: "Mobile Car Detailing Orange County, CA",
      subtitle: "Providing Interior Detailing, Exterior Detailing, Paint Correction, Ceramic Coating, and more!",
      description: "Serving Irvine, Tustin, Newport Beach, Huntington Beach, San Clemente, Costa Mesa, and surrounding Orange County areas — all delivered with precision, care, and professional-grade results."
    }
  };
  
  const content = locationContent[location];
  
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
        {/* Main headline - optimized for mobile and SEO */}
        <h1 className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight text-left mb-6 sm:mb-10 max-w-5xl ${isMobile ? 'mobile-hero-text' : ''}`}>{content.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center min-h-[calc(70vh-12rem)] lg:min-h-[calc(80vh-12rem)]">
          {/* Left side content */}
          <div className="flex flex-col justify-center max-w-4xl">
            <h2 className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading leading-normal w-full lg:w-[130%] ${isMobile ? 'mobile-hero-text' : ''}`}>
              {content.subtitle}
            </h2>
            
            <p className={`text-gray-100 text-lg sm:text-xl mt-4 sm:mt-6 mb-6 font-medium ${isMobile ? 'mobile-hero-text' : ''}`}>
              {content.description}
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
          
          {/* Right side with booking iframe and call options */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'}`}>
              <div className="bg-white/95 backdrop-blur rounded-lg shadow-[5px_5px_0_0_#000] border-2 border-black overflow-hidden neo-brutalist-card">
                {/* Header with booking title */}
                <div className="py-3 px-4 bg-gradient-to-r from-[#EE432C] to-[#FFB375] text-white border-b-2 border-black">
                  <div>
                    <h3 className="text-lg font-bold">Book Your Detail</h3>
                    <p className="text-xs text-white/90">We'll call to confirm once booked</p>
                  </div>
                </div>
                
                {/* Booking widget iframe */}
                <iframe 
                  src="https://hardyswashnwax.fieldd.co" 
                  style={{
                    width: "100%", 
                    height: isMobile ? "370px" : "400px",
                    border: "none",
                    overflow: "hidden"
                  }}
                  title="Hardys Wash N' Wax Quick Booking"
                  loading="lazy"
                ></iframe>
                
                {/* Call option banner below iframe for better visibility */}
                <div className="py-3 px-4 bg-[#FFD7B5] flex justify-between items-center border-t-2 border-black">
                  <div className="text-black">
                    <p className="font-medium text-sm">Have questions?</p>
                    <p className="text-xs text-gray-700 hidden sm:block">Our team is ready to assist you</p>
                  </div>
                  <CallOption 
                    phone="19497340201" 
                    text="" 
                    className="ml-4"
                  />
                </div>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-3 flex justify-center items-center gap-3 text-white text-xs">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#FFB375]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
                  </svg>
                  <span>60-second booking</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#FFB375]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.823 3.832 7.177-7.177-1.06-1.06-7.117 7.114z"/>
                  </svg>
                  <span>Instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section - simplified for mobile */}
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 ${isMobile ? 'max-w-full' : 'max-w-3xl'} mx-auto`}>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border-2 border-black overflow-hidden relative">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className={`relative z-10 text-[#FFB375] font-bold text-xl sm:text-3xl ${isMobile ? 'mobile-hero-text' : ''}`}>5★</div>
            <div className={`relative z-10 text-white text-xs sm:text-sm mt-1 ${isMobile ? 'mobile-hero-text' : ''}`}>Rated Service</div>
          </div>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border-2 border-black overflow-hidden relative">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className={`relative z-10 text-[#FFB375] font-bold text-xl sm:text-3xl ${isMobile ? 'mobile-hero-text' : ''}`}>2K+</div>
            <div className={`relative z-10 text-white text-xs sm:text-sm mt-1 ${isMobile ? 'mobile-hero-text' : ''}`}>Cars Detailed</div>
          </div>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border-2 border-black overflow-hidden relative">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className={`relative z-10 text-[#FFB375] font-bold text-xl sm:text-3xl ${isMobile ? 'mobile-hero-text' : ''}`}>100%</div>
            <div className={`relative z-10 text-white text-xs sm:text-sm mt-1 ${isMobile ? 'mobile-hero-text' : ''}`}>Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
