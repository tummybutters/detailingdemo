import { Award, Check } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      title: "IDA Certified Detailer",
      description: "International Detailing Association professional certification"
    },
    {
      title: "Certified Ceramic Coating Installer",
      description: "Authorized installers of premium ceramic coating products"
    },
    {
      title: "Paint Correction Specialist",
      description: "Advanced training in multi-stage paint correction techniques"
    },
    {
      title: "Eco-Friendly Detailing Certification",
      description: "Recognition for our environmentally responsible practices"
    }
  ];

  const tools = [
    {
      title: "Professional-Grade Buffers & Polishers",
      description: "Dual-action and rotary machines for perfect paint correction"
    },
    {
      title: "Premium Ceramic Coating Products",
      description: "Industry-leading ceramic coating brands with proven performance"
    },
    {
      title: "Steam Extraction Equipment",
      description: "Deep-cleaning technology for interior surfaces and upholstery"
    },
    {
      title: "Eco-Friendly Detailing Products",
      description: "Biodegradable and water-conserving cleaning solutions"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Our Certifications</h2>
            <ul className="space-y-4">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{cert.title}</h3>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tools & Products */}
          <div>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Professional Tools & Products</h2>
            <p className="text-gray-600 mb-4">We invest in the best detailing equipment and products to ensure superior results:</p>
            <ul className="space-y-4">
              {tools.map((tool, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{tool.title}</h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
