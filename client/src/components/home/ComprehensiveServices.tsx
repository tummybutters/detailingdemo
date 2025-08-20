import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
// Import the new images
import interiorImage from "@assets/interior detailing.jpg";
import interiorImage2 from "@assets/interior detailing 2.jpg";
import exteriorImage from "@assets/exterior detail.jpg";
import fullHandWashImage from "@assets/full hand wash detail.jpg";
import paintCorrectionImage from "@assets/Paint correction.jpg";
import ceramicCoatingImage from "@assets/ceramic coating.webp";

// Expanded service array with 6 services
const services = [
  // Top row - Main services
  {
    id: 1,
    title: "FULL INTERIOR DETAIL",
    description: "Deep cleaning for a fresh, spotless interior, including stain and odor removal.",
    image: interiorImage,
    link: "/booking",
    primary: true,
    imagePosition: "top",
  },
  {
    id: 2,
    title: "FULL EXTERIOR DETAIL",
    description: "A thorough washing and waxing for a clean, protected exterior.",
    image: exteriorImage,
    link: "/booking",
    primary: true,
  },
  {
    id: 3,
    title: "FULL DETAIL",
    description: "Complete care for both the interior and exterior of your vehicle.",
    image: fullHandWashImage,
    link: "/booking",
    primary: true,
  },
  // Bottom row - Additional services
  {
    id: 4,
    title: "PAINT CORRECTION",
    description: "Restore your car's shine by removing scratches, swirl marks, and imperfections for a flawless finish.",
    image: paintCorrectionImage,
    link: "/booking",
    primary: false,
  },
  {
    id: 5,
    title: "CERAMIC COATING",
    description: "8 year protection for your car's paint, providing a glossy finish and shielding against dirt, sun, and water.",
    image: ceramicCoatingImage,
    link: "/booking",
    primary: false,
  },
  {
    id: 6,
    title: "MAINTENANCE DETAILS",
    description: "Keep your car looking its best with routine cleaning and care for both the interior and exterior.",
    image: interiorImage2,
    link: "/booking",
    primary: false,
    imagePosition: "top",
  },
];

export default function ComprehensiveServices() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return (
    <div className="bg-[#F3F4E6] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">SEE ALL COMPREHENSIVE MOBILE DETAILING PACKAGES</h2>
        </div>
        
        {/* Top row - Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {services.slice(0, 3).map((service) => (
            <Link 
              href={service.link} 
              key={service.id}
              className="relative group overflow-hidden rounded-lg cursor-pointer h-full flex"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className="relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out flex flex-col w-full h-full"
                style={{
                  boxShadow: hoveredCard === service.id 
                    ? '0 20px 30px -10px rgba(238, 67, 44, 0.3), 0 0 0 2px rgba(238, 67, 44, 0.7)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transform: hoveredCard === service.id ? 'translateY(-5px)' : 'translateY(0)',
                  border: '2px solid #000',
                }}
              >
                {/* Service Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: hoveredCard === service.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 bg-[#FFB375] relative flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black mb-3 transition-colors duration-300"
                      style={{
                        color: hoveredCard === service.id ? '#000' : '#000',
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                      }}
                  >{service.title}</h3>
                  
                  <p className="text-black mb-4 text-sm flex-grow min-h-[60px] text-center">{service.description}</p>
                  
                  <div className="inline-flex items-center text-sm font-bold mx-auto text-center border-t border-black pt-2 w-full justify-center"
                       style={{
                         color: '#000'
                       }}
                  >
                    - LEARN MORE -
                  </div>

                  {/* Border effect always visible */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* "OUR OTHER SERVICES" heading */}
        <div className="flex justify-between items-center mb-8 mt-12">
          <div className="w-1/3 h-px bg-gray-300"></div>
          <h3 className="text-2xl font-bold text-center px-4">OUR OTHER SERVICES:</h3>
          <div className="w-1/3 h-px bg-gray-300"></div>
        </div>
        
        {/* Bottom row - Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(3, 6).map((service) => (
            <Link 
              href={service.link} 
              key={service.id}
              className="relative group overflow-hidden rounded-lg cursor-pointer h-full flex"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className="relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out flex flex-col w-full h-full"
                style={{
                  boxShadow: hoveredCard === service.id 
                    ? '0 20px 30px -10px rgba(238, 67, 44, 0.3), 0 0 0 2px rgba(238, 67, 44, 0.7)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transform: hoveredCard === service.id ? 'translateY(-5px)' : 'translateY(0)',
                  border: '2px solid #000',
                }}
              >
                {/* Service Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: hoveredCard === service.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 bg-[#222] relative flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300"
                      style={{
                        color: hoveredCard === service.id ? '#FFB375' : '#fff',
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                      }}
                  >{service.title}</h3>
                  
                  <p className="text-white mb-4 text-sm flex-grow min-h-[60px] text-center">{service.description}</p>
                  
                  <div className="inline-flex items-center text-sm font-bold mx-auto text-center border-t border-white pt-2 w-full justify-center"
                       style={{
                         color: '#fff'
                       }}
                  >
                    - LEARN MORE -
                  </div>

                  {/* Border effect always visible */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <button className="bg-[#EE432C] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-black">
              VIEW ALL SERVICES <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}