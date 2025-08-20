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

// Service gallery data with detailed descriptions and visual information
const serviceGallery = [
  {
    id: "express-detail",
    title: "Express Detail",
    subtitle: "Quick & Professional",
    price: "$149-199",
    duration: "1.5-2.5 hours",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Perfect for busy schedules. A comprehensive quick detail that refreshes your vehicle's appearance.",
    includes: [
      "Exterior hand wash & dry",
      "Interior vacuum & wipe down", 
      "Windows cleaned inside & out",
      "Tire shine application",
      "Dashboard & trim conditioning"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "interior-detail",
    title: "Interior Detail",
    subtitle: "Deep Clean & Restore",
    price: "$199-299",
    duration: "2-3 hours",
    icon: <Car className="w-8 h-8" />,
    description: "Complete interior transformation. Deep cleaning, stain removal, and protection for all surfaces.",
    includes: [
      "Deep vacuum (seats, carpets, crevices)",
      "Steam cleaning & stain removal",
      "Leather/fabric conditioning",
      "Dashboard & console detailing",
      "Door panels & cup holders",
      "Air freshener application"
    ],
    color: "from-purple-500 to-pink-500",
    portfolioJobs: [
      {
        title: "Mercedes AMG",
        description: "Interior Detail with Leather Conditioning",
        image: interiorDetailImage,
        services: ["Interior Detail", "Leather Conditioning"],
        condition: "Premium interior restoration"
      },
      {
        title: "Porsche Panamera",
        description: "Interior Detail - Leather Conditioner & Carpet Shampoo",
        image: porschePanameraImage,
        services: ["Interior Detail", "Leather Conditioning", "Carpet Shampoo"],
        condition: "Luxury interior maintenance"
      },
      {
        title: "Porsche Spyder 718",
        description: "Interior Detail Before and After",
        image: porsche718Image,
        services: ["Interior Detail", "Deep Clean"],
        condition: "Complete interior restoration"
      },
      {
        title: "Pet Hair Removal - Before",
        description: "Interior Detail with Pet Hair Removal",
        image: petHairBeforeImage,
        services: ["Interior Detail", "Pet Hair Removal"],
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
    subtitle: "Shine & Protection",
    price: "$249-349",
    duration: "2.5-3.5 hours",
    icon: <Droplets className="w-8 h-8" />,
    description: "Restore your vehicle's exterior to showroom condition with professional washing, polishing, and protection.",
    includes: [
      "Pre-wash & foam treatment",
      "Hand wash with premium soap",
      "Clay bar decontamination",
      "Machine polish application",
      "High-quality wax protection",
      "Wheel & tire detailing"
    ],
    color: "from-green-500 to-emerald-500",
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
      }
    ]
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    subtitle: "Remove Swirls & Scratches",
    price: "$399-599",
    duration: "4-6 hours",
    icon: <Paintbrush className="w-8 h-8" />,
    description: "Professional paint restoration to remove swirl marks, scratches, and oxidation for a flawless finish.",
    includes: [
      "Paint depth measurement",
      "Multi-stage machine polishing",
      "Scratch & swirl removal",
      "Paint defect correction",
      "High-grade polish application",
      "Paint protection sealant"
    ],
    color: "from-orange-500 to-red-500",
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
      }
    ]
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    subtitle: "Ultimate Protection",
    price: "$599-899",
    duration: "6-8 hours",
    icon: <Shield className="w-8 h-8" />,
    description: "The ultimate paint protection. Long-lasting ceramic coating provides years of protection and enhanced gloss.",
    includes: [
      "Complete paint decontamination",
      "Paint correction preparation",
      "Professional ceramic coating application",
      "Hydrophobic protection layer",
      "UV & chemical resistance",
      "5-year coating warranty"
    ],
    color: "from-violet-500 to-purple-500",
    portfolioJobs: [
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
      }
    ]
  },
  {
    id: "full-detail",
    title: "Full Detail Package",
    subtitle: "Complete Transformation",
    price: "$399-499",
    duration: "4-5 hours",
    icon: <Star className="w-8 h-8" />,
    description: "The complete package. Interior and exterior detailing for a total vehicle transformation.",
    includes: [
      "Everything from Interior Detail",
      "Everything from Exterior Detail", 
      "Engine bay cleaning",
      "Trunk/cargo area detail",
      "Chrome & trim polishing",
      "Comprehensive vehicle inspection"
    ],
    color: "from-yellow-500 to-orange-500"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(serviceGallery[0]);
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

      {/* Interactive Service Gallery */}
      <div className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Service Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {serviceGallery.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  selectedService.id === service.id
                    ? 'border-[#EE432C] bg-gradient-to-r from-[#EE432C] to-[#FFB375] text-white shadow-lg'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#FFB375] hover:bg-[#FFD7B5]/20'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`${selectedService.id === service.id ? 'text-white' : 'text-[#EE432C]'}`}>
                    {service.icon}
                  </div>
                  <span className="text-sm font-semibold text-center leading-tight">
                    {service.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Portfolio Gallery for Selected Service */}
          <div className="max-w-7xl mx-auto">
            {/* Service Header */}
            <div className={`bg-gradient-to-r ${selectedService.color} p-6 text-white rounded-t-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-heading">{selectedService.title}</h2>
                    <p className="text-lg text-white/90">{selectedService.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{selectedService.price}</div>
                  <div className="text-sm text-white/80">{selectedService.duration}</div>
                </div>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="bg-white border-2 border-black border-t-0 rounded-b-xl shadow-[8px_8px_0_0_#000] p-6 lg:p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedService.portfolioJobs ? (
                  selectedService.portfolioJobs.map((job, index) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#EE432C] transition-colors">
                      <div className="aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(job.image)}>
                        <img
                          src={job.image}
                          alt={`${job.title} - ${job.description}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                          {job.services.map((service, serviceIndex) => (
                            <span key={serviceIndex} className="bg-[#FFD7B5] px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Placeholder cards for services without portfolio jobs yet
                  Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#EE432C] transition-colors">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl text-gray-400 mb-2">📸</div>
                          <p className="text-sm text-gray-500">Portfolio Example Coming Soon</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">[Car Make/Model]</h3>
                        <p className="text-sm text-gray-600 mb-2">[Specific service description]</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="bg-[#FFD7B5] px-2 py-1 rounded">[Service type]</span>
                          <span className="bg-[#FFD7B5] px-2 py-1 rounded">[Add-on]</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center border-t pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Get Your Car Detailed?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link href="/booking">
                    <HeroButton className="w-full sm:w-auto">Book This Service</HeroButton>
                  </Link>
                  <Link href="/contact">
                    <HeroButton variant="secondary" className="w-full sm:w-auto">Ask Questions</HeroButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Not sure which service is right for you? Our team is ready to help you choose the perfect detailing package for your vehicle's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/booking">
                <HeroButton className="w-full sm:w-auto">Book Now</HeroButton>
              </Link>
              <Link href="/contact">
                <HeroButton variant="secondary" className="w-full sm:w-auto">Get Quote</HeroButton>
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