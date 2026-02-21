import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SolutionsPage from "./pages/SolutionsPage";
import CareersPage from "./pages/CareersPage";
import BlogPage from "./pages/BlogPage";
import ImpactPage from "./pages/ImpactPage";
import FindTalentPage from "./pages/FindTalentPage";
import FindJobsPage from "./pages/FindJobsPage";
import IndustriesPage from "./pages/IndustriesPage";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ChatWidget } from "./components/ChatWidget";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Disable browser's scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  
  // Use layoutEffect for synchronous scroll before paint
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/find-jobs" element={<FindJobsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
        </Routes>
        <WhatsAppButton />
        <ChatWidget />
      </BrowserRouter>
    </div>
  );
}

export default App;
