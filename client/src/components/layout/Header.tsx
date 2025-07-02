import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import hardyLogoPath from "@assets/hardy logo-Photoroom.png";
import CallOption from "../home/CallOption";
import AskIan from "@/components/ui/ask-ian-chat";
import "../ui/custom-nav-button.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Book Now" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" }
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
            {/* Ask Ian chatbot */}
            <AskIan variant="header" className="ml-2" />
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
                
                {/* Ask Ian chatbot for mobile */}
                <div className="mt-4 pt-4 border-t border-black/10">
                  <div className="text-center mb-3">
                    <AskIan variant="header" className="mx-auto justify-center" />
                  </div>
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
