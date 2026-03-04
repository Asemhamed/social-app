import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9FBFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Search size={48} />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We couldn't find the page you're looking for. It might have been deleted, or the URL might be incorrect.
        </p>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}