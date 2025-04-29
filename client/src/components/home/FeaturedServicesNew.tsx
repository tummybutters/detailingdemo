import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import expressImage from "@assets/express.jpg";
import extImage from "@assets/ext.jpg";
import luxImage from "@assets/lux.jpg";

const services = [
  {
    id: 1,
    title: "Express Detail",
    description: "From gentle hand wash to wheel cleaning—restoring your vehicle's exterior to a showroom-worthy finish.",
    image: expressImage,
    link: "/services",
  },
  {
    id: 2,
    title: "Exterior Wash & Wax",
    description: "Professional ceramic coating application providing up to 5 years of protection while enhancing your paint's depth and mirror finish.",
    image: extImage,
    link: "/services",
  },
  {
    id: 3,
    title: "Luxury Full Detail",
    description: "Professional machine buffing and ceramic coating providing years of protection while enhancing your paint's depth and perfect mirror finish.",
    image: luxImage,
    link: "/services",
  },
];

export default function FeaturedServicesNew() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return (
    <div className="bg-[#F3F4E6] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Premium Services, Delivered at Your Door</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every service includes our signature mobile setup—bringing the full detailing shop experience directly to your location.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              href={service.link} 
              key={service.id}
              className="relative group overflow-hidden rounded-lg cursor-pointer h-full flex"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Elegant Card with smooth transition effect */}
              <div 
                className="relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out flex flex-col w-full h-full"
                style={{
                  boxShadow: hoveredCard === service.id 
                    ? '0 20px 30px -10px rgba(238, 67, 44, 0.3), 0 0 0 2px rgba(238, 67, 44, 0.7)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transform: hoveredCard === service.id ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                {/* Glow effect around the card */}
                <div 
                  className="absolute inset-0 rounded-lg transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 179, 117, 0.7) 0%, rgba(238, 67, 44, 0.5) 100%)',
                    opacity: hoveredCard === service.id ? 0.8 : 0,
                    filter: 'blur(15px)',
                    transform: 'scale(1.05)',
                    zIndex: -1
                  }}
                ></div>
                
                {/* Service Image */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: hoveredCard === service.id ? 'scale(1.08)' : 'scale(1)'
                    }}
                  />
                  
                  {/* Gradient overlay on image */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500"
                    style={{
                      opacity: hoveredCard === service.id ? 0.7 : 0
                    }}
                  ></div>
                </div>
                
                {/* Content */}
                <div className="p-6 bg-white relative flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 h-[56px] flex items-center"
                      style={{
                        color: hoveredCard === service.id ? '#EE432C' : ''
                      }}
                  >{service.title}</h3>
                  
                  <p className="text-gray-700 mb-4 text-sm flex-grow min-h-[80px]">{service.description}</p>
                  
                  <div className="inline-flex items-center text-sm font-medium transition-all duration-300 mt-auto"
                       style={{
                         color: hoveredCard === service.id ? '#EE432C' : '#777'
                       }}
                  >
                    Learn More <ArrowRight 
                                 className="ml-1 h-4 w-4 transition-transform duration-300"
                                 style={{
                                   transform: hoveredCard === service.id ? 'translateX(5px)' : ''
                                 }}
                               />
                  </div>

                  {/* Animated border overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 ease-out"
                    style={{
                      background: 'linear-gradient(to right, #FFB375, #EE432C)',
                      transform: hoveredCard === service.id ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left'
                    }}
                  ></div>
                </div>
                
                {/* Border effects */}
                {/* Top border */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFB375] to-[#EE432C] transform origin-left transition-transform duration-500 ease-out"
                  style={{
                    transform: hoveredCard === service.id ? 'scaleX(1)' : 'scaleX(0)'
                  }}
                ></div>
                
                {/* Right border */}
                <div 
                  className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EE432C] to-[#FFB375] transform origin-top transition-transform duration-500 ease-out"
                  style={{
                    transform: hoveredCard === service.id ? 'scaleY(1)' : 'scaleY(0)',
                    transitionDelay: hoveredCard === service.id ? '0.1s' : '0s'
                  }}
                ></div>
                
                {/* Bottom border */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE432C] to-[#FFB375] transform origin-right transition-transform duration-500 ease-out"
                  style={{
                    transform: hoveredCard === service.id ? 'scaleX(1)' : 'scaleX(0)',
                    transitionDelay: hoveredCard === service.id ? '0.2s' : '0s'
                  }}
                ></div>
                
                {/* Left border */}
                <div 
                  className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFB375] to-[#EE432C] transform origin-bottom transition-transform duration-500 ease-out"
                  style={{
                    transform: hoveredCard === service.id ? 'scaleY(1)' : 'scaleY(0)',
                    transitionDelay: hoveredCard === service.id ? '0.3s' : '0s'
                  }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <button className="bg-[#EE432C] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}