import { Inzerat } from "../../assets/interfaces";
import style from "./OneInzerat.module.css";

const OneInzerat = ({
  id,
  nazev,
  prodejce,
  telefon,
  email,
  popis,
  cena,
  druh,
  images,
}: Inzerat) => {
  return (
    <div className={style["main"]}>
      <h2>{nazev}</h2>
      <img width="200px" src={images[0]} alt={nazev} />
      <p>{popis}</p>
      <p className={style["price"]}>
        <b>{cena} Kč</b>
      </p>
    </div>
  );
};

export default OneInzerat;
