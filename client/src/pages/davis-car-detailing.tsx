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
        <link rel="canonical" href="https://www.hardyswashnwax.com/davis-car-detailing" />
        
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
      <div className="bg-gradient-to-b from-[#FFB375] to-[#FFD7B5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Davis Mobile Car Detailing
            </h1>
            <p className="text-xl text-gray-800 mb-8 speakable-content">
              Premium mobile car wash and detailing service delivered right to your home or office in Davis.
              Professional detailing, convenient booking, and luxury results without leaving your location.
            </p>
            <Link href="/booking">
              <Button className="bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-6 py-3 rounded text-lg font-bold transition-all">
                Book Your Davis Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Service Area Highlight */}
      <div className="bg-[#F3F4E6] py-16 border-y-2 border-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Serving All of Davis, CA</h2>
              <p className="text-lg mb-6">
                Our mobile detailing service comes directly to your location throughout Davis and surrounding areas.
                Whether you're a UC Davis student, faculty member, or local resident, we'll bring our premium 
                detailing services to your doorstep.
              </p>
              <div className="mb-8 bg-white p-6 rounded-lg shadow-md border-2 border-black">
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
              <p className="font-medium px-4 py-3 bg-[#FFD7B5] border-2 border-black rounded-lg inline-block">
                Proudly serving the entire Sacramento region - if you're within 30 minutes we'll come to you.
              </p>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md border-2 border-black">
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
            <div className="bg-[#FFB375] rounded-lg overflow-hidden shadow-md border-2 border-black">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Express Detail</h3>
                <p className="text-3xl font-bold text-center mb-3">$199-$279</p>
                <div className="bg-[#FFD7B5] text-center py-2 rounded-md mb-4 border border-black">
                  <p className="font-medium">1.5-2.5 Hours</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Full interior vacuum and blowout with surface cleaning</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Complete dashboard, infotainment, plastics, and door panel cleaning</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Streak-free window cleaning and leather conditioning</p>
                  </div>
                </div>
                <Link href="/booking">
                  <Button className="w-full bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold transition-all">
                    BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-[#FFB375] rounded-lg overflow-hidden shadow-md border-2 border-black">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Interior Deep Detail</h3>
                <p className="text-3xl font-bold text-center mb-3">$199-$349</p>
                <div className="bg-[#FFD7B5] text-center py-2 rounded-md mb-4 border border-black">
                  <p className="font-medium">3-4 Hours</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Interior blowout with deep vacuuming of all surfaces and seats</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Professional carpet shampoo and stain removal treatment</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Premium leather conditioning and headliner cleaning</p>
                  </div>
                </div>
                <Link href="/booking">
                  <Button className="w-full bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold transition-all">
                    BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-[#FFB375] rounded-lg overflow-hidden shadow-md border-2 border-black">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Exterior Wash & Wax</h3>
                <p className="text-3xl font-bold text-center mb-3">$249-$399</p>
                <div className="bg-[#FFD7B5] text-center py-2 rounded-md mb-4 border border-black">
                  <p className="font-medium">3-4.5 Hours</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Iron decontamination and professional pre-treatment soak</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Clay bar decontamination to remove embedded contaminants</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">Professional drying and tire dressing for a showroom finish</p>
                  </div>
                </div>
                <Link href="/booking">
                  <Button className="w-full bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold transition-all">
                    BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Pricing Disclaimer */}
          <div className="mt-10 p-6 bg-[#FFD7B5] border-2 border-black rounded-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="mr-2">📋</span> Davis Pricing Guide
            </h3>
            <p className="text-gray-800 mb-2">
              Prices vary based on vehicle size:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#EE432C] mr-2" /> Sedan/Coupe: Lower price range</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#EE432C] mr-2" /> SUV/Truck: Mid price range</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#EE432C] mr-2" /> Van/Luxury/Oversized: Higher price range</li>
            </ul>
            <p className="text-sm text-gray-700">
              Final pricing depends on vehicle condition, size, and service requirements. For a precise quote, book a consultation or call us directly.
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-[#FFD7B5] to-[#F3F4E6] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Davis Car Detailing FAQs</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-2">Do you service all of Davis?</h3>
              <p className="text-gray-700">
                Yes! We provide mobile car detailing services throughout all of Davis, including 
                downtown, UC Davis campus, and all residential neighborhoods. We also serve 
                nearby areas like Sacramento, Woodland, Elk Grove, and other surrounding communities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-2">Do I need to provide water and electricity?</h3>
              <p className="text-gray-700">
                You'll need to provide access to a water spigot. We bring our own pressure washer,
                generators, and all necessary equipment and supplies for a complete detail.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-2">Do you offer any discounts for UC Davis students?</h3>
              <p className="text-gray-700">
                Yes! We offer special rates for UC Davis students and faculty. Just show your valid 
                university ID to our detailer when they arrive for your service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
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
      <div className="bg-[#FFB375] py-12 border-y-2 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Ready for the Best Car Detailing in Davis?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-800">
            Book your appointment today and experience premium mobile detailing service 
            delivered right to your location in Davis.
          </p>
          <Link href="/booking">
            <Button className="bg-[#EE432C] hover:bg-[#d13a26] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-8 py-3 rounded text-lg font-bold transition-all">
              Schedule Your Davis Detail
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}