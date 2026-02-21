import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
