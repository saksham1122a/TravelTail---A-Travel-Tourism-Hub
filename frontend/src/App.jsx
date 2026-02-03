import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={'/'} />
            <Route path="about" element={'/about'} />
            <Route path="contact" element={'/contact'} />
            <Route path="login" element={'/login'} />
            <Route path="signup" element={'/signup'} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
