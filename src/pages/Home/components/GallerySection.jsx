import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchGalleryCategories, fetchGalleryImages } from "../../../services/api.js";

// Fallback data in case API fails
const fallbackCategories = ["Brahmautsav", "Events", "Sports", "Festivals"];

const fallbackGalleryData = {
    Brahmautsav: [
        { id: 1, image: "/images/festivals/shiv-show.jpg", caption: "Brahmautsav Cultural Fest 2025" },
        { id: 2, image: "/images/festivals/dance.jpg", caption: "Annual Day Celebration" },
        { id: 3, image: "/images/festivals/lavani.jpg", caption: "Cultural Performances" },
        { id: 4, image: "/images/festivals/lezim.jpg", caption: "Prize Distribution Ceremony" },
    ],
    Events: [
        { id: 1, image: "/images/events/first.jpg", caption: "5th International Climate Summit – Green Leadership Awards" },
        { id: 2, image: "/images/events/second.jpg", caption: "Award Ceremony – PHD House, New Delhi" },
        { id: 3, image: "/images/events/third.jpg", caption: "Sir Visvesvaraya Auditorium – Technical Seminar" },
        { id: 4, image: "/images/events/fourth.png", caption: "Industry Expert Interaction Session" },
    ],
    Sports: [
        { id: 1, image: "/facilities/image1.png", caption: "Sports Complex - Indoor Facilities" },
        { id: 2, image: "/facilities/image2.jpg", caption: "Athletic Track and Field" },
        { id: 3, image: "/facilities/image3.png", caption: "Basketball Court" },
        { id: 4, image: "/facilities/image4.png", caption: "Swimming Pool Complex" },
    ],
    Festivals: [
        { id: 1, image: "/images/festivals/shiv-show.jpg", caption: "Shiv Utsav Celebration" },
        { id: 2, image: "/images/festivals/dance.jpg", caption: "Group Dance Performance" },
        { id: 3, image: "/images/festivals/lavani.jpg", caption: "Lavni Performance" },
        { id: 4, image: "/images/festivals/lezim.jpg", caption: "Lezim Festival" },
        { id: 5, image: "/images/festivals/cultural-dance.jpg", caption: "Cultural Dance Performance" },
        { id: 6, image: "/images/festivals/cultural-show.jpg", caption: "Cultural Show" },
    ],
};

// Fallback images per category
const fallbacks = {
    Brahmautsav: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80",
    ],
    Events: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    ],
    Sports: [
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
        "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600&q=80",
    ],
    Festivals: [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80",
        "https://images.unsplash.com/photo-1519671282429-b8f59e8da1c0?w=600&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    ],
};

// Lightbox
function Lightbox({ images, activeIndex, onClose, onPrev, onNext, category }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <button
                className="absolute top-5 right-5 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
                onClick={onClose}
            >
                ✕
            </button>
            <button
                className="absolute left-4 md:left-8 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
                ‹
            </button>
            <button
                className="absolute right-4 md:right-8 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
                ›
            </button>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    className="max-w-4xl w-full mx-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={images[activeIndex].image}
                        alt={images[activeIndex].caption}
                        loading="lazy"
                        className="w-full max-h-[75vh] object-contain rounded-xl"
                        onError={(e) => { e.target.src = fallbacks[category][activeIndex]; }}
                    />
                    <p className="text-white/70 text-sm text-center mt-4">{images[activeIndex].caption}</p>
                    <p className="text-white/30 text-xs text-center mt-1">{activeIndex + 1} / {images.length}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default function GallerySection() {
    const [activeCategory, setActiveCategory] = useState("Events");
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [categories, setCategories] = useState([]);
    const [galleryData, setGalleryData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load categories and initial gallery data
    useEffect(() => {
        const loadGalleryData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load categories
                const categoriesData = await fetchGalleryCategories();
                const categoryNames = categoriesData.map(cat => cat.name);
                setCategories(categoryNames);

                // Load images for each category
                const galleryDataMap = {};
                for (const category of categoriesData) {
                    try {
                        const images = await fetchGalleryImages(category.slug);
                        console.log(`🖼️ Raw images for ${category.name}:`, images);
                        
                        // Transform API data to match component structure
                        galleryDataMap[category.name] = images.map((img, index) => {
                            console.log(`🖼️ Raw Image ${index + 1} for ${category.name}:`, img);
                            const transformedImg = {
                                id: img.id,
                                image: img.image_path, // Map image_path to image
                                caption: img.caption || `${category.name} Image ${index + 1}` // Use caption directly
                            };
                            console.log(`🔗 Final Image ${index + 1} URL for ${category.name}:`, transformedImg.image);
                            console.log(`📝 Image ${index + 1} caption for ${category.name}:`, transformedImg.caption);
                            return transformedImg;
                        });
                        
                        console.log(`✅ Transformed images for ${category.name}:`, galleryDataMap[category.name]);
                    } catch (imgError) {
                        console.error(`Failed to load images for ${category.name}:`, imgError);
                        // Use fallback data for this category
                        galleryDataMap[category.name] = fallbackGalleryData[category.name] || [];
                    }
                }

                setGalleryData(galleryDataMap);
                console.log('✅ Gallery data loaded from database:', Object.keys(galleryDataMap).length, 'categories');

                // Set default active category if current one doesn't exist
                if (!categoryNames.includes(activeCategory)) {
                    setActiveCategory(categoryNames[0] || "Events");
                }
            } catch (err) {
                console.error('❌ Failed to load gallery data:', err);
                setError(err.message);
                // Use fallback data
                setCategories(fallbackCategories);
                setGalleryData(fallbackGalleryData);
                console.log('🔄 Using fallback gallery data');
            } finally {
                setLoading(false);
            }
        };

        loadGalleryData();
    }, []);

    const images = galleryData[activeCategory] || [];

    const openLightbox = (i) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const prev = () => setLightboxIndex((p) => (p - 1 + images.length) % images.length);
    const next = () => setLightboxIndex((p) => (p + 1) % images.length);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="w-8 h-px bg-orange-500" />
                        <span className="text-orange-500 text-xs tracking-[0.25em] uppercase font-semibold">
                            Campus Life
                        </span>
                        <span className="w-8 h-px bg-orange-500" />
                    </motion.div>
                    <motion.h2
                        className="text-4xl font-bold text-gray-900"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Our Gallery
                    </motion.h2>
                </div>

                {/* Category Tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
                        ))
                    ) : (
                        categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${activeCategory === cat
                                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))
                    )}
                </motion.div>

                {/* Image Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                    >
                        {loading ? (
                            // Loading skeleton
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="aspect-[4/3] bg-gray-200 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : images.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-sm">No images available for {activeCategory}</p>
                                {error && (
                                    <p className="text-red-500 text-xs mt-2">Error: {error}</p>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3]"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.07, duration: 0.4 }}
                                        onClick={() => openLightbox(i)}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.caption}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                                            onLoad={(e) => {
                                                console.log(`✅ Gallery image loaded successfully:`, e.target.src);
                                            }}
                                            onError={(e) => { 
                                                console.error(`❌ Gallery image failed to load:`, e.target.src);
                                                // Fallback to original hardcoded images
                                                const fallbackImages = fallbacks[activeCategory];
                                                if (fallbackImages && fallbackImages[i]) {
                                                    console.log(`🔄 Trying fallback image:`, fallbackImages[i]);
                                                    e.target.src = fallbackImages[i];
                                                } else {
                                                    // Use generic fallback
                                                    console.log(`🔄 Using generic fallback image`);
                                                    e.target.src = '/fallback-image.jpg';
                                                }
                                            }}
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-end">
                                            <div className="p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <p className="text-white text-xs font-medium leading-snug">{item.caption}</p>
                                            </div>
                                        </div>
                                        {/* Zoom icon */}
                                        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <svg className="w-3.5 h-3.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* View More */}
                        <div className="flex justify-center mt-8">
                            <Link
                                to="/events"
                                className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-orange-500 transition-colors duration-300"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View More
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={images}
                        activeIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prev}
                        onNext={next}
                        category={activeCategory}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}