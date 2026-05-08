//in this file instead of image use icon from react-icons

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaDownload, FaUsers, FaBriefcase, FaClipboard, FaPaperPlane, FaCamera } from 'react-icons/fa'
import { fetchTopHeaderLinks } from '../../services/api.js'

// Icon mapping for dynamic icon rendering
const iconMap = {
    'whatsapp': <FaWhatsapp className="w-4 h-4" />,
    'facebook': <FaFacebook className="w-4 h-4" />,
    'linkedin': <FaLinkedin className="w-4 h-4" />,
    'instagram': <FaInstagram className="w-4 h-4" />,
    'youtube': <FaYoutube className="w-4 h-4" />,
    'download': <FaDownload className="w-4 h-4" />,
    'users': <FaUsers className="w-4 h-4" />,
    'briefcase': <FaBriefcase className="w-4 h-4" />,
    'clipboard': <FaClipboard className="w-4 h-4" />,
    'send': <FaPaperPlane className="w-4 h-4" />,
    'camera': <FaCamera className="w-4 h-4" />,
};

const TopHeader = () => {
    const [visible, setVisible] = useState(true)
    const [menuLinks, setMenuLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState([])
    const [actionLinks, setActionLinks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Load header links from API
    useEffect(() => {
        const loadHeaderLinks = async () => {
            try {
                setLoading(true)
                setError(null)
                
                console.log('🔄 Loading top header links from API')
                
                const data = await fetchTopHeaderLinks()
                
                if (data) {
                    setMenuLinks(data.menuLinks || [])
                    setSocialLinks(data.socialLinks || [])
                    setActionLinks(data.actionLinks || [])
                    console.log('✅ Top header links loaded successfully')
                    console.log('📊 Menu links:', data.menuLinks)
                    console.log('📊 Social links:', data.socialLinks)
                    console.log('📊 Action links:', data.actionLinks)
                } else {
                    throw new Error('No data returned from API')
                }
            } catch (err) {
                console.error('❌ Failed to load top header links:', err.message)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadHeaderLinks()
    }, [])

    // Handle scroll visibility
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY === 0)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Render link based on type (internal or external)
    const renderLink = (link) => {
        const isExternal = link.url.startsWith('http')
        const icon = iconMap[link.icon] || null
        
        if (isExternal) {
            return (
                <a
                    href={link.url}
                    target={link.target}
                    rel="noopener noreferrer"
                    className="text-xs font-medium tracking-wide text-orange-600 hover:text-orange-700 transition-all duration-200 whitespace-nowrap hover:scale-105 transform"
                    title={link.title}
                >
                    {link.title}
                </a>
            )
        } else {
            return (
                <Link
                    to={link.url}
                    className="text-xs font-medium tracking-wide text-orange-600 hover:text-orange-700 transition-all duration-200 whitespace-nowrap hover:scale-105 transform"
                    title={link.title}
                >
                    {link.title}
                </Link>
            )
        }
    }

    // Render social icon link
    const renderSocialLink = (link, index) => {
        const icon = iconMap[link.icon] || null
        const isExternal = link.url.startsWith('http')
        
        if (isExternal) {
            return (
                <motion.a
                    key={link.id}
                    href={link.url}
                    target={link.target}
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    className="p-1.5 rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-100 transition-all duration-300 hover:scale-110 transform shadow-lg hover:shadow-orange-200/50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.title}
                >
                    {icon}
                </motion.a>
            )
        } else {
            return (
                <motion.div
                    key={link.id}
                    as={Link}
                    to={link.url}
                    aria-label={link.title}
                    className="p-1.5 rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-100 transition-all duration-300 hover:scale-110 transform shadow-lg hover:shadow-orange-200/50 cursor-pointer"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.title}
                >
                    {icon}
                </motion.div>
            )
        }
    }

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

                            {/* Left — Quick Links (Menu) */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {loading ? (
                                    <div className="text-xs text-gray-400">Loading...</div>
                                ) : error ? (
                                    <div className="text-xs text-red-500">Error loading links</div>
                                ) : menuLinks.length > 0 ? (
                                    menuLinks.map((link, index) => (
                                        <React.Fragment key={link.id}>
                                            {renderLink(link)}
                                            {index < menuLinks.length - 1 && (
                                                <span className="text-orange-300 text-xs hidden sm:inline">|</span>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-400">No menu links available</div>
                                )}
                            </div>

                            {/* Right — Social Icons & Action Links */}
                            <div className="flex items-center gap-2">
                                {/* Action Links Text */}
                                {!loading && actionLinks.length > 0 && (
                                    <span className="text-xs text-orange-600 mr-2 hidden sm:inline tracking-wide font-medium animate-pulse">
                                        {actionLinks[0]?.title || 'Get Connected'}
                                    </span>
                                )}
                                
                                {/* Social Icons */}
                                {!loading && socialLinks.length > 0 ? (
                                    socialLinks.map((link, index) =>
                                        renderSocialLink(link, index)
                                    )
                                ) : !loading && (
                                    <div className="text-xs text-gray-400">No social links</div>
                                )}
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TopHeader