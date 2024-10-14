"use client";
import React, { useState, useEffect } from "react";
import { Article, deleteArticle } from "@/lib/api";
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
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const handleEdit = (articleId: string) => {
    router.push(`/admin/articles/${articleId}`);
  };

  const handleDelete = async (articleId: string) => {
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
        await deleteArticle(articleId);
        setArticles(articles.filter((article) => article._id !== articleId));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Articles</h1>
      <p className="text-sm mb-10">
        Here you can see all the articles! Update, delete, and create new
        quality content for the users.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {items.articles.data.length > 0 ? (
          items.articles.data.map((article: any) => (
            <Card key={article._id} className="w-full flex flex-col">
              <CardHeader className="p-0">
                <img
                  src={`http://localhost:3005${article.thumbnailUrl}`}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p>
                  {article.content
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/g, " ")
                    .substring(0, 100)}
                  ...
                </p>
              </CardContent>
              <CardFooter className="flex justify-start gap-5 p-4">
                <Button
                  onClick={() => handleEdit(article._id)}
                  variant="secondary"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(article._id)}
                  variant="destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="w-full flex justify-center">
            <p className="text-lg text-gray-400">No articles found.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Link href="/admin/articles/create-article">
          <Button variant="default">Create Article</Button>
        </Link>
      </div>
    </div>
  );
}
