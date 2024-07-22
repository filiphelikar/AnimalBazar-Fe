import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cats from "./pages/cats/Cats";
import Dogs from "./pages/dogs/Dogs";
import Home from "./pages/home/Home";
import OneInzeratById from "./pages/OneInzeratById/OneInzeratById";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className={style["main"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<OneInzeratById />} />
          <Route path="/kocky" element={<Cats />} />
          <Route path="/kocky/:id" element={<OneInzeratById />} />
          <Route path="/pes" element={<Dogs />} />
          <Route path="/pes/:id" element={<OneInzeratById />} />
        </Routes>
      </div>
      {/* footer */}
    </Router>
  );
};

export default App;
