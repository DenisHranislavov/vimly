"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Footer from "@/components/Footer";

const VideosPage = () => {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-[1240px] flex flex-col justify-start pt-20 items-center mx-auto px-4">
        <h1 className="mt-10 text-5xl font-bold text-center text-black">
          Explore Famous Tools
        </h1>
        <p className="text-lg text-gray-400 mt-4 mb-12 text-center">
          Discover a collection of essential tools designed to boost your
          productivity, creativity, and collaboration.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.tools.data.map((tool: any) => (
            <Link href={tool.link}>
              <Card
                key={tool.id}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-40">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
