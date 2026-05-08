import { useEffect, useState } from 'react';
import { getGalleryCategories, createGalleryCategory, updateGalleryCategory, deleteGalleryCategory, getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../services/adminApi';
import ConfirmModal from '../components/ui/ConfirmModal';
import ImageUpload from '../components/ui/ImageUpload';
import toast from 'react-hot-toast';
import { FiPlus, FiX, FiFolder, FiImage, FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function Gallery() {
  const [categories, setCategories] = useState([]);
  const [images, setImages]         = useState([]);
  const [selCat, setSelCat]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [imgLoading, setImgLoading] = useState(false);

  // Category form
  const [showCatForm, setShowCatForm] = useState(false);
  const [catForm, setCatForm]         = useState({ name: '', slug: '', description: '', cover_image: '', display_order: 0, is_active: 1 });
  const [editingCat, setEditingCat]   = useState(null);
  const [savingCat, setSavingCat]     = useState(false);

  // Image form
  const [showImgForm, setShowImgForm] = useState(false);
  const [imgForm, setImgForm]         = useState({ category_id: '', image_path: '', caption: '', event_date: '', photographer: '', display_order: 0, is_active: 1 });
  const [editingImg, setEditingImg]   = useState(null);
  const [savingImg, setSavingImg]     = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting]         = useState(false);

  const loadCats = () => { setLoading(true); getGalleryCategories().then(r => setCategories(r.data || [])).catch(console.error).finally(() => setLoading(false)); };
  const loadImgs = (catId) => { setImgLoading(true); getGalleryImages(catId).then(r => setImages(r.data || [])).catch(console.error).finally(() => setImgLoading(false)); };

  useEffect(() => { loadCats(); }, []);
  useEffect(() => { if (selCat) loadImgs(selCat.id); else setImages([]); }, [selCat]);

  const handleSaveCat = async (e) => {
    e.preventDefault();
    setSavingCat(true);
    try {
      if (editingCat) { await updateGalleryCategory(editingCat, catForm); toast.success('Category updated'); }
      else { await createGalleryCategory(catForm); toast.success('Category created'); }
      setShowCatForm(false); loadCats();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSavingCat(false); }
  };

  const handleSaveImg = async (e) => {
    e.preventDefault();
    if (!imgForm.image_path) { toast.error('Image required'); return; }
    setSavingImg(true);
    try {
      const payload = { ...imgForm, category_id: selCat?.id || imgForm.category_id };
      if (editingImg) { await updateGalleryImage(editingImg, payload); toast.success('Image updated'); }
      else { await createGalleryImage(payload); toast.success('Image added'); }
      setShowImgForm(false); if (selCat) loadImgs(selCat.id);
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSavingImg(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (deleteTarget.type === 'category') { await deleteGalleryCategory(deleteTarget.id); loadCats(); if (selCat?.id === deleteTarget.id) setSelCat(null); }
      else { await deleteGalleryImage(deleteTarget.id); if (selCat) loadImgs(selCat.id); }
      toast.success('Deleted'); setDeleteTarget(null);
    } catch { toast.error('Delete failed'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Gallery</h2><p className="text-sm text-gray-500">{categories.length} categories</p></div>
        <button onClick={() => { setCatForm({ name:'',slug:'',description:'',cover_image:'',display_order:0,is_active:1 }); setEditingCat(null); setShowCatForm(true); }} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <FiPlus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><FiFolder size={16} /> Categories</h3>
          {loading ? <div className="space-y-2">{[1,2,3].map(i=><div key={i} className="h-10 bg-gray-100 rounded animate-pulse"/>)}</div> :
            categories.length === 0 ? <p className="text-gray-400 text-sm text-center py-4">No categories yet</p> :
            <div className="space-y-1">
              {categories.map(cat => (
                <div key={cat.id} onClick={() => setSelCat(cat)} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selCat?.id === cat.id ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    {cat.cover_image ? <img src={cat.cover_image} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" /> : <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0" />}
                    <span className="text-sm font-medium text-gray-900 truncate">{cat.name}</span>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={e => { e.stopPropagation(); setCatForm({...cat}); setEditingCat(cat.id); setShowCatForm(true); }} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><FiEdit2 size={13}/></button>
                    <button onClick={e => { e.stopPropagation(); setDeleteTarget({...cat, type:'category'}); }} className="p-1 text-red-500 hover:bg-red-50 rounded"><FiTrash2 size={13}/></button>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        {/* Images */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2"><FiImage size={16} /> {selCat ? `${selCat.name} — Images` : 'Select a category'}</h3>
            {selCat && (
              <button onClick={() => { setImgForm({category_id:selCat.id,image_path:'',caption:'',event_date:'',photographer:'',display_order:0,is_active:1}); setEditingImg(null); setShowImgForm(true); }} className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-orange-600">
                <FiPlus size={13}/> Add Image
              </button>
            )}
          </div>
          {!selCat ? <p className="text-gray-400 text-sm text-center py-12">← Select a category to view images</p> :
            imgLoading ? <div className="grid grid-cols-3 gap-3">{[1,2,3,4,5,6].map(i=><div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse"/>)}</div> :
            images.length === 0 ? <p className="text-gray-400 text-sm text-center py-12">No images in this category</p> :
            <div className="grid grid-cols-3 gap-3">
              {images.map(img => (
                <div key={img.id} className="relative group aspect-square">
                  <img src={img.image_path} alt={img.caption} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <button onClick={() => { setImgForm({...img}); setEditingImg(img.id); setShowImgForm(true); }} className="p-1.5 bg-white rounded-lg text-blue-500"><FiEdit2 size={14}/></button>
                    <button onClick={() => setDeleteTarget({...img, type:'image'})} className="p-1.5 bg-white rounded-lg text-red-500"><FiTrash2 size={14}/></button>
                  </div>
                  {img.caption && <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 rounded-b-lg truncate">{img.caption}</p>}
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {/* Category Form Modal */}
      {showCatForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">{editingCat ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setShowCatForm(false)}><FiX size={20} className="text-gray-400"/></button>
            </div>
            <form onSubmit={handleSaveCat} className="p-5 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input value={catForm.name} onChange={e=>{const n=e.target.value;setCatForm({...catForm,name:n,slug:n.toLowerCase().replace(/[^a-z0-9]+/g,'-')});}} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input value={catForm.slug} onChange={e=>setCatForm({...catForm,slug:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono text-xs"/></div>
              <ImageUpload value={catForm.cover_image} onChange={v=>setCatForm({...catForm,cover_image:v})} folder="gallery" label="Cover Image" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCatForm(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={savingCat} className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm disabled:opacity-60">{savingCat ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Form Modal */}
      {showImgForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">{editingImg ? 'Edit Image' : 'Add Image'}</h3>
              <button onClick={() => setShowImgForm(false)}><FiX size={20} className="text-gray-400"/></button>
            </div>
            <form onSubmit={handleSaveImg} className="p-5 space-y-4">
              <ImageUpload value={imgForm.image_path} onChange={v=>setImgForm({...imgForm,image_path:v})} folder="gallery" label="Image" />
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Caption</label><input value={imgForm.caption} onChange={e=>setImgForm({...imgForm,caption:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label><input type="date" value={imgForm.event_date||''} onChange={e=>setImgForm({...imgForm,event_date:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Photographer</label><input value={imgForm.photographer} onChange={e=>setImgForm({...imgForm,photographer:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/></div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowImgForm(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={savingImg} className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm disabled:opacity-60">{savingImg ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteTarget} title={`Delete ${deleteTarget?.type === 'category' ? 'Category' : 'Image'}`} message={`This action cannot be undone.${deleteTarget?.type === 'category' ? ' All images in this category will also be deleted.' : ''}`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
