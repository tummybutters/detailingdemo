import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";

interface ServiceFeature {
  text: string;
}

interface ServiceBonus {
  text: string;
  value?: string;
}

interface Service {
  id: number;
  title: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  duration: string;
  features: ServiceFeature[];
  bonuses: ServiceBonus[];
  bgColor: string;
}

// Based on the provided pricing sheet
const services: Service[] = [
  {
    id: 1,
    title: "Express Detail",
    originalPrice: "$160-$220",
    salePrice: "$125-175",
    discount: "20% OFF",
    duration: "2 Hour Job",
    features: [
      { text: "A comprehensive surface-level interior vacuum" },
      { text: "Exterior pressure wash pre-foam rinse and contact wash foam bath for a spotless finish" },
      { text: "Microfiber towel dry with full wax spray" }
    ],
    bonuses: [
      { text: "Key Fob Refurbishment/Cleaning", value: "$30 Value" },
      { text: "Dashboard and Infotainment Detail", value: "$15 Value" },
      { text: "Streak-free Window Detail", value: "$15 Value" }
    ],
    bgColor: "bg-gradient-to-br from-orange-primary to-orange-light"
  },
  {
    id: 2,
    title: "Interior Detail Deep Clean",
    originalPrice: "$190-$440",
    salePrice: "$150-350",
    discount: "20% OFF",
    duration: "2-4 Hour Job",
    features: [
      { text: "Deep surface vacuuming to remove dirt and debris from all areas of your car" },
      { text: "Your choice of carpet or leather conditioning to restore and protect interior surfaces" },
      { text: "Spot stain removal to eliminate unsightly blemishes and refresh your car's interior" }
    ],
    bonuses: [
      { text: "All previous bonuses", value: "$40 Value" },
      { text: "Trunk and spot cleaning", value: "$15 Value" },
      { text: "Air vent dusting and cleaning", value: "$10 Value" },
      { text: "Door jams and door panel detailing", value: "$15 Value" }
    ],
    bgColor: "bg-gradient-to-br from-orange-light to-orange-primary"
  },
  {
    id: 3,
    title: "Exterior Wash & Wax",
    originalPrice: "$250-$500",
    salePrice: "$200-400",
    discount: "20% OFF",
    duration: "2-4 Hour Job",
    features: [
      { text: "Machine buffer Ceramic Wax application to protect your paint for 6-12 months and leave a stunning mirror-shine finish" },
      { text: "Iron-embedded paint decontamination to ensure a smooth, clean surface before waxing" },
      { text: "Pre-contact wash foam treatment for thorough dirt removal and paint preparation" }
    ],
    bonuses: [
      { text: "Wheel and wheel barrel cleaning", value: "$20 value" },
      { text: "Tire cleaning and dressing", value: "$15 value" },
      { text: "Full Contact wash with microfiber towel", value: "$35 value" }
    ],
    bgColor: "bg-gradient-to-br from-red-primary to-orange-primary"
  },
  {
    id: 4,
    title: "Exterior Detail Polish & Wax",
    originalPrice: "$440-$560",
    salePrice: "$350-450",
    discount: "20% OFF",
    duration: "3-6 Hour Job",
    features: [
      { text: "Machine buffer Ceramic Wax: Protects your paint for 6-12 months and leaves a mirror-shine finish" },
      { text: "Machine buffer compound polish: Removes scratches and swirls, restoring your car's paint" },
      { text: "Iron-embedded paint decontamination" },
      { text: "Contact wash with microfiber towel dry: Ensures a streak-free, professional finish" }
    ],
    bonuses: [
      { text: "Includes ALL previous Express Detail & Exterior Wax Key Fob Refurbishment/Cleaning, Pre-contact wash foam treatment, wheels and wheel barrel cleaning, tire cleaning and dressing, door jams and door panel detailing", value: "$100 Value" }
    ],
    bgColor: "bg-gradient-to-br from-orange-primary to-red-primary"
  },
  {
    id: 5,
    title: "Luxury Full Detail: Interior & Exterior Perfection",
    originalPrice: "$690-$1060",
    salePrice: "$550-850",
    discount: "20% OFF",
    duration: "4-8 Hour Job",
    features: [
      { text: "Machine buffer Ceramic Wax to protect your paint for 6-12 months and leave a mirror-shine finish" },
      { text: "Deep surface vacuuming to remove dirt and debris" },
      { text: "Carpet or leather conditioning to restore and protect your surfaces" },
      { text: "Spot stain removal for a refreshed and flawless interior" },
      { text: "Dashboard and infotainment detailing" },
      { text: "Door jams and panels deep clean" },
      { text: "Entire Machine buffer compound polish" }
    ],
    bonuses: [
      { text: "Includes ALL previous bonuses: iron-embedded paint decontamination, pre-contact wash foam treatment, wheels and wheel barrel cleaning, tire cleaning and dressing, contact wash with microfiber towel dry, air vent cleaning, and trunk cleaning with spot removal", value: "$150 Value" }
    ],
    bgColor: "bg-gradient-to-br from-red-primary to-orange-primary"
  }
];

export default function ServiceList() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  return (
    <div className="bg-cream py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-4">Our Premium Mobile Detailing Services</h2>
          <p className="text-gray-700 max-w-xl mx-auto">
            We bring the full professional detailing experience right to your door, with packages designed for every need and vehicle type.
          </p>
          <div className="flex justify-center mt-4">
            <div className="text-xs text-gray-700 bg-white/70 px-3 py-1 rounded-full">
              Pricing varies by overall condition and vehicle type (Sedan/Coupe vs. Truck/SUV)
            </div>
          </div>
        </div>
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform ${
                hoveredService === service.id ? 'scale-102 -translate-y-1' : ''
              }`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Card Background with Gradient */}
              <div className={`${service.bgColor} p-6 pb-4`}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                  <div className="flex items-center text-gray-600 space-x-2 text-sm">
                    <span className="line-through">{service.originalPrice}</span>
                    <span className="font-medium text-red-600 bg-white/30 px-2 py-0.5 rounded-full">{service.discount}</span>
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {service.salePrice}
                  </div>
                </div>
                
                <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-md text-center text-xs font-medium text-gray-600 mb-4">
                  {service.duration}
                </div>
                
                <Link href="/booking">
                  <Service3DButton className="w-full">
                    Book Now
                  </Service3DButton>
                </Link>
              </div>
              
              {/* Service Features */}
              <div className="bg-white p-6">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Bonuses Section */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="font-bold text-gray-900 mb-2">FREE BONUS</div>
                  <ul className="space-y-2">
                    {service.bonuses.map((bonus, index) => (
                      <li key={index} className="flex justify-between items-center text-xs text-gray-600">
                        <span>{bonus.text}</span>
                        {bonus.value && <span className="text-primary font-semibold">{bonus.value}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Highlight Border on Hover */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none transition-all duration-300 ${
                hoveredService === service.id ? 'border-primary' : ''
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-r from-orange-light to-orange-primary/30 text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Ready for the Ultimate Car Care Experience?</h3>
          <p className="text-gray-700 mb-6">
            Remember, all our services come to your location—no need to disrupt your day. Our satisfaction guarantee ensures your car will look its best or your service is free.
          </p>
          <Link href="/booking">
            <Service3DButton className="px-8">
              Book Your Mobile Detail Now <ArrowRight className="ml-2 h-4 w-4" />
            </Service3DButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
