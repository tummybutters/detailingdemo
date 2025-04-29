import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-red-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-gray-700">
              <a href="tel:+17147134937" className="hover:text-orange-500 transition-colors">
                (714) 713-4937
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-red-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-700">
              <a href="mailto:info@hardyswashnwax.com" className="hover:text-orange-500 transition-colors">
                info@hardyswashnwax.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-red-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium">Service Area</h3>
            <p className="text-gray-700">Davis, CA | Orange County | Greater SoCal</p>
            <p className="text-sm text-gray-500 mt-1">
              We come to you! Our mobile detailing service travels throughout Davis, Orange County, and the Greater Southern California area.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-red-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium">Business Hours</h3>
            <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-700">Saturday: 9:00 AM - 5:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Instagram className="h-5 w-5 text-red-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium">Social Media</h3>
            <p className="text-gray-700">
              <a 
                href="https://www.instagram.com/hardyswashnwax/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
              >
                @hardyswashnwax
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-2">Book a Service</h3>
        <p className="text-sm text-gray-600 mb-3">
          Ready for a premium detailing experience? Book online or contact us directly.
        </p>
        <a 
          href="/booking" 
          className="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium px-4 py-2 rounded shadow-sm hover:from-orange-500 hover:to-red-600 transition-all"
        >
          Schedule Now
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;