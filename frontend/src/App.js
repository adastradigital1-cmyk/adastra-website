import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  
  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Temporarily disable smooth scrolling for immediate scroll
    const html = document.documentElement;
    const originalBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Re-enable smooth scrolling after a tick
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalBehavior;
    });
    
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
