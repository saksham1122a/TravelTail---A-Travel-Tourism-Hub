import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={
          <>
            <HeroSection />
            <About />
            <Contact />
            <Footer />
          </>
        } />
          <Route path="/about" element={<About showHero={true} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
