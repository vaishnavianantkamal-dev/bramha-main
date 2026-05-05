import React from "react";
import { motion } from "framer-motion";
import PageTitle from "./PageTitle";

const PlacementPolicy = () => {
    const rules = [
        "Only students who have successfully cleared academic requirements are eligible for placement.",
        "Students with active backlogs are not permitted to participate in the placement process.",
        "Students must register with the Training & Placement Cell (TPC) before participating.",
        "Submission of resume, academic records, and placement forms is mandatory within the deadline.",
        "Students must maintain discipline, punctuality, and professional behaviour during placement drives.",
        "Formal dress code is compulsory for all interviews, tests, and interactions with recruiters.",
        "Once a student is selected by a company, they cannot appear for further drives (one student – one offer policy).",
        "Students must attend all selection rounds after confirming their participation.",
        "Absence without valid reason may lead to disqualification from future opportunities.",
        "Participation in training programs, aptitude sessions, and soft-skill workshops is compulsory.",
        "Mock tests and practice interviews will be conducted to prepare students.",
        "Students must actively participate in opportunities provided through industry tie-ups.",
        "Industrial visits, guest lectures, and collaborative projects are integral to placement preparation.",
        "All updates regarding placements will be shared through the Placement Cell notice board, official website, or student groups.",
        "Students are responsible for keeping themselves informed of schedules and announcements.",
        "Students must follow company-specific rules and eligibility criteria.",
        "Sharing of confidential company data or misconduct will lead to strict disciplinary action.",
        "The final decision regarding placement matters rests with the Training & Placement Officer and the Principal."
    ];

    return (
        <div className="bg-gray-50">

            {/* Page Title Section */}
            <PageTitle title="Placement Policy" subtitle="Training & Placement Cell" />

            {/* Rules Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-10 tracking-wide"
                >
                    RULES & GUIDELINES
                </motion.h2>

                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed list-disc list-inside"
                >
                    {rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};

export default PlacementPolicy;