import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Signature Exterior Detail",
    description: "From gentle hand wash to wheel revival and paint decontamination—restoring your vehicle's exterior to a showroom-worthy finish.",
    image: "https://images.unsplash.com/photo-1600045308376-95a23e318ae0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80"
  },
  {
    id: 2,
    title: "Premium Interior Revival",
    description: "Every surface meticulously cleaned and conditioned—from leather treatment to odor elimination—making your car's interior feel new again.",
    image: "https://images.unsplash.com/photo-1597766325363-aee4629e0629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80"
  },
  {
    id: 3,
    title: "Ultimate Protection Package",
    description: "Professional ceramic coating application providing up to 5 years of protection against environmental damage while enhancing your paint's depth and gloss.",
    image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80"
  }
];

export default function FeaturedServices() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Premium Services, Delivered at Your Door</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every service includes our signature mobile setup—bringing the full detailing shop experience directly to your location.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="bg-gray-50 overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href="/services" 
                  className="text-primary font-medium hover:text-red-600 transition-colors inline-flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/services">Explore Our Full Service Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
