import { motion } from "framer-motion";

const infrastructureSections = [
  {
    title: "Academic Blocks",
    description:
      "Dedicated spaces for classrooms, labs, and faculty rooms can be listed here.",
    points: ["Classrooms", "Laboratories", "Seminar Halls"],
  },
  {
    title: "Campus Amenities",
    description:
      "Student support and common-use facilities can be highlighted in this section.",
    points: ["Library", "Hostel", "Transportation"],
  },
  {
    title: "Sports & Wellness",
    description:
      "Infrastructure for physical activity, recreation, and wellness goes here.",
    points: ["Indoor Games", "Outdoor Grounds", "Medical Support"],
  },
  {
    title: "Digital Infrastructure",
    description:
      "Technology backbone and digital services can be described in detail.",
    points: ["Computer Centers", "Campus Network", "Smart Classrooms"],
  },
];

export default function Infrastructure() {
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
            Page structure is ready. Replace each block with final content,
            images, and stats when available.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {infrastructureSections.map((section, index) => (
            <motion.article
              key={section.title}
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
              <ul className="mt-4 space-y-2">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
