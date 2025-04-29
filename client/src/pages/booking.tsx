import BookingHero from "@/components/booking/BookingHero";
import { Helmet } from "react-helmet";

export default function Booking() {
  return (
    <>
      <Helmet>
        <title>Book Mobile Car Detailing in Irvine & Orange County | Hardys Wash N' Wax</title>
        <meta name="description" content="Schedule your mobile car detailing service in Irvine and Orange County. Professional auto detailers come to your location for convenient, premium service." />
        <meta name="keywords" content="Book Car Detailing Irvine, Schedule Mobile Detailing Orange County, Car Wash Appointment, Mobile Auto Detailing Booking" />
        <link rel="canonical" href="https://hardyswashnwax.com/booking" />
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
