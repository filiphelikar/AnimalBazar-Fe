import { useFetch } from '../../utils/useFetch';
import InzeratyTable from '../InzeratTable/InzeratyTable';
import { Inzerat } from '../../assets/interfaces';
import LoadingError from '../LoadingError/LoadingError';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import style from './SearchWithResult.module.css';

const SearchWithResult = () => {
  const { id } = useParams();

  let druh = '';
  let url = 'http://localhost:3000/api/inzeraty';
  if (id) {
    druh = `druh=${id}&`;
    url = `http://localhost:3000/api/inzeraty/${id}`;
  }

  const [submitInput, setSubmitInput] = useState<string>(url);
  const [message, setMessage] = useState<string | null>(null);

  const { data, status } = useFetch<Inzerat[]>(submitInput);

  if (id) {
    useEffect(() => {
      setSubmitInput(url);
    }, [id]);
  }

  useEffect(() => {
    if (data !== null && !data[0]) {
      setMessage('Žádné výsledky hledání :(');
      setSubmitInput(url);
    } else if (submitInput != url) {
      setMessage(null);
    }
  }, [data]);

  return (
    <>
      <SearchBar setState={setSubmitInput} url={`http://localhost:3000/api/search?${druh}param=`} />
      {data && status === 'success' ?
        <>
          <p className={style['error-message']}>{message}</p>
          <InzeratyTable inzeraty={data} />{' '}
        </>
      : <LoadingError status={status} />}
    </>
  );
};

export default SearchWithResult;
