import React from "react";
import { motion } from "framer-motion";
import PageTitle from "./PageTitle";

const PlacementRecord = () => {
    const placementData = []; // Add data here later

    return (
        <div className="bg-gray-50">
            <PageTitle title="Placement Records" subtitle="Training & Placement Cell" />

            {/* Table Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
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
                                        No placement records found
                                    </td>
                                </tr>
                            ) : (
                                placementData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{item.campus}</td>
                                        <td className="px-6 py-4">{item.year}</td>
                                        <td className="px-6 py-4">{item.averagePackage}</td>
                                        <td className="px-6 py-4">{item.highestPackage}</td>
                                        <td className="px-6 py-4">{item.students}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default PlacementRecord;