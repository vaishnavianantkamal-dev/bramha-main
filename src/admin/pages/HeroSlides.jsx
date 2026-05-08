import { useEffect, useState } from 'react';
import { getHeroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide } from '../services/adminApi';
import DataTable from '../components/ui/DataTable';
import ConfirmModal from '../components/ui/ConfirmModal';
import ImageUpload from '../components/ui/ImageUpload';
import toast from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';

const EMPTY = { image: '', tag: '', headline: '', highlight: '', subtitle: '', display_order: 0, is_active: 1 };

export default function HeroSlides() {
  const [slides, setSlides]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    getHeroSlides().then(r => setSlides(r.data || [])).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setForm(EMPTY); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.headline) { toast.error('Headline is required'); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateHeroSlide(editing, form);
        toast.success('Slide updated');
      } else {
        await createHeroSlide(form);
        toast.success('Slide created');
      }
      closeForm(); load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteHeroSlide(deleteTarget.id);
      toast.success('Slide deleted');
      setDeleteTarget(null); load();
    } catch (err) {
      toast.error('Delete failed');
    } finally { setDeleting(false); }
  };

  const columns = [
    { key: 'image', label: 'Image', render: (v) => v ? <img src={v} alt="" className="h-10 w-16 object-cover rounded" /> : <span className="text-gray-400 text-xs">No image</span> },
    { key: 'tag', label: 'Tag' },
    { key: 'headline', label: 'Headline' },
    { key: 'highlight', label: 'Highlight' },
    { key: 'display_order', label: 'Order' },
    { key: 'is_active', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v ? 'Active' : 'Inactive'}</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hero Slides</h2>
          <p className="text-sm text-gray-500">{slides.length} slides</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <FiPlus size={16} /> Add Slide
        </button>
      </div>

      <DataTable columns={columns} data={slides} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Slide' : 'Add New Slide'}</h3>
              <button onClick={closeForm}><FiX size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} folder="hero" label="Slide Image" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. Est. 1998" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm({...form, display_order: +e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline <span className="text-red-500">*</span></label>
                <input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. Shaping Tomorrow's" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlight (colored text)</label>
                <input value={form.highlight} onChange={e => setForm({...form, highlight: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. Leaders" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <textarea value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
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

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Slide" message={`Delete "${deleteTarget?.headline}"? This cannot be undone.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
