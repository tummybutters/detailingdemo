import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import Certifications from "@/components/about/Certifications";
import ContactCTA from "@/components/about/ContactCTA";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Hardys Wash N' Wax | Mobile Car Detailing in Davis & Woodland</title>
        <meta name="description" content="Learn about Hardys Wash N' Wax, a premium mobile car detailing service in Davis, Woodland, and throughout Yolo County. Meet our certified detailing professionals serving UC Davis and surrounding areas." />
        <meta name="keywords" content="Car Detailing Davis CA, Car Detailing Woodland CA, Professional Auto Detailer UC Davis, Certified Car Detailing Yolo County" />
        <link rel="canonical" href="https://hardyswashnwax.com/about" />
        
        {/* Structured Data for About Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Hardys Wash N' Wax",
            "description": "Learn about our premium mobile detailing services in Davis, Woodland and throughout Yolo County.",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "image": "https://hardyswashnwax.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Davis",
                "addressRegion": "CA",
                "postalCode": "95616",
                "addressCountry": "US"
              },
              "areaServed": [
                { "@type": "City", "name": "Davis, CA" },
                { "@type": "City", "name": "Woodland, CA" },
                { "@type": "City", "name": "Dixon, CA" },
                { "@type": "City", "name": "Winters, CA" },
                { "@type": "City", "name": "West Sacramento, CA" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Car Detailing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Express Detail"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Full Detail"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Ceramic Coating"
                    }
                  }
                ]
              }
            }
          })}
        </script>
      </Helmet>
      <AboutHero />
      <OurStory />
      <OurValues />
      <Certifications />
      <ContactCTA />
    </>
  );
}
