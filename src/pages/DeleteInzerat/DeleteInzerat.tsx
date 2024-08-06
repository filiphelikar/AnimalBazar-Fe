import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/useFetch';
import { Inzerat } from '../../assets/interfaces';
import style from './DeleteInzerat.module.css';
import { FormEvent, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import useDeleteRequest from '../../utils/useDelete';

const DeleteInzerat = () => {
  const { id } = useParams();
  const { data } = useFetch<Inzerat>(`http://localhost:3000/api/inzerat/${id}`);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { status, data: dataDelete, deleteRequest } = useDeleteRequest();
  const [password, setPassword] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteRequest(`http://localhost:3000/api/inzerat/delete/?id=${id}&password=${password}`);
  };

  return (
    <div className={style['main']}>
      <h2>Smazat inzerat: {data?.nazev}</h2>
      <form noValidate onSubmit={(e) => onSubmit(e)}>
        <div className={style['password-container']}>
          <button type='button' className={style['show-btn']} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ?
              <BiShow />
            : <BiHide />}
          </button>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className={style['input']}
            id='heslo'
            type={showPassword ? 'text' : 'password'}
            placeholder='Aa'
          />
        </div>
        <input type='submit' />
      </form>
    </div>
  );
};

export default DeleteInzerat;
