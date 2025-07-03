import Hero from "@/components/home/Hero";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GoogleReviews from "@/components/home/GoogleReviews";
import CallToAction from "@/components/home/CallToAction";
import { Helmet } from "react-helmet";
import "@/components/ui/carousel.css";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Sacramento Mobile Car Detailing | Davis, Woodland, Elk Grove</title>
        <meta name="description" content="Premium mobile car detailing in Sacramento. Serving Davis, Woodland, Elk Grove, Dixon, and Winters. Interior detailing, exterior detailing, paint correction, ceramic coating." />
        <meta name="keywords" content="Car Detailing Sacramento CA, Mobile Car Detailing Davis, Auto Detailing Woodland, Premium Mobile Detailing Elk Grove, Car Wash Sacramento County" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Sacramento Mobile Car Detailing | Davis, Woodland, Elk Grove" />
        <meta property="og:description" content="Premium mobile car detailing in Sacramento. Serving Davis, Woodland, Elk Grove, Dixon, and Winters. Interior detailing, exterior detailing, paint correction, ceramic coating." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hardyswashnwax.com" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sacramento Mobile Car Detailing | Davis, Woodland, Elk Grove" />
        <meta name="twitter:description" content="Premium mobile car detailing in Sacramento. Serving Davis, Woodland, Elk Grove, Dixon, and Winters. Interior detailing, exterior detailing, paint correction, ceramic coating." />
        
        <link rel="canonical" href="https://www.hardyswashnwax.com" />
        
        {/* Structured Data for Local Business with Sacramento focus */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoWash",
            "name": "Hardys Wash N' Wax - Sacramento",
            "image": "https://hardyswashnwax.com/logo.png",
            "description": "Premium mobile car detailing in Sacramento. Serving Davis, Woodland, Elk Grove, Dixon, and Winters. Interior detailing, exterior detailing, paint correction, ceramic coating.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sacramento",
              "addressRegion": "CA",
              "postalCode": "95814",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.5816,
              "longitude": -121.4944
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
              { "@type": "Place", "name": "Sacramento, CA"},
              { "@type": "Place", "name": "Davis, CA"},
              { "@type": "Place", "name": "Woodland, CA"},
              { "@type": "Place", "name": "Elk Grove, CA"},
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
      <ServicesShowcase />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}
