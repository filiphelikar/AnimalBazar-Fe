import style from './OneInzerat.module.css';
import { Inzerat } from '../../assets/interfaces';
import Pictures from './Pictures';
import { Link } from 'react-router-dom';
const OneInzerat = ({ nazev, popis, cena, images, lokalita, psc, telefon, email, prodejce, _id }: Inzerat) => {
  return (
    <div className={style['main']}>
      <h2>{nazev}</h2>
      <Link className={style['link']} to={`/upravit/${_id}`}>
        Smazat/Upravit
      </Link>
      <Pictures images={images} nazev={nazev} />
      <p className={style['popis']}>{popis}</p>
      <section className={style['bottom-section']}>
        <div className={style['contact']}>
          <p className={style['price']}>
            Cena: <b>{cena == 'Za odvoz' ? cena : cena + ' Kč'}</b>
          </p>
          <span>Jméno: </span>
          <span>{prodejce}</span> <br />
          <span>Telefon: </span>
          <a href={`tel:${telefon}`}>{telefon}</a> <br />
          <span>Email: </span>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div className={style['location']}>
          <span>{lokalita}</span> <br />
          <span>{psc}</span>
        </div>
      </section>
    </div>
  );
};

export default OneInzerat;
