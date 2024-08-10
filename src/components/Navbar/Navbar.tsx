import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { PiCatDuotone } from 'react-icons/pi';
import ThemeButton from '../ThemeButton/ThemeButton';
import { SetStateAction } from 'react';

interface Props {
  druhy: string[];
  setTheme: (theme: boolean) => void;
  theme: boolean;
}

const Navbar: React.FC<Props> = ({ druhy, setTheme, theme }) => {
  return (
    <nav className={style['nav']}>
      <div className={style['nav-section-1']}>
        <Link className={style['logo']} to='/'>
          <PiCatDuotone />
        </Link>
        {druhy.map((druh: string) => {
          return (
            <Link to={`/inzeraty/${druh}`} key={druh} className={style['link-container']}>
              <p>{druh}</p>
            </Link>
          );
        })}
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
