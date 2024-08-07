import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/useFetch';
import { Inzerat } from '../../assets/interfaces';
import style from './DeleteInzerat.module.css';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import useDeleteRequest from '../../utils/useDelete';
import { useForm } from 'react-hook-form';

const DeleteInzerat = () => {
  const { id } = useParams();
  const { data } = useFetch<Inzerat>(`http://localhost:3000/api/inzerat/${id}`);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { status, data: dataDelete, deleteRequest } = useDeleteRequest();

  const form = useForm<{ heslo: string }>({
    defaultValues: {
      heslo: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: { heslo: string }) => {
    deleteRequest(`http://localhost:3000/api/inzerat/delete/?id=${id}&password=${data.heslo}`);
  };

  return (
    <div className={style['main']}>
      <h2>Smazat inzerat: {data?.nazev}</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <label className={style['label']} htmlFor='nadpis'>
          Zadejte heslo:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message-password']} style={{ color: 'red' }}>
          {errors.heslo?.message}
        </p>
        <br />
        <br />
        <div className={style['password-container']}>
          <button type='button' className={style['show-btn']} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ?
              <BiShow />
            : <BiHide />}
          </button>
          <input
            className={style['input']}
            id='heslo'
            type={showPassword ? 'text' : 'password'}
            placeholder='Aa'
            {...register('heslo', {
              required: {
                value: true,
                message: 'Vyplňte heslo',
              },
            })}
          />
        </div>
        <input type='submit' value='Smazat' />
      </form>
    </div>
  );
};

export default DeleteInzerat;
