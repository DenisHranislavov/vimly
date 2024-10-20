import { customFetch } from "@/lib/api";

export interface Video {
  _id: string;
  title: string;
  link: string;
  description: string;
  category: Array<string>;
  thumbnail: string;
}

export interface Category {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  category: Array<string>;
  thumbnailUrl: string;
  author: string;
}

export const fetchItems = async () => {
  try {
    const videosData = await customFetch(
      `${process.env.NEXT_PUBLIC_URL}videos`
    );
    const articlesData = await customFetch(
      `${process.env.NEXT_PUBLIC_URL}articles`
    );
    const categoryData = await customFetch(
      `${process.env.NEXT_PUBLIC_URL}category`
    );
    const toolsData = await customFetch(`${process.env.NEXT_PUBLIC_URL}tools`);

    const items = {
      videos: {
        length: videosData.videos?.length || 0,
        data: videosData.videos || [],
      },
      articles: {
        length: articlesData.articles?.length || 0,
        data: articlesData.articles || [],
      },
      categories: {
        length: categoryData.categories?.length || 0,
        data: categoryData.categories || [],
      },
      tools: {
        length: toolsData.tools?.length || 0,
        data: toolsData.tools || [],
      },
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("items", JSON.stringify(items));
      } catch (storageError) {
        console.error("Error saving to localStorage:", storageError);
      }
    } else {
      console.log("Skipping localStorage as it's running on the server");
    }
  } catch (error) {
    console.error("Failed to fetch items:", error);
  }
};
