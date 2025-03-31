export default function AboutHero() {
  return (
    <div className="relative bg-secondary py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-90"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-2 mb-4">
            <span className="text-white font-medium">Welcome to Hardy's Wash N' Wax</span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold font-heading mb-6">Where Passion Meets Precision</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-gray-100/90 text-xl max-w-2xl mx-auto">
            We bring luxury detailing to your doorstep, transforming cars into their most pristine state, one detail at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
