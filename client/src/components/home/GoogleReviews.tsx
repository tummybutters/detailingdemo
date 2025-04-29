import { Star } from 'lucide-react';

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
    <div className="review-card">
      <div className="review-content">
        <div className="flex items-center justify-between">
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
          <div className="review-time">{review.time}</div>
        </div>
        
        <div className="review-author">{review.author}</div>
        
        <div className="review-text">"{review.content}"</div>
        
        <div className="review-footer">
          Posted on Google
        </div>
      </div>
    </div>
  );
};

export default function GoogleReviews() {
  // Split reviews into two rows
  const rowOne = googleReviews.slice(0, Math.ceil(googleReviews.length / 2));
  const rowTwo = googleReviews.slice(Math.ceil(googleReviews.length / 2));

  return (
    <div className="bg-[#F3F4E6] py-16 relative">
      {/* Neo Brutalism background element */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#FFB375] border-b-[0.5vmin] border-black"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 mt-8">
          <div className="inline-block px-6 py-4 mb-4 bg-[#EE432C] border-[0.4vmin] border-black shadow-[0.4rem_0.4rem_0_#05060f]">
            <h2 className="text-3xl font-extrabold text-white">What Our Customers Are Saying</h2>
          </div>
          <div className="flex items-center justify-center mb-2 mt-4">
            <div className="flex space-x-1">
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
              <Star fill="#EE432C" className="text-[#EE432C]" />
            </div>
            <span className="ml-2 text-xl font-extrabold text-gray-900">5.0</span>
            <span className="ml-2 text-gray-700 font-medium">on Google Reviews</span>
          </div>
        </div>

        <div className="space-y-10">
          {/* First Row - Continuous scroll */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="continuous-carousel">
                {/* Double the cards for seamless loop effect */}
                {[...rowOne, ...rowOne].map((review, index) => (
                  <GoogleReviewCard key={`${review.id}-${index}`} review={review} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Second Row - Continuous scroll in reverse direction */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="continuous-carousel-reverse">
                {/* Double the cards for seamless loop effect */}
                {[...rowTwo, ...rowTwo].map((review, index) => (
                  <GoogleReviewCard key={`${review.id}-${index}`} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Google Reviews Button */}
        <div className="flex justify-center mt-10">
          <a 
            href="https://www.google.com/maps/place/Hardy's+Wash+N'+Wax/@36.021654,-119.6405944,7z/data=!4m16!1m9!3m8!1s0xb7923c2630ca509:0x5009d49d618f9525!2sHardy's+Wash+N'+Wax!8m2!3d36.021654!4d-119.6405944!9m1!1b1!16s%2Fg%2F11lw10v4qc!3m5!1s0xb7923c2630ca509:0x5009d49d618f9525!8m2!3d36.021654!4d-119.6405944!16s%2Fg%2F11lw10v4qc?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="google-review-btn"
          >
            <span>See All Reviews on Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}