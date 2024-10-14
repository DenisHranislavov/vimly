import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <div className="max-w-[1240px] h-[60vh] mx-auto flex flex-col items-center py-10 gap-5 px-5 text-center">
      <Badge variant="outline" className="text-lg">
        Frequently Asked Questions
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold">
        Got Questions? We’ve Got Answers.
      </h2>
      <Accordion type="single" collapsible className="w-full mt-5 text-left">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg md:text-xl">
            What is Vimly?
          </AccordionTrigger>
          <AccordionContent>
            Vimly is a platform that provides tools, videos, and resources for
            creators to upload content and stay updated on the latest trends.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg md:text-xl">
            How can I upload videos?
          </AccordionTrigger>
          <AccordionContent>
            To upload a video, simply sign in to your account, navigate to the
            upload section, and follow the instructions to add your content.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg md:text-xl">
            Is there a cost to use Vimly?
          </AccordionTrigger>
          <AccordionContent>
            Vimly offers a free tier with essential features, and a premium
            subscription that unlocks additional resources and tools.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg md:text-xl">
            What types of content can I find?
          </AccordionTrigger>
          <AccordionContent>
            Vimly offers a wide range of content, from instructional videos and
            coding tutorials to lifestyle and marketing tips.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
