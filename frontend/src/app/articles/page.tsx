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
import { Article } from "@/lib/api";
import Footer from "@/components/Footer";

const ArticlesPage = () => {
  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(
    items.articles.data || []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredArticles(items.articles.data);
    } else {
      const filtered = items.articles.data.filter(
        (article: any) => article.category?.title === category
      );
      setFilteredArticles(filtered);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-[1240px] flex flex-col justify-start pt-20 items-center mx-auto px-4">
        <h1 className="mt-10 text-5xl font-bold text-center text-black">
          Explore Our Articles
        </h1>
        <p className="text-lg text-gray-400 mt-4 mb-12 text-center">
          Discover various categories and find interesting reads.
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
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article: any) => (
              <Link href={`/articles/${article._id}`} key={article._id}>
                <Card className="bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-md">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-56">
                      <img
                        src={`http://localhost:3005${article.thumbnailUrl}`}
                        alt={article.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CardHeader>
                  <Badge variant="default" className="ml-3 mt-3">
                    {article?.category?.title || "No Category"}
                  </Badge>
                  <CardContent className="p-4">
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-2">
                      {article.content
                        .replace(/<[^>]*>/g, "")
                        .replace(/&nbsp;/g, " ")
                        .substring(0, 100)}{" "}
                      ...
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center w-full">
              <p className="text-gray-400">No articles found</p>
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

export default ArticlesPage;
