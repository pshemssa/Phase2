// app/write/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import PostEditor from "../../components/post/PostEditor";

export const metadata: Metadata = {
  title: "Write a Story | Lumen Yard",
  description: "Share your story with the world",
};

export default async function WritePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PostEditor />
    </div>
  );
}