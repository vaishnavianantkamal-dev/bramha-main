import { motion } from "framer-motion";

const commitmentSections = [
  {
    title: "Academic Excellence",
    description:
      "Define goals around curriculum quality, teaching standards, and academic outcomes.",
    tags: ["Outcome-based learning", "Industry relevance", "Continuous improvement"],
  },
  {
    title: "Student Development",
    description:
      "Add commitments on mentorship, skills, and holistic growth of students.",
    tags: ["Mentoring", "Career readiness", "Leadership opportunities"],
  },
  {
    title: "Research & Innovation",
    description:
      "Capture efforts for projects, publications, entrepreneurship, and innovation culture.",
    tags: ["Research guidance", "Incubation support", "Innovation labs"],
  },
  {
    title: "Ethics & Social Impact",
    description:
      "Document values, responsible practices, and outreach to society.",
    tags: ["Integrity", "Inclusion", "Community engagement"],
  },
];

export default function OurCommitment() {
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
            This page is prepared as a structured draft. Update each block with
            approved commitment statements and supporting data.
          </p>
        </motion.div>

        <div className="space-y-5">
          {commitmentSections.map((section, index) => (
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
              <div className="mt-4 flex flex-wrap gap-2">
                {section.tags.map((tag) => (
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
      </div>
    </section>
  );
}
