/**
 * Admin API Service
 * All admin CRUD operations
 */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') + '/api' ||
  'http://localhost/brahmavalley-main/brahmavalley-main/backend/api';

const ADMIN_URL = BASE_URL.replace('/api', '/api/admin');

// Create axios instance
const api = axios.create({
  baseURL: ADMIN_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const adminLogin = (credentials) =>
  api.post('/login.php', credentials).then((r) => r.data);

export const adminLogout = () =>
  api.post('/logout.php').then((r) => r.data);

export const getMe = () =>
  api.get('/me.php').then((r) => r.data);

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const getDashboard = () =>
  api.get('/dashboard.php').then((r) => r.data);

// ── Upload ────────────────────────────────────────────────────────────────────
export const uploadImage = (file, folder = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  return api.post('/upload.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};

export const deleteUploadedFile = (filePath) =>
  api.delete('/upload.php', { data: { file_path: filePath } }).then((r) => r.data);

// ── Hero Slides ───────────────────────────────────────────────────────────────
export const getHeroSlides    = ()       => api.get('/hero-slides.php').then((r) => r.data);
export const createHeroSlide  = (data)   => api.post('/hero-slides.php', data).then((r) => r.data);
export const updateHeroSlide  = (id, d)  => api.put(`/hero-slides.php?id=${id}`, d).then((r) => r.data);
export const deleteHeroSlide  = (id)     => api.delete(`/hero-slides.php?id=${id}`).then((r) => r.data);

// ── Blogs ─────────────────────────────────────────────────────────────────────
export const getBlogs      = (params = {}) => api.get('/blogs.php', { params }).then((r) => r.data);
export const getBlog       = (id)          => api.get(`/blogs.php?id=${id}`).then((r) => r.data);
export const createBlog    = (data)        => api.post('/blogs.php', data).then((r) => r.data);
export const updateBlog    = (id, data)    => api.put(`/blogs.php?id=${id}`, data).then((r) => r.data);
export const deleteBlog    = (id)          => api.delete(`/blogs.php?id=${id}`).then((r) => r.data);

// ── Courses ───────────────────────────────────────────────────────────────────
export const getCourses    = ()          => api.get('/courses.php').then((r) => r.data);
export const getCourse     = (id)        => api.get(`/courses.php?id=${id}`).then((r) => r.data);
export const createCourse  = (data)      => api.post('/courses.php', data).then((r) => r.data);
export const updateCourse  = (id, data)  => api.put(`/courses.php?id=${id}`, data).then((r) => r.data);
export const deleteCourse  = (id)        => api.delete(`/courses.php?id=${id}`).then((r) => r.data);

// ── Gallery ───────────────────────────────────────────────────────────────────
export const getGalleryCategories   = ()         => api.get('/gallery.php?type=categories').then((r) => r.data);
export const createGalleryCategory  = (data)     => api.post('/gallery.php?type=categories', data).then((r) => r.data);
export const updateGalleryCategory  = (id, data) => api.put(`/gallery.php?type=categories&id=${id}`, data).then((r) => r.data);
export const deleteGalleryCategory  = (id)       => api.delete(`/gallery.php?type=categories&id=${id}`).then((r) => r.data);

export const getGalleryImages   = (catId) => api.get(`/gallery.php?type=images${catId ? '&category_id=' + catId : ''}`).then((r) => r.data);
export const createGalleryImage = (data)  => api.post('/gallery.php?type=images', data).then((r) => r.data);
export const updateGalleryImage = (id, d) => api.put(`/gallery.php?type=images&id=${id}`, d).then((r) => r.data);
export const deleteGalleryImage = (id)    => api.delete(`/gallery.php?type=images&id=${id}`).then((r) => r.data);

// ── Recruiters ────────────────────────────────────────────────────────────────
export const getRecruiters    = ()          => api.get('/recruiters.php').then((r) => r.data);
export const createRecruiter  = (data)      => api.post('/recruiters.php', data).then((r) => r.data);
export const updateRecruiter  = (id, data)  => api.put(`/recruiters.php?id=${id}`, data).then((r) => r.data);
export const deleteRecruiter  = (id)        => api.delete(`/recruiters.php?id=${id}`).then((r) => r.data);

// ── Contacts ──────────────────────────────────────────────────────────────────
export const getContacts      = (params = {}) => api.get('/contacts.php', { params }).then((r) => r.data);
export const updateContact    = (id, data)    => api.put(`/contacts.php?id=${id}`, data).then((r) => r.data);
export const deleteContact    = (id)          => api.delete(`/contacts.php?id=${id}`).then((r) => r.data);

export default api;
