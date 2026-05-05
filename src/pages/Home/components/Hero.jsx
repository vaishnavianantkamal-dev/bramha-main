import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const slides = [
  {
    image: "/images/hero-1.png",
    tag: "World-Class Faculty",
    headline: "Learn from the",
    highlight: "Best Minds",
    sub: "200+ expert faculty dedicated to your academic journey.",
  },
  {
    image: "/images/hero-2.jpg",
    tag: "Est. 1998",
    headline: "Shaping Tomorrow's",
    highlight: "Leaders",
    sub: "Where knowledge meets ambition — a campus built for the bold.",
  },
  {
    image: "/images/hero-3.webp",
    tag: "50+ Programs",
    headline: "Discover Your",
    highlight: "Passion",
    sub: "Engineering, Management, Pharmacy & more under one valley.",
  },
];

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "15K+", label: "Alumni Worldwide" },
  { value: "50+", label: "Programs Offered" },
  { value: "200+", label: "Expert Faculty" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 600);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(i);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {/* Google Fonts Import via style tag trick */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        .orange-glow { box-shadow: 0 0 40px rgba(249,115,22,0.5); }
        .text-stroke { -webkit-text-stroke: 2px #f97316; color: transparent; }
      `}</style>

      {/* === Background Slides === */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src={slides[current].image}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Multi-layer overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* === Decorative Elements === */}
      {/* Orange vertical accent bar */}
      <motion.div
        className="absolute left-0 top-0 w-1.5 h-full bg-linear-to-b from-transparent via-orange-500 to-transparent z-10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
      />

      {/* Decorative circle */}
      <div className="absolute top-1/4 right-16 w-72 h-72 rounded-full border border-orange-500/20 hidden xl:block z-10" />
      <div className="absolute top-1/4 right-16 w-52 h-52 translate-x-10 translate-y-10 rounded-full border border-orange-500/10 hidden xl:block z-10" />

      {/* === Top Nav Strip === */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-16 py-5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Brahma Valley Logo"
            className="p-1 w-14 h-14 rounded-full object-cover orange-glow"
          />
          <div>
            <p className="text-white font-display font-bold text-lg leading-none">
              Brahma Valley
            </p>
          </div>
        </div>

        {/* Quick links */}
        {/* <div className="hidden md:flex items-center gap-6 font-body text-sm text-white/70">
          {["Admissions", "Programs", "Campus", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-orange-400 transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}
          <motion.a
            href="#"
            className="ml-4 px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply Now
          </motion.a>
        </div> */}
      </motion.div>

      {/* === Main Content === */}
      <motion.div
        className="relative z-20 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24"
        style={{ opacity }}
      >
        <div className="max-w-3xl pt-24 pb-32">
          {/* Tag badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-6 h-px bg-orange-500" />
              <span className="font-body text-orange-400 text-sm tracking-[0.2em] uppercase font-medium">
                {slides[current].tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`headline-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white mb-2">
                {slides[current].headline}
              </h1>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-orange-500 mb-6">
                {slides[current].highlight}
              </h1>
              <p className="font-body text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                {slides[current].sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.a
              href="/courses"
              className="group relative px-8 py-4 bg-orange-500 text-white font-body font-semibold text-base rounded-full overflow-hidden"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Explore Programs</span>
              <motion.div
                className="absolute inset-0 bg-orange-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="/placement"
              className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-body font-medium text-base rounded-full hover:border-orange-500/60 hover:text-orange-400 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Virtual Tour</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* === Slide Indicators === */}
      <div className="absolute bottom-32 left-8 md:left-16 z-30 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group flex items-center gap-2"
          >
            <motion.div
              className="h-0.5 bg-orange-500 rounded-full"
              animate={{
                width: i === current ? 32 : 12,
                opacity: i === current ? 1 : 0.4,
              }}
              transition={{ duration: 0.4 }}
            />
          </button>
        ))}
        <span className="font-body text-white/40 text-xs ml-2">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* === Stats Bar === */}
      {/* <motion.div
        className="absolute bottom-0 left-0 right-0 z-30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      >
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 mx-0">
          <div className="max-w-6xl mx-auto px-8 md:px-16 py-5 grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center justify-center py-3 border-r border-white/10 last:border-r-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="font-display text-2xl md:text-3xl font-bold text-orange-500">
                  {stat.value}
                </span>
                <span className="font-body text-white/50 text-xs md:text-sm tracking-wide mt-0.5">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div> */}

      {/* Scroll hint */}
      <motion.div
        className="absolute right-8 md:right-16 bottom-36 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span
          className="font-body text-white/30 text-xs tracking-[0.2em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-linear-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
