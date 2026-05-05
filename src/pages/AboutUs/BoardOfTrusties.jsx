import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const boardMembers = [
    {
        id: 1,
        name: "Mr. Rajaram. D. Pangavhane",
        role: "Founder President",
        image: "/images/board-of-trustees/Mr-Rajaram-D-Pangavhane.jpg",
    },
    {
        id: 2,
        name: "Mr. Gaurav. R. Pangavhane",
        role: "General Secretary",
        image: "/images/board-of-trustees/Mr-Gaurav-R-Pangavhane.png",
    },
    {
        id: 3,
        name: "Mrs. Dhanisha. G. Pangavhane",
        role: "Vice President",
        image: "/images/board-of-trustees/Mrs-Dhanisha-G-Pangavhane.png",
    },
    {
        id: 4,
        name: "Mrs. Ashiwini. A. Bhosale",
        role: "Vice President",
        image: "/images/board-of-trustees/Mrs-Ashiwini-A-Bhosale.png",
    },
    {
        id: 5,
        name: "Mrs. Prabhavati. R. Pangavhane",
        role: "Joint Secretary",
        image: "/images/board-of-trustees/Mrs-Prabhavati-R-Pangavhane.png",
    },
    {
        id: 6,
        name: "Mrs. Rohini. A. Bhosale",
        role: "Member",
        image: "/images/board-of-trustees/Mrs-Rohini-A-Bhosale.png",
    },
    {
        id: 7,
        name: "Mrs. Sheetal. Y. Mule",
        role: "Member",
        image: "/images/board-of-trustees/Mrs-Sheetal-Y-Mule.png",
    },
];

function MemberCard({ member, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -3 }}
        >
            {/* Photo */}
            <div className="relative h-80 bg-gray-100">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain bg-white rounded-2xl"
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                    }}
                />
                {/* Initials fallback */}
                <div
                    className="absolute inset-0 bg-gray-100 hidden items-center justify-center"
                    style={{ display: "none" }}
                >
                    <span className="text-gray-400 font-bold text-4xl">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
            </div>

            {/* Info */}
            <div className="p-6 text-center">
                <h3 className="text-gray-900 font-bold text-lg mb-2">{member.name}</h3>
                <p className="text-gray-600 text-sm font-medium">{member.role}</p>
            </div>
        </motion.div>
    );
}

export default function BoardOfTrusties() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="w-8 h-px bg-gray-400" />
                        <span className="text-gray-600 text-xs tracking-[0.25em] uppercase font-semibold">
                            Leadership
                        </span>
                        <span className="w-8 h-px bg-gray-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Board of Management
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        The Board of Management at Brahma Valley drives strategic vision,
                        ensuring academic excellence and innovation through leadership and collaboration.
                    </p>
                </motion.div>

                {/* Board Members Grid - 3 per row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {boardMembers.map((member, i) => (
                        <MemberCard key={member.id} member={member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}