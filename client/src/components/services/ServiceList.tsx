import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type ServiceCategory = "all" | "exterior" | "interior" | "protection" | "packages";

interface Service {
  id: number;
  title: string;
  price: string;
  duration: string;
  description: string;
  category: ServiceCategory;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Exterior Wash & Wax",
    price: "$89",
    duration: "60-90 min",
    description: "Complete exterior cleaning including wheels and tires, followed by a hand-applied premium wax for lasting protection and shine.",
    category: "exterior",
    image: "https://images.unsplash.com/photo-1635260409814-a2efd3855664?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 2,
    title: "Interior Deep Clean",
    price: "$129",
    duration: "2-3 hours",
    description: "Thorough interior cleaning including steam cleaning of upholstery, conditioning of leather surfaces, and detailed cleaning of all interior components.",
    category: "interior",
    image: "https://images.unsplash.com/photo-1510903117036-f2c66bbcbae2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 3,
    title: "Ceramic Coating",
    price: "$599+",
    duration: "Full Day",
    description: "Professional-grade ceramic coating application for long-lasting protection against environmental contaminants with 2-5 year durability.",
    category: "protection",
    image: "https://images.unsplash.com/photo-1570198588544-7ca0b4b5c383?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 4,
    title: "Paint Correction",
    price: "$349+",
    duration: "4-8 hours",
    description: "Multi-step paint correction process to remove swirls, scratches, and oxidation, restoring your vehicle's paint to a mirror-like finish.",
    category: "exterior",
    image: "https://images.unsplash.com/photo-1606048598544-d0d31f2f159a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 5,
    title: "Complete Detail Package",
    price: "$249",
    duration: "4-5 hours",
    description: "Our most popular service combining exterior wash, wax, interior deep clean, and tire/trim treatment for a comprehensive refresh.",
    category: "packages",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 6,
    title: "Leather Conditioning",
    price: "$79",
    duration: "1-2 hours",
    description: "Specialized cleaning and conditioning treatment for all leather surfaces to prevent cracking and restore supple texture.",
    category: "interior",
    image: "https://images.unsplash.com/photo-1592853625597-7d17be820d0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
  }
];

const categories = [
  { id: "all", label: "All Services" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "protection", label: "Protection" },
  { id: "packages", label: "Packages" }
];

export default function ServiceList() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  
  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category === activeCategory);
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`px-5 py-2 rounded-full ${
                activeCategory === category.id 
                  ? "bg-primary text-white" 
                  : "bg-gray-50 text-gray-800"
              }`}
              onClick={() => setActiveCategory(category.id as ServiceCategory)}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredServices.map(service => (
            <div 
              key={service.id} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row"
            >
              <div className="md:w-2/5">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold font-heading text-gray-900">{service.title}</h3>
                  <span className="text-primary font-bold">{service.price}</span>
                </div>
                <div className="mt-1 mb-4">
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-2">
                    {categories.find(c => c.id === service.category)?.label}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href="/booking" 
                  className="text-primary font-medium hover:text-red-600 transition-colors inline-flex items-center mt-auto"
                >
                  Book This Service <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/booking">Schedule Your Service</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
