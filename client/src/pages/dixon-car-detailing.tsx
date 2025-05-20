import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { MapPin, Car, Star, Clock, CheckCircle } from 'lucide-react';

export default function DixonCarDetailing() {
  return (
    <>
      <Helmet>
        <title>Mobile Car Detailing Services in Dixon, CA | Hardys Wash N' Wax</title>
        <meta name="description" content="Premium mobile car detailing services in Dixon, CA. We bring professional auto detailing to your home or office - serving all Dixon neighborhoods with custom detailing packages." />
        <meta name="keywords" content="Car Detailing Dixon CA, Mobile Car Detailing Dixon, Auto Detailing Solano County, Premium Mobile Detailing Near Me, Car Wash Dixon" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/dixon-car-detailing" />
        
        {/* Structured Data for Local Business with service location */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoWash",
            "name": "Hardys Wash N' Wax - Dixon",
            "image": "https://hardyswashnwax.com/logo.png",
            "description": "Premium mobile car detailing service that comes to your location in Dixon, CA and surrounding areas.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dixon",
              "addressRegion": "CA",
              "postalCode": "95620",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.4455,
              "longitude": -121.8233
            },
            "telephone": "+19497340201",
            "priceRange": "$$$",
            "areaServed": [
              { "@type": "Place", "name": "Dixon, CA"},
              { "@type": "Place", "name": "Downtown Dixon, CA"},
              { "@type": "Place", "name": "Valley Glen Dixon, CA"},
              { "@type": "Place", "name": "Heritage Commons, Dixon, CA"},
              { "@type": "Place", "name": "Parklane Dixon, CA"}
            ],
            "sameAs": [
              "https://www.facebook.com/hardyswashnwax",
              "https://www.instagram.com/hardyswashnwax"
            ]
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dixon, CA Mobile Car Detailing Services
            </h1>
            <p className="text-xl text-gray-200 mb-8 speakable-content">
              Hardys Wash N' Wax brings premium mobile car detailing directly to you in Dixon, California. 
              We serve the entire Dixon area, including downtown, residential neighborhoods, and business districts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/booking">Book Your Detail</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Area Highlight */}
      <div className="bg-[#F3F4E6] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Serving All of Dixon, CA</h2>
              <p className="text-lg mb-6">
                Our mobile detailing service comes directly to your location throughout Dixon and surrounding areas.
                Whether you're a homeowner, business owner, or local resident, we bring our premium 
                detailing services right to your doorstep.
              </p>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Popular Service Areas in Dixon:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Downtown Dixon</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Valley Glen</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Heritage Commons</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Parklane</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Westside Dixon</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Eastside Dixon</li>
                </ul>
              </div>
              <p className="font-medium">
                Proudly serving Davis, Woodland, Dixon, Winters & West Sacramento – if you're within 30 minutes we'll come to you.
              </p>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Why Dixon Residents Choose Us:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#EE432C] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Convenient On-Location Service</span>
                    <span className="text-gray-600">We come to your home, business, or workplace in Dixon</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#EE432C] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Family Vehicle Specialists</span>
                    <span className="text-gray-600">Great for busy parents and professionals</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#EE432C] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Eco-Friendly Products</span>
                    <span className="text-gray-600">Environmentally conscious detailing solutions</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#EE432C] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Flexible Scheduling</span>
                    <span className="text-gray-600">Early morning and evening appointments available</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Services in Dixon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F3F4E6] rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <Car className="h-12 w-12 text-[#EE432C] mb-4" />
                <h3 className="text-xl font-bold mb-2">Express Detail</h3>
                <p className="text-gray-700 mb-4">
                  Perfect for busy Dixon professionals. A thorough exterior wash, tire 
                  shine, and interior vacuum and wipe-down in just 90 minutes.
                </p>
                <p className="font-bold text-lg mb-4">From $99</p>
                <Button asChild className="w-full">
                  <Link href="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-[#F3F4E6] rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <Car className="h-12 w-12 text-[#EE432C] mb-4" />
                <h3 className="text-xl font-bold mb-2">Full Detail</h3>
                <p className="text-gray-700 mb-4">
                  Our most popular package in Dixon. Complete interior and exterior detailing with clay 
                  bar treatment and wax protection.
                </p>
                <p className="font-bold text-lg mb-4">From $189</p>
                <Button asChild className="w-full">
                  <Link href="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-[#F3F4E6] rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <Car className="h-12 w-12 text-[#EE432C] mb-4" />
                <h3 className="text-xl font-bold mb-2">Ceramic Coating</h3>
                <p className="text-gray-700 mb-4">
                  Premium protection against the Central Valley heat and dust. Long-lasting shine 
                  and protection for your vehicle.
                </p>
                <p className="font-bold text-lg mb-4">From $349</p>
                <Button asChild className="w-full">
                  <Link href="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-[#FFD7B5]/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Dixon Car Detailing FAQs</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Do you service all of Dixon?</h3>
              <p className="text-gray-700">
                Yes! We provide mobile car detailing services throughout all of Dixon, including 
                downtown, Valley Glen, Heritage Commons, and all residential neighborhoods. We also serve 
                nearby areas like Davis, Woodland, and Winters.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Do I need to provide water and electricity?</h3>
              <p className="text-gray-700">
                You'll need to provide access to a water spigot. We bring our own pressure washer,
                generators, and all necessary equipment and supplies for a complete detail.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Do you offer any discounts for Dixon businesses?</h3>
              <p className="text-gray-700">
                Yes! We offer special rates for Dixon businesses with multiple vehicles. Contact us
                to discuss fleet pricing and scheduled maintenance plans.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">How far in advance should I book?</h3>
              <p className="text-gray-700">
                For Dixon locations, we recommend booking at least 2-3 days in advance, especially
                during spring and summer months. Weekend appointments fill up quickly, so consider
                booking a week ahead for Saturday service.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-[#EE432C] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for the Best Car Detailing in Dixon?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience premium mobile detailing service 
            delivered right to your location in Dixon.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-[#EE432C] hover:bg-gray-100">
            <Link href="/booking">Schedule Your Dixon Detail</Link>
          </Button>
        </div>
      </div>
    </>
  );
}