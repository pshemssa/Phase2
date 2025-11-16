import Link from "next/link";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Post } from "../../types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
      {/* Author Info */}
      <div className="flex items-center space-x-2 mb-3">
        {post.author.image ? (
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white text-xs font-semibold">
            {post.author.name.substring(0, 2).toUpperCase()}
          </div>
        )}
        <Link
          href={`/@${post.author.username}`}
          className="text-sm font-medium text-gray-900 hover:text-yellow-700 transition"
        >
          {post.author.name}
        </Link>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        <div className="flex-1">
          <Link href={`/post/${post.slug}`}>
            <h2 className="text-2xl font-bold mb-2 line-clamp-2 hover:text-yellow-700 transition text-gray-900">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-base mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric' 
              })}</span>
              <span>·</span>
              <span>{post.readTime} min read</span>
              {post.tags.length > 0 && (
                <>
                  <span className="hidden sm:inline">·</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag:any) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200 hover:bg-yellow-100 transition"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-yellow-600 transition">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{post._count.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-yellow-600 transition">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post._count.comments}</span>
              </button>
              <button className="hover:text-yellow-700 transition">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <Link href={`/post/${post.slug}`}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </Link>
        )}
      </div>
    </article>
  );
}