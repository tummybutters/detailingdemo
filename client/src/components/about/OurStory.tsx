export default function OurStory() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-primary font-medium mb-4">
              Meet The Founder
            </div>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Hi, I'm Ian – Welcome to Hardy's Wash N' Wax!</h2>
            <p className="text-gray-600 mb-4">
              As a 23-year-old UC Davis graduate, substitute teacher, and car detailing enthusiast, I've found my true calling in the art of automotive care. Teaching has instilled in me the values of patience, precision, and the satisfaction that comes from a job well done—qualities I bring to every vehicle I detail.
            </p>
            <p className="text-gray-600 mb-4">
              While I enjoy my time in the classroom, my ultimate goal is to transform Hardy's Wash N' Wax into a full-time career. There's something incredibly rewarding about seeing a car transform under my care, looking even better than the day it rolled off the lot.
            </p>
            <p className="text-gray-600 mb-6">
              My mission is simple: combine my passion for cars with my commitment to delivering results you'll love. Whether it's restoring your vehicle's original shine or giving it that extra polish, my focus is always on the details that matter. Let's make your car something to smile about!
            </p>
            <div className="flex items-center mt-6">
              <div className="w-16 h-1 bg-primary mr-4"></div>
              <span className="text-gray-500 italic">"Driving's better when the only thing on your mind is an open road—not a month's worth of mess under your feet."</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1599256681832-6b29a5f903c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Professional car detailing" 
              className="rounded-lg shadow-lg w-full h-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
