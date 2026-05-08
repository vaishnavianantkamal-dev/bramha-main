import { useEffect, useState } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../services/adminApi';
import DataTable from '../components/ui/DataTable';
import ConfirmModal from '../components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';

const EMPTY = { name: '', code: '', level: 'UG', duration: '', campus: '', institution: '', description: '', eligibility: '', fees: '', brochure_url: '', is_active: 1 };
const LEVELS = ['UG', 'PG', 'Diploma', 'School', 'Junior College'];

export default function Courses() {
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => { setLoading(true); getCourses().then(r => setCourses(r.data || [])).catch(console.error).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const filtered = courses.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.level.toLowerCase().includes(search.toLowerCase()));

  const openNew  = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setForm(EMPTY); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name) { toast.error('Course name required'); return; }
    setSaving(true);
    try {
      if (editing) { await updateCourse(editing, form); toast.success('Course updated'); }
      else { await createCourse(form); toast.success('Course created'); }
      closeForm(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteCourse(deleteTarget.id); toast.success('Course deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Delete failed'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Course Name', render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: 'code', label: 'Code' },
    { key: 'level', label: 'Level', render: (v) => <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{v}</span> },
    { key: 'duration', label: 'Duration' },
    { key: 'campus', label: 'Campus' },
    { key: 'fees', label: 'Fees', render: (v) => v ? `₹${Number(v).toLocaleString()}` : '—' },
    { key: 'is_active', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v ? 'Active' : 'Inactive'}</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Courses</h2>
          <p className="text-sm text-gray-500">{courses.length} courses</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <FiPlus size={16} /> Add Course
        </button>
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget}
        searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search courses..." />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Course' : 'Add Course'}</h3>
              <button onClick={closeForm}><FiX size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name <span className="text-red-500">*</span></label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                  <input value={form.code} onChange={e => setForm({...form, code: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select value={form.level} onChange={e => setForm({...form, level: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    {LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g. 4 Years" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fees (₹)</label>
                  <input type="number" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                <input value={form.campus} onChange={e => setForm({...form, campus: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                <textarea value={form.eligibility} onChange={e => setForm({...form, eligibility: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" checked={!!form.is_active} onChange={e => setForm({...form, is_active: e.target.checked ? 1 : 0})} className="rounded" />
                <label htmlFor="active" className="text-sm text-gray-700">Active</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600 disabled:opacity-60">
                  {saving ? 'Saving...' : (editing ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Course" message={`Delete "${deleteTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
