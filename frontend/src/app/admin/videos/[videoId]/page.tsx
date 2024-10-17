"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchVideoById, Video, editVideo } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditVideoPage() {
  const router = useRouter();
  const { videoId } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        if (typeof videoId === "string") {
          const videoData = await fetchVideoById(videoId);
          setVideo(videoData);
          setTitle(videoData.title);
          setDescription(videoData.description);
        } else {
          console.error("Invalid videoId:", videoId);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof videoId === "string" && video) {
        const updatedVideo: Video = {
          ...video,
          title,
          description,
        };
        await editVideo(videoId, updatedVideo);
        Swal.fire({ icon: "success", title: "Video updated successfully" });
        router.push("/admin/videos");
      } else {
        console.error("Invalid videoId or video data:", videoId, video);
      }
    } catch (error) {
      console.error("Error editing video:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!video) {
    return <p>No video found</p>;
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Video</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-bold">Edit Video: {video.title}</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">
                Video Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter video title"
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Video Description
              </label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                theme="snow"
                placeholder="Write your article content here..."
                className="border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Thumbnail</label>
              <img
                src={video.thumbnail}
                alt={`${video.title} thumbnail`}
                className="mt-2 w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <Button variant="default" type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
