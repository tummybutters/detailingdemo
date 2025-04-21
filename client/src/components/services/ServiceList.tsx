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

// Based on the updated pricing sheet
const services: Service[] = [
  {
    id: 1,
    title: "Express Detail",
    originalPrice: "$149-$199",
    salePrice: "$149-$199",
    discount: "",
    duration: "1.5-2.5 Hours",
    features: [
      { text: "Interior blowout" },
      { text: "Vacuuming surface level, seats, etc" },
      { text: "Clean dashboard, infotainment, all plastics, foot wells, pedals, doors, etc." },
      { text: "Windows streak free" },
      { text: "Leather conditioner" },
      { text: "All purpose cleaner pre soak" },
      { text: "Wheel and tire cleaning" },
      { text: "Foam and contact wash" },
      { text: "Towel dry" },
      { text: "Tire dressing" }
    ],
    bonuses: [
      { text: "Optional: Spray wax", value: "$49-89" },
      { text: "Optional: Clay bar decontamination", value: "$49-89" },
      { text: "Optional: Headlight restoration", value: "$49-89" },
      { text: "Optional: Plastic trim restore", value: "$49-89" }
    ],
    bgColor: "bg-[#FFAA75]"
  },
  {
    id: 2,
    title: "Interior Deep Detail",
    originalPrice: "$199-$349",
    salePrice: "$199-$349",
    discount: "",
    duration: "3-4 Hours",
    features: [
      { text: "Interior blowout" },
      { text: "Vacuuming surface level, seats, etc" },
      { text: "Clean dashboard, infotainment, all plastics, foot wells, pedals, doors, etc." },
      { text: "Leather conditioner" },
      { text: "Carpet shampoo" },
      { text: "Stain removal, seats, carpets, etc" },
      { text: "Interior dressing" },
      { text: "Headliner cleaning" }
    ],
    bonuses: [
      { text: "Sedan/Coupe", value: "$199-$229" },
      { text: "SUV/Truck", value: "$229-$279" },
      { text: "Suburban/Large Truck/Mini Van", value: "$279-$349" }
    ],
    bgColor: "bg-[#FFAA75]"
  },
  {
    id: 3,
    title: "Exterior Wash & Wax",
    originalPrice: "$249-$399",
    salePrice: "$249-$399",
    discount: "",
    duration: "3-4.5 Hours",
    features: [
      { text: "Iron Decon/All purpose cleaner pre soak" },
      { text: "Wheel and tire cleaning" },
      { text: "Foam and contact wash" },
      { text: "Clay bar decontamination" },
      { text: "Towel dry" },
      { text: "Machine Polisher Ceramic Wax (2-3 years protection) OR Ceramic Spray Wax (3-6 months protection at ½ price)" },
      { text: "Tire dressing" }
    ],
    bonuses: [
      { text: "Sedan/Coupe", value: "$249-$299" },
      { text: "SUV/Truck", value: "$299-$349" },
      { text: "Suburban/Mini Van/Large Truck", value: "$349-$399" },
      { text: "Optional: Polishing (Paint Correction)", value: "$150" }
    ],
    bgColor: "bg-[#FFAA75]"
  },
  {
    id: 4,
    title: "Luxury Detail: Interior & Exterior Perfection",
    originalPrice: "$549-$849",
    salePrice: "$549-$849",
    discount: "",
    duration: "4-6 Hours",
    features: [
      { text: "Interior blowout" },
      { text: "Vacuuming surface level, seats, etc" },
      { text: "Clean dashboard, infotainment, all plastics, foot wells, pedals, etc" },
      { text: "Leather conditioner" },
      { text: "Carpet shampoo" },
      { text: "Stain removal, seats, carpets, etc" },
      { text: "Iron Decon/All purpose cleaner pre soak" },
      { text: "Wheel and tire cleaning" },
      { text: "Foam and contact wash" },
      { text: "Clay bar decontamination" },
      { text: "Towel dry" },
      { text: "Machine Polisher Ceramic Wax or Ceramic Spray Wax" }
    ],
    bonuses: [
      { text: "Sedan/Coupe", value: "$549-$649" },
      { text: "SUV/Truck", value: "$649-$749" },
      { text: "Suburban/Mini Van/Large Truck", value: "$749-$849" }
    ],
    bgColor: "bg-[#FFAA75]"
  },
  {
    id: 5,
    title: "7-10 Year Protection Ceramic Coat",
    originalPrice: "$549-$849",
    salePrice: "$549-$849",
    discount: "",
    duration: "5-8 Hours",
    features: [
      { text: "Iron Decon/All purpose cleaner pre soak" },
      { text: "Wheel and tire cleaning" },
      { text: "Foam and contact wash" },
      { text: "Clay bar decontamination" },
      { text: "Towel dry" },
      { text: "Polish paint correction to remove swirls/scratches" },
      { text: "Ceramic 7-10 year protection application with foam pad" }
    ],
    bonuses: [
      { text: "Sedan/Coupe", value: "$549-$649" },
      { text: "SUV/Truck", value: "$649-$749" },
      { text: "Suburban/Mini Van/Large Truck", value: "$749-$849" },
      { text: "Optional: Carpet conditioning", value: "$100" },
      { text: "Optional: Leather Conditioning", value: "$50" }
    ],
    bgColor: "bg-[#FFAA75]"
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
        
        {/* Service Cards Grid with equal height rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* First Row: Cards 1-3 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg flex flex-col">
            {/* Card Header */}
            <div className={`${services[0].bgColor} p-5 text-center`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{services[0].title}</h3>
              <div className="text-3xl font-black mb-4">
                {services[0].salePrice}
              </div>
              <div className="bg-white/40 px-4 py-2 rounded-md text-center text-xs font-bold text-gray-700 mb-4">
                {services[0].duration}
              </div>
              <Link href="/booking">
                <Service3DButton className="w-full">
                  BOOK NOW
                </Service3DButton>
              </Link>
            </div>
            
            {/* Card Body */}
            <div className="bg-white p-5 flex flex-col flex-grow" style={{minHeight: "400px"}}>
              <div>
                <ul className="space-y-3">
                  {services[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="font-bold text-xl text-gray-900 mb-2">OPTIONAL ADD-ONS</div>
                <ul className="space-y-3">
                  {services[0].bonuses.map((bonus, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                      <span>{bonus.text}</span>
                      {bonus.value && <span className="text-red-600 font-bold">{bonus.value}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-lg flex flex-col">
            {/* Card Header */}
            <div className={`${services[1].bgColor} p-5 text-center`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{services[1].title}</h3>
              <div className="text-3xl font-black mb-4">
                {services[1].salePrice}
              </div>
              <div className="bg-white/40 px-4 py-2 rounded-md text-center text-xs font-bold text-gray-700 mb-4">
                {services[1].duration}
              </div>
              <Link href="/booking">
                <Service3DButton className="w-full">
                  BOOK NOW
                </Service3DButton>
              </Link>
            </div>
            
            {/* Card Body */}
            <div className="bg-white p-5 flex flex-col flex-grow" style={{minHeight: "400px"}}>
              <div>
                <ul className="space-y-3">
                  {services[1].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="font-bold text-xl text-gray-900 mb-2">PRICING BY VEHICLE</div>
                <ul className="space-y-3">
                  {services[1].bonuses.map((bonus, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                      <span>{bonus.text}</span>
                      {bonus.value && <span className="text-red-600 font-bold">{bonus.value}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-lg flex flex-col">
            {/* Card Header */}
            <div className={`${services[2].bgColor} p-5 text-center`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{services[2].title}</h3>
              <div className="text-3xl font-black mb-4">
                {services[2].salePrice}
              </div>
              <div className="bg-white/40 px-4 py-2 rounded-md text-center text-xs font-bold text-gray-700 mb-4">
                {services[2].duration}
              </div>
              <Link href="/booking">
                <Service3DButton className="w-full">
                  BOOK NOW
                </Service3DButton>
              </Link>
            </div>
            
            {/* Card Body */}
            <div className="bg-white p-5 flex flex-col flex-grow" style={{minHeight: "400px"}}>
              <div>
                <ul className="space-y-3">
                  {services[2].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="font-bold text-xl text-gray-900 mb-2">PRICING BY VEHICLE</div>
                <ul className="space-y-3">
                  {services[2].bonuses.map((bonus, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                      <span>{bonus.text}</span>
                      {bonus.value && <span className="text-red-600 font-bold">{bonus.value}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Second Row: Cards 4-5 */}
          <div className="relative overflow-hidden rounded-lg shadow-lg flex flex-col">
            {/* Card Header */}
            <div className={`${services[3].bgColor} p-5 text-center`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{services[3].title}</h3>
              <div className="text-3xl font-black mb-4">
                {services[3].salePrice}
              </div>
              <div className="bg-white/40 px-4 py-2 rounded-md text-center text-xs font-bold text-gray-700 mb-4">
                {services[3].duration}
              </div>
              <Link href="/booking">
                <Service3DButton className="w-full">
                  BOOK NOW
                </Service3DButton>
              </Link>
            </div>
            
            {/* Card Body */}
            <div className="bg-white p-5 flex flex-col flex-grow" style={{minHeight: "450px"}}>
              <div>
                <ul className="space-y-3">
                  {services[3].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="font-bold text-xl text-gray-900 mb-2">PRICING BY VEHICLE</div>
                <ul className="space-y-3">
                  {services[3].bonuses.map((bonus, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                      <span>{bonus.text}</span>
                      {bonus.value && <span className="text-red-600 font-bold">{bonus.value}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-lg flex flex-col">
            {/* Card Header */}
            <div className={`${services[4].bgColor} p-5 text-center`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{services[4].title}</h3>
              <div className="text-3xl font-black mb-4">
                {services[4].salePrice}
              </div>
              <div className="bg-white/40 px-4 py-2 rounded-md text-center text-xs font-bold text-gray-700 mb-4">
                {services[4].duration}
              </div>
              <Link href="/booking">
                <Service3DButton className="w-full">
                  BOOK NOW
                </Service3DButton>
              </Link>
            </div>
            
            {/* Card Body */}
            <div className="bg-white p-5 flex flex-col flex-grow" style={{minHeight: "450px"}}>
              <div>
                <ul className="space-y-3">
                  {services[4].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="font-bold text-xl text-gray-900 mb-2">PRICING & ADD-ONS</div>
                <ul className="space-y-3">
                  {services[4].bonuses.map((bonus, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                      <span>{bonus.text}</span>
                      {bonus.value && <span className="text-red-600 font-bold">{bonus.value}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Empty div to maintain grid alignment with 5 items */}
          <div className="hidden lg:block"></div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-2xl mx-auto p-8 rounded-xl bg-[#FFAA75] text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Ready for the Ultimate Car Care Experience?</h3>
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
