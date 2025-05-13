import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight, Star, Droplets } from "lucide-react";
import { Helmet } from "react-helmet";

export default function CarWashAndWax() {
  return (
    <>
      <Helmet>
        <title>Car Wash and Wax Services – Add Shine & Protection To Your Home On The Road</title>
        <meta name="description" content="Professional car wash and wax services that come to your location. Our Exterior Wash & Wax package includes foam wash, clay bar treatment, and premium wax for long-lasting shine and protection to your home on the road." />
        <meta name="keywords" content="car wash near me, car wash and wax, car waxing service, mobile car wash" />
        <link rel="canonical" href="https://hardyswashnwax.com/services/car-wash-and-wax" />
        
        {/* Structured Data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Car Wash and Wax Service - Your Home On The Road",
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
              "price": "249.00",
              "priceCurrency": "USD"
            },
            "description": "Professional car wash and wax service that includes foam wash, clay bar treatment, and premium wax application for long-lasting shine and protection to your home on the road."
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
                "name": "What's included in your exterior wash and wax service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Exterior Wash & Wax service includes iron decontamination, professional pre-treatment soak, complete wheel & tire cleaning with foam and contact wash, clay bar decontamination to remove embedded contaminants, machine polisher ceramic wax application (2-3 years protection), and professional drying and tire dressing for a showroom finish."
                }
              },
              {
                "@type": "Question",
                "name": "How is your service different from an automatic car wash?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our service is completely different from an automatic car wash. We provide hand washing that's gentle on your paint, professional clay bar treatment to remove embedded contaminants, and ceramic wax application that lasts 2-3 years. We also come to your location, saving you time and providing personalized service you can't get at an automatic wash."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the wax protection last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our ceramic wax application provides 2-3 years of protection, much longer than traditional carnauba waxes that typically last 1-3 months. The ceramic technology creates a durable bond with your paint, providing lasting protection against environmental contaminants, UV rays, and water spots."
                }
              },
              {
                "@type": "Question",
                "name": "Do you require water or electricity at my location?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You'll need to provide access to a water spigot for our services. We bring all other equipment and supplies needed, including pressure washers, generators (if needed), hoses, and professional-grade detailing products."
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Car Wash and Wax Services</h1>
            <p className="text-xl text-gray-800 mb-8 speakable-content">Professional exterior cleaning and protection for your home on the road. Our premium wash and wax service includes foam wash, clay bar treatment, and long-lasting ceramic wax for unmatched shine and protection.</p>
            <Link href="/booking">
              <Service3DButton>Schedule Your Wash & Wax</Service3DButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Add Shine & Protection to Your Vehicle</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Based on our popular Exterior Wash & Wax package, this service delivers professional exterior cleaning and protection for your vehicle. Unlike regular car washes that just remove surface dirt, our comprehensive process deep cleans, decontaminates, and protects your paint with premium ceramic wax.
              </p>
              <p className="text-gray-700 mb-4">
                Our mobile service brings everything to your location, providing a convenient way to maintain your vehicle's appearance and protect its finish from environmental damage. Whether you're preparing for a special event or simply want to maintain your car's appearance, our Wash & Wax service delivers professional results.
              </p>
            </div>
            
            {/* Process Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Wash & Wax Process</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Pre-Wash & Iron Decontamination</h4>
                    <p className="text-gray-700">We start with a thorough pre-wash and iron decontamination process to safely remove surface contaminants and embedded metal particles</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Premium Foam Wash</h4>
                    <p className="text-gray-700">Our pH-balanced foam wash gently lifts away dirt without scratching, followed by a careful hand wash using the two-bucket method</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Clay Bar Decontamination</h4>
                    <p className="text-gray-700">Professional clay bar treatment removes embedded contaminants that washing alone can't touch, leaving a perfectly smooth surface</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Ceramic Wax Application</h4>
                    <p className="text-gray-700">Machine polisher ceramic wax application provides 2-3 years of protection with a deep, reflective shine</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0 mr-4">5</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Finishing Touches</h4>
                    <p className="text-gray-700">Complete wheel cleaning, tire dressing, and exterior trim restoration for a showroom-quality finish</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Professional Wash & Wax</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Droplets className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Superior Cleaning</h4>
                      <p className="text-gray-700 text-sm">Removes contaminants that regular washes leave behind</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Droplets className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Long-Lasting Protection</h4>
                      <p className="text-gray-700 text-sm">Ceramic wax provides 2-3 years of paint protection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Droplets className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Enhanced Appearance</h4>
                      <p className="text-gray-700 text-sm">Creates a deep, mirror-like shine that enhances your vehicle's color</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Droplets className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Convenient Service</h4>
                      <p className="text-gray-700 text-sm">We come to your home or office at a time that works for you</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Droplets className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Paint Preservation</h4>
                      <p className="text-gray-700 text-sm">Protects against UV damage, oxidation, and environmental contaminants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Droplets className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Easier Maintenance</h4>
                      <p className="text-gray-700 text-sm">Water beads and dirt washes away more easily between detailings</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#FFD7B5]/30 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Why Choose Our Wash & Wax Service?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Professional-grade products and techniques you can't get at drive-through car washes</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Mobile service saves you time and provides a more thorough cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Ceramic wax protection lasts years instead of weeks</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Car Wash & Wax Pricing</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Exterior Wash & Wax</h4>
                <p className="text-gray-700 mb-4">Our professional exterior cleaning and protection service:</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">Sedan/Coupe</h5>
                    <p className="text-red-600 font-bold">$249-$299</p>
                  </div>
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">SUV/Truck</h5>
                    <p className="text-red-600 font-bold">$299-$349</p>
                  </div>
                  <div className="bg-[#FFD7B5]/30 p-4 rounded-lg text-center">
                    <h5 className="font-bold mb-1">Van/Large Vehicles</h5>
                    <p className="text-red-600 font-bold">$349-$399</p>
                  </div>
                </div>
                
                <div className="bg-[#FFD7B5]/30 p-4 rounded-lg mb-4">
                  <h5 className="font-bold mb-2">Optional Add-Ons:</h5>
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <span>Paint Correction (Polishing)</span>
                      <span className="font-bold">$150</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-gray-700 text-sm">*Pricing may vary based on vehicle condition and size. Heavily contaminated vehicles may require additional decontamination services.</p>
                
                <div className="mt-6 p-4 bg-[#EE432C]/10 border-l-4 border-[#EE432C] rounded">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                    <span className="mr-2">📋</span> Estimate Information
                  </h4>
                  <p className="text-gray-800">
                    The pricing listed above represents estimated ranges for our Wash & Wax services. Your actual price 
                    may differ based on your "home on the road"—its size, current condition, and specific protection needs. 
                    For a definitive quote tailored to your vehicle, we invite you to schedule a consultation or reach out directly.
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">3-4.5 hours, depending on vehicle size and condition</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link href="/booking">
                  <Service3DButton>Book Your Wash & Wax</Service3DButton>
                </Link>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say About Our Wash & Wax</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"I've tried local car washes for years, but nothing comes close to this service. The clay bar made such a difference - my paint feels glass-smooth! And the wax is still beading water months later. Well worth it!"</p>
                  <p className="font-bold text-gray-900">- Riley J., Davis</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"Having them come to my home in Dixon was super convenient. The results were incredible - my truck looks better than when I bought it. The ceramic wax really makes the color pop, and it's so much easier to keep clean now."</p>
                  <p className="font-bold text-gray-900">- Jordan M., Dixon</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Car Wash & Wax</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our mobile car wash and wax services throughout the Davis area and surrounding communities, including:
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
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready to add shine and protection to your vehicle?</h2>
              <p className="text-gray-100/90 text-lg">Our mobile wash and wax service comes directly to your location.</p>
            </div>
            <div>
              <Link href="/booking">
                <Service3DButton>Book Your Wash & Wax</Service3DButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}