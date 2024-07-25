import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";
import { Inzerat } from "../../assets/interfaces";
import LoadingError from "../../components/LoadingError/LoadingError";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PageByDruh = () => {
  const { id } = useParams();

  const [input, setInput] = useState<string | null>(null);
  const [submitInput, setSubmitInput] = useState<string>(
    `http://localhost:3000/api/inzeraty/${id}`
  );

  const { data, status } = useFetch<Inzerat[]>(submitInput);

  useEffect(() => {
    setSubmitInput(`http://localhost:3000/api/inzeraty/${id}`);
  }, [id]);

  return (
    <>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() =>
          setSubmitInput(`http://localhost:3000/api/search?param=${input}`)
        }
      >
        odeslat
      </button>

      {data && status === "success" ? (
        <InzeratyTable inzeraty={data} />
      ) : (
        <LoadingError status={status} />
      )}
    </>
  );
};

export default PageByDruh;
