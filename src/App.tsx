import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      {/* nav */}
      <Routes>
        <Route path="/" element={<div>uvod</div>} />
        <Route path="/kocky" element={<div>kocky</div>} />
        <Route path="/pes" element={<div>pes</div>} />
      </Routes>
      {/* footer */}
    </Router>
  );
};

export default App;
