import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";
import { Inzerat } from "../../assets/interfaces";

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
