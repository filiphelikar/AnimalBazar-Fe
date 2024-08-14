import React, { useEffect, useReducer } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './EditInzeratForm.module.css';
import { BiHide, BiShow } from 'react-icons/bi';
import usePutRequest from '../../utils/usePut';
import { useNavigate } from 'react-router-dom';
import { FormValues, Inzerat, Response } from '../../assets/interfaces';
import { ReactSortable } from 'react-sortablejs';
import FormInput from '../FormInput/FormInput';

type Props = Inzerat;

const initialState: State = {
  showPassword: false,
  showAdditionalField: false,
  files: [],
  showStatus: false,
};
interface State {
  showPassword: boolean;
  showAdditionalField: boolean;
  files: (string | File)[];
  showStatus: boolean;
}

interface NewDataFormat {
  nazev: string;
  popis: string;
  cena: string | 'Za odvoz';
  prodejce: string;
  telefon: string;
  lokalita: string;
  psc: string;
  email: string;
  heslo: string;
  _id: string;
}

type Action =
  | { type: 'TOGGLE_PASSWORD' }
  | { type: 'TOGGLE_ADDITIONAL_FIELD'; show: boolean }
  | { type: 'SET_FILES'; files: (string | File)[] }
  | { type: 'REMOVE_FILE'; index: number }
  | { type: 'TOGGLE_TRUE' }
  | { type: 'TOGGLE_FALSE' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'TOGGLE_ADDITIONAL_FIELD':
      return { ...state, showAdditionalField: action.show };
    case 'SET_FILES':
      return { ...state, files: action.files };
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter((_, i) => i !== action.index) };
    case 'TOGGLE_TRUE':
      return { ...state, showStatus: true };
    case 'TOGGLE_FALSE':
      return { ...state, showStatus: false };
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter((_, i) => i !== action.index) };
    default:
      return state;
  }
};

const EditInzeratForm = ({ _id, nazev, popis, cena, prodejce, telefon, lokalita, psc, email, images }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showPassword, showAdditionalField, files, showStatus } = state;
  const { data, status, putRequest } = usePutRequest<Response>('http://localhost:3000/api/edit/inzerat');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_FILES', files: [...images] });
    cena != 'Za odvoz' && dispatch({ type: 'TOGGLE_ADDITIONAL_FIELD', show: true });
  }, []);

  if (data) navigate(`/inzerat/${data._id}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nazev: nazev,
      popis: popis,
      cenaSelect: cena == 'Za odvoz' ? 'Za odvoz' : 'Číslo v Kč',
      cenaNum: cena !== 'Za odvoz' ? +cena : undefined,
      prodejce: prodejce,
      telefon: telefon,
      lokalita: lokalita,
      psc: psc.toString(),
      email: email,
      heslo: '',
    },
  });

  const selectChange = (e: { target: { value: string } }) => {
    dispatch({ type: 'TOGGLE_ADDITIONAL_FIELD', show: e.target.value === 'Číslo v Kč' });
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    let newDataFormat: Partial<FormValues> & NewDataFormat;
    const formData = new FormData();
    if (data.cenaSelect !== 'Vyberte') {
      data.cenaSelect === 'Číslo v Kč' ?
        (newDataFormat = {
          ...data,
          _id,
          cena: data.cenaNum.toString(),
        })
      : (newDataFormat = {
          ...data,
          _id,
          cena: data.cenaSelect,
        });
      delete newDataFormat.cenaNum;
      delete newDataFormat.cenaSelect;

      for (const key in newDataFormat) {
        if (newDataFormat.hasOwnProperty(key)) {
          if (key != 'images') formData.append(key, (newDataFormat as any)[key]);
        }
      }

      if (files.length > 0) {
        files.forEach((file) => {
          if ((file as File).size) {
            formData.append('images', file);
          }
        });
      }

      if (files.length > 0) {
        const imgOrders = files.map((img: any) => {
          return {
            name: img.size ? img.name : img,
            type: img.size ? 'new' : 'old',
          };
        });
        formData.append('order', JSON.stringify(imgOrders));
      }

      putRequest(formData);
    }
  };

  useEffect(() => {
    if (status === 'špatné heslo' && !errors.heslo?.message) {
      dispatch({ type: 'TOGGLE_TRUE' });
      const timer = setTimeout(() => {
        dispatch({ type: 'TOGGLE_FALSE' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      dispatch({ type: 'SET_FILES', files: [...files, ...selectedFiles] });
      event.target.value = '';
    }
  };

  return (
    <form className={style['main']} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={style['form-1']}>
        <FormInput
          label='Nadpis:'
          id='nazev'
          register={register}
          errors={errors.nazev}
          validation={{
            required: 'Nadpis je povinný',
            maxLength: { value: 60, message: 'maximální povolená delka Nadpisu je 60 znaků' },
          }}
        />
        <FormInput
          label='Popis:'
          id='popis'
          register={register}
          errors={errors.popis}
          validation={{
            required: 'Popis je povinný',
            maxLength: { value: 600, message: 'maximální povolená delka Popisu je 600 znaků' },
          }}
          type='textarea'
          longestMessage='maximální povolená delka Popisu je 600 znaků'
        />
        <label className={style['label']} htmlFor='images'>
          Fotky:<span style={{ color: 'red' }}>*</span>
        </label>
        <div className={style['container']}>
          <div className={style['error-message']}>
            <p>{errors.images?.message}</p>
          </div>
          <div className={style['place-holder']}>
            <p>Vyberte možnost</p>
          </div>
        </div>
        <label className={style['button-file']} htmlFor='images'>
          Nahrajte fotky
        </label>
        <input
          type='file'
          id='images'
          accept='image/jpg, image/jpeg, image/png, image/heic, image/webp,'
          multiple
          style={{ display: 'none' }}
          {...register('images', {
            onChange: handleFileSelect,
            validate: () => files.length <= 8 || 'maximum fotek je 8',
            required: {
              value: files.length < 1,
              message: 'fotky jsou povinné',
            },
          })}
        />
        {files.length > 0 && (
          <ReactSortable
            list={files as any}
            setList={(array) => {
              const newArray = array.map((img) => {
                if (img.size) return img;
                return img.toString();
              });
              dispatch({ type: 'SET_FILES', files: newArray as any });
            }}
            className={style['preview-container']}>
            {files.map((file, index) => (
              <div key={index} className={style['preview']}>
                {typeof file == 'string' ?
                  <img src={file} className={style['preview-image']} />
                : <img src={URL.createObjectURL(file)} alt={file.name} className={style['preview-image']} />}
                <button
                  type='button'
                  className={style.removeBtn}
                  onClick={() => dispatch({ type: 'REMOVE_FILE', index })}>
                  X
                </button>
                <p>{index + 1}</p>
              </div>
            ))}
          </ReactSortable>
        )}
        <br />
        <label className={style['label']} htmlFor='cenaSelect'>
          Cena:<span style={{ color: 'red' }}>*</span>
        </label>
        {!showAdditionalField && (
          <div className={style['container']}>
            <div className={style['error-message']}>
              <p>{errors.cenaSelect?.message}</p>
            </div>
            <div className={style['place-holder']}>
              <p>Vyberte možnost</p>
            </div>
          </div>
        )}
        <select
          className={style['select']}
          id='cenaSelect'
          {...register('cenaSelect', {
            validate: (value) => value !== 'Vyberte' || 'Vyberte možnost',
          })}
          onChange={selectChange}>
          <option value='Vyberte'>Vyberte...</option>
          <option value='Za odvoz'>Za odvoz</option>
          <option value='Číslo v Kč'>Číslo v Kč:</option>
        </select>
        {showAdditionalField && (
          <>
            <div className={style['container']}>
              <div className={style['error-message']}>
                <p>{errors.cenaNum?.message}</p>
              </div>
              <div className={style['place-holder']}>
                <p>Vyberte možnost</p>
              </div>
            </div>
            <input
              className={style['input']}
              id='cenaNum'
              type='number'
              {...register('cenaNum', {
                required: {
                  value: true,
                  message: 'Cena je povinná',
                },
                maxLength: {
                  value: 8,
                  message: 'maximální povolená delka Ceny je 8 číslic',
                },
              })}
            />
          </>
        )}
      </div>
      <h2>Osobní údaje:</h2>
      <div className={style['form-2']}>
        <FormInput
          label='Jmeno:'
          id='prodejce'
          register={register}
          errors={errors.prodejce}
          validation={{
            required: 'Jméno je povinné',
            maxLength: { value: 30, message: 'maximální povolená delka jména je 30 znaků' },
          }}
          longestMessage='maximální povolená delka jména prodejce je 30 znaků'
        />
        <FormInput
          label='Telefon:'
          id='telefon'
          register={register}
          errors={errors.telefon}
          validation={{
            required: 'Telefon je povinný',
            minLength: { value: 9, message: 'Telefoní číslo musí obsahovat alespoň 9 čísel' },
            maxLength: { value: 16, message: 'maximální povolená delka telefoního čísla je 16 znaků' },
            pattern: { value: /^[0-9+\s()-]+$/, message: 'neplatný formát telefoního čísla' },
          }}
          longestMessage='maximální povolená delka telefoního čísla je 15 znaků'
        />
        <FormInput
          label='Lokalita:'
          id='lokalita'
          register={register}
          errors={errors.lokalita}
          validation={{
            required: 'Lokalita je povinná',
            maxLength: { value: 40, message: 'maximální povolená delka lokality je 40 znaků' },
          }}
          longestMessage='maximální povolená delka lokality je 60 znaků'
        />
        <FormInput
          label='PSČ:'
          id='psc'
          register={register}
          errors={errors.psc}
          validation={{
            required: 'PSČ je povinné',
            minLength: { value: 5, message: 'PSČ musí obsahovat alespoň 5 čísel' },
            maxLength: { value: 6, message: 'maximální povolená delka PSČ je 6 znaků' },
            pattern: { value: /^[0-9]+$/, message: 'neplatný formát PSČ' },
          }}
          longestMessage='maximální povolená delka PSČ je 6 znaků'
        />
        <FormInput
          label='E-mail:'
          id='email'
          register={register}
          errors={errors.email}
          validation={{
            required: 'E-mail je povinný',
            maxLength: { value: 50, message: 'maximální povolená delka e-mailu je 50 znaků' },
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'neplatný formát e-mailu' },
          }}
          longestMessage='maximální povolená delka e-mailu je 50 znaků'
        />
        <label className={style['label']} htmlFor='heslo'>
          Heslo:<span style={{ color: 'red' }}>*</span>
        </label>
        <div className={style['container']}>
          <div className={style['error-message']}>
            <p>{showStatus ? status : errors.heslo?.message}</p>
          </div>
          <div className={style['place-holder']}>
            <p>Heslo musí obsahovat alespoň jedno velké a malé písmeno a jedno číslo</p>
          </div>
        </div>
        <div className={style['password-container']}>
          <button type='button' className={style['show-btn']} onClick={() => dispatch({ type: 'TOGGLE_PASSWORD' })}>
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
              required: 'Heslo je povinné',
              minLength: { value: 8, message: 'heslo musí obsahovat alespoň 8 znaků' },
              maxLength: { value: 50, message: 'maximální povolená delka hesla je 50 znaků' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Heslo musí obsahovat alespoň jedno velké a malé písmeno a jedno číslo',
              },
            })}
          />
        </div>
      </div>
      <input className={style['button']} type='submit' />
    </form>
  );
};

export default EditInzeratForm;
