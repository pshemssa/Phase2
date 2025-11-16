import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

// POST - Toggle follow
export async function POST(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const followerId = (session.user as any).id;

    // Find user to follow
    const userToFollow = await prisma.user.findUnique({
      where: { username: params.username },
    });

    if (!userToFollow) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (userToFollow.id === followerId) {
      return NextResponse.json(
        { error: "Cannot follow yourself" },
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId: userToFollow.id,
        },
      },
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return NextResponse.json({
        message: "Unfollowed successfully",
        following: false,
      });
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId,
          followingId: userToFollow.id,
        },
      });

      return NextResponse.json({
        message: "Followed successfully",
        following: true,
      });
    }
  } catch (error) {
    console.error("Toggle follow error:", error);
    return NextResponse.json(
      { error: "Failed to toggle follow" },
      { status: 500 }
    );
  }
}