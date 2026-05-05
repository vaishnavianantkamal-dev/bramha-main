import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  { icon: "🎯", label: "Accessibility" },
  { icon: "💡", label: "Innovation" },
  { icon: "🏆", label: "Excellence" },
  { icon: "🤝", label: "Integrity" },
];

const highlights = [
  { value: "1998", label: "Year Founded" },
  { value: "Nashik", label: "Maharashtra" },
  { value: "50+", label: "Acre Campus" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50 clip-diagonal opacity-60 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-orange-100/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Label */}
        <motion.div
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="w-8 h-px bg-orange-500" />
          <span className="text-orange-500 text-xs tracking-[0.25em] uppercase font-semibold">
            About Us
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Brahma Valley <span className="text-orange-500">Group of</span>
              <br />
              Institutions
            </motion.h2>

            <motion.div
              className="w-16 h-1 bg-orange-500 rounded-full mb-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="text-gray-600 text-base md:text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Brahma Valley Group of Institutions, rooted in nature and rising
              in excellence, is dedicated to empowering young minds through
              quality education. Located amidst the serene landscapes of Nashik,
              our integrated campus offers diverse programs across Engineering,
              Management, Pharmacy, Education, Arts, Science, and Commerce,
              along with world-class schools and residential facilities.
            </motion.p>

            <motion.p
              className="text-gray-600 text-base leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Guided by the values of Accessibility, Affordability, and
              Excellence, we provide equal opportunities for students from all
              backgrounds. At Brahma Valley, we are not just shaping careers —
              we are building futures.
            </motion.p>

            {/* Values chips */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-sm text-gray-700"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#fff7ed",
                    borderColor: "#f97316",
                  }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span>{v.icon}</span>
                  <span className="font-medium">{v.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick highlights */}
            {/* <motion.div
              className="flex gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {highlights.map((h, i) => (
                <div key={h.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-orange-500">
                    {h.value}
                  </span>
                  <span className="text-xs text-gray-500 tracking-wide mt-0.5">
                    {h.label}
                  </span>
                </div>
              ))}
            </motion.div> */}

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 mt-10 px-7 py-3 bg-orange-500 text-white rounded-full font-semibold text-sm hover:bg-orange-600 transition-colors duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Discover Our Story
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </div>

          {/* Right — Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange-200 rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/10 rounded-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-105 lg:h-120">
              <img
                src="/images/about-students.jpg"
                alt="Brahma Valley Students"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/aboutsection.jpg";
                }}
              />
              {/* Overlay badge */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white rounded-xl px-5 py-4 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <p className="text-orange-500 font-bold text-2xl">25+</p>
                <p className="text-gray-600 text-xs mt-0.5">
                  Years of Excellence
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
