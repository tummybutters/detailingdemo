import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { MapPin, Car, Star, Clock, CheckCircle } from 'lucide-react';

export default function DavisCarDetailing() {
  return (
    <>
      <Helmet>
        <title>Mobile Car Detailing in Davis | First-Class Service at Home</title>
        <meta name="description" content="Return to perfection in Davis. Premium hand wash and full service detailing, right in your driveway. Book in 60 seconds." />
        <link rel="canonical" href="https://hardyswashnwax.com/davis-car-detailing" />
        
        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Hardys Wash N' Wax - Davis Car Detailing",
            "image": "https://hardyswashnwax.com/logo.png",
            "telephone": "+19497340201",
            "url": "https://hardyswashnwax.com/davis-car-detailing",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Davis",
              "addressRegion": "CA",
              "postalCode": "95616",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.5449,
              "longitude": -121.7405
            },
            "areaServed": [
              { "@type": "City", "name": "Davis, CA" }
            ],
            "description": "Premium mobile car detailing in Davis. We bring our full-service detailing directly to your location.",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 38.5449,
                "longitude": -121.7405
              },
              "geoRadius": "12000"
            },
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
              Davis, CA Mobile Car Detailing Services
            </h1>
            <p className="text-xl text-gray-200 mb-8 speakable-content">
              Hardys Wash N' Wax brings premium mobile car detailing directly to you in Davis, California. 
              We serve the entire Davis area, including UC Davis campus, downtown, and all residential neighborhoods.
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
              <h2 className="text-3xl font-bold mb-6">Serving All of Davis, CA</h2>
              <p className="text-lg mb-6">
                Our mobile detailing service comes directly to your location throughout Davis and surrounding areas.
                Whether you're a UC Davis student, faculty member, or local resident, we'll bring our premium 
                detailing services to your doorstep.
              </p>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Popular Service Areas in Davis:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> Downtown Davis</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> UC Davis Campus</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> North Davis</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> South Davis</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> West Davis</li>
                  <li className="flex items-center"><MapPin className="h-5 w-5 text-[#EE432C] mr-2" /> East Davis</li>
                </ul>
              </div>
              <p className="font-medium">
                Proudly serving Davis, Woodland, Dixon, Winters & West Sacramento – if you're within 30 minutes we'll come to you.
              </p>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Why Davis Residents Choose Us:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#EE432C] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Convenient On-Location Service</span>
                    <span className="text-gray-600">We come to your home, apartment, or workplace in Davis</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#EE432C] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">UC Davis Student & Faculty Discounts</span>
                    <span className="text-gray-600">Special rates for the campus community</span>
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
          <h2 className="text-3xl font-bold text-center mb-12">Popular Services in Davis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F3F4E6] rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <Car className="h-12 w-12 text-[#EE432C] mb-4" />
                <h3 className="text-xl font-bold mb-2">Express Detail</h3>
                <p className="text-gray-700 mb-4">
                  Perfect for UC Davis students and busy professionals. A thorough exterior wash, tire 
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
                  Our most popular package in Davis. Complete interior and exterior detailing with clay 
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
                  Premium protection against the Davis summer heat and winter rain. Long-lasting shine 
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
          <h2 className="text-3xl font-bold text-center mb-12">Davis Car Detailing FAQs</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Do you service all of Davis?</h3>
              <p className="text-gray-700">
                Yes! We provide mobile car detailing services throughout all of Davis, including 
                downtown, UC Davis campus, and all residential neighborhoods. We also serve 
                nearby areas like Woodland, Dixon, and Winters.
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
              <h3 className="text-xl font-bold mb-2">Do you offer any discounts for UC Davis students?</h3>
              <p className="text-gray-700">
                Yes! We offer special rates for UC Davis students and faculty. Just show your valid 
                university ID to our detailer when they arrive for your service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">How far in advance should I book?</h3>
              <p className="text-gray-700">
                For Davis locations, we recommend booking at least 3-4 days in advance, especially
                during spring and summer months. Weekend appointments fill up quickly, so consider
                booking a week ahead for Saturday or Sunday service.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-[#EE432C] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for the Best Car Detailing in Davis?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience premium mobile detailing service 
            delivered right to your location in Davis.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-[#EE432C] hover:bg-gray-100">
            <Link href="/booking">Schedule Your Davis Detail</Link>
          </Button>
        </div>
      </div>
    </>
  );
}