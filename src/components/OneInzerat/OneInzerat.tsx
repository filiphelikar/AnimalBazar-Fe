import { Link } from "react-router-dom";
import { Inzerat } from "../../assets/interfaces";
import style from "./OneInzerat.module.css";

const OneInzerat = ({
  nazev,
  popis,
  cena,
  images,
  lokalita,
  psc,
  id,
}: Inzerat) => {
  return (
    <Link to={`/inzerat/${id}`} className={style["link"]}>
      <div className={style["main"]}>
        <h2>{nazev}</h2>
        <img width="200px" src={images[0]} alt={nazev} />
        <p>{popis}</p>
        <p className={style["price"]}>
          <b>{cena == "Za odvoz" ? cena : cena + " Kč"}</b>
        </p>
        <div className={style["location"]}>
          <span>{lokalita}</span> <br />
          <span>{psc}</span>
        </div>
      </div>
    </Link>
  );
};

export default OneInzerat;
