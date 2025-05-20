import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

export default function ExteriorDetailing() {
  return (
    <>
      <Helmet>
        <title>Exterior Car Detailing Irvine & Orange County | Hardys Wash N' Wax</title>
        <meta name="description" content="Professional exterior car detailing in Irvine and Orange County. Our mobile service brings showroom shine to your vehicle with premium wash, wax, and polish." />
        <meta name="keywords" content="Exterior Car Detailing Irvine, Car Wash and Wax Orange County, Mobile Exterior Detailing, Paint Protection" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services/exterior-detailing" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFB375] to-[#FFD7B5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Premium Exterior Car Detailing</h1>
            <p className="text-xl text-gray-800 mb-8">Restore your vehicle's showroom shine with our expert exterior detailing, delivered to your location in Irvine and throughout Orange County.</p>
            <Service3DButton asChild>
              <Link href="/booking">Schedule Your Exterior Detail</Link>
            </Service3DButton>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exterior Detailing That Protects & Enhances Your Vehicle</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Our Exterior Detailing service goes far beyond a regular car wash. We utilize professional techniques and premium products to not only clean your vehicle, 
                but to protect it from environmental damage and restore that head-turning shine.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you're looking to maintain your vehicle's appearance or preparing to sell, our comprehensive exterior detailing will maximize your car's curb appeal 
                and protect your investment.
              </p>
            </div>
            
            {/* Exterior Detail Services */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Exterior Detailing Package Includes:</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Hand Wash & Foam Bath</h4>
                      <p className="text-gray-700 text-sm">Thorough contact wash with premium microfiber tools</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Paint Decontamination</h4>
                      <p className="text-gray-700 text-sm">Removal of embedded contaminants for a smooth surface</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Ceramic Wax Application</h4>
                      <p className="text-gray-700 text-sm">Machine-buffered protective coating for lasting shine</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Wheel & Tire Detailing</h4>
                      <p className="text-gray-700 text-sm">Deep cleaning of wheels, wheel wells, and tire dressing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Exterior Trim Treatment</h4>
                      <p className="text-gray-700 text-sm">Restoration and protection of plastic and rubber trim</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Window & Glass Polishing</h4>
                      <p className="text-gray-700 text-sm">Streak-free exterior glass cleaning</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#FFD7B5]/30 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Why Choose Our Exterior Detailing?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Our ceramic wax protection lasts 6-12 months, far longer than traditional waxes</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We use pH-balanced, environmentally friendly products that won't harm your paint</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Our mobile service means you don't have to take time out of your day to drive to a detailing shop</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Exterior Detailing Pricing</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Exterior Wash & Wax</h4>
                <p className="text-gray-700 mb-2">Standard pricing: <span className="line-through">$250-$500</span> <span className="text-red-600 font-bold">$200-400 (20% OFF)</span></p>
                <p className="text-gray-700 text-sm">Pricing varies based on vehicle size and condition.</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Exterior Detail Polish & Wax</h4>
                <p className="text-gray-700 mb-2">Standard pricing: <span className="line-through">$440-$560</span> <span className="text-red-600 font-bold">$350-450 (20% OFF)</span></p>
                <p className="text-gray-700 text-sm">Includes everything from the Wash & Wax plus machine buffer compound polish to remove scratches and swirls.</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">Approximately 2-6 hours, depending on vehicle size, condition, and selected package</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Service3DButton asChild>
                  <Link href="/booking">Book Your Exterior Detail</Link>
                </Service3DButton>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say About Our Exterior Detailing</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"Absolutely blown away by the results! I had swirl marks and water spots that I thought were permanent. Now my car looks better than when I bought it."</p>
                  <p className="font-bold text-gray-900">- David M., Costa Mesa</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"The convenience of having them come to my home in Irvine was amazing. They took their time and the attention to detail was impressive. My black SUV has never looked so good!"</p>
                  <p className="font-bold text-gray-900">- Jennifer K., Irvine</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Exterior Detailing</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our mobile exterior detailing services throughout Orange County and select areas in Southern California, including:
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
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready for a showroom-quality shine?</h2>
              <p className="text-gray-100/90 text-lg">Our mobile exterior detailing comes to you in Irvine and throughout Orange County.</p>
            </div>
            <div>
              <Service3DButton asChild>
                <Link href="/booking">Book Your Exterior Detail</Link>
              </Service3DButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}