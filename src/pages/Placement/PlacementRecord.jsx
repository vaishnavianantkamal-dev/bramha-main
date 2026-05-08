import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "./PageTitle";
import { fetchPlacementRecords } from "../../services/api.js";

const PlacementRecord = () => {
    const [placementData, setPlacementData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load placement records from API
    useEffect(() => {
        const loadPlacementRecords = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchPlacementRecords();
                setPlacementData(data);
                console.log('✅ Placement records loaded from database:', data.length, 'records');
            } catch (err) {
                console.error('❌ Failed to load placement records:', err);
                setError(err.message);
                setPlacementData([]);
            } finally {
                setLoading(false);
            }
        };
        loadPlacementRecords();
    }, []);

    return (
        <div className="bg-gray-50">
            <PageTitle title="Placement Records" subtitle="Training & Placement Cell" />

            {/* Table Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    // Loading skeleton
                    <div className="overflow-x-auto shadow-lg rounded-xl">
                        <div className="w-full">
                            <div className="bg-gray-200 h-12 animate-pulse rounded-t-xl" />
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="bg-white border-b">
                                    <div className="flex">
                                        {Array.from({ length: 6 }).map((_, j) => (
                                            <div key={j} className="flex-1 p-4">
                                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-xl">
                        <table className="w-full text-left border-collapse">

                            {/* Table Head */}
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                                    <th className="px-6 py-4 font-semibold">#</th>
                                    <th className="px-6 py-4 font-semibold">
                                        Name Of Institution Campus
                                    </th>
                                    <th className="px-6 py-4 font-semibold">Year</th>
                                    <th className="px-6 py-4 font-semibold">Average Package</th>
                                    <th className="px-6 py-4 font-semibold">Highest Package</th>
                                    <th className="px-6 py-4 font-semibold">No of Students</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="bg-white">
                                {placementData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-8 text-gray-500 font-medium"
                                        >
                                            {error ? `Error: ${error}` : "No placement records found"}
                                        </td>
                                    </tr>
                                ) : (
                                    placementData.map((item, index) => (
                                        <motion.tr
                                            key={item.id || index}
                                            className="border-b hover:bg-gray-50 transition"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                        >
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{item.campus_name || item.campus}</td>
                                            <td className="px-6 py-4">{item.year}</td>
                                            <td className="px-6 py-4">₹{item.average_package || item.averagePackage}</td>
                                            <td className="px-6 py-4">₹{item.highest_package || item.highestPackage}</td>
                                            <td className="px-6 py-4">{item.students_placed || item.students}</td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default PlacementRecord;