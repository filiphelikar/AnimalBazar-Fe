import style from './App.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import OneInzeratById from './pages/OneInzeratById/OneInzeratById';
import { useFetch } from './utils/useFetch';
import PageByDruh from './pages/PageByDruh/PageByDruh';
import LoadingError from './components/LoadingError/LoadingError';
import CreateInzerat from './pages/CreateInzerat/CreateInzerat';
import CreateInzeratByDruh from './pages/CreateInzeratByDruh/CreateInzeratByDruh';
import EditDeleteInzerat from './pages/EditDeleteInzerat/EditDeleteInzerat';
import DeleteInzerat from './pages/DeleteInzerat/DeleteInzerat';
import EditInzerat from './pages/EditInzerat/EditInzerat';
import { useState } from 'react';

const App = () => {
  const { data, status } = useFetch<string[]>('http://localhost:3000/api/druhy');
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <Router>
      {data && status === 'success' ?
        <div className={style[theme ? 'light' : 'dark']}>
          <Navbar druhy={data} setTheme={setTheme} theme={theme} />
          <div className={style['main']}>
            <div className={style['layout']}>
              <Routes>
                <Route path='/' element={<Home druhy={data} />} />
                <Route path='/inzerat/:id' element={<OneInzeratById />} />
                <Route path={'inzeraty/:id'} element={<PageByDruh />} />
                <Route path={'/vytvořit-inzerat'} element={<CreateInzerat druhy={data} />} />
                <Route path={'/vytvořit/:id'} element={<CreateInzeratByDruh />} />
                <Route path={'/smazat-upravit/:id'} element={<EditDeleteInzerat />} />
                <Route path={'/smazat/:id'} element={<DeleteInzerat />} />
                <Route path={'/upravit/:id'} element={<EditInzerat />} />
              </Routes>
            </div>
          </div>
          {/* footer */}
        </div>
      : <LoadingError status={status} />}
    </Router>
  );
};

export default App;
