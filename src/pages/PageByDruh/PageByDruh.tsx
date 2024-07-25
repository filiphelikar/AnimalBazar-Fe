import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";
import { Inzerat } from "../../assets/interfaces";
import LoadingError from "../../components/LoadingError/LoadingError";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const PageByDruh = () => {
  const { id } = useParams();

  const [submitInput, setSubmitInput] = useState<string>(
    `http://localhost:3000/api/inzeraty/${id}`
  );

  const { data, status } = useFetch<Inzerat[]>(submitInput);

  useEffect(() => {
    setSubmitInput(`http://localhost:3000/api/inzeraty/${id}`);
  }, [id]);

  return (
    <>
      <SearchBar
        setState={setSubmitInput}
        url="http://localhost:3000/api/search?param="
      />
      {data && status === "success" ? (
        <InzeratyTable inzeraty={data} />
      ) : (
        <LoadingError status={status} />
      )}
    </>
  );
};

export default PageByDruh;
