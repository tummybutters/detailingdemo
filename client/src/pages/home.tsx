import Hero from "@/components/home/Hero";
import FeaturedServicesNew from "@/components/home/FeaturedServicesNew";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import GoogleReviews from "@/components/home/GoogleReviews";
import CallToAction from "@/components/home/CallToAction";
import { Helmet } from "react-helmet";
import "@/components/ui/carousel.css";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hardys Wash N' Wax | Mobile Car Detailing Irvine & Orange County</title>
        <meta name="description" content="Premium mobile car detailing in Irvine and Orange County. Our professional car detailing services come to your location for convenience and quality results." />
        <meta name="keywords" content="Car Detailing Irvine, Mobile Car Detailing Orange County, Auto Detailing SoCal, Premium Mobile Detailing" />
        <link rel="canonical" href="https://hardyswashnwax.com/" />
        
        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Hardys Wash N' Wax",
            "image": "https://hardyswashnwax.com/logo.png",
            "description": "Premium mobile car detailing service that comes to your location in Irvine and throughout Orange County.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Irvine",
              "addressRegion": "CA",
              "postalCode": "92618",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 33.6846,
              "longitude": -117.8265
            },
            "telephone": "+17145551234",
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
            "sameAs": [
              "https://www.facebook.com/hardyswashnwax",
              "https://www.instagram.com/hardyswashnwax"
            ]
          })}
        </script>
      </Helmet>
      <Hero />
      <FeaturedServicesNew />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  );
}
