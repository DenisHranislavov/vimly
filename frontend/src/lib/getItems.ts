async function customFetch(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
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
  const videosData = await customFetch(`${process.env.NEXT_PUBLIC_URL}videos`);
  const articlesData = await customFetch(
    `${process.env.NEXT_PUBLIC_URL}articles`
  );
  const categoryData = await customFetch(
    `${process.env.NEXT_PUBLIC_URL}category`
  );
  const toolsData = await customFetch(`${process.env.NEXT_PUBLIC_URL}tools`);

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
