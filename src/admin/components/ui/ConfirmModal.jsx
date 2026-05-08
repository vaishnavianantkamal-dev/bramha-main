export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title || 'Confirm'}</h3>
        <p className="text-gray-600 text-sm mb-6">{message || 'Are you sure?'}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} disabled={loading} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
