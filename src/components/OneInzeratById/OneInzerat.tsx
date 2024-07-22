import { Inzerat } from "../../assets/interfaces";
import style from "./OneInzerat.module.css";

const OneInzerat = ({
  nazev,
  popis,
  cena,
  images,
  lokalita,
  psc,
  telefon,
  email,
  prodejce,
}: Inzerat) => {
  return (
    <div className={style["main"]}>
      <h2>{nazev}</h2>
      <img width="200px" src={images[0]} alt={nazev} />
      <p className={style["popis"]}>{popis}</p>
      <section className={style["bottom-section"]}>
        <div className={style["contact"]}>
          <p className={style["price"]}>
            Cena: <b>{cena == "Za odvoz" ? cena : cena + " Kč"}</b>
          </p>
          <span>Jméno: </span>
          <span>{prodejce}</span> <br />
          <span>Telefon: </span>
          <a href={`tel:${telefon}`}>{telefon}</a> <br />
          <span>Email: </span>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div className={style["location"]}>
          <span>{lokalita}</span> <br />
          <span>{psc}</span>
        </div>
      </section>
    </div>
  );
};

export default OneInzerat;
