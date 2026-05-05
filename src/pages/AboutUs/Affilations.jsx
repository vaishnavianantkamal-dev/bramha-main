import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const accreditationsData = [
  // Empty by default — add real data when available
  // Example structure:
  // { id: 1, name: "NAAC Accreditation", year: "2024", grade: "A", body: "UGC-NAAC", validity: "2029" },
];

function DataTable({ columns, data, emptyMessage }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <motion.tr
                key={row.id}
                className="border-b border-gray-50 hover:bg-orange-50/40 transition-colors duration-150"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {col.key === "#" ? i + 1 : row[col.key] ?? "—"}
                  </td>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-5 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Affilations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const columns = [
    { key: "#", label: "#" },
    { key: "name", label: "Accreditation / Affiliation" },
    { key: "year", label: "Year" },
    { key: "grade", label: "Grade / Status" },
    { key: "body", label: "Awarding Body" },
    { key: "validity", label: "Valid Until" },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-orange-500" />
            <span className="text-orange-500 text-xs tracking-[0.25em] uppercase font-semibold">
              Recognition
            </span>
            <span className="w-8 h-px bg-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Accreditations & Affiliations
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Formal recognitions, affiliations, and statutory approvals from governing bodies.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <div>
              <h3 className="text-gray-900 font-bold text-sm">Accreditations & Affiliations</h3>
              <p className="text-gray-400 text-xs mt-0.5">
                Official accreditations and institutional affiliations
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                accreditationsData.length > 0
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {accreditationsData.length} records
            </span>
          </div>

          <div className="p-0">
            <DataTable
              columns={columns}
              data={accreditationsData}
              emptyMessage="No accreditations found"
            />
          </div>
        </motion.div>

        <motion.p
          className="text-gray-400 text-xs text-center mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Data is updated regularly. For official records, please contact the administration office.
        </motion.p>
      </div>
    </section>
  );
}
