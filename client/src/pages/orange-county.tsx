import LegacyHero from "@/components/home/LegacyHero";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GoogleReviews from "@/components/home/GoogleReviews";
import CallToAction from "@/components/home/CallToAction";
import { Helmet } from "react-helmet";
import "@/components/ui/carousel.css";

export default function OrangeCounty() {
  return (
    <>
      <Helmet>
        <title>Orange County Mobile Car Detailing | Newport Beach, Irvine, Tustin, Huntington Beach</title>
        <meta name="description" content="Premium mobile car detailing in Orange County. Serving Newport Beach, Irvine, Tustin, Huntington Beach, San Clemente, and Costa Mesa. Interior detailing, exterior detailing, paint correction, ceramic coating. 24/7 by appointment." />
        <meta name="keywords" content="Car Detailing Orange County CA, Mobile Car Detailing Newport Beach, Auto Detailing Irvine, Premium Mobile Detailing Tustin, Car Wash Huntington Beach, San Clemente Car Detailing, Costa Mesa Auto Detail, Laguna Beach Car Wash" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Orange County Mobile Car Detailing | Newport Beach, Irvine, Tustin" />
        <meta property="og:description" content="Premium mobile car detailing in Orange County. Serving Newport Beach, Irvine, Tustin, Huntington Beach, and San Clemente. Interior detailing, exterior detailing, paint correction, ceramic coating." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hardyswashnwax.com/orange-county" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Orange County Mobile Car Detailing | Newport Beach, Irvine, Tustin" />
        <meta name="twitter:description" content="Premium mobile car detailing in Orange County. Serving Newport Beach, Irvine, Tustin, Huntington Beach, and San Clemente. Interior detailing, exterior detailing, paint correction, ceramic coating." />
        
      <link rel="canonical" href="https://www.hardyswashnwax.com/orange-county" />
        
        {/* Structured Data for Local Business with Orange County focus */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoWash",
            "name": "Hardys Wash N' Wax - Orange County",
            "image": "https://hardyswashnwax.com/logo.png",
            "description": "Premium mobile car detailing in Orange County. Serving Newport Beach, Irvine, Tustin, Huntington Beach, and San Clemente. Interior detailing, exterior detailing, paint correction, ceramic coating.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Newport Beach",
              "addressRegion": "CA",
              "postalCode": "92660",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 33.6189,
              "longitude": -117.9298
            },
            "telephone": "+19497340201",
            "priceRange": "$$$",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "16:00"
              }
            ],
            "areaServed": [
              { "@type": "Place", "name": "Newport Beach, CA"},
              { "@type": "Place", "name": "Irvine, CA"},
              { "@type": "Place", "name": "Tustin, CA"},
              { "@type": "Place", "name": "Huntington Beach, CA"},
              { "@type": "Place", "name": "San Clemente, CA"},
              { "@type": "Place", "name": "Costa Mesa, CA"},
              { "@type": "Place", "name": "Laguna Beach, CA"}
            ],
            "sameAs": [
              "https://www.facebook.com/hardyswashnwax",
              "https://www.instagram.com/hardyswashnwax"
            ]
          })}
        </script>
      </Helmet>
      <LegacyHero location="orange-county" />
      <GoogleReviews />
      <ServicesShowcase />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}
