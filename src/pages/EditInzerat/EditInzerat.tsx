import { useParams } from 'react-router-dom';
import EditInzeratForm from '../../components/EditInzeratForm/EditInzeratForm';
import style from './EditInzerat.module.css';
import { useFetch } from '../../utils/useFetch';
import { Inzerat } from '../../assets/interfaces';
import LoadingError from '../../components/LoadingError/LoadingError';

const EditInzerat = () => {
  const { id } = useParams();
  const { data, status } = useFetch<Inzerat>(`http://localhost:3000/api/inzerat/${id}`);

  return (
    <div className={style['main']}>
      <h2>Upravte Inzerat {data?.nazev}:</h2>

      {data ?
        <EditInzeratForm {...data} />
      : <LoadingError status={status} />}
    </div>
  );
};

export default EditInzerat;
