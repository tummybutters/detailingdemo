import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import ServiceProcess from "@/components/services/ServiceProcess";
import FAQs from "@/components/services/FAQs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Mobile Car Detailing Services in Davis, Woodland & Yolo County | Hardys Wash N' Wax</title>
        <meta name="description" content="Comprehensive mobile car detailing services in Davis, Woodland, and throughout Yolo County. Premium express detail, interior cleaning, exterior wash & wax, ceramic coating, and paint correction at your location." />
        <meta name="keywords" content="Car Detailing Services Davis CA, Mobile Car Wash Woodland CA, Auto Detail Packages UC Davis, Ceramic Coating Yolo County, Express Detail Near Me" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services" />
        
        {/* Structured Data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Mobile Car Detailing Services",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "image": "https://hardyswashnwax.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Davis",
                "addressRegion": "CA",
                "postalCode": "95616",
                "addressCountry": "US"
              },
              "telephone": "+19497340201"
            },
            "areaServed": [
              { "@type": "City", "name": "Davis, CA" },
              { "@type": "City", "name": "Woodland, CA" },
              { "@type": "City", "name": "Dixon, CA" },
              { "@type": "City", "name": "Winters, CA" },
              { "@type": "City", "name": "West Sacramento, CA" }
            ],
            "serviceType": "Mobile Car Detailing",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "99",
              "highPrice": "499",
              "priceCurrency": "USD",
              "offerCount": "5"
            }
          })}
        </script>
      </Helmet>
      
      <ServicesHero />
      <ServiceList />
      
      {/* Specialized Services Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-4">Specialized Detailing Services</h2>
            <p className="text-gray-700 max-w-xl mx-auto">
              Discover our specialized services tailored to address specific needs for your vehicle's appearance and protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#FFD7B5]/30 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interior Detailing</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive interior cleaning, stain removal, and protection to refresh your vehicle's cabin and restore that new car feel.
              </p>
            </div>
            
            <div className="bg-[#FFD7B5]/30 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exterior Detailing</h3>
              <p className="text-gray-700 mb-4">
                Professional washing, waxing, and exterior protection to restore your vehicle's showroom shine and preserve its finish.
              </p>
            </div>
            
            <div className="bg-[#FFD7B5]/30 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ceramic Coating</h3>
              <p className="text-gray-700 mb-4">
                Long-lasting paint protection with our professional ceramic coating services for superior gloss and durability.
              </p>
            </div>
            
            <div className="bg-[#FFD7B5]/30 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paint Correction</h3>
              <p className="text-gray-700 mb-4">
                Remove scratches, swirl marks, and imperfections to restore your vehicle's paint to a perfect, mirror-like finish.
              </p>
            </div>
          </div>
        </div>
      </div>
      
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
