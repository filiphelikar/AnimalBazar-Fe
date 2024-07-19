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
      <p>{lokalita}</p>
      <p>{psc}</p>
    </div>
  );
};

export default OneInzerat;
