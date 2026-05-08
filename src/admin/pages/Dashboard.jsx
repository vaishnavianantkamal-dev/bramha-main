import { useEffect, useState } from 'react';
import { getDashboard } from '../services/adminApi';
import { Link } from 'react-router-dom';
import {
  FiBookOpen, FiLayers, FiBriefcase, FiCamera,
  FiImage, FiMail, FiUsers, FiTrendingUp
} from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <Link to={to} className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </Link>
);

export default function Dashboard() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => { if (res.success) setData(res); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Manage all website content from here</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FiBookOpen}  label="Total Blogs"      value={stats.total_blogs}       color="bg-blue-500"   to="/admin/blogs" />
        <StatCard icon={FiLayers}    label="Total Courses"    value={stats.total_courses}     color="bg-green-500"  to="/admin/courses" />
        <StatCard icon={FiBriefcase} label="Recruiters"       value={stats.total_recruiters}  color="bg-purple-500" to="/admin/recruiters" />
        <StatCard icon={FiCamera}    label="Gallery Images"   value={stats.total_gallery}     color="bg-pink-500"   to="/admin/gallery" />
        <StatCard icon={FiImage}     label="Hero Slides"      value={stats.total_hero_slides} color="bg-orange-500" to="/admin/hero" />
        <StatCard icon={FiMail}      label="Total Contacts"   value={stats.total_contacts}    color="bg-teal-500"   to="/admin/contacts" />
        <StatCard icon={FiMail}      label="New Contacts"     value={stats.new_contacts}      color="bg-red-500"    to="/admin/contacts?status=new" />
        <StatCard icon={FiUsers}     label="Board Members"    value={stats.total_faculty}     color="bg-indigo-500" to="/admin" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Contact Submissions</h3>
            <Link to="/admin/contacts" className="text-sm text-orange-500 hover:text-orange-600">View all →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : data?.recent_contacts?.length > 0 ? (
            <div className="space-y-3">
              {data.recent_contacts.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm flex-shrink-0">
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                    c.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-6">No contact submissions yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Blog Post',    to: '/admin/blogs?action=new',      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
              { label: 'Add Course',       to: '/admin/courses?action=new',    color: 'bg-green-50 text-green-600 hover:bg-green-100' },
              { label: 'Add Hero Slide',   to: '/admin/hero?action=new',       color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
              { label: 'Add Recruiter',    to: '/admin/recruiters?action=new', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
              { label: 'Upload Gallery',   to: '/admin/gallery?action=new',    color: 'bg-pink-50 text-pink-600 hover:bg-pink-100' },
              { label: 'View Contacts',    to: '/admin/contacts',              color: 'bg-teal-50 text-teal-600 hover:bg-teal-100' },
            ].map(({ label, to, color }) => (
              <Link key={to} to={to} className={`${color} rounded-lg p-3 text-sm font-medium transition-colors text-center`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
