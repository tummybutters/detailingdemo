import { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Reviews data from Google
const googleReviews = [
  {
    id: 1,
    author: "Miranda King",
    time: "3 weeks ago",
    content: "Great experience! Prompt communication, easy scheduling and wonderful results. Complete transformation of my super dirty car.",
    rating: 5
  },
  {
    id: 2,
    author: "Tim Watts",
    time: "2 weeks ago",
    content: "The car 'Betty' is showroom ready. Thank you Ian Hardy, great job!",
    rating: 5
  },
  {
    id: 3,
    author: "Pat Hardy",
    time: "6 days ago",
    content: "Ian has restored our 6 and 10-year-old Toyota & Lexus SUVs to virtually new condition. We highly recommend his detailing service—not just because he is our grandson, but also because he just plain did a great job!",
    rating: 5
  },
  {
    id: 4,
    author: "Arya Dehghani",
    time: "3 weeks ago",
    content: "I wish Ian could detail my house. My car's exterior was flawless, spotless. I took my car through skiing trips and off-roading, and he made it look like it just came off the lot.",
    rating: 5
  },
  {
    id: 5,
    author: "Sam Cornell",
    time: "1 week ago",
    content: "Ian was incredible from the moment we contacted him and through our appointment. He had us scheduled within 3 minutes of contacting & confirmed and followed up days leading to our appointment as well as keeping us updated on his ETA in case of any changes.",
    rating: 5
  },
  {
    id: 6,
    author: "Mohammad Bandar Alburaidi",
    time: "2 months ago",
    content: "Honestly amazing work, I genuinely have not even noticed the color of my wheels until Hardy washed my car. Amazing guy, easy to work with and really flexible, works honestly and is very transparent, 100% would recommend to anyone!",
    rating: 5
  },
  {
    id: 7,
    author: "Aaron Abed",
    time: "5 months ago",
    content: "⭐️⭐️⭐️⭐️⭐️ - Beyond Perfection! I took my car to Hardy's Wash and Wax after a long road trip that left it coated in dirt and grime, and WOW, I was blown away! Hardy and his team transformed my car to look like new.",
    rating: 5
  },
  {
    id: 8,
    author: "Alyssa Rowe",
    time: "1 month ago",
    content: "I had a great experience with Ian! I originally booked one car for an interior detail and they were able to come out same day. Upon arrival, I asked if they had the time and resources to detail two other cars for my family. Ian was very accommodating and did an excellent job on all three vehicles.",
    rating: 5
  },
  {
    id: 9,
    author: "Matthew Bernard",
    time: "1 month ago",
    content: "Needed my car cleaned super late notice. He was very accommodating and got me in ASAP. My car was a mess and he laid out all my options and explained what he would do. Amazing job and amazing service!",
    rating: 5
  },
  {
    id: 10,
    author: "Ruby Campbell",
    time: "2 months ago",
    content: "Amazing experience! My car has never looked better. An amazing choice for anyone needing any type of cleaning/detailing service for their car. Highly recommended!",
    rating: 5
  },
  {
    id: 11,
    author: "Jasmine Enriquez",
    time: "5 months ago",
    content: "This was the best detail my car has ever received, like the first day it came off the lot. Ian pays insane attention to every little aspect of your car's interior and exterior & goes above and beyond on any requests you may have. 100% recommend booking with him to show your car some love.",
    rating: 5
  },
  {
    id: 12,
    author: "Jordan Raymond",
    time: "3 months ago",
    content: "The best detailing business I've ever hired! Ian did a tremendous job on my older truck and left it better than I could've ever imagined!",
    rating: 5
  },
  {
    id: 13,
    author: "Nathan Butcher",
    time: "3 months ago",
    content: "Wow, this guy left my car in better shape than when I bought it. It had lots of scratches, but he polished it and it looks like a mirror. I highly recommend these guys.",
    rating: 5
  },
  {
    id: 14,
    author: "Chuckie Wetzel",
    time: "3 months ago",
    content: "Literally the best car detail I've ever had! Changed my car's life and the work lasted for months. If you want your car right, definitely go to Hardy's.",
    rating: 5
  },
  {
    id: 15,
    author: "Brad Koo",
    time: "3 months ago",
    content: "Amazing and personable service. One of the best car details I have ever gotten and left my car shiny and smelling good. Will definitely come back!",
    rating: 5
  },
  {
    id: 16,
    author: "Leo DeBruhl",
    time: "3 months ago",
    content: "I cannot show enough love to Hardy's Wash n' Wax! This guy is an incredibly hard worker and won't stop until the job is completed to the highest standard. I got the inside and outside detailed and immediately received compliments from my friends.",
    rating: 5
  },
  {
    id: 17,
    author: "Jake De Vries",
    time: "4 months ago",
    content: "Unmatched attention to detail. Hardy's cares about each client and car as if it were their own. Will definitely continue coming back for their premier car care.",
    rating: 5
  },
  {
    id: 18,
    author: "Carlos Valdivia",
    time: "1 month ago",
    content: "Ian's work is phenomenal. He is punctual and professional, highly recommend.",
    rating: 5
  },
  {
    id: 19,
    author: "Peyton Yee",
    time: "1 week ago",
    content: "Great customer service. Appreciates the cars.",
    rating: 5
  },
  {
    id: 20,
    author: "Ryb0jo",
    time: "3 months ago",
    content: "Very chill hardworking gentleman. I was impressed with the work and got a free air freshener!",
    rating: 5
  },
  {
    id: 21,
    author: "Luke De Vries",
    time: "5 months ago",
    content: "Attention to detail! Had my Jeep looking brand new.",
    rating: 5
  },
  {
    id: 22,
    author: "Luke Parness",
    time: "3 months ago",
    content: "Convenient and easy, very nice guy also.",
    rating: 5
  },
  {
    id: 23,
    author: "Gabe Olin",
    time: "3 months ago",
    content: "Great attention to detail. Stellar job.",
    rating: 5
  },
  {
    id: 24,
    author: "Keanna Glenn-Mills",
    time: "2 days ago",
    content: "This guy is awesome. Totally transformed my trunk. He was super nice and very efficient. Definitely recommend!",
    rating: 5
  },
  {
    id: 25,
    author: "Helix",
    time: "3 days ago",
    content: "Ian was super friendly and did a great job cleaning my car. Can't even tell where a large piece of cake landed in my back seat!",
    rating: 5
  }
];

const GoogleReviewCard = ({ review }: { review: typeof googleReviews[0] }) => {
  return (
    <div className="flex flex-col h-full bg-white p-5 rounded-lg shadow-md mr-4 min-w-[300px] max-w-[340px]">
      <div className="flex items-center mb-3">
        <div className="flex space-x-0.5">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill="#EE432C" 
              className="text-[#EE432C]" 
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        <div className="mr-3 flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
          {review.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{review.author}</h4>
          <p className="text-sm text-gray-500">{review.time}</p>
        </div>
      </div>
      
      <p className="text-gray-700 flex-grow line-clamp-4 mb-3">"{review.content}"</p>
      
      <div className="flex items-center mt-auto">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo" 
          className="h-5 mr-2" 
        />
        <span className="text-sm text-gray-500">Posted on Google</span>
      </div>
    </div>
  );
};

export default function GoogleReviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    skipSnaps: false,
    draggable: true
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };
  
  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  // Split reviews into two rows
  const rowOne = googleReviews.slice(0, Math.ceil(googleReviews.length / 2));
  const rowTwo = googleReviews.slice(Math.ceil(googleReviews.length / 2));

  // Initialize or cleanup the Embla instance
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();
    
    // Autoplay setup
    const startAutoplay = () => {
      stopAutoplay();
      if (autoplayActive) {
        autoplayIntervalRef.current = setInterval(() => {
          if (emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollTo(0);
          }
        }, 5000); // Scroll every 5 seconds
      }
    };
    
    const stopAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
    
    // Start autoplay initially
    startAutoplay();
    
    // Pause autoplay on user interaction and restart when idle
    const handlePointerDown = () => {
      stopAutoplay();
      setAutoplayActive(false);
    };
    
    const handlePointerUp = () => {
      setAutoplayActive(true);
      startAutoplay();
    };
    
    emblaApi.on('pointerDown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    
    return () => {
      stopAutoplay();
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [emblaApi, autoplayActive]);

  return (
    <div className="bg-gradient-to-br from-[#F3F4E6] to-[#FFD7B5] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Are Saying</h2>
          <div className="flex items-center justify-center mb-2">
            <div className="flex space-x-1">
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">5.0</span>
            <span className="ml-2 text-gray-700">on Google Reviews</span>
          </div>
        </div>

        <div className="space-y-10">
          {/* First Row */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {rowOne.map((review) => (
                  <GoogleReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Second Row - Reverse Direction */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-carousel-reverse">
                {rowTwo.map((review) => (
                  <GoogleReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="bg-white text-[#EE432C] border border-[#EE432C] hover:bg-[#EE432C] hover:text-white transition-colors duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-sm"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            className="bg-white text-[#EE432C] border border-[#EE432C] hover:bg-[#EE432C] hover:text-white transition-colors duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-sm"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next reviews"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}