"use client";
import React, { useState, useEffect } from "react";
import { fetchCategories, createVideo, Category } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/styles/text-formatting.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CreateVideo {
  title: string;
  link: string;
  description: string;
  category: string;
  thumbnail: string;
}

export default function CreateVideoForm() {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      Swal.fire("Error", "Please select a category", "error");
      return;
    }

    const newVideo: CreateVideo = {
      title,
      link,
      description,
      category: selectedCategory,
      thumbnail,
    };

    try {
      await createVideo(newVideo);
      Swal.fire("Success", "Video created successfully!", "success");
      router.push("/admin/videos");
    } catch (error) {
      console.error("Error creating video:", error);
      Swal.fire("Error", "Failed to create video", "error");
    }
  };

  return (
    <>
      <Link href="/admin/videos">
        <div className="top-6 left-6 cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-gray-700 hover:text-gray-900 transition duration-300" />
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-7xl text-center p-10">Create new video.</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto p-6 space-y-6"
        >
          <div>
            <Label htmlFor="title">Title:</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </div>

          <div>
            <Label htmlFor="link">Link & Thumbnail:</Label>
            <Input
              id="link"
              type="text"
              value={link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLink(e.target.value);
                setThumbnail(e.target.value);
              }}
              placeholder="Enter video link"
            />
          </div>

          <div>
            <Label htmlFor="content">Content:</Label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
              placeholder="Write your article content here..."
              className="border rounded"
            />
          </div>

          <div>
            <Label htmlFor="category">Category:</Label>
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value);
              }}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Create Video
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
