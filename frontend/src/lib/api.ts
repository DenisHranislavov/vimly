"use server";

// Videos
export interface Video {
  _id: string;
  title: string;
  link: string;
  description: string;
  category: Array<string>;
  thumbnail: string;
}

export interface createVideo {
  title: string;
  link: string;
  description: string;
  category: string;
  thumbnail: string;
}

//Categories

export interface Category {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryData {
  categories: Category[];
}

// Articles

export interface Article {
  _id: string;
  title: string;
  content: string;
  category: Array<string>;
  thumbnailUrl: string;
  author: string;
}

export interface CreateArticle {
  title: string;
  content: string;
  category: string;
  author: string;
  thumbnailUrl: string;
}

// Create User

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

// Tools
export interface Tools {
  _id: string;
  title: string;
  link: string;
  description: string;
}

export interface createTool {
  title: string;
  link: string;
  description: string;
}

// Admins
export interface Admin {
  email: string;
}

// Creating a Video

export const createVideo = async (video: createVideo): Promise<Video> => {
  const videoId = extractYouTubeVideoID(video.link);
  if (!videoId) {
    throw new Error("Invalid YouTube link");
  }
  const thumbnail = await fetchYouTubeThumbnail(videoId);
  const videoData = {
    ...video,
    thumbnail,
  };
  const response = await fetch("http://localhost:3005/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(videoData),
  });

  if (!response.ok) {
    throw new Error("Failed to create video");
  }
  return response.json();
};

// Fetching Video by ID

export const fetchVideoById = async (id: string): Promise<Video> => {
  const response = await fetch(`http://localhost:3005/videos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch video");
  }

  return response.json();
};

// Extracting YouTube Video ID

const extractYouTubeVideoID = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Fetching YouTube Thumbnail

const fetchYouTubeThumbnail = async (videoId: string): Promise<string> => {
  const apiKey = process.env.YOUTUBE_API;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch YouTube thumbnail");
  }

  const data = await response.json();
  return data.items[0].snippet.thumbnails.high.url;
};

// Delete a Video

export const deleteVideo = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:3005/videos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    console.log("Failed to delete video");
  }

  return response.json();
};

// Edit a Video

export const editVideo = async (id: string, video: Video): Promise<Video> => {
  const response = await fetch(`http://localhost:3005/videos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(video),
  });

  if (!response.ok) {
    throw new Error("Failed to edit video");
  }

  return response.json();
};

// Fetching Articles

export const fetchArticles = async (): Promise<{ articles: Article[] }> => {
  const response = await fetch("http://localhost:3005/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
};

// Fetching Article by ID

export const fetchArticleById = async (id: string): Promise<Article> => {
  const response = await fetch(`http://localhost:3005/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
};

// Create an Article

export const createArticle = async (articleData: FormData) => {
  const response = await fetch("http://localhost:3005/articles", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: articleData,
  });

  if (!response.ok) {
    throw new Error("Failed to create article");
  }

  return await response.json();
};

// Delete an Article
export const deleteArticle = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:3005/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    console.log("Failed to delete article");
  }

  return response.json();
};

// Edit an Article

export const editArticle = async (
  id: string,
  article: Article
): Promise<Article> => {
  const response = await fetch(`http://localhost:3005/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error("Failed to edit the article!");
  }

  return response.json();
};

// Fetching Categories
export const fetchCategories = async (): Promise<CategoryData> => {
  const response = await fetch("http://localhost:3005/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

// Create a Category

export const createCategory = async (category: { title: string }) => {
  const response = await fetch("http://localhost:3005/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }
  return await response.json();
};

// Delete a Category
export const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:3005/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to delete category");
    throw new Error("Failed to delete category");
  }
};

// Create a User
export const createUser = async (userData: CreateUser) => {
  const response = await fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
};

// Admin methods

export const fetchAdmins = async (): Promise<{ admins: Admin[] }> => {
  const response = await fetch("http://localhost:3005/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admins");
  }

  return response.json();
};

// Admin methods

export const fetchAdmin = async (): Promise<Admin> => {
  const response = await fetch("http://localhost:3005/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin");
  }

  return response.json();
};

export const createAdmin = async (email: string) => {
  const response = await fetch("http://localhost:3005/admins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to create admin");
  }

  return await response.json();
};

export const deleteAdmin = async (email: string) => {
  const response = await fetch(`http://localhost:3005/admins/${email}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete admin");
  }
};

//Tools Methods

export const fetchTools = async (): Promise<Tools> => {
  const response = await fetch("http://localhost:3005/tools", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const createTool = async (tool: createTool): Promise<Tools> => {
  const response = await fetch("http://localhost:3005/tools", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(tool),
  });

  if (!response.ok) {
    throw new Error("Failed to create tool");
  }

  return response.json();
};

export const deleteTool = async (id: string) => {
  const response = await fetch(`http://localhost:3005/tools/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete admin");
  }
};
