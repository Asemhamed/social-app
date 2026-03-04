import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="max-w-6xl mx-auto bg-white min-h-screen pb-10 rounded-2xl overflow-hidden mt-20">
        
        <div className="relative h-32 sm:h-48 md:h-64 bg-gray-100">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
            <Skeleton circle width={128} height={128} className="border-4 border-white shadow-md hidden sm:block" />
            <Skeleton circle width={96} height={96} className="border-4 border-white shadow-md sm:hidden" />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <Skeleton width={200} height={28} />
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Skeleton width={120} height={16} />
              </div>
            </div>
          </div>

          <div className="flex justify-around sm:justify-start sm:gap-10 mt-8 py-4 border-y sm:border-none border-gray-100">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center sm:text-left">
                <Skeleton width={40} height={20} />
                <div className="mt-1">
                  <Skeleton width={60} height={12} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-2 border-t sm:border-t-0 px-4">
          <div className="mr-4"><Skeleton width={100} height={40} /></div>
          <div><Skeleton width={100} height={40} /></div>
        </div>

        <div className="grid grid-cols-3 gap-0.5 sm:gap-4 p-0.5 sm:p-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square">
              <Skeleton height="100%" containerClassName="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProfileSkeleton;