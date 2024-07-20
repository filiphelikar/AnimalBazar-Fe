import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";
import { Inzerat } from "../../assets/interfaces";

const Dogs = () => {
  const { data, status } = useFetch<Inzerat[]>(
    "http://localhost:3000/api/inzeraty/pes"
  );

  return (
    <>
      {data && status === "success" ? (
        <InzeratyTable inzeraty={data} />
      ) : (
        <div>error {/*TODO error component*/}</div>
      )}
    </>
  );
};

export default Dogs;
