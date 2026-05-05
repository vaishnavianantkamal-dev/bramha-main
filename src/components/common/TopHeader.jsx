//in this file instead of image use icon from react-icons

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
import { TbView360Number } from "react-icons/tb";

const socialLinks = [
    {
        label: 'WhatsApp',
        href: '#',
        icon: (
            <FaWhatsapp className="w-4 h-4" />
        ),
    },
    {
        label: '360 View',
        href: '#',
        icon: (
            <TbView360Number className="w-4 h-4" />
        ),
    },
    {
        label: 'Facebook',
        href: '#',
        icon: (
            <FaFacebook className="w-4 h-4" />
        ),
    },
    {
        label: 'LinkedIn',
        href: '#',
        icon: (
            <FaLinkedin className="w-4 h-4" />
        ),
    },
    {
        label: 'Instagram',
        href: '#',
        icon: (
            <FaInstagram className="w-4 h-4" />
        ),
    },
    {
        label: 'YouTube',
        href: '#',
        icon: (
            <FaYoutube className="w-4 h-4" />
        ),
    },
]

const TopHeader = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY === 0)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="top-0 left-0 right-0 z-50 bg-white text-orange-600 shadow-md relative"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-9">

                            {/* Left — Quick Links */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                <a
                                    href="#"
                                    className="text-xs font-medium tracking-wide text-orange-600 hover:text-orange-700 transition-all duration-200 whitespace-nowrap hover:scale-105 transform"
                                >
                                    Download E-Brochures
                                </a>
                                <span className="text-orange-300 text-xs hidden sm:inline">|</span>
                                <a
                                    href="#"
                                    className="text-xs font-medium tracking-wide text-orange-600 hover:text-orange-700 transition-all duration-200 whitespace-nowrap hover:scale-105 transform"
                                >
                                    Alumni
                                </a>
                                <span className="text-orange-300 text-xs hidden sm:inline">|</span>
                                <a
                                    href="#"
                                    className="text-xs font-medium tracking-wide text-orange-600 hover:text-orange-700 transition-all duration-200 whitespace-nowrap hover:scale-105 transform"
                                >
                                    Careers
                                </a>
                                <span className="text-orange-300 text-xs hidden sm:inline">|</span>
                                <a
                                    href="#"
                                    className="text-xs font-medium tracking-wide text-orange-600 hover:text-orange-700 transition-all duration-200 whitespace-nowrap hover:scale-105 transform"
                                >
                                    Admission
                                </a>
                            </div>

                            {/* Right — Social Icons */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-orange-600 mr-2 hidden sm:inline tracking-wide font-medium animate-pulse">
                                    Get Connected
                                </span>
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="p-1.5 rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-100 transition-all duration-300 hover:scale-110 transform shadow-lg hover:shadow-orange-200/50"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TopHeader