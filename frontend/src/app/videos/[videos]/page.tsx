"use client";
import { fetchVideoById, fetchCategories, Video, Category } from "@/lib/api";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [video, setVideo] = useState<Video[]>([]);
  const [_categories, setCategories] = useState<Category[]>([]);
  const [_id, setId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const idFromPath = path.split("/").pop();

    setId(idFromPath ?? null);

    const fetchVideo = async () => {
      if (!idFromPath) return;
      const categoriesData = await fetchCategories();

      const videoData = await fetchVideoById(idFromPath);
      setCategories(categoriesData.categories);
      setVideo([videoData]);
    };

    fetchVideo();
  }, []);

  return (
    <div className="w-full px-4">
      {video.map((vid) => (
        <div
          className="max-w-[1240px] mx-auto min-h-screen flex flex-col justify-center items-center"
          key={vid._id}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Thumbnail and Title */}
            <div className="flex flex-col items-center text-center md:text-left gap-10">
              <Badge
                variant="default"
                className="text-sm font-medium px-3 py-1"
              >
                {vid?.category?.title || "No Category"}
              </Badge>
              <div className="w-full h-64 md:h-80 lg:h-96 mb-6">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {vid.title}
              </h1>
            </div>
            <div className="flex flex-col justify-start items-center md:items-start gap-6">
              <div
                className="leading-relaxed text-gray-800 max-w-lg"
                dangerouslySetInnerHTML={{
                  __html: vid.description,
                }}
              ></div>

              <Link href={vid.link}>
                <Button variant="default" className="mt-4">
                  Watch Video
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
