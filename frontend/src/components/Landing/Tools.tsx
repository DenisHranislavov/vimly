import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ToolsSection() {
  return (
    <div className="max-full mx-auto flex flex-col items-center py-10 gap-5 px-5 text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <Badge variant="outline" className="text-lg">
        Helpful Tools
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold">
        Tools That Help You Succeed
      </h2>
      <p className="text-sm md:text-lg lg:text-xl leading-relaxed max-w-[800px]">
        Discover productivity tools, analysis dashboards, and time-saving
        resources—all designed to help you get more done in less time.
      </p>
      <Link href="/tools">
        <Button variant="default" className="text-lg md:text-xl">
          Explore Tools
        </Button>
      </Link>
    </div>
  );
}
