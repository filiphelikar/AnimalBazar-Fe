import { Link } from "react-router-dom";
import style from "./CreateInzerat.module.css";

interface Props {
  druhy: string[];
}

const CreateInzerat = ({ druhy }: Props) => {
  return (
    <div className={style["main"]}>
      <h2>Vyberte Sekci:</h2>
      <div className={style["container"]}>
        {druhy.map((druh) => {
          return <Link to={`/vytvořit/${druh}`}>{druh}</Link>;
        })}
      </div>
    </div>
  );
};

export default CreateInzerat;
