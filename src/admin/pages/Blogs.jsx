import { useEffect, useState } from 'react';
import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../services/adminApi';
import DataTable from '../components/ui/DataTable';
import ConfirmModal from '../components/ui/ConfirmModal';
import ImageUpload from '../components/ui/ImageUpload';
import toast from 'react-hot-toast';
import { FiPlus, FiX, FiEye } from 'react-icons/fi';

const EMPTY = { title: '', slug: '', excerpt: '', content: '', featured_image: '', author_name: 'Admin', author_avatar: '', category: 'General', published_date: new Date().toISOString().split('T')[0], is_published: 0 };

export default function Blogs() {
  const [blogs, setBlogs]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = (s = search) => {
    setLoading(true);
    getBlogs({ search: s }).then(r => { setBlogs(r.data || []); setTotal(r.total || 0); }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { const t = setTimeout(() => load(search), 400); return () => clearTimeout(t); }, [search]);

  const openNew  = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = async (row) => {
    try {
      const res = await getBlog(row.id);
      setForm(res.data || row);
    } catch { setForm(row); }
    setEditing(row.id); setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setForm(EMPTY); setEditing(null); };

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title) { toast.error('Title is required'); return; }
    if (!form.slug) form.slug = autoSlug(form.title);
    setSaving(true);
    try {
      if (editing) { await updateBlog(editing, form); toast.success('Blog updated'); }
      else { await createBlog(form); toast.success('Blog created'); }
      closeForm(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteBlog(deleteTarget.id); toast.success('Blog deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Delete failed'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'featured_image', label: 'Image', render: (v) => v ? <img src={v} alt="" className="h-10 w-16 object-cover rounded" /> : <span className="text-gray-300 text-xs">—</span> },
    { key: 'title', label: 'Title', render: (v) => <span className="font-medium text-gray-900 line-clamp-1">{v}</span> },
    { key: 'author_name', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'published_date', label: 'Date' },
    { key: 'is_published', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{v ? 'Published' : 'Draft'}</span> },
    { key: 'views', label: 'Views' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Blog Posts</h2>
          <p className="text-sm text-gray-500">{total} total posts</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <FiPlus size={16} /> New Post
        </button>
      </div>

      <DataTable columns={columns} data={blogs} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget}
        searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search blogs..." />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button onClick={closeForm}><FiX size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={e => { const t=e.target.value; setForm({...form, title: t, slug: autoSlug(t)}); }} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <ImageUpload value={form.featured_image} onChange={v => setForm({...form, featured_image: v})} folder="blogs" label="Featured Image" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono" placeholder="Write blog content here... (HTML supported)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                  <input value={form.author_name} onChange={e => setForm({...form, author_name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                  <input type="date" value={form.published_date} onChange={e => setForm({...form, published_date: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={!!form.is_published} onChange={e => setForm({...form, is_published: e.target.checked ? 1 : 0})} className="rounded" />
                <label htmlFor="published" className="text-sm text-gray-700">Publish immediately</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600 disabled:opacity-60">
                  {saving ? 'Saving...' : (editing ? 'Update Post' : 'Create Post')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Blog Post" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
