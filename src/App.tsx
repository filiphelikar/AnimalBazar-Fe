import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cats from "./pages/cats/Cats";
import Dogs from "./pages/dogs/Dogs";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className={style["main"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kocky" element={<Cats />} />
          <Route path="/pes" element={<Dogs />} />
        </Routes>
      </div>
      {/* footer */}
    </Router>
  );
};

export default App;
