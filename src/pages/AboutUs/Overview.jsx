import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const institutes = [
    "Brahma Valley College of Engineering & Research Institute",
    "Brahma Valley College of Technical Education (Polytechnic)",
    "Brahma Valley College of Pharmacy (B.Pharm.)",
    "Brahma Valley Institute of Pharmacy (B.Pharm.)",
    "Brahma Valley English Medium School",
    "Brahma Valley Institute of Management (MBA)",
    "Brahma Valley College of Education (B.Ed. & D.Ed.)",
    "Brahma Valley College of Arts, Science & Commerce",
    "Brahma Valley Residential Public School & Junior College",
];

const visionMission = [
    {
        id: 1,
        type: "Our Vision",
        color: "bg-blue-600",
        ringColor: "ring-blue-100",
        textColor: "text-blue-600",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        text: "To emerge as a center of academic excellence that nurtures innovation, fosters global perspectives, and empowers students to become responsible, knowledgeable, and compassionate contributors to society.",
    },
    {
        id: 2,
        type: "Our Mission",
        color: "bg-emerald-600",
        ringColor: "ring-emerald-100",
        textColor: "text-emerald-600",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        text: "At Brahma Valley College, our mission is to provide a holistic, industry-relevant education through advanced infrastructure, innovative teaching methods, and a learner-centric environment that cultivates critical thinking, creativity, and leadership.",
    },
];

export default function Overview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-3">
                        About Brahma Valley Group of Institutions
                    </h2>
                    <p className="text-gray-700 font-semibold italic text-base mb-4">
                        "Rooted in Nature, Rising in Excellence"
                    </p>
                    <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                        Nestled amidst the serene landscapes of Trimbak Road, Anjaneri, Nashik, our campus fosters
                        holistic learning and personal growth through a blend of world-class infrastructure, dedicated
                        faculty, and a student-centered approach.
                    </p>
                </motion.div>

                {/* ── Institutes + Image ── */}
                <motion.div
                    className="grid md:grid-cols-2 gap-6 mb-16"
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    {/* Institutes card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-gray-900 font-bold text-base">Our Institutes</h3>
                        </div>
                        <ul className="space-y-2.5">
                            {institutes.map((inst, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-2.5 text-sm text-gray-600"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.15 + i * 0.05 }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                    {inst}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Image */}
                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[300px]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img
                            src="/images/about/classroom.jpg"
                            alt="Brahma Valley Classroom"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80";
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* ── Vision & Mission ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
                        Our Vision & Mission
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {visionMission.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className={`bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow duration-300`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.35 + i * 0.1 }}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-14 h-14 rounded-full ${item.color} ring-4 ${item.ringColor} flex items-center justify-center mb-5 shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <h4 className={`font-bold text-base mb-4 ${item.textColor}`}>{item.type}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed text-justify">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}