import { useFetch } from "../../utils/useFetch";
import InzeratyTable from "../../components/InzeratTable/InzeratyTable";
import { Inzerat } from "../../assets/interfaces";
import LoadingError from "../../components/LoadingError/LoadingError";
import style from "./Home.module.css";
import { Link } from "react-router-dom";

interface Props {
  druhy: string[];
}

const Home = ({ druhy }: Props) => {
  const { data, status } = useFetch<Inzerat[]>(
    "http://localhost:3000/api/inzeraty"
  );

  return (
    <>
      <div className={style["container"]}>
        {druhy.map((druh) => {
          return (
            <Link to={`/inzeraty/${druh}`}>
              <p>{druh}</p>
            </Link>
          );
        })}
      </div>
      {data && status === "success" ? (
        <InzeratyTable inzeraty={data} />
      ) : (
        <LoadingError status={status} />
      )}
    </>
  );
};

export default Home;
