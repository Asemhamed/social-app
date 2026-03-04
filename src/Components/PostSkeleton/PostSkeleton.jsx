import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card } from 'flowbite-react';

export default function PostSkeleton() {
  return (
    // SkeletonTheme handles the colors globally for all nested Skeletons
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      {/* Added !bg-white and !border-gray-200 to force override dark mode themes */}
      <Card className="max-w-xl mx-auto my-4 !bg-white !border-gray-200 shadow-sm">
        
        {/* Header */}
        <div className="flex gap-4 items-center">
          <Skeleton circle width={40} height={40} />
          <div className="flex-1">
            <Skeleton width="40%" height={20} />
            <Skeleton width="25%" height={15} />
          </div>
        </div>

        <hr className="my-2 border-gray-100" />

        {/* Content */}
        <div className="mb-4">
          <Skeleton count={2} height={24} />
        </div>

        {/* Image */}
        <div className="rounded overflow-hidden">
          <Skeleton height={300} />
        </div>

        {/* Footer (Optional: added for a more complete look) */}
        <div className="flex gap-4 mt-2">
            <Skeleton width={60} height={30} />
            <Skeleton width={60} height={30} />
        </div>
      </Card>
    </SkeletonTheme>
  );
}