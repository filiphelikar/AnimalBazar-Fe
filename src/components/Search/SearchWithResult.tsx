import { useFetch } from '../../utils/useFetch';
import InzeratyTable from '../InzeratTable/InzeratyTable';
import { Inzerat } from '../../assets/interfaces';
import LoadingError from '../LoadingError/LoadingError';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';

const PageByDruh = () => {
  const { id } = useParams();

  let druh = '';
  let url = 'http://localhost:3000/api/inzeraty';
  if (id) {
    druh = `druh=${id}&`;
    url = `http://localhost:3000/api/inzeraty/${id}`;
  }

  const [submitInput, setSubmitInput] = useState<string>(url);

  const { data, status } = useFetch<Inzerat[]>(submitInput);

  if (id) {
    useEffect(() => {
      setSubmitInput(url);
    }, [id]);
  }

  return (
    <>
      <SearchBar setState={setSubmitInput} url={`http://localhost:3000/api/search?${druh}param=`} />
      {data && status === 'success' ?
        <InzeratyTable inzeraty={data} />
      : <LoadingError status={status} />}
    </>
  );
};

export default PageByDruh;
