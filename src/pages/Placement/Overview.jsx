import React from "react";
import { motion } from "framer-motion";
import PageTitle from "./PageTitle";

const PlacementOverview = () => {
    return (
        <div className="bg-white">
            {/* Page Title Section */}
            <PageTitle title="Overview" subtitle="Training & Placement Cell" />

            {/* Main Content Section */}
            <div className="max-w-6xl mx-auto px-2 py-10 md:py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-5"
                >
                    {/*now this Greetings from BV is not visible on screen so we will use another way to display it */}
                    <div className="relative flex items-center justify-center my-6">
                        {/* Left Line */}
                        <div className="flex-grow border-t border-gray-300"></div>

                        {/* Text */}
                        <motion.h2
                            className="mx-6 text-3xl md:text-5xl font-bold text-gray-600 bg-white"
                        >
                            Greetings from BV
                        </motion.h2>

                        {/* Right Line */}
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="relative">
                        <p className="text-lg md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-medium italic">
                            "The Training & Placement Cell at Brahma Valley Education Campus is
                            committed to empowering students with the right Skills, Knowledge,
                            and Opportunities to excel in their careers. The Cell acts as a
                            bridge between Academia and Industry, ensuring students are
                            career-ready through continuous Training, Guidance, and Corporate
                            Exposure."
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PlacementOverview;
