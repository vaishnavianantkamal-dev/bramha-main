import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../../../services/api.js";

// Fallback data in case API fails
const fallbackBlogPosts = [
    {
        id: 1,
        category: "Brahma Valley",
        title: "The Future of Education: How Brahma Valley is Leading the Change",
        author: "Team Brahma Valley",
        date: "Oct 07, 2025",
        image: "/images/blogs/blog.jpg",
        fallback: "/images/blogs/blog.jpg",
        avatar: "/images/blogs/sppu.png",
        avatarFallback: "BV",
        slug: "/blog/1",
    },
    {
        id: 2,
        category: "Blog",
        title: "Exploring API Testing with Postman: A Beginner's Guide",
        author: "PRISHA",
        date: "Jun 02, 2025",
        image: "/images/blogs/blog.jpg",
        fallback: "/images/blogs/blog.jpg",
        avatar: "/images/blogs/sppu.png",
        avatarFallback: "PR",
        slug: "/blog/2",
    },
    {
        id: 3,
        category: "Brahma Valley",
        title: "Why Brahma Valley is the Top Choice for Higher Education in Nashik",
        author: "Team Brahma Valley",
        date: "Feb 07, 2025",
        image: "/images/blogs/blog.jpg",
        fallback: "/images/blogs/blog.jpg",
        avatar: "/images/blogs/logo.png",
        avatarFallback: "BV",
        slug: "/blog/3",
    },
];

function BlogCard({ post, index }) {
    return (
        <motion.article
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-100 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden h-52">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = post.fallback; }}
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 text-orange-600 text-xs font-semibold rounded-full shadow-sm">
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-gray-900 font-bold text-base leading-snug mb-4 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                {/* Author row */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                            }}
                        />
                        <span className="text-orange-600 text-xs font-bold hidden items-center justify-center w-full h-full">
                            {post.avatarFallback}
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-800 text-sm font-semibold leading-none">{post.author}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{post.date}</p>
                    </div>
                    <Link
                        to={`/blog/${post.id}`}
                        className="ml-auto text-orange-500 hover:text-orange-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

export default function BlogSection() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load blog posts from API
    useEffect(() => {
        const loadBlogPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchBlogPosts();
                
                // Transform API data to match component structure
                const transformedPosts = data.map(post => ({
                    id: post.id,
                    category: post.category || "Blog",
                    title: post.title,
                    author: post.author_name || post.author || "Unknown Author",
                    date: new Date(post.published_date || post.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: '2-digit' 
                    }),
                    image: post.featured_image || "/images/blogs/blog.jpg",
                    fallback: "/images/blogs/blog.jpg",
                    avatar: post.author_avatar || "/images/blogs/sppu.png",
                    avatarFallback: (post.author_name || post.author || "U").split(' ').map(n => n[0]).join('').substring(0, 2),
                    slug: `/blog/${post.id}`, // Dynamic route
                }));

                setBlogPosts(transformedPosts);
                console.log('✅ Blog posts loaded from database:', data.length, 'posts');
            } catch (err) {
                console.error('❌ Failed to load blog posts:', err);
                setError(err.message);
                // Use fallback data
                setBlogPosts(fallbackBlogPosts);
                console.log('🔄 Using fallback blog posts');
            } finally {
                setLoading(false);
            }
        };
        loadBlogPosts();
    }, []);
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-orange-500 text-xs tracking-[0.25em] uppercase font-semibold">
                            Recent Posts
                        </span>
                        <span className="flex-1 h-px bg-orange-200 max-w-16" />
                    </div>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Recent Blog Posts
                        </h2>
                        <a
                            href="#"
                            className="text-orange-500 text-sm font-semibold hover:underline flex items-center gap-1.5"
                        >
                            View All Posts
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </motion.div>

                {/* Cards */}
                {loading ? (
                    // Loading skeleton
                    <div className="grid md:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="h-52 bg-gray-200 animate-pulse" />
                                <div className="p-5">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-4" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
                                        <div className="flex-1">
                                            <div className="h-3 bg-gray-200 rounded animate-pulse mb-1" />
                                            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No blog posts available</p>
                        {error && (
                            <p className="text-red-500 text-sm mt-2">Error: {error}</p>
                        )}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}