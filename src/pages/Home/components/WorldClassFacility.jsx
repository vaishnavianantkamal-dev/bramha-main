import React from 'react'
import { motion } from 'framer-motion'
// we will use image from public/facilities

const facilities = [
    {
        title: 'Sports',
        emoji: '🏃',
        tag: 'Active & Fit',
        tagColor: 'bg-green-100 text-green-700',
        accentColor: 'from-green-400 to-green-600',
        borderColor: 'border-green-200',
        highlightBg: 'bg-green-50',
        desc: 'Sports and physical education play a vital role in the holistic development of every student.',
        highlights: ['Outdoor Play Areas', 'Physical Education', 'Team Sports'],
        image: '/facilities/image1.png',
        fallbackBg: 'bg-linear-to-br from-green-400 to-green-700',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06l-1.47-1.47A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        title: 'Medical',
        emoji: '🏥',
        tag: 'Safe & Cared',
        tagColor: 'bg-blue-100 text-blue-700',
        accentColor: 'from-blue-400 to-blue-600',
        borderColor: 'border-blue-200',
        highlightBg: 'bg-blue-50',
        desc: 'Brahma Valley Public School ensures student safety with on-campus first-aid and prompt medical support.',
        highlights: ['First-Aid Station', 'Trained Staff', 'Emergency Support'],
        image: '/facilities/image2.png',
        fallbackBg: 'bg-linear-to-br from-blue-400 to-blue-700',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75H16.5a.75.75 0 010 1.5h-3.75V18a.75.75 0 01-1.5 0v-3.75H7.5a.75.75 0 010-1.5h3.75V9a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        title: 'Hostel',
        emoji: '🏠',
        tag: 'Home Away',
        tagColor: 'bg-amber-100 text-amber-700',
        accentColor: 'from-amber-400 to-orange-500',
        borderColor: 'border-amber-200',
        highlightBg: 'bg-amber-50',
        desc: 'Brahma Valley Public School offers a safe, hygienic, and well-supervised hostel facility with nutritious meals and a homely environment.',
        highlights: ['24/7 Supervision', 'Hygienic Rooms', 'Nutritious Meals'],
        image: '/facilities/image3.png',
        fallbackBg: 'bg-linear-to-br from-amber-400 to-orange-600',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
        ),
    },
    {
        title: 'Food',
        emoji: '🍱',
        tag: 'Healthy & Fresh',
        tagColor: 'bg-rose-100 text-rose-700',
        accentColor: 'from-rose-400 to-red-500',
        borderColor: 'border-rose-200',
        highlightBg: 'bg-rose-50',
        desc: 'Brahma Valley Public School provides hygienic, nutritious, and well-balanced meals to support students\' health and overall development.',
        highlights: ['Balanced Diet', 'Hygienic Kitchen', 'Daily Meal Plan'],
        image: '/facilities/image4.png',
        fallbackBg: 'bg-linear-to-br from-rose-400 to-red-600',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM3 15.547v-2.843c.073.016.146.03.22.044A59.715 59.715 0 0112 12.75c2.929 0 5.788.23 8.78.798.073-.014.146-.028.22-.044v2.843a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5z" />
            </svg>
        ),
    },
]

const FacilityCard = ({ facility, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            className={`group relative bg-white rounded-2xl overflow-hidden border ${facility.borderColor} shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col`}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 ${facility.fallbackBg}`} />
                <img
                    src={facility.image}
                    alt={facility.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                {/* gradient fade bottom of image into card */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />

                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${facility.tagColor} backdrop-blur-sm shadow-sm`}>
                        {facility.tag}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-5 pb-5 pt-1">
                {/* Icon + Title row */}
                <div className="flex items-center gap-3 mb-2.5">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br ${facility.accentColor} text-white shadow-sm flex-shrink-0`}>
                        {facility.icon}
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg leading-tight">{facility.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{facility.desc}</p>

                {/* Highlights */}
                <div className={`rounded-xl ${facility.highlightBg} px-4 py-3 mt-auto`}>
                    <ul className="space-y-1.5">
                        {facility.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#2d7a2d] flex-shrink-0">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

const WorldClassFacility = () => {
    return (
        <section className="bg-[#1a1c1f] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#2d7a2d] mb-3">
                        What We Offer
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Our World Class Facility
                    </h2>
                    <p className="mt-3 text-gray-400 text-sm max-w-xl mx-auto">
                        Everything a student needs to thrive — physically, academically, and personally — all in one campus.
                    </p>
                    {/* Green underline accent */}
                    <div className="mt-5 flex justify-center">
                        <div className="h-1 w-16 rounded-full bg-[#2d7a2d]" />
                    </div>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {facilities.map((facility, i) => (
                        <FacilityCard key={facility.title} facility={facility} index={i} />
                    ))}
                </div>

                {/* Learn More CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-12 flex justify-center"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-[#c0392b] hover:bg-[#a93226] text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors duration-200 shadow-lg shadow-red-900/30"
                    >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l4.5 4.75a.75.75 0 010 1.08l-4.5 4.75a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default WorldClassFacility