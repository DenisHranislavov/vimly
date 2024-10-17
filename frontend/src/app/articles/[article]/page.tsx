"use client";
import React, { useState, useEffect } from "react";
import { fetchArticleById, Article } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import "@/styles/text-formatting.css";

export default function Page() {
  const [article, setArticle] = useState<Article | null>(null);
  const [_id, setId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const idFromPath = path.split("/").pop();
    setId(idFromPath ?? null);

    const fetchArticle = async () => {
      if (!idFromPath) return;
      const articleData = await fetchArticleById(idFromPath);
      console.log(articleData);
      setArticle(articleData);
    };

    fetchArticle();
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative max-w-3xl mx-auto p-6">
      <Link href="/articles">
        <div className="absolute top-6 left-6 cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-gray-700 hover:text-gray-900 transition duration-300" />
        </div>
      </Link>
      <div className="space-y-10 mt-10 article-container">
        <div className="flex flex-col gap-10">
          {article.thumbnailUrl && (
            <img
              src={`http://localhost:3005${article.thumbnailUrl}`}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <Badge
            variant="default"
            className="w-full flex justify-center md:justify-center md:w-1/5 lg:w-1/6 xl:w-1/8"
          >
            {article?.category?.title}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
          <div
            className="leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          ></div>

          <p className="text-sm">
            Author: <span className="font-bold">{article.author}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
