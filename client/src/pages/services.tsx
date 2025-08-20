import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "wouter";
import { HeroButton } from "@/components/ui/hero-button";
import { ChevronRight, Sparkles, Shield, Paintbrush, Droplets, Car, Star } from "lucide-react";
import interiorDetailImage from "@assets/interior detailing_1755240294292.jpg";
import acuraImage from "@assets/acura_1755241438565.jpg";
import porschePanameraImage from "@assets/int_1755241550770.jpg";
import porsche718Image from "@assets/718_1755241627534.jpg";
import petHairBeforeImage from "@assets/hair before_1755241679282.jpg";
import petHairAfterImage from "@assets/hair after_1755241684573.jpg";
import audiSQ5Image from "@assets/blue_1755666323913.jpg";
import bmwX50i1Image from "@assets/exttt_1755666334962.jpg";
import bmwX50i2Image from "@assets/extt_1755666340879.jpg";
import porscheSpyder1Image from "@assets/green_1755666353308.jpg";
import porscheSpyder2Image from "@assets/green 2_1755666356311.jpg";
import teslaModelSImage from "@assets/tes_1755666391761.jpg";
import headlightBeforeImage from "@assets/before_1755668254553.jpg";
import headlightAfterImage from "@assets/after_1755668250810.jpg";
import engineBayImage from "@assets/engine_1755668325321.jpg";

// Three main service categories
const serviceCategories = [
  {
    id: "interior-detail",
    title: "Interior Detail",
    description: "Deep cleaning and conditioning for seats, carpets, dashboard, and all interior surfaces.",
    icon: Sparkles,
    features: [
      "Deep vacuum & steam cleaning",
      "Leather conditioning & protection",
      "Dashboard & trim restoration",
      "Pet hair removal specialist"
    ],
    color: "from-[#EE432C] to-[#FFB375]",
    portfolioJobs: [
      {
        title: "Mercedes AMG",
        description: "Interior Detail with Leather Conditioning",
        image: interiorDetailImage,
        services: ["Interior Detail", "Leather Conditioning"],
        condition: "Premium interior restoration"
      },
      {
        title: "Camaro ZL1",
        description: "Interior Detail - Leather Conditioner & Carpet Shampoo",
        image: porschePanameraImage,
        services: ["Interior Detail", "Leather Conditioning", "Carpet Shampoo"],
        condition: "Luxury interior maintenance"
      },
      {
        title: "Porsche Spyder 718",
        description: "Interior Detail",
        image: "/porsche-spyder-after.jpg",
        services: ["Deep Clean", "Interior Detail"],
        condition: "Complete interior restoration"
      },
      {
        title: "Pet Hair Removal - Before",
        description: "Interior Detail with Pet Hair Removal",
        image: petHairBeforeImage,
        services: ["Pet Hair Removal", "Before Photo"],
        condition: "Heavy pet hair contamination"
      },
      {
        title: "Pet Hair Removal - After",
        description: "Interior Detail with Pet Hair Removal",
        image: petHairAfterImage,
        services: ["Interior Detail", "Pet Hair Removal"],
        condition: "Complete hair removal & restoration"
      }
    ]
  },
  {
    id: "exterior-detail",
    title: "Exterior Detail",
    description: "Complete exterior restoration and protection for your vehicle's paint, wheels, and trim.",
    icon: Car,
    features: [
      "Premium hand wash & dry",
      "Clay bar paint decontamination",
      "High-quality wax protection",
      "Wheel & tire detailing"
    ],
    color: "from-[#EE432C] to-[#FFB375]",
    portfolioJobs: [
      {
        title: "Acura A-Spec",
        description: "Exterior Detail with Wash & Ceramic Spray Wax",
        image: acuraImage,
        services: ["Exterior Detail", "Ceramic Spray Wax"],
        condition: "Maintaining premium finish"
      },
      {
        title: "Audi SQ5",
        description: "Exterior Detail - Clay Bar, Polish and Ceramic Machine Wax",
        image: audiSQ5Image,
        services: ["Exterior Detail", "Clay Bar", "Polish", "Ceramic Machine Wax"],
        condition: "Complete paint restoration"
      },
      {
        title: "Tesla Model S",
        description: "Pre Wash Foam Bath Treatment",
        image: teslaModelSImage,
        services: ["Pre Wash", "Foam Bath Treatment"],
        condition: "Preparation for full detail"
      },
      {
        title: "Scion XB - Before",
        description: "Before and After - Headlight Restoration Scion XB",
        image: headlightBeforeImage,
        services: ["Exterior Detail", "Headlight Restoration"],
        condition: "Cloudy, oxidized headlights"
      },
      {
        title: "Scion XB - After",
        description: "Before and After - Headlight Restoration Scion XB",
        image: headlightAfterImage,
        services: ["Headlight Restoration", "After Photo"],
        condition: "Crystal clear headlights"
      },
      {
        title: "Ford Mustang GT",
        description: "Engine Bay Detailing - Ford Mustang GT",
        image: engineBayImage,
        services: ["Deep Clean", "Engine Bay Detailing"],
        condition: "Complete engine bay restoration"
      }
    ]
  },
  {
    id: "premium-protection",
    title: "Premium Protection",
    description: "Advanced paint correction, ceramic coating, and specialty treatments for ultimate vehicle protection.",
    icon: Shield,
    features: [
      "Multi-stage paint correction",
      "Professional ceramic coating",
      "Swirl & scratch removal",
      "UV & chemical resistance",
      "Long-term protection warranty"
    ],
    color: "from-[#EE432C] to-[#FFB375]",
    portfolioJobs: [
      {
        title: "Porsche Spyder 718 - Interior View",
        description: "Paint Correction Polish & Ceramic Coat",
        image: porscheSpyder1Image,
        services: ["Paint Correction", "Polish", "Ceramic Coating"],
        condition: "Complete paint restoration & protection"
      },
      {
        title: "Porsche Spyder 718 - Exterior View",
        description: "Paint Correction Polish & Ceramic Coat",
        image: porscheSpyder2Image,
        services: ["Paint Correction", "Polish", "Ceramic Coating"],
        condition: "Complete paint restoration & protection"
      },
      {
        title: "BMW X50i - Front View",
        description: "Ceramic Coat BMW X50i",
        image: bmwX50i1Image,
        services: ["Ceramic Coating", "Paint Protection"],
        condition: "Premium ceramic application"
      },
      {
        title: "BMW X50i - Side Detail",
        description: "Ceramic Coat BMW X50i",
        image: bmwX50i2Image,
        services: ["Ceramic Coating", "Paint Protection"],
        condition: "Premium ceramic application"
      },
      {
        title: "Corvette Stingray",
        description: "Ceramic Coat",
        image: "/corvette-stingray.jpg",
        services: ["Ceramic Coating", "Paint Protection"],
        condition: "Premium ceramic application"
      },
      {
        title: "BMW M40i",
        description: "Ceramic Coat and Paint Correction",
        image: "/bmw-m40i.jpg",
        services: ["Paint Correction", "Ceramic Coating"],
        condition: "Complete paint restoration & protection"
      }
    ]
  }
];

export default function Services() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Premium Mobile Car Detailing Services | Sacramento, Davis & Woodland | Hardys Wash N' Wax</title>
        <meta name="description" content="Explore our premium mobile car detailing services in Sacramento, Davis, and Woodland. From express details to ceramic coating - see exactly what's included in each service package." />
        <meta name="keywords" content="Car Detailing Services Sacramento CA, Mobile Car Wash Davis CA, Auto Detail Packages Woodland, Ceramic Coating Sacramento County, Paint Correction Near Me" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/services" />
        
        {/* Structured Data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Mobile Car Detailing Services",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "image": "https://hardyswashnwax.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sacramento",
                "addressRegion": "CA",
                "postalCode": "95814",
                "addressCountry": "US"
              },
              "telephone": "+19497340201"
            },
            "areaServed": [
              { "@type": "City", "name": "Sacramento, CA" },
              { "@type": "City", "name": "Davis, CA" },
              { "@type": "City", "name": "Woodland, CA" },
              { "@type": "City", "name": "Elk Grove, CA" },
              { "@type": "City", "name": "Dixon, CA" },
              { "@type": "City", "name": "Winters, CA" },
              { "@type": "City", "name": "West Sacramento, CA" }
            ],
            "serviceType": "Mobile Car Detailing",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "149",
              "highPrice": "899",
              "priceCurrency": "USD",
              "offerCount": "6"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F3F4E6] to-[#FFD7B5] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
              Premium Car Detailing Services
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our complete range of mobile detailing services. Click any service below to see exactly what's included and discover the perfect package for your vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16">
          {serviceCategories.map((category) => (
            <div key={category.id} className="max-w-7xl mx-auto">
              {/* Service Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white rounded-t-xl`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-heading">{category.title}</h2>
                    <p className="text-lg text-white/90 max-w-2xl">{category.description}</p>
                    <p className="text-sm text-white/80 mt-2 italic">Base service shown • Add-ons marked with +$ cost extra</p>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="mt-6 grid md:grid-cols-2 gap-2">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/90">
                      <ChevronRight className="w-4 h-4" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Grid */}
              <div className="bg-white border-2 border-black border-t-0 rounded-b-xl shadow-[8px_8px_0_0_#000] p-6 lg:p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(() => {
                    const jobs = category.portfolioJobs || [];
                    const groupedJobs = [];
                    let i = 0;
                    
                    while (i < jobs.length) {
                      const currentJob = jobs[i];
                      const nextJob = jobs[i + 1];
                      
                      // Check if current and next job are the same car (same base title)
                      if (nextJob && currentJob.title.split(' - ')[0] === nextJob.title.split(' - ')[0]) {
                        // Group them together
                        groupedJobs.push({
                          type: 'group',
                          title: currentJob.title.split(' - ')[0],
                          description: currentJob.description,
                          services: currentJob.services,
                          condition: currentJob.condition,
                          images: [currentJob.image, nextJob.image]
                        });
                        i += 2; // Skip the next job since we grouped it
                      } else {
                        // Single job
                        groupedJobs.push({
                          type: 'single',
                          ...currentJob
                        });
                        i += 1;
                      }
                    }
                    
                    return groupedJobs.map((item, index) => (
                      item.type === 'group' ? (
                        // Grouped container (spans 2 columns)
                        <div key={index} className="md:col-span-2 lg:col-span-2 bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#EE432C] transition-colors">
                          <div className="grid grid-cols-2 gap-0">
                            {item.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image)}>
                                <img
                                  src={image}
                                  alt={`${item.title} - View ${imgIndex + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                              {item.services.map((service, serviceIndex) => {
                                const isMainService = serviceIndex === 0;
                                return (
                                  <span 
                                    key={serviceIndex} 
                                    className={`px-2 py-1 rounded ${
                                      isMainService 
                                        ? 'bg-[#FFD7B5]' 
                                        : 'bg-green-100 text-green-700'
                                    }`}
                                  >
                                    {isMainService ? service : `+$${service}`}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Single job container
                        <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#EE432C] transition-colors">
                          <div className="aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(item.image)}>
                            <img
                              src={item.image}
                              alt={`${item.title} - ${item.description}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                              {item.services.map((service, serviceIndex) => {
                                const isMainService = serviceIndex === 0;
                                return (
                                  <span 
                                    key={serviceIndex} 
                                    className={`px-2 py-1 rounded ${
                                      isMainService 
                                        ? 'bg-[#FFD7B5]' 
                                        : 'bg-green-100 text-green-700'
                                    }`}
                                  >
                                    {isMainService ? service : `+$${service}`}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    ));
                  })()}
                </div>
              </div>
            </div>
          ))}

          {/* Call to Action Section */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#F3F4E6] to-[#FFD7B5] rounded-xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Vehicle?</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Choose from our professional detailing services or contact us for a custom quote tailored to your vehicle's specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/booking">
                <HeroButton className="w-full sm:w-auto">Book Your Service</HeroButton>
              </Link>
              <Link href="/contact">
                <HeroButton variant="secondary" className="w-full sm:w-auto">Get Custom Quote</HeroButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}