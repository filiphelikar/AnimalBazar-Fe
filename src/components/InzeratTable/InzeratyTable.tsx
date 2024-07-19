import { Inzerat } from "../../assets/interfaces";
import OneInzerat from "../OneInzerat/OneInzerat";

const InzeratTable = (inzeraty: any) => {
  return (
    <div>
      {inzeraty.data.map((inzerat: any) => {
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
