import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook 
} from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-primary">Our Details</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 mt-1 text-red-primary flex-shrink-0" />
          <div>
            <h3 className="font-medium">Service Area</h3>
            <p className="text-gray-600">
              Irvine, Orange County & Greater Southern California
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 mt-1 text-red-primary flex-shrink-0" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+19495556789" className="hover:text-accent-orange transition-colors">
                (949) 555-6789
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 mt-1 text-red-primary flex-shrink-0" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:info@hardyswashnwax.com" className="hover:text-accent-orange transition-colors">
                info@hardyswashnwax.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 mt-1 text-red-primary flex-shrink-0" />
          <div>
            <h3 className="font-medium">Business Hours</h3>
            <ul className="text-gray-600 space-y-1">
              <li className="grid grid-cols-2">
                <span>Monday - Friday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="grid grid-cols-2">
                <span>Saturday</span>
                <span>8:00 AM - 4:00 PM</span>
              </li>
              <li className="grid grid-cols-2">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-6">
          <h3 className="font-medium mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/hardyswashnwax" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-primary/10 hover:bg-red-primary text-red-primary hover:text-white p-3 rounded-full transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/hardyswashnwax" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-primary/10 hover:bg-red-primary text-red-primary hover:text-white p-3 rounded-full transition-all duration-300"
            >
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}