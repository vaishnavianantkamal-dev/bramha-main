import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchBlogDetails } from "../services/api.js";

// Fallback blog data in case API fails
const fallbackBlogData = {
  id: 1,
  title: "Blog Post Not Found",
  slug: "blog-not-found",
  excerpt: "The requested blog post could not be loaded.",
  content: "We're sorry, but the blog post you're looking for is currently unavailable. Please try again later or browse our other blog posts.",
  featured_image: "/images/blogs/blog.jpg",
  author_name: "Team Brahma Valley",
  author_avatar: "/images/blogs/logo.png",
  category: "General",
  published_date: new Date().toISOString().split('T')[0],
  views: 0,
  created_at: new Date().toISOString()
};

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load blog details from API
  useEffect(() => {
    const loadBlogDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Loading blog details for ID:', id);
        
        if (!id) {
          throw new Error('Blog ID is required');
        }
        
        const data = await fetchBlogDetails(id);
        
        if (data) {
          setBlog(data);
          console.log('✅ Blog details loaded successfully:', data.title);
          console.log('🔍 Blog data:', data);
        } else {
          throw new Error('Blog post not found');
        }
      } catch (err) {
        console.error('❌ Failed to load blog details:', err.message);
        setError(err.message);
        // Use fallback data
        setBlog(fallbackBlogData);
        console.log('🔄 Using fallback blog data');
      } finally {
        setLoading(false);
      }
    };

    loadBlogDetails();
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown Date';
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-10 w-32 bg-gray-200 rounded mb-8"></div>
            
            {/* Title skeleton */}
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
            
            {/* Meta info skeleton */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            
            {/* Image skeleton */}
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && !blog) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Blog Post Not Found</h1>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
              <Link
                to="/"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </button>
        </motion.div>

        {/* Blog Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Category Badge */}
          {blog.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full">
                {blog.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            {/* Author */}
            <div className="flex items-center gap-3">
              {blog.author_avatar && (
                <img
                  src={blog.author_avatar}
                  alt={blog.author_name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/blogs/logo.png';
                  }}
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{blog.author_name}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Published Date */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(blog.published_date)}</span>
            </div>

            {/* Views */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{blog.views} views</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        {blog.featured_image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                console.log(`⚠️ Featured image failed to load: ${blog.featured_image}`);
                e.target.src = '/images/blogs/blog.jpg';
              }}
              onLoad={() => {
                console.log(`✅ Featured image loaded: ${blog.featured_image}`);
              }}
            />
          </motion.div>
        )}

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.article>

        {/* Back to Blog Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Blog ID: {id}</p>
            <p>Blog Title: {blog?.title}</p>
            <p>Data Source: {error ? 'Fallback' : 'Database'}</p>
            <p>API Status: {error ? `Error: ${error}` : 'Success'}</p>
          </div>
        )}
      </div>
    </section>
  );
}