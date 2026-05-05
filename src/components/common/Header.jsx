import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '/logo.png'

const MotionLink = motion(Link)

const menuItems = [
    { label: 'Home', href: '/' },
    {
        label: 'About Us',
        children: [
            { label: 'Overview', href: '/overview' },
            { label: 'Our Journey', href: '/journey/president' },
            { label: 'President', href: '/journey/president', indent: true },
            { label: 'General Secretary', href: '/journey/general-secretary', indent: true },
            { label: 'Vice President', href: '/journey/vice-president', indent: true },
            { label: 'Campus Director', href: '/journey/campus-director', indent: true },
            { label: 'Progress Highlights', href: '/progress' },
            { label: 'Board Of Trustees', href: '/board-of-trustees' },
            { label: 'Accreditation & Affiliations', href: '/affiliations' },
            { label: 'Award & Distinction', href: '/awards' },
        ],
    },
    {
        label: 'Institute',
        children: [
            { label: 'MBA', href: 'https://bvim.brahmavalley.edu.in/' },
            { label: 'Engineering', href: 'https://engineering.brahmavalley.edu.in/' },
            { label: 'College Of Pharmacy', href: 'https://cop.brahmavalley.edu.in/' },
            { label: 'Institute Of Pharmacy', href: 'https://pharmacy.brahmavalley.edu.in/' },
            { label: 'Polytechnic', href: 'https://polytechnic.brahmavalley.edu.in/' },
            { label: 'ITI', href: 'https://iti.brahmavalley.edu.in/' },
            { label: 'Public School', href: 'https://juniorcollege.brahmavalley.edu.in/' },
            { label: 'B.Ed', href: 'https://bed.brahmavalley.edu.in/' },
            { label: 'D.Ed', href: 'https://ded.brahmavalley.edu.in/' },
            { label: 'Art\'s Commerce Science', href: 'https://acs.brahmavalley.edu.in/' },
        ],
    },
    { label: 'Infrastructure', href: '/infrastructure' },
    {
        label: 'Facilities',
        children: [
            { label: 'Academic Instructions', href: '/facilities/academic-instructions' },
            { label: 'Sports Facilities', href: '/facilities/sports-facilities' },
            { label: 'Medical Facilities', href: '/facilities/medical-facilities' },
            { label: 'Transport Facilities', href: '/facilities/transport-facilities' },
            { label: 'Hostel Facilities', href: '/facilities/hostel-facilities' },
        ],
    },
    { label: 'Courses', href: '/courses' },
    { label: 'Our Commitment', href: '/our-commitment' },
    {
        label: 'Life @BV',
        children: [
            { label: 'Brahmautsav', href: '/life-at-bv/brahmautsav' },
            { label: 'Events', href: '/life-at-bv/events' },
            { label: 'Sports', href: '/life-at-bv/sports' },
            { label: 'Festival', href: '/life-at-bv/festival' },
        ],
    },
    {
        label: 'Placement',
        children: [
            { label: 'Overview', href: '/placement' },
            { label: 'Placement Records', href: '/placement/placement-record' },
            { label: 'Our Recruiters', href: '/placement/our-recruiters' },
            { label: 'Placement Policy', href: '/placement/placement-policy' },
            { label: 'FAQ', href: '/placement/faq' },
        ],
    },
]

const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.25, ease: 'easeOut', staggerChildren: 0.05 },
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.95,
        transition: { duration: 0.15, ease: 'easeIn' },
    },
}

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
}

const NavItem = ({ item }) => {
    const [open, setOpen] = useState(false)
    const timeoutRef = useRef(null)

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current)
        setOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 120)
    }

    if (!item.children) {
        return (
            <MotionLink
                to={item.href}
                className="relative text-sm font-medium transition-all duration-300 py-5 px-3 whitespace-nowrap group text-white/90 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                {item.label}
                <span className="absolute bottom-3 left-0 right-0 h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </MotionLink>
        )
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.button
                className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 py-5 px-3 whitespace-nowrap group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                {item.label}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-3.5 h-3.5 text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    animate={{ rotate: open ? 180 : 0 }}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </motion.svg>
                <span className="absolute bottom-3 left-0 right-0 h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 z-50 mt-1 min-w-70 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100/50 overflow-hidden py-2"
                    >
                        {item.children.map((child) => (
                            <MotionLink
                                key={child.label}
                                to={child.href}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 group ${child.indent
                                    ? 'text-gray-600 hover:text-orange-500 hover:bg-orange-50 pl-8'
                                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                                    }`}
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full transition-all duration-200 shrink-0 bg-orange-300 group-hover:bg-orange-500" />
                                {child.label}
                            </MotionLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileExpanded, setMobileExpanded] = useState(null)

    return (
        <nav className="bg-linear-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] sticky top-0 z-40 shadow-2xl backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <MotionLink
                        to="/"
                        className="shrink-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img
                            src={logo}
                            alt="Brahma Valley Logo"
                            className="h-16 w-auto object-contain"
                        />
                    </MotionLink>

                    <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center px-6">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                                <NavItem item={item} />
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            {mobileOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="lg:hidden overflow-hidden bg-[#1a1a1a] border-t border-white/10"
                    >
                        <div className="px-4 py-3 space-y-0.5">
                            {menuItems.map((item) => (
                                <div key={item.label}>
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                                                }
                                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-white/85 hover:bg-white/8 hover:text-white transition-colors"
                                            >
                                                {item.label}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className={`w-4 h-4 text-white/50 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                                                >
                                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <AnimatePresence>
                                                {mobileExpanded === item.label && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                        className="overflow-hidden pl-4"
                                                    >
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.label}
                                                                to={child.href}
                                                                className="flex items-center gap-2 px-3 py-2 text-sm text-white/65 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                                            >
                                                                <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className="block px-3 py-2.5 rounded-md text-sm font-medium text-white/85 hover:bg-white/8 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Header
