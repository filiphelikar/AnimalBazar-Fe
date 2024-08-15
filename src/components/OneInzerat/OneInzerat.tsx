import { Link } from 'react-router-dom';
import { Inzerat } from '../../assets/interfaces';
import style from './OneInzerat.module.css';
import { useEffect, useState } from 'react';

const OneInzerat = ({ nazev, popis, cena, images, lokalita, psc, _id }: Inzerat) => {
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

  const popisLength = windowWidth <= 595 ? 120 : 220;

  return (
    <Link to={`/inzerat/${_id}`} className={style['link']}>
      <div className={style['main']}>
        {windowWidth > 595 && <h2>{nazev}</h2>}
        <img width='200px' src={images[0]} alt={nazev} />
        {windowWidth <= 595 && <h2>{nazev}</h2>}
        <p className={style['popis']}>{`${popis.slice(0, popisLength)}${popis.length >= popisLength ? '...' : ''}`}</p>

        <div className={style['location']}>
          <span>{lokalita}</span> <br />
          <span>{psc}</span>
        </div>
        <p className={style['price']}>
          <b>{cena == 'Za odvoz' ? cena : cena + ' Kč'}</b>
        </p>
      </div>
    </Link>
  );
};

export default OneInzerat;
