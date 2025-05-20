import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight, Star, Car } from "lucide-react";
import { Helmet } from "react-helmet";

export default function FullServiceCarWash() {
  return (
    <>
      <Helmet>
        <title>Full Service Car Wash & Detailing – Interior & Exterior Perfection</title>
        <meta name="description" content="Complete interior and exterior car detailing service that comes to your location. We thoroughly clean, protect, and restore your vehicle's appearance inside and out." />
        <meta name="keywords" content="full service car wash near me, premium car detailing, car cleaner service, luxury car detailing" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services/full-service-car-wash" />
        
        {/* Structured Data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Full Service Car Wash & Detailing",
            "serviceType": "Car Detailing",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "image": "https://hardyswashnwax.com/logo.png",
              "telephone": "+19497340201",
              "priceRange": "$$$"
            },
            "areaServed": [
              { "@type": "City", "name": "Davis, CA" },
              { "@type": "City", "name": "Woodland, CA" },
              { "@type": "City", "name": "Dixon, CA" },
              { "@type": "City", "name": "Winters, CA" },
              { "@type": "City", "name": "West Sacramento, CA" }
            ],
            "offers": {
              "@type": "Offer",
              "price": "549.00",
              "priceCurrency": "USD"
            },
            "description": "Complete interior and exterior car detailing service that includes thorough cleaning, polishing, waxing, and protection for your vehicle inside and out."
          })}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What's included in your full-service car wash and detailing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Luxury Detail package includes complete interior and exterior detailing. For the interior: deep cleaning with shampoo and stain removal, premium interior conditioning for all surfaces and materials. For the exterior: full decontamination with clay bar treatment, professional foam wash, thorough wheel/tire cleaning, and machine polish ceramic wax application for long-lasting shine."
                }
              },
              {
                "@type": "Question",
                "name": "How long does a full-service detail take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Luxury Detail service typically takes 4-6 hours to complete, depending on your vehicle's size and condition. We take the time needed to thoroughly clean and protect every surface for the best possible results."
                }
              },
              {
                "@type": "Question",
                "name": "Do you come to my location?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We are a mobile detailing service that comes to your home, office, or any convenient location. We bring our own water, power, and all necessary equipment. You only need to provide access to a water spigot."
                }
              },
              {
                "@type": "Question",
                "name": "What types of vehicles do you service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We service all types of vehicles including sedans, coupes, SUVs, trucks, vans, and luxury vehicles. Our pricing varies based on vehicle size and condition."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFB375] to-[#FFD7B5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Full Service Car Wash & Detailing</h1>
            <p className="text-xl text-gray-800 mb-8 speakable-content">Complete interior and exterior perfection. Our luxury detailing package thoroughly cleans, restores, and protects your vehicle inside and out, delivered right to your location.</p>
            <Link href="/booking">
              <Service3DButton>Schedule Your Full Service Detail</Service3DButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Interior & Exterior Perfection</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Our Luxury Detail package delivers comprehensive car cleaning and protection services for the discerning vehicle owner. This premium service includes both interior and exterior detailing to restore your vehicle's appearance to showroom condition.
              </p>
              <p className="text-gray-700 mb-4">
                Each full-service detail is performed by our skilled technicians at your location, using professional-grade products and techniques to achieve exceptional results. Whether you're preparing for a special event, maintaining your vehicle's value, or simply treating yourself to the best, our Luxury Detail will exceed your expectations.
              </p>
            </div>
            
            {/* Full Service Details */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Full Service Detail Includes:</h3>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 inline-flex items-center">
                  <Car className="mr-2 h-6 w-6 text-primary" /> Interior Services
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Complete Interior Deep Cleaning</p>
                        <p className="text-gray-600 text-sm">Thorough vacuuming and detailed cleaning of all surfaces</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Carpet & Upholstery Shampooing</p>
                        <p className="text-gray-600 text-sm">Professional stain removal and deep cleaning</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Leather Cleaning & Conditioning</p>
                        <p className="text-gray-600 text-sm">Specialized treatment for all leather surfaces</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Dashboard & Plastics Restoration</p>
                        <p className="text-gray-600 text-sm">Cleaning and conditioning of all interior panels</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Interior Glass Treatment</p>
                        <p className="text-gray-600 text-sm">Streak-free cleaning of all windows and mirrors</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Air Vents & Detail Cleaning</p>
                        <p className="text-gray-600 text-sm">Thorough cleaning of all crevices and small details</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 inline-flex items-center">
                  <Car className="mr-2 h-6 w-6 text-primary" /> Exterior Services
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Full Exterior Decontamination</p>
                        <p className="text-gray-600 text-sm">Iron removal and clay bar treatment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Premium Foam Wash</p>
                        <p className="text-gray-600 text-sm">Gentle yet effective cleaning of painted surfaces</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Professional Wheel & Tire Cleaning</p>
                        <p className="text-gray-600 text-sm">Complete wheel wells and tire dressing</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Machine Polish Ceramic Wax</p>
                        <p className="text-gray-600 text-sm">Long-lasting shine and protection</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Exterior Trim Restoration</p>
                        <p className="text-gray-600 text-sm">Treatment for plastic and rubber trim</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                      <div>
                        <p className="text-gray-800 font-medium">Exterior Glass Treatment</p>
                        <p className="text-gray-600 text-sm">Water repellent application for improved visibility</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#FFD7B5]/30 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">The Full Service Difference</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We handle every detail so you don't have to worry about a thing</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Complete transformation of your vehicle inside and out</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Perfect for special occasions, maintaining resale value, or seasonal deep cleaning</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Full Service Detailing Pricing</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Luxury Detail: Interior & Exterior Perfection</h4>
                <p className="text-gray-700 mb-4">Our comprehensive cleaning and protection service:</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">Sedan/Coupe</h5>
                    <p className="text-red-600 font-bold">$549-$649</p>
                  </div>
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">SUV/Truck</h5>
                    <p className="text-red-600 font-bold">$649-$749</p>
                  </div>
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">Van/Large Vehicles</h5>
                    <p className="text-red-600 font-bold">$749-$849</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm">*Pricing may vary based on vehicle condition. Heavily soiled vehicles may require additional time and cleaning.</p>
                
                <div className="mt-6 p-4 bg-[#EE432C]/10 border-l-4 border-[#EE432C] rounded">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                    <span className="mr-2">📋</span> Customized Service Pricing
                  </h4>
                  <p className="text-gray-800">
                    Please note that all prices shown are estimates and may be adjusted based on your specific vehicle's needs. 
                    Our full-service detailing is tailored to each vehicle's unique condition, size, and special requirements. 
                    For an accurate quote that reflects your exact situation, we recommend booking a consultation with our team.
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">4-6 hours, depending on vehicle size and condition</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link href="/booking">
                  <Service3DButton>Book Your Full Service Detail</Service3DButton>
                </Link>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Experiences with Our Full Service Detail</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"Absolutely worth every penny! My SUV hadn't been detailed in years, and now it looks better than when I bought it. They took care of every spot inside and out - even got out stains I thought were permanent."</p>
                  <p className="font-bold text-gray-900">- Chris L., Davis</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"Having them come to my home in Woodland was so convenient. The full service detail was impressive - my car looked showroom new inside and out. The ceramic wax they applied still beads water months later!"</p>
                  <p className="font-bold text-gray-900">- Jamie W., Woodland</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Full Service Detailing</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our mobile full service car wash and detailing throughout the Davis area and surrounding communities, including:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Davis</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Woodland</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Dixon</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Winters</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">West Sacramento</div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link href="/booking">
                  <Button variant="outline">Check Availability in Your Area</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready to experience complete car transformation?</h2>
              <p className="text-gray-100/90 text-lg">Our mobile full service detailing comes directly to your location.</p>
            </div>
            <div>
              <Link href="/booking">
                <Service3DButton>Book Your Full Service Detail</Service3DButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}