import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="py-24 text-center space-y-6 max-w-lg mx-auto px-4 animate-fade-in">
      <span className="text-6xl font-extrabold text-[#0F4C3A]">404</span>
      <h1 className="text-3xl font-extrabold text-[#0D1B2A]">Page Not Found</h1>
      <p className="text-slate-600 text-sm">
        The requested foundation page or document could not be located. Please return to the homepage or explore our work.
      </p>
      <div className="pt-4 flex items-center justify-center gap-4">
        <Link to="/" className="bg-[#0F4C3A] text-white px-6 py-3 rounded-full font-bold text-sm shadow flex items-center gap-2">
          <Home size={16} />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
