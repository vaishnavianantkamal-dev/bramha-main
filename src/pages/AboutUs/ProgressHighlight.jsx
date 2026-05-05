import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

const milestones = [
    {
        year: "2004",
        title: "2004 Milestone",
        side: "left",
        text: "Brahma Valley College was founded with a clear mission: to provide quality education and empower students in rural and semi-urban regions of Maharashtra.",
    },
    {
        year: "2005",
        title: "2005 Milestone",
        side: "right",
        text: "Establishment of School Education: Brahma Valley Residential Public School was launched to offer holistic, residential schooling and instill values, discipline, and academic strength at the foundational level.",
    },
    {
        year: "2006",
        title: "2006 Milestone",
        side: "left",
        text: "Entry into Technical and Pharmaceutical Education: Brahma Valley College of Technical Education (Polytechnic) began to provide diploma-level technical training in core engineering disciplines. Brahma Valley College of Pharmacy was established to serve the growing demand for skilled pharmacy professionals.",
    },
    {
        year: "2008",
        title: "2008 Milestone",
        side: "right",
        text: "Major Institutional Expansion: Brahma Valley College of Engineering and Research Institute was established, providing undergraduate engineering programs with state-of-the-art infrastructure. Brahma Valley Institute of Management (MBA) began offering postgraduate business education with a focus on leadership and entrepreneurship. Brahma Valley College of Education (B.Ed. and D.Ed.) was launched to develop quality teachers. Brahma Valley English Medium School was added, expanding access to English-language education from early stages. Brahma Valley College of Arts, Science and Commerce started, offering a wide range of undergraduate programs in general education.",
    },
    {
        year: "2013",
        title: "2013 Milestone",
        side: "left",
        text: "Pre-University Education Initiated: Brahma Valley Junior College was established, offering higher secondary education (HSC) in science, commerce, and arts streams.",
    },
    {
        year: "2019",
        title: "2019 Milestone",
        side: "right",
        text: "ITI Campus Established: Launched Brahma Valley ITI, offering hands-on training in Fitter, Electrician, and Turner trades to boost skill development and career readiness.",
    },
    {
        year: "2023",
        title: "2023 Milestone",
        side: "left",
        text: "Growth in Health Sciences: Brahma Valley Institute of Pharmacy (B.Pharm) and Brahma Valley College of Pharmacy (B.Pharm) were founded, reinforcing the college's commitment to pharmaceutical education and healthcare training.",
    },
    {
        year: "2024",
        title: "2024 Milestone",
        side: "right",
        text: "Recognitions and Accreditations: Engineering and Pharmacy programs received formal affiliations and accreditations, marking a significant step in academic quality, institutional compliance, and national-level recognition.",
    },
];

function MilestoneCard({ milestone, index, isLast }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isLeft = milestone.side === "left";

    return (
        <div
            ref={ref}
            className="relative mb-8 grid grid-cols-1 gap-4 md:mb-10 md:grid-cols-[1fr_48px_1fr] md:items-start"
        >
            <div className="hidden pr-6 md:block">
                {isLeft && (
                    <motion.div
                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 35px rgba(15, 23, 42, 0.12)" }}
                        transition={{ duration: 0.4, delay: index * 0.04 }}
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <svg className="h-4 w-4 shrink-0 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-bold text-orange-500">{milestone.title}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">{milestone.text}</p>
                    </motion.div>
                )}
            </div>

            <div className="absolute left-0 top-1 z-10 flex flex-col items-center md:static md:left-auto md:top-auto">
                <motion.div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-lg ring-4 ring-blue-100"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 240, damping: 16, delay: index * 0.04 }}
                >
                    {milestone.year}
                    <motion.span
                        className="absolute inset-0 rounded-full border-2 border-blue-300"
                        animate={isInView ? { scale: [1, 1.35], opacity: [0.45, 0] } : {}}
                        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
                    />
                </motion.div>

                {!isLast && (
                    <motion.div
                        className="mt-2 w-px bg-blue-200"
                        initial={{ height: 0 }}
                        animate={isInView ? { height: 90 } : {}}
                        transition={{ duration: 0.45, delay: 0.15 }}
                    />
                )}
            </div>

            <div className="pl-16 md:pl-6">
                {(
                    <motion.div
                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:hidden"
                        initial={{ opacity: 0, x: 16 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 35px rgba(15, 23, 42, 0.12)" }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <svg className="h-4 w-4 shrink-0 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-bold text-orange-500">{milestone.title}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">{milestone.text}</p>
                    </motion.div>
                )}

                {!isLeft && (
                    <motion.div
                        className="hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:block"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 35px rgba(15, 23, 42, 0.12)" }}
                        transition={{ duration: 0.4, delay: index * 0.04 }}
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <svg className="h-4 w-4 shrink-0 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-bold text-orange-500">{milestone.title}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">{milestone.text}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function ProgressHighlight() {
    const headerRef = useRef(null);
    const timelineRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 80%", "end 20%"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.3,
    });

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-5xl px-6 md:px-12">
                <motion.div
                    ref={headerRef}
                    className="mb-10 text-center md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-3 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-orange-500" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
                            Our Journey
                        </span>
                        <span className="h-px w-8 bg-orange-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Progress Highlights</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base">
                        Scroll through key milestones to see how the institution expanded year by year.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-20">
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-black px-4 py-3"
                    >
                        <p className="text-xs uppercase tracking-wide text-orange-700">Milestones</p>
                        <p className="mt-1 text-xl font-bold text-orange-800">{milestones.length}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-black px-4 py-3"
                    >
                        <p className="text-xs uppercase tracking-wide text-blue-700">Start Year</p>
                        <p className="mt-1 text-xl font-bold text-blue-800">{milestones[0].year}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-black px-4 py-3"
                    >
                        <p className="text-xs uppercase tracking-wide text-emerald-700">Latest</p>
                        <p className="mt-1 text-xl font-bold text-emerald-800">{milestones[milestones.length - 1].year}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-black px-4 py-3"
                    >
                        <p className="text-xs uppercase tracking-wide text-gray-700">Timeline</p>
                        <p className="mt-1 text-xl font-bold text-gray-800">Interactive</p>
                    </motion.div>
                </div>

                <div ref={timelineRef} className="relative">
                    <div className="absolute bottom-0 left-6 top-0 w-px bg-blue-100 md:left-1/2 md:-translate-x-1/2" />
                    <motion.div
                        className="absolute bottom-0 left-6 top-0 w-px origin-top bg-blue-500 md:left-1/2 md:-translate-x-1/2"
                        style={{ scaleY: smoothProgress }}
                    />

                    {milestones.map((milestone, index) => (
                        <MilestoneCard
                            key={`${milestone.year}-${index}`}
                            milestone={milestone}
                            index={index}
                            isLast={index === milestones.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
