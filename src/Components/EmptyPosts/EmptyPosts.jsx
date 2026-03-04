import { PencilLine } from 'lucide-react';

export default function EmptyPosts() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">

    <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
      <p className="text-gray-500 max-w-sm">
        Be the first one to publish. Share your thoughts with the community!
      </p>
    </div>
  );
}