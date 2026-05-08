import { useEffect, useState } from 'react';
import { getContacts, updateContact, deleteContact } from '../services/adminApi';
import ConfirmModal from '../components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { FiMail, FiTrash2, FiEye, FiX, FiRefreshCw } from 'react-icons/fi';

const STATUS_COLORS = { new: 'bg-red-100 text-red-700', read: 'bg-blue-100 text-blue-700', replied: 'bg-green-100 text-green-700', archived: 'bg-gray-100 text-gray-500' };

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    getContacts({ page, status: statusFilter || undefined }).then(r => { setContacts(r.data || []); setTotal(r.total || 0); }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, statusFilter]);

  const markStatus = async (id, status) => {
    try {
      await updateContact(id, { status });
      toast.success(`Marked as ${status}`);
      load();
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch { toast.error('Update failed'); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteContact(deleteTarget.id); toast.success('Deleted'); setDeleteTarget(null); if (selected?.id === deleteTarget.id) setSelected(null); load(); }
    catch { toast.error('Delete failed'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Contact Submissions</h2><p className="text-sm text-gray-500">{total} total</p></div>
        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <button onClick={load} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"><FiRefreshCw size={16} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-4 space-y-3">{[1,2,3,4,5].map(i=><div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"/>)}</div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-400"><FiMail size={32} className="mx-auto mb-2 opacity-30"/><p>No submissions found</p></div>
          ) : (
            <div className="divide-y divide-gray-100">
              {contacts.map(c => (
                <div key={c.id} onClick={() => { setSelected(c); if (c.status === 'new') markStatus(c.id, 'read'); }} className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === c.id ? 'bg-orange-50' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_COLORS[c.status] || 'bg-gray-100 text-gray-500'}`}>{c.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                      <p className="text-xs text-gray-400">{c.email} · {new Date(c.submitted_at).toLocaleDateString()}</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setDeleteTarget(c); }} className="p-1 text-red-400 hover:text-red-600 flex-shrink-0"><FiTrash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination */}
          {total > 20 && (
            <div className="p-3 border-t flex items-center justify-between">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40">← Prev</button>
              <span className="text-xs text-gray-400">Page {page}</span>
              <button onClick={() => setPage(p => p+1)} disabled={contacts.length < 20} className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40">Next →</button>
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FiEye size={32} className="mb-2 opacity-30"/>
              <p className="text-sm">Select a submission to view details</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{selected.name}</h3>
                  <p className="text-sm text-gray-500">{selected.email}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><FiX size={18}/></button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Subject</p>
                <p className="text-sm font-medium text-gray-900">{selected.subject}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Message</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="text-xs text-gray-400">
                Submitted: {new Date(selected.submitted_at).toLocaleString()} · IP: {selected.ip_address}
              </div>
              <div className="flex gap-2 flex-wrap">
                {['new','read','replied','archived'].map(s => (
                  <button key={s} onClick={() => markStatus(selected.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selected.status === s ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
                <button onClick={() => setDeleteTarget(selected)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 ml-auto">Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Submission" message={`Delete submission from "${deleteTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
