import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut', delay },
})

const SchoolBrand = () => {
    return (
        <div className="bg-white pt-9"> {/* pt-9 offsets the fixed TopHeader (h-9 = 36px) */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center text-center">

                {/* Trust Line */}
                <motion.p
                    {...fadeUp(0.1)}
                    className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-gray-700"
                >
                    Nashik Gramin Shikshan Prasarak Mandal's
                </motion.p>

                {/* College Name */}
                <motion.h1
                    {...fadeUp(0.22)}
                    className="mt-1 text-4xl sm:text-5xl lg:text-4xl font-extrabold tracking-tight leading-none"
                    style={{ color: '#2d7a2d' }}
                >
                    BRAHMA VALLEY
                </motion.h1>

                {/* Sub-title */}
                <motion.h2
                    {...fadeUp(0.34)}
                    className="mt-1 text-base sm:text-lg lg:text-xl font-bold tracking-widest uppercase"
                    style={{ color: '#c0392b' }}
                >
                    Public School &amp; Junior College
                </motion.h2>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: 0.44 }}
                    className="mt-3 h-px w-2/3 sm:w-1/2 bg-gray-200 origin-center"
                />

                {/* Approval line */}
                <motion.p
                    {...fadeUp(0.52)}
                    className="mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed"
                >
                    Approved By Maharashtra State Board Secondary &amp; Higher Secondary Nashik (Pune).
                </motion.p>

                {/* IDs */}
                <motion.p
                    {...fadeUp(0.6)}
                    className="mt-1.5 text-xs sm:text-sm text-gray-600"
                >
                    <span className="font-bold text-gray-800">UDISE No:</span>{' '}
                    <span className="mr-4">27201400608</span>
                    <span className="text-gray-300 mr-4">|</span>
                    <span className="font-bold text-gray-800">INDEX No:</span>{' '}
                    S.13.14.032 &amp; J.13.14.004
                </motion.p>

            </div>
        </div>
    )
}

export default SchoolBrand