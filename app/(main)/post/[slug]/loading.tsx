import { Loader2 } from "lucide-react";

export default function PostLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 sm:p-12">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mt-8">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
        </div>
      </div>
    </div>
  );
}