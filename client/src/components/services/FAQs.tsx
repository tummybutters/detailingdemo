import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How long does a typical detailing service take?",
    answer: "Service times vary depending on the package and your vehicle's condition. Basic packages typically take 1-2 hours, while comprehensive detailing can take 4-8 hours. Premium services like paint correction or ceramic coating may require your vehicle for a full day or more."
  },
  {
    question: "How often should I have my vehicle detailed?",
    answer: "For regular maintenance, we recommend a basic detail every 3-4 months. Full detailing services are typically recommended 2-3 times per year. However, this can vary based on your driving conditions, vehicle storage, and personal preferences."
  },
  {
    question: "What's the difference between waxing and ceramic coating?",
    answer: "Wax provides a traditional protective layer that typically lasts 2-3 months and offers a warm, deep shine. Ceramic coatings are advanced silica-based protectants that chemically bond to your paint, lasting 2-5 years with superior protection against environmental contaminants, UV rays, and chemicals."
  },
  {
    question: "Do I need to prepare my vehicle before bringing it in?",
    answer: "We recommend removing personal belongings from your vehicle before service. No other preparation is necessary. If you're concerned about specific items or areas that need special attention, please let us know when you drop off your vehicle."
  },
  {
    question: "Can you remove all types of stains and scratches?",
    answer: "While our professional techniques can address most common issues, some deep scratches, etched-in stains, or permanent damage may not be completely restorable. During our initial inspection, we'll provide honest feedback about what results you can expect."
  }
];

export default function FAQs() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our detailing services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 py-2">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
