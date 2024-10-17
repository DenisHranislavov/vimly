"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Footer from "@/components/Footer";
import { Video } from "@/lib/getItems";

const VideosPage = () => {
  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const [filteredVideos, setFilteredVideos] = useState<Video[]>(
    items.videos.data || []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredVideos(items.videos.data);
    } else {
      const filtered = items.videos.data.filter(
        (video: any) => video.category?.title === category
      );
      setFilteredVideos(filtered);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-[1240px] flex flex-col justify-start pt-20 items-center mx-auto px-4">
        <h1 className="mt-10 text-5xl font-bold text-center text-black">
          Explore Our Videos
        </h1>
        <p className="text-lg text-gray-400 mt-4 mb-12 text-center">
          Dive into various categories and find the perfect video for you.
        </p>

        {/* Category Dropdown with ShadCN */}
        <div className="mb-10 w-full max-w-md">
          <label
            htmlFor="category"
            className="block mb-3 text-lg font-medium text-gray-400"
          >
            Filter by Category
          </label>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full border rounded-md p-2 bg-white shadow-md">
              <SelectValue placeholder={selectedCategory} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {items.categories.data.map((category: any) => (
                <SelectItem key={category._id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video: any) => (
              <Link href={`/videos/${video._id}`} key={video._id}>
                <Card className="bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-md">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-56">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CardHeader>
                  <Badge variant="default" className="ml-3 mt-3">
                    {video?.category?.title || "No Category"}
                  </Badge>
                  <CardContent className="p-4">
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-2">
                      {video.description
                        .replace(/<[^>]*>/g, "")
                        .replace(/&nbsp;/g, " ")
                        .substring(0, 80)}{" "}
                      ...
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center w-full">
              <p className="text-white">No videos found</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
};

export default VideosPage;
