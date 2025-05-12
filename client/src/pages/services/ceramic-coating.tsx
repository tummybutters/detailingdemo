import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight, Star, Shield } from "lucide-react";
import { Helmet } from "react-helmet";

export default function CeramicCoatingPage() {
  return (
    <>
      <Helmet>
        <title>Ceramic Coating Near You – 7–10 Year Protection for Your Vehicle</title>
        <meta name="description" content="Professional ceramic coating services that provide 7-10 years of protection for your vehicle's paint. Our mobile service comes to your location for convenient, premium paint protection." />
        <meta name="keywords" content="ceramic coating near me, paint correction near me, car paint protection, mobile ceramic coating" />
        <link rel="canonical" href="https://hardyswashnwax.com/services/ceramic-coating" />
        
        {/* Structured Data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "7-10 Year Ceramic Coating",
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
            "description": "Professional ceramic coating service that provides 7-10 years of protection for your vehicle's paint. Includes paint correction, decontamination, and premium ceramic coating application."
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
                "name": "What is ceramic coating and how does it protect my car?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ceramic coating is a liquid polymer that chemically bonds with your vehicle's factory paint to create a protective layer. It provides superior protection against UV rays, oxidation, bird droppings, tree sap, and environmental contaminants. Our professional-grade ceramic coating offers 7-10 years of protection, maintains your vehicle's gloss, and makes cleaning easier."
                }
              },
              {
                "@type": "Question",
                "name": "Does ceramic coating include paint correction?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our ceramic coating service includes paint correction to remove swirls, scratches, and imperfections before application. This ensures your vehicle's paint is in optimal condition before applying the ceramic coating for the best possible results and longevity."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to apply ceramic coating?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our ceramic coating service typically takes 5-8 hours to complete, depending on your vehicle's size and condition. This includes preparation, paint correction, and the ceramic coating application. We take the time needed to ensure proper application for maximum durability and protection."
                }
              },
              {
                "@type": "Question",
                "name": "How should I maintain my ceramic coating?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To maintain your ceramic coating, we recommend regular washing with pH-neutral soap, avoiding automatic car washes with brushes, and periodic decontamination washes to remove bonded contaminants. We provide complete care instructions after service and offer maintenance packages to help preserve your coating's performance and appearance."
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ceramic Coating Near You</h1>
            <p className="text-xl text-gray-800 mb-8 speakable-content">7-10 years of premium paint protection with our mobile ceramic coating service. Enhance gloss, maintain resale value, and protect against environmental damage.</p>
            <Link href="/booking">
              <Service3DButton>Schedule Your Ceramic Coating</Service3DButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Premium Long-Term Paint Protection</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Our 7-10 Year Ceramic Coating service provides unmatched protection for your vehicle's paint while enhancing its appearance with a deep, mirror-like finish. Unlike traditional waxes or sealants that last only months, our professional-grade ceramic coating forms a permanent bond with your paint for years of protection.
              </p>
              <p className="text-gray-700 mb-4">
                Each ceramic coating service includes complete surface preparation and paint correction to ensure the best possible results. We come to your location for convenient, high-quality service without the hassle of dropping off your vehicle.
              </p>
            </div>
            
            {/* Benefits Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Ceramic Coating</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Long-Lasting Protection</h4>
                      <p className="text-gray-700 text-sm">7-10 years of durable protection against environmental contaminants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Enhanced Gloss & Depth</h4>
                      <p className="text-gray-700 text-sm">Creates a deep, mirror-like finish that enhances your vehicle's appearance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">UV & Oxidation Resistance</h4>
                      <p className="text-gray-700 text-sm">Prevents paint fading and oxidation from sun exposure</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Chemical Resistance</h4>
                      <p className="text-gray-700 text-sm">Protection against bird droppings, tree sap, and acid rain</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Easier Cleaning</h4>
                      <p className="text-gray-700 text-sm">Hydrophobic properties repel water and contaminants for easier washing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Increased Resale Value</h4>
                      <p className="text-gray-700 text-sm">Preserves your vehicle's appearance and maintains its value</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Process Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Ceramic Coating Process</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Complete Surface Preparation</h4>
                    <p className="text-gray-700">Thorough washing, clay bar decontamination, and iron removal to create a perfectly clean surface</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Paint Correction</h4>
                    <p className="text-gray-700">Machine polishing to remove swirl marks, scratches, and imperfections for a flawless finish</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Surface Preparation</h4>
                    <p className="text-gray-700">Final wiping with special solutions to ensure perfect adhesion of the ceramic coating</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Ceramic Coating Application</h4>
                    <p className="text-gray-700">Professional application of premium ceramic coating with specialized techniques</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">5</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Curing and Final Inspection</h4>
                    <p className="text-gray-700">Allowing proper curing time and performing a detailed final inspection</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ceramic Coating Pricing</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">7-10 Year Ceramic Coating</h4>
                <p className="text-gray-700 mb-4">Our premium ceramic coating service with paint correction:</p>
                
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
                
                <div className="bg-[#FFD7B5]/30 p-4 rounded-lg mb-4">
                  <h5 className="font-bold mb-2">Optional Add-Ons:</h5>
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <span>Carpet Conditioning</span>
                      <span className="font-bold">$100</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Leather Conditioning</span>
                      <span className="font-bold">$50</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-gray-700 text-sm">*Pricing may vary based on vehicle condition and paint correction requirements.</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">5-8 hours, depending on vehicle size and condition</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link href="/booking">
                  <Service3DButton>Book Your Ceramic Coating</Service3DButton>
                </Link>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say About Our Ceramic Coating</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"The ceramic coating completely transformed my car. It's been 8 months and water still beads up like day one. The paint correction removed years of swirl marks. Absolutely worth the investment!"</p>
                  <p className="font-bold text-gray-900">- Alex P., Davis</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"I had my truck coated before summer, and it's made such a difference! Bird droppings and tree sap wipe off easily, and the gloss is incredible. They came right to my house in Woodland to do the work."</p>
                  <p className="font-bold text-gray-900">- Morgan L., Woodland</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Ceramic Coating</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our mobile ceramic coating services throughout the Davis area and surrounding communities, including:
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
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready to protect your vehicle for years to come?</h2>
              <p className="text-gray-100/90 text-lg">Our mobile ceramic coating service comes directly to your location.</p>
            </div>
            <div>
              <Link href="/booking">
                <Service3DButton>Book Your Ceramic Coating</Service3DButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}