import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { PiCatDuotone } from 'react-icons/pi';

interface Props {
  druhy: string[];
}

const Navbar = ({ druhy }: Props) => {
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
      </div>
    </nav>
  );
};

export default Navbar;
