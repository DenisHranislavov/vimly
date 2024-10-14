"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // For dynamic import of Quill
import { fetchCategories, createArticle, Category } from "@/lib/api";
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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function CreateArticleForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || !thumbnail) {
      alert("Please select a category and upload a thumbnail.");
      return;
    }

    const cleanContent = (html: string) => {
      return html.replace(/<\/?p[^>]*>/g, "");
    };

    const cleanedContent = cleanContent(content);

    const newArticle = new FormData();
    newArticle.append("title", title);
    newArticle.append("content", cleanedContent);
    newArticle.append("category", selectedCategory);
    newArticle.append("author", author);
    if (thumbnail) {
      newArticle.append("thumbnail", thumbnail);
    }

    try {
      await createArticle(newArticle);
      Swal.fire("Success", "Article created successfully!", "success");
      router.push("/admin/articles");
    } catch (error: any) {
      console.error("Error creating article:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to create article",
        "error"
      );
    }
  };

  return (
    <>
      <Link href="/admin/articles">
        <div className="top-6 left-6 cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-gray-700 hover:text-gray-900 transition duration-300" />{" "}
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-7xl text-center p-10">Create New Article</h1>
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
              placeholder="Enter article title"
            />
          </div>

          <div>
            <Label htmlFor="content">Content:</Label>
            <ReactQuill
              value={content}
              onChange={setContent}
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
            <Label htmlFor="author">Author:</Label>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail:</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setThumbnail(e.target.files[0]);
                }
              }}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Article
          </Button>
        </form>
      </div>
    </>
  );
}
