import { Medal, Handshake, Lightbulb } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      icon: <Medal className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for perfection in every vehicle we service, never cutting corners or compromising on quality."
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Integrity",
      description: "We operate with transparency and honesty in all our interactions, building trust with every customer."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously pursue new techniques and technologies to provide the best possible results."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do at PremiumShine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-[#EE432C]">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
