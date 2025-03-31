import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import ServiceProcess from "@/components/services/ServiceProcess";
import FAQs from "@/components/services/FAQs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServiceList />
      <ServiceProcess />
      <FAQs />
      
      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready to schedule your service?</h2>
              <p className="text-gray-100/90 text-lg">Choose the perfect package for your vehicle and book your appointment today.</p>
            </div>
            <div>
              <Button asChild variant="secondary" size="lg">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
