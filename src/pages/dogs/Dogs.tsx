import { useFetch } from "../../utils/useFetch";

interface Inzerat {
  id: number;
  nazev: string;
  prodejce: string;
  telefon: string;
  email: string;
  popis: string;
  cena: number | string;
  druh: string;
  images: string[];
}

const Dogs = () => {
  const { data, status } = useFetch<Inzerat[]>(
    "http://localhost:3000/api/inzeraty"
  );

  if (data && status === "success") {
    console.log(data[0]);
  }

  return <div>Pes</div>;
};

export default Dogs;
