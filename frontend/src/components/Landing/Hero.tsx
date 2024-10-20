import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Refresh from "@/components/Refresh";

export default function Hero() {
  return (
    <div className="max-w-[1240px] h-screen mx-auto flex flex-col items-center justify-center min-h-fit gap-5 px-5 text-center">
      <Badge variant="outline" className="text-lg">
        Greetings from Vimly
      </Badge>
      <h1 className="text-4xl md:text-7xl font-bold">
        Explore the Topics that{" "}
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Matter
        </span>
        .
      </h1>
      <p className="text-sm md:text-lg lg:text-xl leading-relaxed max-w-[1000px]">
        At Vimly, we provide the latest insights, trends, and tools to help you
        thrive in a changing world. Whether you're a creator, developer, or
        entrepreneur, our platform offers in-depth tutorials, thought-provoking
        articles, and a community-driven space where knowledge meets creativity.
      </p>
      <Refresh />
      <Link href="#features-tools">
        <Button variant="default" className="text-lg md:text-xl">
          Discover What Vimly Can Do
        </Button>
      </Link>
    </div>
  );
}
