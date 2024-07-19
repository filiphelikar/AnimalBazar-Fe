import { Inzerat } from "../../pages/dogs/Dogs";

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
    <div>
      <h2>{nazev}</h2>
      <img src={images[0]} alt={nazev} />
      <p>{cena}</p>
    </div>
  );
};

export default OneInzerat;
