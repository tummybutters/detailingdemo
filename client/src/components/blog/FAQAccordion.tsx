import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from '@/types/blogTypes';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="my-8 bg-[#FFD7B5]/20 p-6 rounded-lg border-2 border-black">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-white rounded-lg shadow-md border-2 border-black overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:bg-[#FFD7B5]/30 font-semibold text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 border-t border-gray-200">
              <p className="text-gray-700">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQAccordion;