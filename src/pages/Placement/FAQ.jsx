import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTitle from "./PageTitle";
import { fetchPlacementFAQs } from "../../services/api.js";

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    // Load FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchPlacementFAQs();
                setFaqs(data);
                console.log('✅ Placement FAQs loaded from database:', data.length, 'FAQs');
            } catch (err) {
                console.error('❌ Failed to load placement FAQs:', err);
                setError(err.message);
                setFaqs([]);
            } finally {
                setLoading(false);
            }
        };
        loadFAQs();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <PageTitle title="FAQ" subtitle="Training & Placement Cell" />
            
            <div className="max-w-4xl mx-auto px-6 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-bold text-gray-900 text-center mb-8"
                >
                    FREQUENTLY ASKED QUESTIONS
                </motion.h2>

                {loading ? (
                    // Loading skeleton
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                            </div>
                        ))}
                    </div>
                ) : faqs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {error ? `Error: ${error}` : "No FAQs available at the moment."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.svg
                                        className="w-5 h-5 text-gray-500 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>
                                
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;