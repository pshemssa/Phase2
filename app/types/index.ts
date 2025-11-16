// User types
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  image?: string | null;
  bio?: string | null;
  createdAt: string;
}

// Post types
export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt: string;
  coverImage?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  readTime: number;
  authorId: string;
  author: {
    id?: string;
    name: string;
    username: string;
    image?: string | null;
  };
  tags: string[];
  _count: {
    likes: number;
    comments: number;
  };
}

// Comment types
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  authorId: string;
  author: {
    name: string;
    username: string;
    image?: string | null;
  };
  parentId?: string | null;
  replies?: Comment[];
}

// Tag type
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// Like type
export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}