import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cats from "./pages/cats/Cats";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>uvod</div>} />
        <Route path="/kocky" element={<Cats />} />
        <Route path="/pes" element={<div>pes</div>} />
      </Routes>
      {/* footer */}
    </Router>
  );
};

export default App;
