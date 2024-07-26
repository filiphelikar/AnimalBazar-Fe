import { useParams } from "react-router-dom";
import style from "./CreateInzeratByDruh.module.css";
import CreateInzeratForm from "../../components/CreateInInzeratForm/CreateInzeratForm";

const CreateInzeratByDruh = () => {
  const { id } = useParams();

  return (
    <div className={style["main"]}>
      {/* TODO handlovat tvary id a možná select pro změnu druhu*/}
      <h2>Vyplňte udaje pro {id}:</h2>
      <CreateInzeratForm id={id} />
    </div>
  );
};

export default CreateInzeratByDruh;
