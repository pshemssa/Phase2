import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

// GET — Check if user bookmarked the post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  try {
    let userId: string | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
      userId = user.id;
    } else {
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
      if (!token?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      userId = token.id as string;
    }

    const existingBookmark = await prisma.bookmark.findUnique({
      where: { postId_userId: { postId: params.id, userId: userId! } },
    });

    const count = await prisma.bookmark.count({ where: { postId: params.id } });
    return NextResponse.json({ bookmarked: !!existingBookmark, count });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Bookmark the post
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  let userId: string | null = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    userId = user.id;
  } else {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    userId = token.id as string;
  }

  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const existingBookmark = await prisma.bookmark.findUnique({
    where: { postId_userId: { postId: params.id, userId: userId! } },
  });
  if (existingBookmark) {
    return NextResponse.json({ error: "Already bookmarked" }, { status: 400 });
  }

  await prisma.bookmark.create({ data: { postId: params.id, userId: userId! } });

  const count = await prisma.bookmark.count({ where: { postId: params.id } });
  return NextResponse.json({ bookmarked: true, count });
}

// DELETE — Remove bookmark
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  let userId: string | null = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    userId = user.id;
  } else {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    userId = token.id as string;
  }

  await prisma.bookmark.delete({ where: { postId_userId: { postId: params.id, userId: userId! } } });

  const count = await prisma.bookmark.count({ where: { postId: params.id } });
  return NextResponse.json({ bookmarked: false, count });
}