import { Helmet } from 'react-helmet';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Hardys Wash N' Wax</title>
        <meta name="description" content="Get in touch with Hardys Wash N' Wax for premium mobile car detailing services in Orange County. Contact us for quotes, bookings, or any questions." />
        <link rel="canonical" href="https://hardyswashnwax.com/contact" />
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
              <p className="text-gray-700">We service all of Orange County and parts of neighboring counties. Contact us with your location for confirmation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2 text-red-primary">Do you need water or electricity?</h3>
              <p className="text-gray-700">We're fully self-contained! Our mobile setup includes water and power, so we can detail your vehicle anywhere.</p>
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