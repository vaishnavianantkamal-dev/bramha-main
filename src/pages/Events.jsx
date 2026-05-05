import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";

const lifeGallery = {
    brahmautsav: {
        title: "Brahmautsav",
        subtitle: "Campus culture, performances, and celebrations",
        images: [
            "/images/Brahmautsav/one.jpeg",
            "/images/Brahmautsav/two.jpeg",
            "/images/Brahmautsav/three.jpeg",
            "/images/Brahmautsav/four.jpeg",
            "/images/Brahmautsav/five.jpg",
            "/images/Brahmautsav/six.jpeg",
            "/images/Brahmautsav/seven.jpeg",
            "/images/Brahmautsav/eight.jpeg",
            "/images/Brahmautsav/nine.jpeg",
            "/images/Brahmautsav/ten.jpeg",
            "/images/Brahmautsav/eleven.jpeg",
            "/images/Brahmautsav/twelve.jpeg",
            "/images/Brahmautsav/thirteen.jpeg",
            "/images/Brahmautsav/fourteen.jpeg",
            "/images/Brahmautsav/fifthteen.jpeg",
            "/images/Brahmautsav/eighteen.jpeg",
            "/images/Brahmautsav/ningtheen.jpeg",
            "/images/Brahmautsav/twenty.jpeg",
            "/images/Brahmautsav/twentyone.jpeg",
        ],
    },
    events: {
        title: "Events",
        subtitle: "Highlights from seminars, gatherings, and campus activities",
        images: [
            "/images/events/first.jpg",
            "/images/events/second.jpg",
            "/images/events/third.jpg",
            "/images/events/fourth.png",
        ],
    },
    sports: {
        title: "Sports",
        subtitle: "Athletics, tournaments, and fitness moments",
        images: [],
    },
    festival: {
        title: "Festival",
        subtitle: "Festive spirit and cultural showcases",
        images: [
            "/images/festivals/cultural-dance.jpg",
            "/images/festivals/cultural-show.jpg",
            "/images/festivals/dance.jpg",
            "/images/festivals/lavani.jpg",
            "/images/festivals/lezim.jpg",
            "/images/festivals/shiv-show.jpg",
        ],
    },
};

const lifeTabs = [
    { slug: "brahmautsav", label: "Brahmautsav" },
    { slug: "events", label: "Events" },
    { slug: "sports", label: "Sports" },
    { slug: "festival", label: "Festival" },
];

function GalleryTabs({ activeSlug }) {
    return (
        <div className="mb-8 flex flex-wrap gap-2">
            {lifeTabs.map((tab) => {
                const active = tab.slug === activeSlug;
                return (
                    <Link
                        key={tab.slug}
                        to={`/life-at-bv/${tab.slug}`}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-600"
                            }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}

export default function Events() {
    const { slug = "brahmautsav" } = useParams();
    const category = lifeGallery[slug];
    const [activeIndex, setActiveIndex] = useState(null);

    const hasImages = Boolean(category?.images?.length);

    const openLightbox = (index) => setActiveIndex(index);
    const closeLightbox = () => setActiveIndex(null);
    const showPrev = () => {
        if (!hasImages) return;
        setActiveIndex((prev) => (prev === 0 ? category.images.length - 1 : prev - 1));
    };
    const showNext = () => {
        if (!hasImages) return;
        setActiveIndex((prev) => (prev === category.images.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (activeIndex === null) return;
        const onKeyDown = (event) => {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showPrev();
            if (event.key === "ArrowRight") showNext();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeIndex, category]);

    if (!category) {
        return (
            <section className="bg-gray-50 py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <h1 className="text-3xl font-bold text-gray-900">Gallery Not Found</h1>
                    <p className="mt-2 text-gray-600">Select a valid Life @BV section.</p>
                    <div className="mt-6">
                        <GalleryTabs activeSlug="" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-linear-to-b from-amber-50 via-white to-white py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">Life @BV</p>
                    <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">{category.title}</h1>
                    <p className="mt-2 text-sm text-gray-600 md:text-base">{category.subtitle}</p>
                </motion.div>

                <GalleryTabs activeSlug={slug} />

                {category.images.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
                        <p className="text-base font-semibold text-gray-700">No images uploaded for {category.title} yet.</p>
                    </div>
                ) : (
                    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:balance]">
                        {category.images.map((src, index) => (
                            <motion.figure
                                key={`${src}-${index}`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
                                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                            >
                                <button
                                    type="button"
                                    onClick={() => openLightbox(index)}
                                    className="group block w-full text-left"
                                    aria-label={`Open ${category.title} image ${index + 1}`}
                                >
                                    <img
                                        src={src}
                                        alt={`${category.title} ${index + 1}`}
                                        loading="lazy"
                                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                </button>
                            </motion.figure>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {activeIndex !== null && hasImages && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-80 flex items-center justify-center bg-black/90 p-4"
                            onClick={closeLightbox}
                        >
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    closeLightbox();
                                }}
                                className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    showPrev();
                                }}
                                className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-xl font-bold text-white hover:bg-white/20"
                                aria-label="Previous image"
                            >
                                <FaLessThan />

                            </button>

                            <motion.img
                                key={category.images[activeIndex]}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.2 }}
                                src={category.images[activeIndex]}
                                alt={`${category.title} ${activeIndex + 1}`}
                                className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
                                onClick={(event) => event.stopPropagation()}
                            />

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    showNext();
                                }}
                                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-xl font-bold text-white hover:bg-white/20"
                                aria-label="Next image"
                            >
                                <FaGreaterThan />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
