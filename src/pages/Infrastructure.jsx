import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchInfrastructure } from "../services/api.js";

// Fallback data in case API fails
const fallbackInfrastructureSections = [
  {
    id: 1,
    title: "Academic Blocks",
    subtitle: "Dedicated spaces for classrooms, labs, and faculty rooms can be listed here.",
    points: ["Classrooms", "Laboratories", "Seminar Halls", "Faculty Rooms", "Research Centers"],
    image: "/images/graduation.jpg",
    display_order: 1
  },
  {
    id: 2,
    title: "Campus Amenities",
    subtitle: "Student support and common use facilities can be highlighted in this section.",
    points: ["Library", "Hostel", "Transportation", "Cafeteria", "Medical Center", "Banking Services"],
    image: "/images/facilities/hostel.jpg",
    display_order: 2
  },
  {
    id: 3,
    title: "Sports & Wellness",
    subtitle: "Infrastructure for physical activity, recreation, and wellness goes here.",
    points: ["Indoor Games", "Outdoor Grounds", "Gymnasium", "Swimming Pool", "Yoga Center", "Sports Equipment"],
    image: "/images/events/third.jpg",
    display_order: 3
  },
  {
    id: 4,
    title: "Digital Infrastructure",
    subtitle: "Technology backbone and digital services can be described in detail.",
    points: ["Computer Centers", "Campus Network", "Wi-Fi Coverage", "Digital Library", "Online Learning Platform", "Smart Classrooms"],
    image: "/images/placements/chemistry-lab.jpg",
    display_order: 4
  },
];

export default function Infrastructure() {
  const [infrastructureSections, setInfrastructureSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load infrastructure data from API
  useEffect(() => {
    const loadInfrastructure = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Loading infrastructure sections...');
        const data = await fetchInfrastructure();
        
        if (Array.isArray(data) && data.length > 0) {
          setInfrastructureSections(data);
          console.log('✅ Infrastructure loaded from database:', data.length, 'sections');
          console.log('🔍 Infrastructure sections:', data);
        } else {
          console.warn('⚠️ No infrastructure data received, using fallback');
          setInfrastructureSections(fallbackInfrastructureSections);
        }
      } catch (err) {
        console.error('❌ Failed to load infrastructure:', err.message);
        setError(err.message);
        // Use fallback data
        setInfrastructureSections(fallbackInfrastructureSections);
        console.log('🔄 Using fallback infrastructure data');
      } finally {
        setLoading(false);
      }
    };

    loadInfrastructure();
  }, []);

  return (
    <section className="bg-linear-to-b from-slate-50 via-white to-white py-14 md:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Campus
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            Infrastructure
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base">
            {loading 
              ? "Loading infrastructure information..." 
              : error 
                ? `Error loading data: ${error}. Showing fallback content.`
                : "Comprehensive infrastructure facilities designed to support academic excellence and student life."
            }
          </p>
        </motion.div>

        {loading ? (
          // Loading skeleton
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {infrastructureSections.map((section, index) => (
              <motion.article
                key={section.id || section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Optional image display */}
                {section.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        console.log(`⚠️ Image failed to load: ${section.image}`);
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        console.log(`✅ Image loaded successfully: ${section.image}`);
                      }}
                    />
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {section.subtitle || section.description}
                </p>
                
                {section.points && section.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {section.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>
        )}

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && !loading && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Sections loaded: {infrastructureSections.length}</p>
            <p>Data source: {error ? 'Fallback' : 'Database'}</p>
            <p>API Status: {error ? `Error: ${error}` : 'Success'}</p>
          </div>
        )}
      </div>
    </section>
  );
}
