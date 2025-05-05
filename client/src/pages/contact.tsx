import { Helmet } from 'react-helmet';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Mobile Car Detailing in Davis & Woodland | Hardys Wash N' Wax</title>
        <meta name="description" content="Get in touch with Hardys Wash N' Wax for premium mobile car detailing services in Davis, Woodland and throughout Yolo County. Contact us for quotes, custom services, or any questions about our mobile detailing." />
        <meta name="keywords" content="Contact Car Detailer Davis CA, Mobile Car Detailing Quote Woodland, Auto Detailing Questions UC Davis, Premium Car Wash Contact Yolo County" />
        <link rel="canonical" href="https://hardyswashnwax.com/contact" />
        
        {/* Structured Data for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Hardys Wash N' Wax",
            "description": "Contact page for Hardys Wash N' Wax mobile car detailing services in Davis, Woodland and Yolo County.",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "telephone": "+19497340201",
              "email": "info@hardyswashnwax.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Davis",
                "addressRegion": "CA",
                "postalCode": "95616",
                "addressCountry": "US"
              },
              "openingHours": "Mo-Sa 8:00-18:00",
              "areaServed": [
                { "@type": "City", "name": "Davis, CA" },
                { "@type": "City", "name": "Woodland, CA" },
                { "@type": "City", "name": "Dixon, CA" },
                { "@type": "City", "name": "Winters, CA" },
                { "@type": "City", "name": "West Sacramento, CA" }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <ContactHero />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-red-primary">How far do you travel?</h3>
              <p className="text-gray-700">We service all of Davis, Woodland, Dixon, Winters, West Sacramento and throughout Yolo County. We typically travel up to 30 minutes from our Davis base. Contact us with your location for confirmation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-red-primary">Do you need water or electricity?</h3>
              <p className="text-gray-700">We need access to a water source from the customer. Please ensure you have a functioning outdoor water spigot available. Our equipment is powered by our own generators, so no electricity is required.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-red-primary">How long does a detailing take?</h3>
              <p className="text-gray-700">It depends on the service and vehicle size. Express details take 1.5-2.5 hours, while full details may take 3-6 hours.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-red-primary">Do you offer gift certificates?</h3>
              <p className="text-gray-700">Yes! Our detailing gift certificates make perfect presents. Contact us for options and purchasing.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}