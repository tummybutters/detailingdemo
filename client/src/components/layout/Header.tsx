import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import hardyLogoPath from "@assets/hardy logo-Photoroom.png";
import "../ui/custom-nav-button.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Now" },
  { href: "/about", label: "About Us" }
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
          <div className="hidden md:flex items-center justify-end">
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
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
