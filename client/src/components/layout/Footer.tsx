import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Hardys Wash N' Wax</h3>
            <p className="text-white/90 mb-4">
              Professional mobile detailing services committed to excellence and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#FFB375] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FFB375] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FFB375] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FFB375] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white hover:text-[#FFB375] transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-white hover:text-[#FFB375] transition-colors">Services</Link></li>
              <li><Link href="/booking" className="text-white hover:text-[#FFB375] transition-colors">Book Now</Link></li>
              <li><Link href="/about" className="text-white hover:text-[#FFB375] transition-colors">About Us</Link></li>
              <li><a href="#" className="text-white hover:text-[#FFB375] transition-colors">Gallery</a></li>
              <li><a href="#" className="text-white hover:text-[#FFB375] transition-colors">Reviews</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 text-[#FFB375] mt-1" size={18} />
                <span className="text-white">Irvine, Orange County, CA</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 text-[#FFB375] mt-1" size={18} />
                <span className="text-white">+1 949-734-0201</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 text-[#FFB375] mt-1" size={18} />
                <span className="text-white">hardyswashnwax@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Business Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-white">Monday - Friday</span>
                <span className="text-[#FFB375] font-medium">8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white">Saturday</span>
                <span className="text-[#FFB375] font-medium">9:00 AM - 3:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white">Sunday</span>
                <span className="text-[#FFB375] font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hardys Wash N' Wax. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
