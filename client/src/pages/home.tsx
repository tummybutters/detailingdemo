import Hero from "@/components/home/Hero";
import FeaturedServicesNew from "@/components/home/FeaturedServicesNew";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GoogleReviews from "@/components/home/GoogleReviews";
import CallToAction from "@/components/home/CallToAction";
import { Helmet } from "react-helmet";
import "@/components/ui/carousel.css";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mobile Car Detailing Near Me | Full-Service Car Wash | Hardy's W&W</title>
        <meta name="description" content="Top-rated mobile car detailing at your home or office. Interior detailing, ceramic coating, and full-service car wash in Davis, Sacramento & nearby." />
        <meta name="keywords" content="Car Detailing Davis CA, Mobile Car Detailing UC Davis, Auto Detailing Woodland, Premium Mobile Detailing Yolo County, Car Wash Near UC Davis" />
        <link rel="canonical" href="https://hardyswashnwax.com/" />
        
        {/* Structured Data for Local Business with speakable content */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoWash",
            "name": "Hardys Wash N' Wax",
            "image": "https://hardyswashnwax.com/logo.png",
            "description": "Premium mobile car detailing service that comes to your location in Davis and throughout Yolo County.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Davis",
              "addressRegion": "CA",
              "postalCode": "95616",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.5449,
              "longitude": -121.7405
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
              { "@type": "Place", "name": "Davis, CA"},
              { "@type": "Place", "name": "Woodland, CA"},
              { "@type": "Place", "name": "Dixon, CA"},
              { "@type": "Place", "name": "Winters, CA"},
              { "@type": "Place", "name": "West Sacramento, CA"}
            ],
            "sameAs": [
              "https://www.facebook.com/hardyswashnwax",
              "https://www.instagram.com/hardyswashnwax"
            ]
          })}
        </script>
      </Helmet>
      <Hero />
      <GoogleReviews />
      <FeaturedServicesNew />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}
