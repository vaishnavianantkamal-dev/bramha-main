import React from "react";
import { motion } from "framer-motion";
import PageTitle from "./PageTitle";

const FAQ = () => {
    return (
        <div>
            <PageTitle title="FAQ" subtitle="Training & Placement Cell" />
            <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center h-24 text-gray-500 font-medium"
                >
                    FREQUENTLY ASKED QUESTIONS
                </motion.h2>
            </div>
        </div>
    );
};

export default FAQ;