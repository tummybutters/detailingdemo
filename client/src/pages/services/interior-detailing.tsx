import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

export default function InteriorDetailing() {
  return (
    <>
      <Helmet>
        <title>Interior Car Detailing Irvine & Orange County | Hardys Wash N' Wax</title>
        <meta name="description" content="Professional interior car detailing in Irvine and Orange County. Our mobile service comes to you with comprehensive interior cleaning, stain removal, and protection." />
        <meta name="keywords" content="Interior Car Detailing Irvine, Car Interior Cleaning Orange County, Mobile Interior Detailing" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services/interior-detailing" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFB375] to-[#FFD7B5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Interior Car Detailing</h1>
            <p className="text-xl text-gray-800 mb-8">Transform your vehicle's interior with our premium detailing service, delivered right to your doorstep in Irvine and throughout Orange County.</p>
            <Service3DButton asChild>
              <Link href="/booking">Schedule Your Interior Detail</Link>
            </Service3DButton>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Restore Your Car's Interior to Showroom Quality</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Our Interior Detailing service is designed to thoroughly clean, refresh and protect every surface inside your vehicle. 
                With specialized tools and premium cleaning products, we remove dirt, stains, and odors that regular cleaning can't touch.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you're dealing with food spills, pet hair, or just the buildup of everyday use, our comprehensive interior detailing will leave your car feeling and smelling like new.
              </p>
            </div>
            
            {/* Interior Detail Services */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Interior Detailing Package Includes:</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Deep Vacuuming</h4>
                      <p className="text-gray-700 text-sm">Complete cleaning of all carpets, seats, and hard-to-reach areas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Leather Care & Conditioning</h4>
                      <p className="text-gray-700 text-sm">Restore and protect leather surfaces with premium conditioners</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Stain Removal</h4>
                      <p className="text-gray-700 text-sm">Professional treatment for carpet and upholstery stains</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Dashboard & Console Detailing</h4>
                      <p className="text-gray-700 text-sm">Careful cleaning of all interior surfaces with appropriate protection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Interior Glass Treatment</h4>
                      <p className="text-gray-700 text-sm">Streak-free cleaning of all interior windows and mirrors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Air Vent & Detail Work</h4>
                      <p className="text-gray-700 text-sm">Thorough cleaning of air vents and other small details</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#FFD7B5]/30 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Why Choose Our Interior Detailing?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We come to your home or office in Irvine, Costa Mesa, Newport Beach, and throughout Orange County</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We use eco-friendly, high-quality products that are safe for your family and pets</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Our interior detailing process effectively removes allergens and bacteria</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Interior Detailing Pricing</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Interior Detail Deep Clean</h4>
                <p className="text-gray-700 mb-2">Standard pricing: <span className="line-through">$190-$440</span> <span className="text-red-600 font-bold">$150-350 (20% OFF)</span></p>
                <p className="text-gray-700 text-sm">Pricing varies based on vehicle size and condition. Contact us for a personalized quote.</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">Approximately 2-4 hours, depending on vehicle condition</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Service3DButton asChild>
                  <Link href="/booking">Book Your Interior Detail</Link>
                </Service3DButton>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say About Our Interior Detailing</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"I couldn't believe how clean they got my car! Years of coffee spills and kid messes completely gone. The leather looks and feels brand new."</p>
                  <p className="font-bold text-gray-900">- Sarah T., Irvine</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"Having them come to my office in Newport Beach was so convenient. My SUV's interior hasn't looked this good since I bought it. Worth every penny!"</p>
                  <p className="font-bold text-gray-900">- Michael R., Newport Beach</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Interior Detailing</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our mobile interior detailing services throughout Orange County and select areas in Southern California, including:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Irvine</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Costa Mesa</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Newport Beach</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Tustin</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Mission Viejo</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Aliso Viejo</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Laguna Beach</div>
                <div className="bg-[#FFD7B5]/30 p-2 rounded text-center">Huntington Beach</div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button asChild variant="outline">
                  <Link href="/booking">Check Availability in Your Area</Link>
                </Button>
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
              <p className="text-gray-100/90 text-lg">Our mobile detailing service comes to you in Irvine and throughout Orange County.</p>
            </div>
            <div>
              <Service3DButton asChild>
                <Link href="/booking">Book Your Interior Detail</Link>
              </Service3DButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}