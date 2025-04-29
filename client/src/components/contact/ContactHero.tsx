import { useIsMobile } from '@/hooks/use-mobile';

export default function ContactHero() {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-gradient-to-r from-red-primary to-accent-orange py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className={`text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${isMobile ? 'mobile-hero-text' : ''}`}>
          Get In Touch
        </h1>
        <p className={`text-white/90 text-lg sm:text-xl max-w-2xl mx-auto ${isMobile ? 'mobile-hero-text' : ''}`}>
          Have questions about our mobile detailing services? Need a custom quote? 
          We're here to help make your vehicle shine.
        </p>
      </div>
    </div>
  );
}