import React from "react";

const Loading = ({ type = "page", className = "" }) => {
  if (type === "page") {
    return (
      <div className={`min-h-screen bg-white ${className}`}>
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-20 bg-surface border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
              <div className="h-8 w-40 bg-neutral-300 rounded"></div>
              <div className="flex space-x-6">
                <div className="h-4 w-16 bg-neutral-300 rounded"></div>
                <div className="h-4 w-20 bg-neutral-300 rounded"></div>
                <div className="h-4 w-24 bg-neutral-300 rounded"></div>
                <div className="h-10 w-28 bg-neutral-300 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Hero Section Skeleton */}
          <div className="py-20 bg-gradient-to-br from-surface to-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center space-y-6">
                <div className="h-12 w-3/4 mx-auto bg-neutral-300 rounded"></div>
                <div className="h-6 w-2/3 mx-auto bg-neutral-300 rounded"></div>
                <div className="flex justify-center space-x-4">
                  <div className="h-12 w-32 bg-neutral-300 rounded-lg"></div>
                  <div className="h-12 w-32 bg-neutral-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                    <div className="h-12 w-12 bg-neutral-300 rounded-lg mb-4"></div>
                    <div className="h-6 w-3/4 bg-neutral-300 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-neutral-300 rounded"></div>
                      <div className="h-4 w-5/6 bg-neutral-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className={`animate-pulse bg-white p-6 rounded-xl shadow-sm border border-neutral-200 ${className}`}>
        <div className="h-12 w-12 bg-neutral-300 rounded-lg mb-4"></div>
        <div className="h-6 w-3/4 bg-neutral-300 rounded mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-neutral-300 rounded"></div>
          <div className="h-4 w-5/6 bg-neutral-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
    </div>
  );
};

export default Loading;