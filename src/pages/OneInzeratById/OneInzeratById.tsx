import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/useFetch';
import { Inzerat } from '../../assets/interfaces';
import OneInzerat from '../../components/OneInzeratById/OneInzerat';
import LoadingError from '../../components/LoadingError/LoadingError';

const OneInzeratById = () => {
  const { id } = useParams();

  const { data, status } = useFetch<Inzerat>(`http://localhost:3000/api/inzerat/${id}`);

  return (
    <>
      {data && status === 'success' ?
        <OneInzerat {...data} />
      : <LoadingError status={status} />}
    </>
  );
};

export default OneInzeratById;
