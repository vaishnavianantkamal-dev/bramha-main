import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fetchCourses } from "../services/api.js";

export default function CoursesPage() {
    const [coursesData, setCoursesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("level");
    const [filters, setFilters] = useState({ level: "All", duration: "All", campus: "All", institution: "All" });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    // Fetch courses from API
    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchCourses();
                setCoursesData(data);
                console.log('✅ Courses loaded from database:', data.length, 'courses');
            } catch (err) {
                console.error('❌ Failed to load courses:', err);
                setError(err.message);
                setCoursesData([]);
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    // Build filter options dynamically from loaded data
    const filterTabs = useMemo(() => [
        {
            id: "level",
            label: "Course Level",
            icon: (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                </svg>
            ),
            options: ["All", ...Array.from(new Set(coursesData.map((c) => c.level)))],
        },
        {
            id: "duration",
            label: "Duration",
            icon: (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            options: ["All", ...Array.from(new Set(coursesData.map((c) => c.duration))).sort()],
        },
        {
            id: "campus",
            label: "Campus",
            icon: (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            options: ["All", ...Array.from(new Set(coursesData.map((c) => c.campus)))],
        },
        {
            id: "institution",
            label: "Institution",
            icon: (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            options: ["All", ...Array.from(new Set(coursesData.map((c) => c.institution)))],
        },
    ], [coursesData]);

    const currentTab = filterTabs.find((t) => t.id === activeTab);
    const setFilter = (key, val) => setFilters((p) => ({ ...p, [key]: val }));
    const hasFilters = Object.values(filters).some((v) => v !== "All");

    const filtered = useMemo(() =>
        coursesData.filter((c) => {
            if (filters.level !== "All" && c.level !== filters.level) return false;
            if (filters.duration !== "All" && c.duration !== filters.duration) return false;
            if (filters.campus !== "All" && c.campus !== filters.campus) return false;
            if (filters.institution !== "All" && c.institution !== filters.institution) return false;
            return true;
        }), [filters]);

    return (
        <section ref={ref} className="py-20 bg-white min-h-screen">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Courses</h1>
                    <p className="text-gray-500 text-base font-medium mb-1">Explore Our Courses</p>
                    <p className="text-gray-400 text-sm">
                        Find the right path based on level, duration, campus, or institution.
                    </p>
                </motion.div>

                {/* Layout */}
                <motion.div
                    className="grid lg:grid-cols-[240px_1fr] gap-5 items-start"
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.1 }}
                >
                    {/* ── Sidebar ── */}
                    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white lg:sticky lg:top-28">
                        {filterTabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const hasVal = filters[tab.id] !== "All";
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-2.5 px-4 py-3.5 text-left border-b border-gray-100 last:border-b-0 transition-colors duration-200 text-sm ${isActive
                                        ? "bg-orange-500 text-white font-semibold"
                                        : "text-gray-600 hover:bg-gray-50 font-medium"
                                        }`}
                                >
                                    <span className={isActive ? "text-white/80" : "text-gray-400"}>{tab.icon}</span>
                                    <span className="flex-1">{tab.label}</span>
                                    {hasVal && !isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                                    )}
                                </button>
                            );
                        })}

                        {/* Options */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                className="border-t border-gray-100 py-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {currentTab.options.map((opt) => {
                                    const selected = filters[activeTab] === opt;
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => setFilter(activeTab, opt)}
                                            className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 ${selected
                                                ? "text-orange-600 font-semibold bg-orange-50"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                                }`}
                                        >
                                            <span className="truncate pr-3 leading-snug">{opt}</span>
                                            {selected && (
                                                <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Content Panel ── */}
                    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">

                        {/* Panel header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
                            <div>
                                <p className="text-gray-800 font-semibold text-sm">
                                    Programs by {currentTab.label}
                                    {filters[activeTab] !== "All" && (
                                        <span className="text-orange-500 font-normal ml-1">— {filters[activeTab]}</span>
                                    )}
                                </p>
                                <p className="text-gray-400 text-xs mt-0.5">
                                    {filtered.length} {filtered.length === 1 ? "course" : "courses"} found
                                </p>
                            </div>
                            {hasFilters && (
                                <button
                                    onClick={() => setFilters({ level: "All", duration: "All", campus: "All", institution: "All" })}
                                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors duration-150"
                                >
                                    Reset all
                                </button>
                            )}
                        </div>

                        {/* Column heads */}
                        {filtered.length > 0 && (
                            <div className="flex items-center gap-4 px-5 py-2.5 border-b border-gray-100 bg-white">
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider w-7 shrink-0">#</span>
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex-1">Course Name</span>
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider w-20 text-center hidden md:block">Duration</span>
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider w-28 hidden lg:block">Campus</span>
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider w-20 text-center">Level</span>
                                <span className="w-12 hidden sm:block" />
                            </div>
                        )}

                        {/* Rows */}
                        <AnimatePresence mode="wait">
                            {filtered.length > 0 ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {filtered.map((course, i) => (
                                        <motion.div
                                            key={course.id}
                                            className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150 group"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.025, duration: 0.25 }}
                                        >
                                            <span className="text-gray-300 text-xs font-mono w-7 shrink-0">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-800 text-sm font-medium group-hover:text-orange-600 transition-colors duration-200 truncate">
                                                    {course.name}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-0.5 truncate">{course.institution}</p>
                                            </div>

                                            <span className="text-gray-500 text-xs w-20 text-center hidden md:block shrink-0">
                                                {course.duration}
                                            </span>

                                            <span className="text-gray-500 text-xs w-28 hidden lg:block shrink-0 truncate">
                                                {course.campus}
                                            </span>

                                            <span className="w-20 text-center shrink-0">
                                                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                    {course.level}
                                                </span>
                                            </span>

                                            <a
                                                href="#"
                                                className="text-xs text-orange-500 font-semibold w-12 text-right shrink-0 hidden sm:block hover:text-orange-700 transition-colors duration-150"
                                            >
                                                Apply
                                            </a>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    className="py-20 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p className="text-gray-400 text-sm">No courses available under this category.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}