import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Service3DButton } from "@/components/ui/service-3d-button";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet";

export default function PaintCorrection() {
  return (
    <>
      <Helmet>
        <title>Paint Correction Services Irvine & Orange County | Hardys Wash N' Wax</title>
        <meta name="description" content="Professional paint correction in Irvine and Orange County. Remove scratches, swirl marks, and restore your vehicle's paint to a mirror finish with our mobile service." />
        <meta name="keywords" content="Paint Correction Irvine, Swirl Mark Removal Orange County, Scratch Removal, Professional Paint Restoration" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services/paint-correction" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFB375] to-[#FFD7B5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Paint Correction</h1>
            <p className="text-xl text-gray-800 mb-8">Restore your vehicle's paint to a flawless finish by removing scratches, swirl marks, and imperfections with our expert paint correction service.</p>
            <Service3DButton asChild>
              <Link href="/booking">Schedule Your Paint Correction</Link>
            </Service3DButton>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Restore Your Vehicle's Finish To Perfection</h2>
            
            <div className="mb-12">
              <p className="text-gray-700 mb-4">
                Paint correction is the process of removing imperfections from your vehicle's clear coat and paint to restore a flawless, 
                showroom-quality finish. These imperfections include swirl marks, light scratches, water spots, etching, and oxidation that 
                diminish your car's appearance and value.
              </p>
              <p className="text-gray-700 mb-4">
                Our professional paint correction service uses specialized tools, compounds, and techniques to safely remove these imperfections 
                and restore the depth, clarity, and gloss to your vehicle's paint. Unlike quick fixes that temporarily hide imperfections, 
                paint correction actually removes them.
              </p>
            </div>
            
            {/* Common Paint Issues */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Paint Issues We Correct</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Swirl Marks</h4>
                      <p className="text-gray-700 text-sm">Fine circular scratches caused by improper washing techniques or automatic car washes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Light Scratches</h4>
                      <p className="text-gray-700 text-sm">Surface-level scratches from branches, clothing, or minor contact</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Water Spots</h4>
                      <p className="text-gray-700 text-sm">Mineral deposits left from evaporated water that can etch into paint</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Oxidation</h4>
                      <p className="text-gray-700 text-sm">Dulling and fading of paint due to sun exposure and environmental factors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Holograms</h4>
                      <p className="text-gray-700 text-sm">Buffer marks from improper machine polishing techniques</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle2 className="text-primary shrink-0 mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-bold text-gray-900">Bird Dropping Etching</h4>
                      <p className="text-gray-700 text-sm">Damage caused by acidic bird droppings that have etched into the clear coat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Our Process */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Paint Correction Process</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Assessment & Inspection</h4>
                    <p className="text-gray-700">We thoroughly examine your vehicle's paint condition using specialized lighting to identify all imperfections and measure paint thickness to ensure safe correction.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Wash & Decontamination</h4>
                    <p className="text-gray-700">Before any correction work begins, we perform a thorough wash and clay bar treatment to remove surface contaminants that could interfere with the polishing process.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Multi-Stage Polishing</h4>
                    <p className="text-gray-700">Using professional-grade machine polishers and compounds, we perform multiple passes with progressively finer polishes to remove defects and restore gloss.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Refinement Polishing</h4>
                    <p className="text-gray-700">We perform a final stage of refinement polishing to maximize gloss and clarity, removing any holograms from the previous steps.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Protection Application</h4>
                    <p className="text-gray-700">After correction, we apply a protective sealant, wax, or ceramic coating to protect your newly restored paint and enhance its longevity and appearance.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#FFD7B5]/30 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Why Choose Our Paint Correction Service?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We use premium compounds and polishes that are safe for your vehicle's paint</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">Our technicians are trained in proper paint correction techniques to ensure optimal results</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-primary shrink-0 mr-2 mt-0.5 h-4 w-4" />
                    <span className="text-sm">We bring our mobile service to your location for maximum convenience</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Paint Correction Pricing</h3>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">Our paint correction services are customized based on your vehicle's size, paint condition, and level of correction needed. We offer different stages of correction to address various levels of imperfections.</p>
                
                <div className="space-y-6 mt-4">
                  <div className="border-b pb-4">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">One-Step Correction</h4>
                    <p className="text-gray-700 mb-2">Removes light imperfections and enhances gloss</p>
                    <p className="text-gray-700 mb-1">Starting at: <span className="font-bold text-primary">$350</span></p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Two-Step Correction</h4>
                    <p className="text-gray-700 mb-2">Addresses moderate defects for significant improvement</p>
                    <p className="text-gray-700 mb-1">Starting at: <span className="font-bold text-primary">$550</span></p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Multi-Stage Correction</h4>
                    <p className="text-gray-700 mb-2">Our most comprehensive correction for severe defects</p>
                    <p className="text-gray-700 mb-1">Starting at: <span className="font-bold text-primary">$750</span></p>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-6 text-sm">*All prices vary based on vehicle size and condition. Contact us for a detailed quote tailored to your specific needs.</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Service Duration:</h4>
                <p className="text-gray-700">1-3 days, depending on vehicle condition and correction level selected</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Service3DButton asChild>
                  <Link href="/booking">Get a Paint Correction Quote</Link>
                </Service3DButton>
              </div>
            </div>
            
            {/* Customer Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say About Our Paint Correction</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"My black BMW was covered in swirl marks from years of bad car washes. After their paint correction service, it looks better than when I drove it off the lot. Worth every penny!"</p>
                  <p className="font-bold text-gray-900">- James L., Costa Mesa</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"I had some deep scratches on my hood from a tree branch. I didn't think they could be fixed without repainting. Their paint correction service removed them completely! Amazing work."</p>
                  <p className="font-bold text-gray-900">- Rachel S., Irvine</p>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Areas for Paint Correction</h3>
              
              <p className="text-gray-700 mb-4">
                We proudly offer our paint correction services throughout Orange County and select areas in Southern California, including:
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
              <h2 className="text-3xl font-bold font-heading text-white mb-2">Ready to restore your paint to perfection?</h2>
              <p className="text-gray-100/90 text-lg">Our paint correction experts are ready to transform your vehicle.</p>
            </div>
            <div>
              <Service3DButton asChild>
                <Link href="/booking">Book a Consultation</Link>
              </Service3DButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}