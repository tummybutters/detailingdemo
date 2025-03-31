import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">Have Questions? Contact Us</h2>
          <p className="text-gray-100/90 text-lg mb-8 max-w-2xl mx-auto">
            Our team is ready to answer any questions you may have about our services or schedule.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" size="lg" className="inline-flex items-center bg-white text-primary hover:bg-gray-100 gap-2">
              <a href="tel:+15555551234">
                <Phone className="h-5 w-5" /> (555) 555-1234
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-transparent inline-flex items-center gap-2">
              <a href="mailto:info@premiumshine.com">
                <Mail className="h-5 w-5" /> info@premiumshine.com
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
