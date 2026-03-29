import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Preloader from "./components/animation";
import HeroSection from "./components/HeroSection";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Destinations from "./components/Destinations";
import Packages from "./components/Packages";
import AdminDashboard from "../admin/AdminDashboard";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import PageWrapper from "./components/PageWrapper";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <HeroSection />
            <About />
            <Contact />
            <Footer />
          </PageWrapper>
        } />
        <Route path="/about" element={<PageWrapper><About showHero={true} /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/destinations" element={<PageWrapper><Destinations /></PageWrapper>} />
        <Route path="/packages" element={<PageWrapper><Packages /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="app-wrapper">
          <Preloader />
          <Navbar />
          <AnimatedRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

