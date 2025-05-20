import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Helmet } from "react-helmet";

export default function InteriorCarDetailing() {
  return (
    <>
      <Helmet>
        <title>Interior Car Detailing Near You – Deep Clean & Factory-Fresh Finish</title>
        <meta name="description" content="Professional interior car detailing that comes to your location. Restore your vehicle's cabin with our comprehensive deep cleaning, stain removal, and premium protection services." />
        <meta name="keywords" content="interior car detailing near me, professional car detailing, auto detailing near me" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services/interior-car-detailing" />
        
        {/* Structured Data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Interior Car Detailing",
            "serviceType": "Car Detailing",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "image": "https://hardyswashnwax.com/logo.png",
              "telephone": "+19497340201",
              "priceRange": "$$"
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
              "price": "199.00",
              "priceCurrency": "USD"
            },
            "description": "Professional interior car detailing that comes to your location. We thoroughly clean every surface of your vehicle's interior, remove stains, and apply premium protection products for a factory-fresh finish."
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
                "name": "What does interior car detailing include?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our interior car detailing service includes deep vacuuming of all surfaces, professional carpet and upholstery shampooing, stain removal, leather cleaning and conditioning, dashboard and console detailing, and air vent cleaning. We use premium products to leave your car's interior looking and smelling factory-fresh."
                }
              },
              {
                "@type": "Question",
                "name": "How long does interior car detailing take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Interior Deep Detail service typically takes 3-4 hours to complete, depending on your vehicle's size and condition. We take the time needed to thoroughly clean every surface and remove stubborn stains for the best possible results."
                }
              },
              {
                "@type": "Question",
                "name": "Do you come to my location for interior detailing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We are a mobile detailing service that comes to your home, office, or any convenient location. We serve Davis, Woodland, Dixon, Winters, West Sacramento, and surrounding areas."
                }
              },
              {
                "@type": "Question",
                "name": "How much does interior car detailing cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Interior Deep Detail service ranges from $199 for sedans/coupes to $349 for larger vehicles like SUVs and minivans. The exact price depends on your vehicle size and condition."
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Interior Car Detailing Near You</h1>
            <p className="text-xl text-gray-800 mb-8 speakable-content">Deep cleaning, stain removal, and premium protection for your vehicle's interior. We bring professional detailing services directly to your driveway.</p>
            <Link href="/booking">
              <Service3DButton>Schedule Your Interior Detail</Service3DButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Deep Clean & Factory-Fresh Finish</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Based on our signature Interior Deep Detail package, our comprehensive interior detailing service is designed to thoroughly clean, refresh, and protect every surface inside your vehicle. 
                We use specialized tools and premium cleaning products to remove dirt, stains, and odors that regular cleaning can't touch.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you're dealing with food spills, pet hair, or just the buildup of everyday use, our detailed interior cleaning will transform your vehicle's cabin and restore that showroom-fresh feeling.
              </p>
            </div>
            
            {/* Interior Detail Services */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Interior Car Detailing Process Includes:</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Interior Blowout & Deep Vacuuming</h4>
                      <p className="text-gray-700 text-sm">Complete cleaning of all surfaces, seats, and hard-to-reach areas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Carpet & Upholstery Shampooing</h4>
                      <p className="text-gray-700 text-sm">Professional carpet cleaning with stain treatment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Premium Leather Conditioning</h4>
                      <p className="text-gray-700 text-sm">Restore and protect leather surfaces with professional conditioners</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Dashboard & Infotainment Cleaning</h4>
                      <p className="text-gray-700 text-sm">Careful detailing of all plastics, panels, and electronics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Streak-Free Window Cleaning</h4>
                      <p className="text-gray-700 text-sm">Crystal clear interior glass treatment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Headliner & Air Vent Cleaning</h4>
                      <p className="text-gray-700 text-sm">Thorough cleaning of often overlooked areas</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#FFD7B5]/30 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Why Choose Our Interior Detailing?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We come to your location - no need to leave your home or office</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We use eco-friendly, high-quality products that are safe for your family and pets</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Our process effectively removes allergens and improves your vehicle's air quality</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Interior Car Detailing Pricing</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Interior Deep Detail</h4>
                <p className="text-gray-700 mb-4">Our thorough interior cleaning and protection service:</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">Sedan/Coupe</h5>
                    <p className="text-red-600 font-bold">$199-$229</p>
                  </div>
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">SUV/Truck</h5>
                    <p className="text-red-600 font-bold">$229-$279</p>
                  </div>
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">Van/Large Vehicles</h5>
                    <p className="text-red-600 font-bold">$279-$349</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm">*Pricing may vary based on vehicle condition. Severely soiled interiors may require additional cleaning.</p>
                
                <div className="mt-6 p-4 bg-[#EE432C]/10 border-l-4 border-[#EE432C] rounded">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                    <span className="mr-2">📋</span> Personalized Quote Information
                  </h4>
                  <p className="text-gray-800">
                    All prices shown are estimates only. For your exact quote, please book a consultation or contact us directly. 
                    We provide custom pricing based on your specific vehicle condition, size, and service requirements.
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">3-4 hours, depending on vehicle size and condition</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link href="/booking">
                  <Service3DButton>Book Your Interior Detail</Service3DButton>
                </Link>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say About Our Interior Detailing</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"I couldn't believe how clean they got my car! Years of coffee spills and kid messes completely gone. They came right to my driveway and the interior looks brand new."</p>
                  <p className="font-bold text-gray-900">- Jordan M., Davis</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"Having them come to my office in Woodland was so convenient. My SUV's interior hasn't looked this good since I bought it. Their attention to detail is amazing!"</p>
                  <p className="font-bold text-gray-900">- Taylor R., Woodland</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Interior Car Detailing</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our mobile interior detailing services throughout the Davis area and surrounding communities, including:
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
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready to transform your car's interior?</h2>
              <p className="text-gray-100/90 text-lg">Our mobile detailing service comes directly to your location.</p>
            </div>
            <div>
              <Link href="/booking">
                <Service3DButton>Book Your Interior Detail</Service3DButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}