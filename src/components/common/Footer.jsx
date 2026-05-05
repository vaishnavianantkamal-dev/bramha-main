import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const footerLinks = {
    "Quick Info": [
        { label: "Notices", href: "#" },
        { label: "Events", href: "/life-at-bv/events" },
        { label: "Approvals", href: "#" },
        { label: "Institutional Membership", href: "#" },
        { label: "Gallery", href: "/life-at-bv/brahmautsav" },
        { label: "Testimonials", href: "#" },
    ],
    "Useful Links": [
        { label: "Fees Structure", href: "#" },
        { label: "Scholarship", href: "#" },
        { label: "Academic Council", href: "#" },
        { label: "Career", href: "#" },
        { label: "Student Council", href: "#" },
        { label: "Handbook", href: "#" },
        { label: "ERP", href: "#" },
        { label: "IPR/Patents", href: "#" },
    ],
    "Info Links": [
        { label: "Alumni", href: "#" },
        { label: "NSS", href: "#" },
        { label: "NEP", href: "#" },
        { label: "Committees", href: "#" },
        { label: "Ombuds Person", href: "#" },
        { label: "Statutory Declaration (RTI Act)", href: "#" },
        { label: "Contact Us", href: "#" },
    ],
    "Other Links": [
        { label: "Overview", href: "/placement/placement-policy" },
        { label: "Placement Records", href: "/placement/placement-record" },
        { label: "Placement Policy", href: "/placement/placement-policy" },
        { label: "FAQ", href: "/placement/faq" },
    ],
};

const socialLinks = [
    {
        name: "Facebook",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        bg: "bg-[#1877F2]",
    },
    {
        name: "YouTube",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        bg: "bg-[#FF0000]",
    },
    {
        name: "Instagram",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        bg: "bg-linear-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]",
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        bg: "bg-[#0A66C2]",
    },
];

export default function Footer() {
    return (
        <footer className="bg-[#1e2533]">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[240px_1fr] gap-12">

                    {/* Brand Column */}
                    <div>
                        {/* Logo */}
                        <MotionLink
                            to="/"
                            className="flex items-center gap-3 mb-5 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="Brahma Valley"
                                    className="w-20 h-20 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "block";
                                    }}
                                />
                                <span className="text-white font-bold text-xl hidden">B</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-base leading-tight">Brahma Valley</p>
                                <p className="text-gray-400 text-xs">Group of Institutions</p>
                            </div>
                        </MotionLink>

                        <p className="text-gray-400 text-sm leading-relaxed mb-5">
                            Brahma Valley, Trimbak Road, Anjaneri,<br />
                            Nashik – 422213, Maharashtra
                        </p>

                        <div className="space-y-2 mb-6">
                            <a href="tel:+912532222111" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm transition-colors group">
                                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +91 253 222 2111 &nbsp;·&nbsp; +91 253 222 2222
                            </a>
                            <a href="mailto:info@brahmavalley.com" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm transition-colors">
                                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                info@brahmavalley.com
                            </a>
                        </div>

                        {/* Admissions CTA */}
                        <a
                            href="#"
                            className="inline-block px-5 py-2.5 bg-orange-500 text-white text-xs font-bold rounded-full hover:bg-orange-400 transition-colors duration-250 tracking-wide uppercase"
                        >
                            Admissions 2025–26
                        </a>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(footerLinks).map(([heading, links], i) => (
                            <motion.div
                                key={heading}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.45 }}
                            >
                                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-700/60">
                                    {heading}
                                </h4>
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            {link.href.startsWith("/") ? (
                                                <Link
                                                    to={link.href}
                                                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 leading-relaxed"
                                                >
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 leading-relaxed"
                                                >
                                                    {link.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700/50" />

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Social */}
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-xs font-semibold tracking-wide uppercase">Follow Us</span>
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    title={social.name}
                                    className={`w-8 h-8 rounded-full ${social.bg} flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-250`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-500 text-xs">
                        © 2025 Brahma Valley, Nashik. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
