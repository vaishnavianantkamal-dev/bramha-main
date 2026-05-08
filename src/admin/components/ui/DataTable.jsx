import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

export default function DataTable({
  columns, data, onEdit, onDelete, loading,
  searchValue, onSearchChange, searchPlaceholder = 'Search...',
  actions, emptyMessage = 'No records found'
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Search bar */}
      {onSearchChange && (
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || actions) && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </td>
                  ))}
                  {(onEdit || onDelete) && <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  {(onEdit || onDelete || actions) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {actions && actions(row)}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={15} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
