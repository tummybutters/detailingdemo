import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-secondary h-[90vh] md:h-[80vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1553545985-1e0d8781d5db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80" 
        alt="Luxury car detailing" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/50"></div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="lg:max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
            Luxury Where It Matters Most: Your Home on the Road
          </h1>
          <div className="bg-primary text-white inline-block px-2 py-1 mb-6 rounded">
            <span className="text-lg font-semibold">Detailed Right at Your Door</span>
          </div>
          <p className="text-gray-100/90 text-xl mb-4 italic">
            "You Spend Hundreds of Hours in Your Car Every Year—Let Us Spend Two Making It Perfect"
          </p>
          <p className="text-gray-100/90 text-lg mb-8">
            From daily commutes to unforgettable road trips, your car plays a central role in your life. Let us ensure it always feels like a place you love to be.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/booking">🚗 Book Your Luxury Detail Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border-transparent">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
        
        <div className="hidden md:block absolute bottom-8 right-8 lg:right-16 bg-white/95 backdrop-blur rounded-lg shadow-xl p-6 max-w-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Gain</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Sparkles className="text-primary mr-3 mt-1 h-5 w-5" />
              <div>
                <span className="font-semibold">Every Detail, Mastered</span>
                <p className="text-sm text-gray-600">We bring an obsessive focus to every inch of your car—so it feels brand-new, inside and out.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="text-primary mr-3 mt-1 h-5 w-5" />
              <div>
                <span className="font-semibold">Convenience Without Compromise</span>
                <p className="text-sm text-gray-600">We come to you, delivering top-tier results at your doorstep while you go about your day.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="text-primary mr-3 mt-1 h-5 w-5" />
              <div>
                <span className="font-semibold">Protect Your Car, Elevate Its Value</span>
                <p className="text-sm text-gray-600">Our services are designed to safeguard your car's longevity and keep it looking pristine for years to come.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
