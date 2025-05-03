import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <div className="bg-[#FFB375] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Have Questions? Contact Us</h2>
          <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto">
            Our team is ready to answer any questions you may have about our services or schedule.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" size="lg" className="inline-flex items-center bg-white text-[#EE432C] hover:bg-gray-100 gap-2 border border-gray-800 shadow-md rounded-md">
              <a href="tel:+19497340201">
                <Phone className="h-5 w-5" /> +1 949-734-0201
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-gray-800 border border-gray-800 hover:bg-gray-100 inline-flex items-center gap-2 shadow-md rounded-md">
              <a href="mailto:hardyswashnwax@gmail.com">
                <Mail className="h-5 w-5" /> hardyswashnwax@gmail.com
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
