import React from 'react'
import { motion } from 'framer-motion'

const PageTitle = ({ title, subtitle }) => {
    return (
        <div className="bg-gray-50/50 py-6 md:py-10 border-b border-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight"
                >
                    {title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-gray-500 font-medium tracking-widest uppercase text-sm"
                >
                    {subtitle}
                </motion.p>
            </div>
        </div>
    )
}

export default PageTitle