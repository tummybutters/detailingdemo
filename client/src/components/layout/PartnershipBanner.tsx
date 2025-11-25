import { useLocation } from "wouter";
import { GraduationCap } from "lucide-react";

export default function PartnershipBanner() {
  const [location] = useLocation();
  
  // Only show on Sacramento page (home page)
  if (location !== "/") return null;

  return (
    <div
      id="partnership-banner"
      className="bg-gradient-to-r from-[#EE432C] to-[#FFB375] border-b-2 border-black relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-white">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-white" />
            <span className="font-semibold text-sm sm:text-base">
              Partnered with UC Davis Alumni Small Business Network
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
