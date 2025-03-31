export default function BookingHero() {
  return (
    <div className="relative bg-secondary py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-90"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-heading mb-4">Book Your Appointment</h1>
          <p className="text-gray-100/90 text-xl max-w-2xl mx-auto">
            Schedule your vehicle's transformation with our premium detailing services.
          </p>
        </div>
      </div>
    </div>
  );
}
