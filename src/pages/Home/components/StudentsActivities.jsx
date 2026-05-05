import React from 'react'
import { motion } from 'framer-motion'

// Using public Unsplash images as placeholders — swap with real CMS URLs
const photos = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
        alt: 'Students on educational trip',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
        alt: 'Students in science activity',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80',
        alt: 'Sports event',
        span: 'col-span-1 row-span-2',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
        alt: 'Cultural celebration',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
        alt: 'Classroom activity',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        alt: 'Group activity',
        span: 'col-span-1 row-span-1',
    },
]

const PhotoCard = ({ photo, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
            whileHover={{
                rotate: index % 2 === 0 ? 2.5 : -2.5,
                scale: 1.04,
                zIndex: 20,
                transition: { duration: 0.25, ease: 'easeOut' },
            }}
            className={`${photo.span} relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer`}
            style={{ transformOrigin: 'center center' }}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
            />
            {/* subtle dark vignette on hover via overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"
            />
        </motion.div>
    )
}

const StudentsActivities = () => {
    return (
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Students Activities
                    </h2>
                    <div className="mt-3 flex justify-center">
                        <div className="h-1 w-12 rounded-full bg-[#c0392b]" />
                    </div>
                    <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto">
                        A glimpse into the vibrant campus life — from sports and art to cultural celebrations and educational trips.
                    </p>
                </motion.div>

                {/* Photo Grid */}
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridAutoRows: '220px',
                    }}
                >
                    {/* Row 1: 3 equal cards */}
                    {[photos[0], photos[1], photos[2]].map((photo, i) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                            whileHover={{
                                rotate: i % 2 === 0 ? 2.5 : -2.5,
                                scale: 1.04,
                                zIndex: 20,
                                transition: { duration: 0.22, ease: 'easeOut' },
                            }}
                            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer"
                            style={{ transformOrigin: 'center center' }}
                        >
                            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}

                    {/* Row 2: wide card (spans 2 cols) + 1 card */}
                    <motion.div
                        key={photos[3].id}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                        whileHover={{
                            rotate: -2.5,
                            scale: 1.04,
                            zIndex: 20,
                            transition: { duration: 0.22, ease: 'easeOut' },
                        }}
                        className="col-span-2 relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer"
                        style={{ transformOrigin: 'center center' }}
                    >
                        <img src={photos[3].src} alt={photos[3].alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>

                    <motion.div
                        key={photos[4].id}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.38 }}
                        whileHover={{
                            rotate: 2.5,
                            scale: 1.04,
                            zIndex: 20,
                            transition: { duration: 0.22, ease: 'easeOut' },
                        }}
                        className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer"
                        style={{ transformOrigin: 'center center' }}
                    >
                        <img src={photos[4].src} alt={photos[4].alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-10 flex justify-center"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-[#c0392b] hover:bg-[#a93226] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-lg shadow-red-200 transition-colors duration-200"
                    >
                        View All Photos
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l4.5 4.75a.75.75 0 010 1.08l-4.5 4.75a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                    </a>
                </motion.div>

            </div>
        </section>
    )
}

export default StudentsActivities