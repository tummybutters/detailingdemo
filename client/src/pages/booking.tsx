import BookingHero from "@/components/booking/BookingHero";
import { Helmet } from "react-helmet";

export default function Booking() {
  return (
    <>
      <Helmet>
        <title>Book Mobile Car Detailing in Davis, Woodland & Yolo County | Hardys Wash N' Wax</title>
        <meta name="description" content="Schedule your mobile car detailing service in Davis, Woodland and Yolo County. Our professional auto detailers come to your location for convenient, premium service at your home or office." />
        <meta name="keywords" content="Book Car Detailing Davis CA, Schedule Mobile Detailing UC Davis, Car Wash Appointment Woodland CA, Mobile Auto Detailing Booking Yolo County" />
        <link rel="canonical" href="https://www.hardyswashnwax.com/booking" />
        
        {/* Structured Data for Reservation */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ReservationService",
            "name": "Hardys Wash N' Wax Mobile Detail Booking",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Hardys Wash N' Wax",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Davis",
                "addressRegion": "CA",
                "postalCode": "95616",
                "addressCountry": "US"
              }
            },
            "serviceType": "Mobile Car Detailing",
            "availableAtOrFrom": [
              { "@type": "Place", "name": "Davis, CA" },
              { "@type": "Place", "name": "Woodland, CA" },
              { "@type": "Place", "name": "Dixon, CA" },
              { "@type": "Place", "name": "Winters, CA" },
              { "@type": "Place", "name": "West Sacramento, CA" }
            ]
          })}
        </script>
      </Helmet>
      <BookingHero />
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <iframe 
          src="https://hardyswashnwax.fieldd.co" 
          style={{
            overflow: "scroll", 
            width: "100%", 
            maxWidth: "1300px", 
            minHeight: "calc(85vh)",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
          title="Hardys Wash N' Wax Booking System"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
