"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArticleById, Article, editArticle } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill (because it requires DOM access)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditArticlePage() {
  const { articleId } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        if (typeof articleId === "string") {
          const articleData = await fetchArticleById(articleId);
          setArticle(articleData);
          setTitle(articleData.title);
          setContent(articleData.content);
        } else {
          console.error("Invalid articleId:", articleId);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof articleId === "string" && article) {
        const updatedArticle: Article = {
          ...article,
          title,
          content,
        };
        await editArticle(articleId, updatedArticle);
        Swal.fire({ icon: "success", title: "Article updated successfully" });
        router.push("/admin/articles");
      } else {
        console.error("Invalid articleId or article data:", articleId, article);
      }
    } catch (error) {
      console.error("Error editing article:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>No article found</p>;
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-bold">Edit Article: {article.title}</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">
                Article Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter article title"
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="content" className="text-sm font-medium">
                Article Content
              </label>
              <ReactQuill
                id="content"
                value={content}
                onChange={handleContentChange}
                theme="snow"
                placeholder="Enter article content"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Thumbnail</label>
              <img
                src={`http://localhost:3005${article.thumbnailUrl}`}
                alt={`${article.title} thumbnail`}
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
