import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FiHome, FiImage, FiBookOpen, FiUsers, FiGrid, FiMail,
  FiSettings, FiLogOut, FiMenu, FiX, FiChevronRight,
  FiLayers, FiAward, FiCamera, FiBriefcase, FiMessageSquare
} from 'react-icons/fi';

const navItems = [
  { path: '/admin',            label: 'Dashboard',    icon: FiHome },
  { path: '/admin/hero',       label: 'Hero Slides',  icon: FiImage },
  { path: '/admin/blogs',      label: 'Blogs',        icon: FiBookOpen },
  { path: '/admin/courses',    label: 'Courses',      icon: FiLayers },
  { path: '/admin/gallery',    label: 'Gallery',      icon: FiCamera },
  { path: '/admin/recruiters', label: 'Recruiters',   icon: FiBriefcase },
  { path: '/admin/contacts',   label: 'Contacts',     icon: FiMail },
  { path: '/admin/settings',   label: 'Settings',     icon: FiSettings },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white flex flex-col transition-all duration-300 flex-shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-sm">BV</div>
              <span className="font-bold text-sm">Admin CMS</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-auto"
          >
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                title={!sidebarOpen ? label : ''}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg mb-1 transition-all duration-200 group
                  ${active ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
                {sidebarOpen && active && <FiChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-gray-700 p-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {user?.full_name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.full_name || 'Admin'}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role || 'admin'}</p>
              </div>
              <button onClick={handleLogout} className="p-1.5 hover:text-red-400 transition-colors" title="Logout">
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center p-1.5 hover:text-red-400 transition-colors" title="Logout">
              <FiLogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {navItems.find(n => location.pathname === n.path || (n.path !== '/admin' && location.pathname.startsWith(n.path)))?.label || 'Admin Panel'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              View Site →
            </a>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
              {user?.full_name?.[0] || 'A'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
