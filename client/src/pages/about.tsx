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
        <title>About Hardys Wash N' Wax | Mobile Car Detailing in Irvine & Orange County</title>
        <meta name="description" content="Learn about Hardys Wash N' Wax, a premium mobile car detailing service in Irvine and Orange County. Meet our certified detailing professional." />
        <meta name="keywords" content="Car Detailing Irvine, Car Detailing Orange County, Professional Auto Detailer, Certified Car Detailing" />
        <link rel="canonical" href="https://hardyswashnwax.com/about" />
      </Helmet>
      <AboutHero />
      <OurStory />
      <OurValues />
      <Certifications />
      <ContactCTA />
    </>
  );
}
