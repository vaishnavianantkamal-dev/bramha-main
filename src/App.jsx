import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, useEffect, useState, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import SchoolBrand from "./components/common/Schoolbrand";
import TopHeader from "./components/common/TopHeader";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./admin/context/AuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";

// Admin pages (lazy loaded)
const AdminLogin      = lazy(() => import("./admin/pages/Login"));
const AdminDashboard  = lazy(() => import("./admin/pages/Dashboard"));
const AdminHeroSlides = lazy(() => import("./admin/pages/HeroSlides"));
const AdminBlogs      = lazy(() => import("./admin/pages/Blogs"));
const AdminCourses    = lazy(() => import("./admin/pages/Courses"));
const AdminGallery    = lazy(() => import("./admin/pages/Gallery"));
const AdminRecruiters = lazy(() => import("./admin/pages/Recruiters"));
const AdminContacts   = lazy(() => import("./admin/pages/Contacts"));
const AdminSettings   = lazy(() => import("./admin/pages/Settings"));

// Lazy load all page components
const Home = lazy(() => import("./pages/Home/Home"));
const Overview = lazy(() => import("./pages/AboutUs/Overview"));
const BoardOfTrusties = lazy(() => import("./pages/AboutUs/BoardOfTrusties"));
const Affilations = lazy(() => import("./pages/AboutUs/Affilations"));
const Awards = lazy(() => import("./pages/AboutUs/Awards"));
const ProgressHighlight = lazy(() => import("./pages/AboutUs/ProgressHighlight"));
const Journey = lazy(() => import("./components/Journey"));
const Facilities = lazy(() => import("./components/Facilities"));
const Courses = lazy(() => import("./pages/Courses"));
const Events = lazy(() => import("./pages/Events"));
const PlacementOverview = lazy(() => import("./pages/Placement/Overview"));
const PlacementRecord = lazy(() => import("./pages/Placement/PlacementRecord"));
const OurRecruiters = lazy(() => import("./pages/Placement/OurRecruiters"));
const PlacementPolicy = lazy(() => import("./pages/Placement/PlacementPolicy"));
const FAQ = lazy(() => import("./pages/Placement/FAQ"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const OurCommitment = lazy(() => import("./pages/OurCommitment"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  </div>
);

function App() {
  const [showBlockNotice, setShowBlockNotice] = useState(false);

  useEffect(() => {
    const shouldBlock = import.meta.env.VITE_DISABLE_DEVTOOLS === "true";
    if (!shouldBlock) return;

    let noticeTimeout;

    const blockAndNotify = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowBlockNotice(true);

      clearTimeout(noticeTimeout);
      noticeTimeout = setTimeout(() => setShowBlockNotice(false), 3000);

      return false;
    };

    const handleKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (key === "f12") return blockAndNotify(e);

      if (ctrl && shift && ["i", "j", "c"].includes(key)) {
        return blockAndNotify(e);
      }

      if (ctrl && key === "u") return blockAndNotify(e);

      if (ctrl && key === "s") return blockAndNotify(e);

      if (ctrl && key === "c") return blockAndNotify(e);

      if (ctrl && key === "a") return blockAndNotify(e);

      if (ctrl && key === "p") return blockAndNotify(e);
    };

    const disableSelection = () => {
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      document.body.style.mozUserSelect = "none";
      document.body.style.msUserSelect = "none";
    };

    const preventDragDrop = (e) => {
      e.preventDefault();
      return false;
    };

    let devtoolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff; font-family: system-ui; text-align: center; padding: 20px;">
              <div>
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">⚠️ Developer Tools Detected</h1>
                <p style="font-size: 1.2rem; opacity: 0.8;">Please close developer tools to continue browsing.</p>
              </div>
            </div>
          `;
        }
      }
    };

    const disableConsole = () => {
      const noop = () => { };
      const methods = ["log", "debug", "info", "warn", "error", "dir", "trace"];
      methods.forEach((method) => {
        console[method] = noop;
      });
    };

    const clearConsole = setInterval(() => {
      console.clear();
    }, 1000);

    disableSelection();
    disableConsole();

    document.addEventListener("contextmenu", blockAndNotify);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", blockAndNotify);
    document.addEventListener("cut", blockAndNotify);
    document.addEventListener("paste", blockAndNotify);
    document.addEventListener("selectstart", blockAndNotify);
    document.addEventListener("dragstart", preventDragDrop);
    document.addEventListener("drop", preventDragDrop);

    const devToolsInterval = setInterval(detectDevTools, 500);

    return () => {
      clearTimeout(noticeTimeout);
      clearInterval(clearConsole);
      clearInterval(devToolsInterval);
      document.removeEventListener("contextmenu", blockAndNotify);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", blockAndNotify);
      document.removeEventListener("cut", blockAndNotify);
      document.removeEventListener("paste", blockAndNotify);
      document.removeEventListener("selectstart", blockAndNotify);
      document.removeEventListener("dragstart", preventDragDrop);
      document.removeEventListener("drop", preventDragDrop);

      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.mozUserSelect = "";
      document.body.style.msUserSelect = "";
    };
  }, []);
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* ── Admin Routes ─────────────────────────────── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/hero" element={<ProtectedRoute><AdminLayout><AdminHeroSlides /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/blogs" element={<ProtectedRoute><AdminLayout><AdminBlogs /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/courses" element={<ProtectedRoute><AdminLayout><AdminCourses /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/gallery" element={<ProtectedRoute><AdminLayout><AdminGallery /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/recruiters" element={<ProtectedRoute><AdminLayout><AdminRecruiters /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/contacts" element={<ProtectedRoute><AdminLayout><AdminContacts /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />

              {/* ── Public Website Routes ─────────────────────── */}
              <Route path="/*" element={
                <div className="min-h-screen flex flex-col">
                  <TopHeader />
                  <Header />
                  <main className="grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/diagnostic" element={<Diagnostic />} />
                      <Route path="/overview" element={<Overview />} />
                      <Route path="/board-of-trustees" element={<BoardOfTrusties />} />
                      <Route path="/affiliations" element={<Affilations />} />
                      <Route path="/awards" element={<Awards />} />
                      <Route path="/progress" element={<ProgressHighlight />} />
                      <Route path="/journey" element={<Navigate to="/journey/president" replace />} />
                      <Route path="/journey/:slug" element={<Journey />} />
                      <Route path="/facilities" element={<Navigate to="/facilities/medical-facilities" replace />} />
                      <Route path="/facilities/:slug" element={<Facilities />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/infrastructure" element={<Infrastructure />} />
                      <Route path="/our-commitment" element={<OurCommitment />} />
                      <Route path="/blog/:id" element={<BlogDetails />} />
                      <Route path="/placement" element={<PlacementOverview />} />
                      <Route path="/life-at-bv" element={<Navigate to="/life-at-bv/brahmautsav" replace />} />
                      <Route path="/life-at-bv/:slug" element={<Events />} />
                      <Route path="/placement/overview" element={<PlacementOverview />} />
                      <Route path="/placement/placement-record" element={<PlacementRecord />} />
                      <Route path="/placement/our-recruiters" element={<OurRecruiters />} />
                      <Route path="/placement/placement-policy" element={<PlacementPolicy />} />
                      <Route path="/placement/faq" element={<FAQ />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>

      {import.meta.env.PROD &&
        import.meta.env.VITE_DISABLE_DEVTOOLS === "true" &&
        showBlockNotice && (
          <div className="fixed bottom-4 right-4 z-9999 bg-red-600 text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-2xl pointer-events-none select-none animate-pulse">
            🚫 Action Blocked - Content is protected
          </div>
        )}
    </>
  );
}

export default App;
