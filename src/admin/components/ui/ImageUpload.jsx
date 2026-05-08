import { useState, useRef } from 'react';
import { uploadImage } from '../../services/adminApi';
import toast from 'react-hot-toast';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

export default function ImageUpload({ value, onChange, folder = 'general', label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file, folder);
      if (res.success) {
        onChange(res.file_path);
        toast.success('Image uploaded');
      } else {
        toast.error(res.message || 'Upload failed');
      }
    } catch (e) {
      toast.error('Upload failed: ' + (e.response?.data?.message || e.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="preview" className="h-32 w-auto rounded-lg border border-gray-200 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FiUpload size={24} className="text-gray-400" />
              <p className="text-sm text-gray-500">Click to upload image</p>
              <p className="text-xs text-gray-400">JPG, PNG, WebP up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {/* URL input fallback */}
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL..."
          className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
