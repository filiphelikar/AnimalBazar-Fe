import { Inzerat } from "../../assets/interfaces";
import OneInzerat from "../OneInzerat/OneInzerat";

interface Data {
  data: Inzerat[];
}

const InzeratTable = (inzeraty: Data) => {
  return (
    <div>
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
