import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/adminApi';
import toast from 'react-hot-toast';
import { FiUser, FiLock, FiSave } from 'react-icons/fi';

export default function Settings() {
  const { user } = useAuth();
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm_password) { toast.error('Passwords do not match'); return; }
    if (pwForm.new_password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setSaving(true);
    try {
      const res = await api.post('/change-password.php', pwForm).then(r => r.data);
      if (res.success) { toast.success('Password changed successfully'); setPwForm({ current_password: '', new_password: '', confirm_password: '' }); }
      else toast.error(res.message || 'Failed to change password');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to change password'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div><h2 className="text-xl font-bold text-gray-900">Settings</h2><p className="text-sm text-gray-500">Manage your admin account</p></div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiUser size={16}/> Profile Information</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.full_name?.[0] || 'A'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.full_name}</p>
            <p className="text-sm text-gray-500">{user?.username}</p>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Username</p>
            <p className="font-medium text-gray-900">{user?.username}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1">Role</p>
            <p className="font-medium text-gray-900 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiLock size={16}/> Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" value={pwForm.current_password} onChange={e => setPwForm({...pwForm, current_password: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" value={pwForm.new_password} onChange={e => setPwForm({...pwForm, new_password: e.target.value})} required minLength={6} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" value={pwForm.confirm_password} onChange={e => setPwForm({...pwForm, confirm_password: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-60">
            <FiSave size={15}/> {saving ? 'Saving...' : 'Change Password'}
          </button>
        </form>
      </div>

      {/* API Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">API Base URL</span>
            <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{import.meta.env.VITE_API_BASE_URL || 'http://localhost/brahmavalley-main/brahmavalley-main/backend/api'}</code>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Environment</span>
            <span className="text-gray-900">{import.meta.env.MODE}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Version</span>
            <span className="text-gray-900">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
