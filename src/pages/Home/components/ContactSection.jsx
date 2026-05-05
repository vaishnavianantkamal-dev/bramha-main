import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const contactInfo = [
    {
        id: 1,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: "Address",
        value: "Palika Bazar Complex, Near Railway Booking Office, Sharanpur-Trimbak Link Road, Nashik-422002.",
    },
    {
        id: 2,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        label: "Call Us",
        value: "0253-2311244",
    },
    {
        id: 3,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: "Email Us",
        value: "njspm8050@gmail.com",
    },
];

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submit
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3500);
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <section ref={ref} className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-orange-500 text-xs tracking-[0.25em] uppercase font-semibold">
                            Contact
                        </span>
                        <span className="flex-1 h-px bg-orange-200 max-w-16" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h2>
                </motion.div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">

                    {/* Left — Info */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -25 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {contactInfo.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all duration-250"
                                initial={{ opacity: 0, y: 15 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.15 + i * 0.1 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm mb-0.5">{item.label}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Map embed placeholder */}
                        <motion.div
                            className="rounded-xl overflow-hidden border border-gray-200 h-44"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4837.895023728118!2d73.7682581!3d19.9981624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb759dc4aae7%3A0x9daab03ef87203ae!2sBrahma%20Valley%20Kendra%20Karyalay!5e1!3m2!1sen!2sin!4v1771564031933!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Brahma Valley Location"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
                        initial={{ opacity: 0, x: 25 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        {submitted ? (
                            <motion.div
                                className="flex flex-col items-center justify-center h-64 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-gray-900 font-bold text-lg mb-1">Message Sent!</h3>
                                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 resize-none"
                                    />
                                </div>

                                <div className="flex justify-end pt-1">
                                    <motion.button
                                        type="submit"
                                        className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-sm hover:bg-orange-600 transition-colors duration-250 flex items-center gap-2"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Send Message
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}