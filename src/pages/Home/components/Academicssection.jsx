import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const academicCategories = [
  {
    id: 1,
    title: "Higher Education",
    count: "10 Colleges",
    description: "Engineering, Management, Pharmacy, Arts & Science",
    image: "/images/higher-education.jpg",
    fallback:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=80",
    tag: "UG & PG",
    color: "from-blue-900/80",
  },
  {
    id: 2,
    title: "Junior College",
    count: "2 Colleges",
    description: "Science, Commerce & Arts streams",
    image: "/images/junior-college.jpg",
    fallback:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80",
    tag: "11th & 12th",
    color: "from-orange-900/80",
  },
  {
    id: 3,
    title: "Diploma",
    count: "1 College",
    description: "Polytechnic & Technical Programs",
    image: "/images/diploma.jpg",
    fallback:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80",
    tag: "Technical",
    color: "from-green-900/80",
  },
  {
    id: 4,
    title: "School",
    count: "2 Schools",
    description: "CBSE & State Board from Primary to 10th",
    image: "/images/school.jpg",
    fallback:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80",
    tag: "K-10",
    color: "from-purple-900/80",
  },
];

const quickLinks = [
  "Browse by Courses",
  "Admission Process",
  "Fee Structure",
  "Scholarships",
];

function CategoryCard({ category, index }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group h-64"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = category.fallback;
        }}
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-t ${category.color} via-transparent to-transparent opacity-90`}
      />

      {/* Tag top-right */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/30">
        {category.tag}
      </div>

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-orange-300 text-xs font-semibold tracking-widest uppercase mb-1">
          {category.count}
        </p>
        <h3 className="text-white text-xl font-bold">{category.title}</h3>
        <motion.p
          className="text-white/70 text-sm mt-1 leading-snug"
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
        >
          {category.description}
        </motion.p>

        {/* Arrow on hover */}
        <motion.div className="flex items-center gap-2 mt-2 text-orange-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore</span>
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
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AcademicsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left Panel */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-6 h-px bg-orange-500" />
              <span className="text-orange-500 text-xs tracking-[0.25em] uppercase font-semibold">
                Academics
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Shaping Futures
              <br />
              <span className="text-orange-500">Through Education</span>
            </motion.h2>

            <motion.div
              className="border-l-4 border-orange-500 pl-5 mb-8"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore our comprehensive academic offerings — from schools to
                higher education institutions — all designed to foster growth,
                innovation & excellence.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <p className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-4">
                Quick Links
              </p>
              <ul className="space-y-2">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-orange-500 text-sm py-2 border-b border-gray-100 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-orange-500 transition-colors duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              All Programs
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

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {academicCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
