async function customFetch(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 03dce55f-0cfb-46dd-b3b1-de2948105d0c`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

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
  const videosData = await customFetch("http://localhost:3005/videos");
  const articlesData = await customFetch("http://localhost:3005/articles");
  const categoryData = await customFetch("http://localhost:3005/category");
  const toolsData = await customFetch("http://localhost:3005/tools");

  const items = {
    videos: {
      length: videosData.videos.length,
      data: videosData.videos,
    },
    articles: {
      length: articlesData.articles.length,
      data: articlesData.articles,
    },
    categories: {
      length: categoryData.categories.length,
      data: categoryData.categories,
    },
    tools: {
      length: toolsData.tools.length,
      data: toolsData.tools,
    },
  };
  localStorage.setItem("items", JSON.stringify(items));
};
