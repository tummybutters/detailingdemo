import { Medal, Droplets, Clock, ThumbsUp, Lock, Sparkles, LightbulbIcon } from "lucide-react";

const whatYouGain = [
  {
    icon: <Medal className="h-6 w-6" />,
    title: "Every Detail, Mastered",
    description: "We bring an obsessive focus to every inch of your car—so it feels brand-new, inside and out."
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Convenience Without Compromise",
    description: "We come to you, delivering top-tier results at your doorstep while you go about your day."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Protect Your Car, Elevate Its Value",
    description: "Our services are designed to safeguard your car's longevity and keep it looking pristine for years to come."
  },
  {
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Results That Speak for Themselves",
    description: "If your car isn't the cleanest you've ever seen it, the detail is free —no questions asked."
  }
];

const whyItWorks = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "A Proven Process",
    description: "Every detail is executed with precision and care, using top-tier products and techniques trusted by luxury car owners."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Results You'll See Immediately",
    description: "From the moment we're done, your car will turn heads—and you'll never settle for less again."
  },
  {
    icon: <LightbulbIcon className="h-6 w-6" />,
    title: "Effortless Scheduling",
    description: "Book in minutes and get personalized service tailored to your car's needs."
  }
];

export default function WhyChooseUs() {
  return (
    <>
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">What You'll Gain</h2>
            <p className="text-gray-100/90 max-w-2xl mx-auto">
              Why let luxury car care be anything less than luxurious itself? Our mobile service brings convenience and quality together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whatYouGain.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{feature.title}</h3>
                <p className="text-gray-100/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 text-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Why It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our approach is designed around what luxury car owners truly want: exceptional results with zero inconvenience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItWorks.map((item, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
