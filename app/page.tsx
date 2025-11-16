import { Suspense } from "react";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import PostCard from "./components/post/PostCard";
import { Button } from "../components/ui/button";
import { Post } from "./types";

// This would be fetched from your API
async function getPosts(): Promise<Post[]> {
  // Simulated data - replace with actual API call
  return [
    {
      id: "1",
      title: "Getting Started with Next.js 14 and Server Components",
      excerpt:
        "Learn how to build modern web applications with the latest Next.js features including server components, streaming, and more.",
      slug: "getting-started-nextjs-14",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      published: true,
      author: {
        id: "user1",
        name: "Sarah Johnson",
        username: "sarahj",
        image: null,
      },
      authorId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      readTime: 5,
      tags: ["Next.js", "React", "Web Development"],
      _count: {
        likes: 234,
        comments: 18,
      },
    },
    {
      id: "2",
      title: "Mastering TypeScript: Advanced Patterns and Best Practices",
      excerpt:
        "Deep dive into advanced TypeScript patterns that will make your code more maintainable and type-safe.",
      slug: "mastering-typescript-patterns",
      coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      published: true,
      author: {
        id: "user2",
        name: "Michael Chen",
        username: "michaelc",
        image: null,
      },
      authorId: "user2",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      readTime: 8,
      tags: ["TypeScript", "Programming", "Best Practices"],
      _count: {
        likes: 456,
        comments: 32,
      },
    },
    {
      id: "3",
      title: "Building Scalable APIs with Prisma and PostgreSQL",
      excerpt:
        "A comprehensive guide to designing and implementing production-ready database schemas with Prisma ORM.",
      slug: "scalable-apis-prisma-postgresql",
      coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
      published: true,
      author: {
        id: "user3",
        name: "Emily Rodriguez",
        username: "emilyr",
        image: null,
      },
      authorId: "user3",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      readTime: 12,
      tags: ["Prisma", "PostgreSQL", "Backend"],
      _count: {
        likes: 189,
        comments: 24,
      },
    },
  ];
}

async function getTrendingTags(): Promise<string[]> {
  return ["JavaScript", "React", "Next.js", "TypeScript", "Web Development", "AI", "Design"];
}

async function getStaffPicks() {
  const posts = await getPosts();
  return posts.slice(0, 3).map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    author: {
      name: post.author.name,
      username: post.author.username,
    },
  }));
}

function PostsLoading() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const posts = await getPosts();
  const trendingTags = await getTrendingTags();
  const staffPicks = await getStaffPicks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <main className="app-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts Feed */}
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<PostsLoading />}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Suspense>

            <div className="flex justify-center">
              <Button variant="secondary" size="lg">
                Load more stories
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar trendingTags={trendingTags} staffPicks={staffPicks} />
        </div>
      </main>

      <Footer />
    </div>
  );
}