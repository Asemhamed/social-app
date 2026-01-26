import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function PostDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto mb-8 mt-20 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
      
      {/* Top Navigation Bar Skeleton */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Skeleton circle width={20} height={20} />
          <Skeleton width={80} height={15} />
        </div>
        <div className="flex gap-4">
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="p-6 md:p-10">
        {/* Date Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton width={100} height={15} />
        </div>

        {/* Title Skeleton (Large and bold) */}
        <div className="mb-6">
          <Skeleton height={40} width="90%" className="mb-2" />
          <Skeleton height={40} width="60%" />
        </div>

        {/* Author Section Skeleton */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <Skeleton circle width={48} height={48} />
          <div className="flex-1">
            <Skeleton width={120} height={20} />
          </div>
        </div>

        {/* Main Image Skeleton */}
        <div className="mb-8">
          <Skeleton height={400} borderRadius="1rem" />
        </div>
      </div>

      {/* Footer / Interaction Bar Skeleton */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton circle width={30} height={30} />
          <Skeleton width={30} height={15} />
        </div>
      </div>
    </div>
  )
}
