import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import hardyLogoPath from "@assets/hardy logo-Photoroom.png";
import CallOption from "../home/CallOption";
import "../ui/custom-nav-button.css";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Book Now" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" }
];

const locationLinks = [
  { href: "/", label: "Davis, CA" },
  { href: "/orange-county", label: "Orange County, CA" }
];

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 bg-light-orange shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src={hardyLogoPath} 
                alt="Hardys Wash N' Wax" 
                className="h-12" 
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end space-x-2">
            {/* Locations Dropdown */}
            <div className="relative group">
              <button className="nav-button flex items-center space-x-1 group/button">
                <span>Locations</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/button:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform scale-95 group-hover:scale-100 z-50">
                <div className="py-3">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-2">
                    Service Areas
                  </div>
                  {locationLinks.map((link, index) => (
                    <Link key={link.href} href={link.href}>
                      <button className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFB375]/10 hover:to-[#EE432C]/10 hover:text-[#EE432C] hover:translate-x-1 ${isActive(link.href) ? 'bg-gradient-to-r from-[#FFB375]/20 to-[#EE432C]/20 text-[#EE432C] border-r-2 border-[#EE432C]' : 'text-gray-700'} ${index === 0 ? 'rounded-t-lg' : ''} ${index === locationLinks.length - 1 ? 'rounded-b-lg' : ''}`}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${isActive(link.href) ? 'bg-[#EE432C]' : 'bg-gray-300'}`}></div>
                          <span>{link.label}</span>
                        </div>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
              >
                <button className={`nav-button ${isActive(link.href) ? 'active' : ''}`}>
                  {link.label}
                </button>
              </Link>
            ))}
            
            {/* Call button in header */}
            <CallOption 
              phone="19497340201" 
              variant="compact" 
              className="ml-2" 
            />
          </div>
          
          {/* Mobile Navigation Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-text-dark">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-light-orange">
              <div className="flex flex-col mt-12">
                {/* Locations section for mobile */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2 px-6">Locations</div>
                  {locationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      <button className={`mobile-nav-button ${isActive(link.href) ? 'active' : ''}`}>
                        {link.label}
                      </button>
                    </Link>
                  ))}
                </div>
                
                <div className="border-t border-black/10 pt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      <button className={`mobile-nav-button ${isActive(link.href) ? 'active' : ''}`}>
                        {link.label}
                      </button>
                    </Link>
                  ))}
                </div>
                
                {/* Call option for mobile menu */}
                <div className="mt-4 pt-4 border-t border-black/10">
                  <div className="text-center mb-2 text-sm font-medium">Give us a call</div>
                  <CallOption 
                    phone="19497340201" 
                    text="" 
                    className="mx-auto justify-center"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
