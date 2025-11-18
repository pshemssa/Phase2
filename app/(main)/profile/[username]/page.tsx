import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import UserProfile from "../../../components/profile/UseProfile";
import UserPosts from "../../../components/profile/UserPosts";
import { prisma } from "../../../lib/prisma";

async function getUser(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            posts: { where: { published: true } },
            followers: true,
            following: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

async function getUserPosts(userId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        tags: {
          select: {
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return posts.map((post:any) => ({
      ...post,
      tags: post.tags.map((tag:any) => tag.name),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      publishedAt: post.publishedAt?.toISOString() || null,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUser(params.username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name} (@${user.username}) | Lumen Yard`,
    description: user.bio || `View ${user.name}'s profile and stories`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);
  const session = await getServerSession(authOptions);

  if (!user) {
    notFound();
  }

  const posts = await getUserPosts(user.id);
  const isOwnProfile = session?.user?.email === user.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <UserProfile user={user} isOwnProfile={isOwnProfile} />
        <UserPosts posts={posts} isOwnProfile={isOwnProfile} />
      </main>

      <Footer />
    </div>
  );
}