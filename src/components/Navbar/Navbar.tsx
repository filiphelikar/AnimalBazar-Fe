import { useEffect, useState } from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { PiCatDuotone } from 'react-icons/pi';
import ThemeButton from '../ThemeButton/ThemeButton';
import { FaBars } from 'react-icons/fa';

interface Props {
  druhy: string[];
  setTheme: (theme: boolean) => void;
  theme: boolean;
}

const Navbar: React.FC<Props> = ({ druhy, setTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={style['nav']}>
      <div className={style['nav-section-1']}>
        {windowWidth <= 550 && <ThemeButton setTheme={setTheme} theme={theme} />}
        <Link onClick={() => setMenuOpen(false)} className={style['logo']} to='/'>
          <PiCatDuotone />
        </Link>
        <div className={style['menu-icon']} onClick={toggleMenu}>
          <FaBars />
        </div>
        <div className={`${style['links-container']} ${menuOpen ? style['show'] : ''}`}>
          {menuOpen && windowWidth <= 550 && (
            <Link onClick={toggleMenu} to={'/vytvořit-inzerat'} className={style['link-container']}>
              <p>vytvořit inzerát</p>
            </Link>
          )}
          {druhy.map((druh: string) => (
            <Link onClick={toggleMenu} to={`/inzeraty/${druh}`} key={druh} className={style['link-container']}>
              <p>{druh}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={style['nav-section-2']}>
        <Link to={'/vytvořit-inzerat'} className={style['link-container']}>
          <p>vytvořit inzerát</p>
        </Link>
        <ThemeButton setTheme={setTheme} theme={theme} />
      </div>
    </nav>
  );
};

export default Navbar;
