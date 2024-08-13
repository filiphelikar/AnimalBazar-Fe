import { Inzerat } from '../../assets/interfaces';
import OneInzerat from '../OneInzerat/OneInzerat';

interface Props {
  inzeraty: Inzerat[];
}

const InzeratTable = ({ inzeraty }: Props) => {
  return (
    <>
      {inzeraty.map((inzerat: Inzerat) => {
        return (
          <div key={inzerat._id}>
            <OneInzerat {...inzerat} />
          </div>
        );
      })}
    </>
  );
};

export default InzeratTable;
