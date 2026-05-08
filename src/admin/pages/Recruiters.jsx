import { useEffect, useState } from 'react';
import { getRecruiters, createRecruiter, updateRecruiter, deleteRecruiter } from '../services/adminApi';
import DataTable from '../components/ui/DataTable';
import ConfirmModal from '../components/ui/ConfirmModal';
import ImageUpload from '../components/ui/ImageUpload';
import toast from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';

const EMPTY = { company_name: '', logo: '', industry_sector: '', website_url: '', recruitment_year: new Date().getFullYear().toString(), display_order: 0, is_active: 1 };

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState(EMPTY);
  const [editing, setEditing]       = useState(null);
  const [saving, setSaving]         = useState(false);
  const [search, setSearch]         = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting]     = useState(false);

  const load = () => { setLoading(true); getRecruiters().then(r => setRecruiters(r.data || [])).catch(console.error).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const filtered = recruiters.filter(r => !search || r.company_name.toLowerCase().includes(search.toLowerCase()));

  const openNew  = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setForm(EMPTY); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.company_name) { toast.error('Company name required'); return; }
    setSaving(true);
    try {
      if (editing) { await updateRecruiter(editing, form); toast.success('Recruiter updated'); }
      else { await createRecruiter(form); toast.success('Recruiter added'); }
      closeForm(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteRecruiter(deleteTarget.id); toast.success('Recruiter deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Delete failed'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'logo', label: 'Logo', render: (v, row) => v ? <img src={v} alt={row.company_name} className="h-10 w-20 object-contain rounded" /> : <div className="h-10 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No logo</div> },
    { key: 'company_name', label: 'Company', render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: 'industry_sector', label: 'Industry' },
    { key: 'recruitment_year', label: 'Year' },
    { key: 'display_order', label: 'Order' },
    { key: 'is_active', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v ? 'Active' : 'Inactive'}</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Recruiters</h2><p className="text-sm text-gray-500">{recruiters.length} companies</p></div>
        <button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <FiPlus size={16} /> Add Recruiter
        </button>
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget}
        searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search companies..." />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">{editing ? 'Edit Recruiter' : 'Add Recruiter'}</h3>
              <button onClick={closeForm}><FiX size={20} className="text-gray-400"/></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                <input value={form.company_name} onChange={e=>setForm({...form,company_name:e.target.value})} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
              </div>
              <ImageUpload value={form.logo} onChange={v=>setForm({...form,logo:v})} folder="recruiters" label="Company Logo" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry Sector</label>
                  <input value={form.industry_sector} onChange={e=>setForm({...form,industry_sector:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Year</label>
                  <input value={form.recruitment_year} onChange={e=>setForm({...form,recruitment_year:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input type="url" value={form.website_url} onChange={e=>setForm({...form,website_url:e.target.value})} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e=>setForm({...form,display_order:+e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked?1:0})} className="rounded"/>
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm disabled:opacity-60">{saving ? 'Saving...' : (editing ? 'Update' : 'Add')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Recruiter" message={`Remove "${deleteTarget?.company_name}" from recruiters?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
