import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card } from 'flowbite-react'; // Assuming you are using Flowbite based on your classNames

const PostSkeleton = () => {
  return (
    <Card className="max-w-xl mx-auto my-4 text-white">
      {/* Header: User Profile Info */}
      <div className="flex gap-4 items-center">
        {/* Circle Skeleton for Profile Photo */}
        <Skeleton circle width={40} height={40} />
        <div className="flex-1">
          {/* Line for Name */}
          <Skeleton width="40%" height={20} />
          {/* Line for Date */}
          <Skeleton width="25%" height={15} />
        </div>
      </div>

      <hr className="my-2 border-gray-700" />

      {/* Post Body Text */}
      <div className="mb-4">
        <Skeleton count={2} height={24} />
      </div>

      {/* Main Post Image */}
      <div className="rounded overflow-hidden">
        <Skeleton height={300} />
      </div>

      <hr className="my-2 border-gray-700" />
    </Card>
  );
};

export default PostSkeleton;