import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideTarget, LucideCheckCircle, LucideUsers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-[1240px] mx-auto py-48 px-6 text-center space-y-24">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline" className="text-lg py-3 px-6">
            About Vimly
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold">
            Empowering Creators, Developers, and Innovators{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Globally
            </span>
            .
          </h1>
          <p className="text-sm md:text-lg lg:text-xl max-w-[900px] leading-relaxed">
            At Vimly, we believe in the power of knowledge and creativity. Our
            platform is dedicated to providing the tools, resources, and
            inspiration needed for creators, developers, and innovators to
            thrive in a fast-evolving digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center space-y-6">
            <LucideTarget className="w-16 h-16 text-purple-500" />
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xs">
              To connect, educate, and empower a global community of creators,
              developers, and innovators with high-quality resources and tools.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <LucideCheckCircle className="w-16 h-16 text-pink-500" />
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xs">
              A world where creativity and knowledge are accessible to all,
              fostering collaboration and innovation for a brighter future.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <LucideUsers className="w-16 h-16 text-red-500" />
            <h2 className="text-2xl font-bold">Our Community</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xs">
              A vibrant, global community of creators, learners, and doers who
              inspire and support each other on their journey.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Join the Movement.{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Create. Innovate. Inspire.
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl max-w-[800px] mx-auto leading-relaxed">
            Be part of a growing community that’s shaping the future of digital
            creativity. Whether you're a developer, content creator, or someone
            with a passion for technology, Vimly has something for you.
          </p>

          <Link href="/">
            <Button variant="default" size="lg" className="mt-10">
              Explore Vimly
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
