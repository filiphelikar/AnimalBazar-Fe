import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";
import { Inzerat } from "../../assets/interfaces";
import LoadingError from "../../components/LoadingError/LoadingError";

const Dogs = () => {
  const { data, status } = useFetch<Inzerat[]>(
    "http://localhost:3000/api/inzeraty/pes"
  );

  return (
    <>
      {data && status === "success" ? (
        <InzeratyTable inzeraty={data} />
      ) : (
        <LoadingError status={status} />
      )}
    </>
  );
};

export default Dogs;
