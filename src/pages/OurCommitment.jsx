import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchCommitments } from "../services/api.js";

export default function OurCommitment() {
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load commitments from API
  useEffect(() => {
    const loadCommitments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Loading commitments from API');
        
        const data = await fetchCommitments();
        
        if (data && Array.isArray(data)) {
          setCommitments(data);
          console.log('✅ Commitments loaded successfully:', data.length, 'items');
          console.log('📊 Commitments data:', data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('❌ Failed to load commitments:', err.message);
        setError(err.message);
        setCommitments([]);
      } finally {
        setLoading(false);
      }
    };

    loadCommitments();
  }, []);

  return (
    <section className="bg-linear-to-b from-orange-50 via-white to-white py-14 md:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Institutional Values
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            Our Commitment
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base">
            Our institutional commitments reflect our dedication to excellence, innovation, and social responsibility.
          </p>
        </motion.div>

        {loading ? (
          // Loading skeleton
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-8 bg-gray-200 rounded-full w-24"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error message
          <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-center">
            <p className="text-sm font-semibold text-red-700">
              ❌ Error loading commitments: {error}
            </p>
            <p className="mt-2 text-xs text-red-600">
              Please check the browser console for more details or try refreshing the page.
            </p>
          </div>
        ) : commitments.length > 0 ? (
          // Commitments list
          <div className="space-y-5">
            {commitments.map((section, index) => (
              <motion.article
                key={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {section.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.tags && Array.isArray(section.tags) && section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          // No data message
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm font-semibold text-gray-700">
              No commitments available
            </p>
          </div>
        )}

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && !loading && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Commitments Count: {commitments.length}</p>
            <p>Data Source: {error ? 'Error' : 'Database'}</p>
            <p>API Status: {error ? `Error: ${error}` : 'Success'}</p>
          </div>
        )}
      </div>
    </section>
  );
}
