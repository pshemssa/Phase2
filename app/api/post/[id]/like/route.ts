// // app/api/posts/[id]/like/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../lib/auth";
// import {prisma} from "../../../../lib/prisma";

// // POST /api/posts/[id]/like - Like a post
// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Check if post exists
//     const post = await prisma.post.findUnique({
//       where: { id: params.id },
//     });

//     if (!post) {
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     }

//     // Check if already liked
//     const existingLike = await prisma.like.findUnique({
//       where: {
//         postId_userId: {
//           postId: params.id,
//           userId: (session.user as any).id,
//         },
//       },
//     });

//     if (existingLike) {
//       return NextResponse.json(
//         { error: "Already liked" },
//         { status: 400 }
//       );
//     }

//     // Create like
//     await prisma.like.create({
//       data: {
//         postId: params.id,
//         userId: (session.user as any).id,
//       },
//     });

//     // Get updated like count
//     const likeCount = await prisma.like.count({
//       where: { postId: params.id },
//     });

//     return NextResponse.json({ liked: true, likeCount });
//   } catch (error) {
//     console.error("Error liking post:", error);
//     return NextResponse.json(
//       { error: "Failed to like post" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/posts/[id]/like - Unlike a post
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Delete like
//     await prisma.like.delete({
//       where: {
//         postId_userId: {
//           postId: params.id,
//           userId: (session.user as any).id,
//         },
//       },
//     });

//     // Get updated like count
//     const likeCount = await prisma.like.count({
//       where: { postId: params.id },
//     });

//     return NextResponse.json({ liked: false, likeCount });
//   } catch (error) {
//     console.error("Error unliking post:", error);
//     return NextResponse.json(
//       { error: "Failed to unlike post" },
//       { status: 500 }
//     );
//   }
// }

// app/api/posts/[id]/like/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

// GET — Check if user liked + return current like count
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

    const existingLike = await prisma.like.findUnique({
      where: { postId_userId: { postId: params.id, userId: userId! } },
    });

    const likeCount = await prisma.like.count({
      where: { postId: params.id },
    });

    return NextResponse.json({ liked: !!existingLike, likeCount });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Like the post
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

  const existingLike = await prisma.like.findUnique({
    where: { postId_userId: { postId: params.id, userId: userId! } },
  });

  if (existingLike) {
    return NextResponse.json({ error: "Already liked" }, { status: 400 });
  }

  await prisma.like.create({ data: { postId: params.id, userId: userId! } });

  const likeCount = await prisma.like.count({ where: { postId: params.id } });

  return NextResponse.json({ liked: true, likeCount });
}

// DELETE — Unlike
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

  await prisma.like.delete({ where: { postId_userId: { postId: params.id, userId: userId! } } });

  const likeCount = await prisma.like.count({ where: { postId: params.id } });

  return NextResponse.json({ liked: false, likeCount });
}