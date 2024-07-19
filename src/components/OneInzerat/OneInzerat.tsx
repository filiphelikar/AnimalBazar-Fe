import { Inzerat } from "../../assets/interfaces";
import style from "./OneInzerat.module.css";

const OneInzerat = ({ nazev, popis, cena, images, lokalita, psc }: Inzerat) => {
  return (
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
  );
};

export default OneInzerat;
