import { Inzerat } from '../../assets/interfaces';
import OneInzerat from '../OneInzerat/OneInzerat';
import style from './InzeratyTable.module.css';

interface Props {
  inzeraty: Inzerat[];
}

const InzeratTable = ({ inzeraty }: Props) => {
  return (
    <div className={style['']}>
      {inzeraty.map((inzerat: Inzerat) => {
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
