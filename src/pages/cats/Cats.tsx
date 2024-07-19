import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";

export interface Inzerat {
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

const Cats = () => {
  const { data, status } = useFetch<Inzerat[]>(
    "http://localhost:3000/api/inzeraty/kocka"
  );

  return (
    <>
      {data && status === "success" ? (
        <InzeratyTable data={data} />
      ) : (
        <div>error {/*TODO error component*/}</div>
      )}
    </>
  );
};

export default Cats;
