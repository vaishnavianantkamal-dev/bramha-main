import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SchoolBrand from "./components/common/Schoolbrand";
import TopHeader from "./components/common/TopHeader";
import Home from "./pages/Home/Home";
import Overview from "./pages/AboutUs/Overview";
import BoardOfTrusties from "./pages/AboutUs/BoardOfTrusties";
import Affilations from "./pages/AboutUs/Affilations";
import Awards from "./pages/AboutUs/Awards";
import ProgressHighlight from "./pages/AboutUs/ProgressHighlight";
import Journey from "./components/Journey";
import Facilities from "./components/Facilities";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import PlacementOverview from "./pages/Placement/Overview";
import PlacementRecord from "./pages/Placement/PlacementRecord";
import OurRecruiters from "./pages/Placement/OurRecruiters";
import PlacementPolicy from "./pages/Placement/PlacementPolicy";
import FAQ from "./pages/Placement/FAQ";
import Infrastructure from "./pages/Infrastructure";
import OurCommitment from "./pages/OurCommitment";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";

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
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <TopHeader />
          {/* <SchoolBrand /> */}
          <Header />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
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
