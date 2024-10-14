import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Credits() {
  return (
    <div className="max-w-[1240px] h-[80vh] mx-auto flex flex-col items-center justify-center min-h-fit py-10 gap-5 px-5 text-center">
      {/* Badge */}
      <Badge variant="outline" className="text-lg">
        Powered by Vimly
      </Badge>

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-semibold">
        Built with Creativity and Passion
      </h2>

      {/* Description */}
      <p className="text-sm md:text-lg lg:text-xl leading-relaxed max-w-[800px]">
        At Vimly, we strive to provide a platform where innovation meets user
        experience. Whether you’re here for tools, videos, or articles, we
        ensure you have access to the latest resources to stay updated, engaged,
        and inspired.
      </p>

      {/* CTA Button */}
      <Link href="about">
        <Button variant="default" className="text-lg md:text-xl">
          Learn More About Us
        </Button>
      </Link>

      {/* Separator */}
      <Separator className="my-8 bg-gray-200" />

      {/* Footer */}
    </div>
  );
}
