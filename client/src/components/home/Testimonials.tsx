import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Driving's better when the only thing on your mind is an open road—not a month's worth of mess under your feet. This team gave my Mercedes that showroom feel again!",
    author: "Michael J.",
    role: "Mercedes C-Class Owner",
    rating: 5
  },
  {
    id: 2,
    content: "People underestimate the calm of a deep breath in a car that feels brand new. After their premium interior service, my car feels better than when I first bought it.",
    author: "Sarah W.",
    role: "Audi Q5 Owner",
    rating: 5
  },
  {
    id: 3,
    content: "As someone who's tried several detailing services in Irvine, nothing comes close to this level of convenience and quality. They transformed my car while I was in meetings!",
    author: "David C.",
    role: "Tesla Model 3 Owner",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-red-600 text-red-600" />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-red-600" />
          <Star className="absolute top-0 left-0 fill-red-600 text-red-600 overflow-hidden w-[50%]" />
        </div>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-red-600" />);
    }
    
    return stars;
  };
  
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transformative results, delivered at your doorstep—see why our clients keep coming back.
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`bg-white p-8 rounded-lg shadow-md ${index === activeTestimonial ? 'block' : 'hidden'}`}
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1 text-red-600">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="text-gray-800 text-lg italic mb-6">"{testimonial.content}"</p>
                <div className="mt-auto">
                  <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-primary' : 'bg-primary/30'}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none text-primary hover:text-red-600 transition-colors"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none text-primary hover:text-red-600 transition-colors"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
