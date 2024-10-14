"use client";

import React, { useState, useEffect } from "react";
import { Video, deleteVideo } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const router = useRouter();

  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const handleEdit = (videoId: string) => {
    router.push(`/admin/videos/${videoId}`);
  };

  const handleDelete = async (videoId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteVideo(videoId);
        setVideos(videos.filter((video) => video._id !== videoId));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Videos</h1>
      <p className="text-sm mb-10">
        Here you can see all the videos! Update, delete, and create new content
        for the users.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {items.videos.data.map((video: any) => (
          <Card key={video._id} className="w-full">
            <CardHeader className="p-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-auto object-cover rounded-t-xl"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-2">{video.title}</h2>
              <p>
                {video.description
                  .replace(/<[^>]*>/g, "")
                  .replace(/&nbsp;/g, " ")
                  .replace(/<br\s*\/?>/g, "\n\n")
                  .substring(0, 100)}{" "}
                ...
              </p>
            </CardContent>

            <CardFooter className="flex justify-start gap-5 p-4">
              <Button onClick={() => handleEdit(video._id)} variant="secondary">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(video._id)}
                variant="destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="w-full flex justify-center mt-4">
        <Link href="/admin/videos/create-video">
          <Button variant="default">Create Video</Button>
        </Link>
      </div>
    </div>
  );
}
