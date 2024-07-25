import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import OneInzeratById from "./pages/OneInzeratById/OneInzeratById";
import { useFetch } from "./utils/useFetch";
import PageByDruh from "./pages/PageByDruh/PageByDruh";
import LoadingError from "./components/LoadingError/LoadingError";

const App = () => {
  const { data, status } = useFetch<string[]>(
    "http://localhost:3000/api/druhy"
  );

  return (
    <Router>
      {data && status === "success" ? (
        <>
          <Navbar druhy={data} />
          <div className={style["main"]}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inzerat/:id" element={<OneInzeratById />} />
              <Route path={`inzeraty/:id`} element={<PageByDruh />} />
            </Routes>
          </div>
          {/* footer */}
        </>
      ) : (
        <LoadingError status={status} />
      )}
    </Router>
  );
};

export default App;
