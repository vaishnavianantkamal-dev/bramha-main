import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const programsData = [
  {
    id: 1,
    category: "Engineering",
    icon: "⚙️",
    badge: "Most Popular",
    programs: [
      { name: "B.E. Computer Engineering", duration: "4 Years", type: "UG" },
      { name: "B.E. Mechanical Engineering", duration: "4 Years", type: "UG" },
      { name: "B.E. Civil Engineering", duration: "4 Years", type: "UG" },
      { name: "B.E. Electronics & Telecom", duration: "4 Years", type: "UG" },
      { name: "M.E. Computer Engineering", duration: "2 Years", type: "PG" },
    ],
  },
  {
    id: 2,
    category: "Management",
    icon: "💼",
    badge: "High Placement",
    programs: [
      { name: "MBA", duration: "2 Years", type: "PG" },
      { name: "BBA", duration: "3 Years", type: "UG" },
      { name: "MBA Finance", duration: "2 Years", type: "PG" },
      { name: "MBA HR", duration: "2 Years", type: "PG" },
    ],
  },
  {
    id: 3,
    category: "Pharmacy",
    icon: "🧪",
    badge: "",
    programs: [
      { name: "B.Pharm", duration: "4 Years", type: "UG" },
      { name: "M.Pharm", duration: "2 Years", type: "PG" },
      { name: "D.Pharm", duration: "2 Years", type: "Diploma" },
      { name: "Pharm.D", duration: "6 Years", type: "UG" },
    ],
  },
  {
    id: 4,
    category: "Education",
    icon: "📚",
    badge: "",
    programs: [
      { name: "B.Ed", duration: "2 Years", type: "UG" },
      { name: "M.Ed", duration: "2 Years", type: "PG" },
      { name: "D.El.Ed", duration: "2 Years", type: "Diploma" },
    ],
  },
  {
    id: 5,
    category: "Arts & Science",
    icon: "🔬",
    badge: "",
    programs: [
      { name: "B.Sc. Computer Science", duration: "3 Years", type: "UG" },
      { name: "B.A.", duration: "3 Years", type: "UG" },
      { name: "M.Sc.", duration: "2 Years", type: "PG" },
      { name: "M.A.", duration: "2 Years", type: "PG" },
    ],
  },
  {
    id: 6,
    category: "Commerce",
    icon: "📊",
    badge: "",
    programs: [
      { name: "B.Com", duration: "3 Years", type: "UG" },
      { name: "M.Com", duration: "2 Years", type: "PG" },
      { name: "B.Com (Accounting & Finance)", duration: "3 Years", type: "UG" },
    ],
  },
];

const typeColors = {
  UG: "bg-blue-100 text-blue-700",
  PG: "bg-purple-100 text-purple-700",
  Diploma: "bg-green-100 text-green-700",
};

function ProgramCard({ program, index }) {
  return (
    <motion.div
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
    >
      {/* Orange left border on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl origin-bottom" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:bg-orange-500 transition-colors duration-300">
            <span className="group-hover:brightness-0 group-hover:invert transition-all">
              {program.icon}
            </span>
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-base">
              {program.category}
            </h3>
            <p className="text-gray-400 text-xs">
              {program.programs.length} Programmes
            </p>
          </div>
        </div>
        {program.badge && (
          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
            {program.badge}
          </span>
        )}
      </div>

      {/* Programs List */}
      <ul className="space-y-2">
        {program.programs.slice(0, 3).map((p) => (
          <li key={p.name} className="flex items-center justify-between">
            <span className="text-gray-600 text-sm flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
              {p.name}
            </span>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[p.type] || "bg-gray-100 text-gray-600"}`}
              >
                {p.type}
              </span>
            </div>
          </li>
        ))}
        {program.programs.length > 3 && (
          <li className="text-orange-500 text-xs font-semibold pt-1">
            +{program.programs.length - 3} more programmes
          </li>
        )}
      </ul>

      <div className="mt-4 flex items-center gap-2 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>View All</span>
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
      </div>
    </motion.div>
  );
}

export default function ProgramsSection() {
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = programsData.filter(
    (p) =>
      search === "" ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.programs.some((pr) =>
        pr.name.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <section ref={ref} className="relative py-0 overflow-hidden">
      {/* Header Banner */}
      <div className="relative bg-[#0f3460] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-orange-500/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="w-6 h-px bg-orange-500" />
                <span className="text-orange-400 text-xs tracking-[0.25em] uppercase font-semibold">
                  Future-Ready Programmes
                </span>
              </motion.div>

              <motion.p
                className="text-white/70 text-lg mb-2"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Innovation is in our DNA — explore our pillars of knowledge
              </motion.p>

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-orange-400 leading-tight max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover Diverse, New-Age Programmes Designed To Shape Future
                Leaders
              </motion.h2>
            </div>

            {/* Search */}
            <motion.div
              className="w-full md:w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type Programme Name..."
                  className="w-full px-5 py-3.5 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/40 text-sm focus:outline-none focus:border-orange-500 focus:bg-white/15 transition-all duration-300"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {search && (
                <p className="text-white/50 text-xs mt-2 pl-2">
                  {filtered.length} categor{filtered.length === 1 ? "y" : "ies"}{" "}
                  found
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {/* <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg">
                No programmes found for "{search}"
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-orange-500 text-sm font-semibold hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          )}

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#"
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              View All Programmes
            </a>
          </motion.div>
        </div>
      </div> */}
    </section>
  );
}
