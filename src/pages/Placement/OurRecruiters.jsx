import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageTitle from './PageTitle'
import { fetchRecruiters } from '../../services/api.js'

const OurRecruiters = () => {
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load recruiters from API
    useEffect(() => {
        const loadRecruiters = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchRecruiters();
                setRecruiters(data);
                console.log('✅ Recruiters loaded from database:', data.length, 'recruiters');
            } catch (err) {
                console.error('❌ Failed to load recruiters:', err);
                setError(err.message);
                setRecruiters([]);
            } finally {
                setLoading(false);
            }
        };
        loadRecruiters();
    }, []);

    return (
        <div>
            <PageTitle title="Our Recruiters" subtitle="Training & Placement Cell" />
            
            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    // Loading skeleton
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="h-20 bg-gray-200 rounded animate-pulse mb-4" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : recruiters.length === 0 ? (
                    <div className="flex items-center justify-center h-64 text-gray-500 font-medium">
                        {error ? `Error: ${error}` : "No recruiters found."}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recruiters.map((recruiter, index) => (
                            <motion.div
                                key={recruiter.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ y: -2 }}
                            >
                                {/* Company Logo */}
                                <div className="h-20 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                                    {recruiter.logo_path ? (
                                        <img
                                            src={recruiter.logo_path}
                                            alt={recruiter.company_name}
                                            className="max-h-16 max-w-full object-contain"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                e.target.nextSibling.style.display = "flex";
                                            }}
                                        />
                                    ) : null}
                                    <div className={`${recruiter.logo_path ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-gray-400 font-bold text-lg`}>
                                        {recruiter.company_name.split(' ').map(word => word[0]).join('').substring(0, 3)}
                                    </div>
                                </div>

                                {/* Company Info */}
                                <div className="text-center">
                                    <h3 className="text-gray-900 font-semibold text-sm mb-1 line-clamp-2">
                                        {recruiter.company_name}
                                    </h3>
                                    {recruiter.industry && (
                                        <p className="text-gray-500 text-xs">
                                            {recruiter.industry}
                                        </p>
                                    )}
                                    {recruiter.website && (
                                        <a
                                            href={recruiter.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-500 text-xs hover:underline mt-2 inline-block"
                                        >
                                            Visit Website
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OurRecruiters