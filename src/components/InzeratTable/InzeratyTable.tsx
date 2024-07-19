import { Inzerat } from "../../assets/interfaces";
import OneInzerat from "../OneInzerat/OneInzerat";
import style from "./InzeratyTable.module.css";

interface Data {
  data: Inzerat[];
}

const InzeratTable = (inzeraty: Data) => {
  return (
    <div className={style[""]}>
      {inzeraty.data.map((inzerat: Inzerat) => {
        return (
          <div key={inzerat.id}>
            <OneInzerat {...inzerat} />
          </div>
        );
      })}
    </div>
  );
};

export default InzeratTable;
