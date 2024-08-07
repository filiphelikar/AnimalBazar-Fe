import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './EditInzeratForm.module.css';
import { BiHide, BiShow } from 'react-icons/bi';
import usePostRequest from '../../utils/usePost';
import { useNavigate } from 'react-router-dom';
import { Inzerat, Response } from '../../assets/interfaces';
import { ReactSortable } from 'react-sortablejs';

type FormValues = {
  nazev: string;
  popis: string;
  cenaSelect: 'Za odvoz' | 'Vyberte' | 'Číslo v Kč';
  cenaNum: number;
  prodejce: string;
  telefon: string;
  lokalita: string;
  psc: string;
  email: string;
  heslo: string;
  images: FileList;
};

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
  druh: string | undefined;
}

type Props = Inzerat;

const EditInzeratForm = ({ _id, nazev, popis, cena, prodejce, telefon, lokalita, psc, email, images }: Props) => {
  console.log(images);

  const druh = _id;
  const [showAdditionalField, setShowAdditionalField] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([...images]);
  const { data, status, postRequest } = usePostRequest<Response>('http://localhost:3000/api/create/inzerat');
  const navigate = useNavigate();

  if (data) navigate(`/inzerat/${data.id}`);
  const form = useForm<FormValues>({
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

  useEffect(() => {
    if (cena !== 'Za odvoz') {
      setShowAdditionalField(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const selectChange = (e: { target: { value: string } }) => {
    if (e.target.value === 'Číslo v Kč') {
      setShowAdditionalField(true);
    } else {
      setShowAdditionalField(false);
    }
  };
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    let newDataFormat: Partial<FormValues> & NewDataFormat;
    const formData = new FormData();
    if (data.cenaSelect !== 'Vyberte') {
      data.cenaSelect === 'Číslo v Kč' ?
        (newDataFormat = {
          ...data,
          druh,
          cena: data.cenaNum.toString(),
        })
      : (newDataFormat = {
          ...data,
          druh,
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
          formData.append('images', file);
        });
      }

      if (files.length > 0) {
        const imgOrders = files.map((img) => {
          return typeof img == 'string' ? img : img.name;
        });
        formData.append('order', JSON.stringify(imgOrders));
      }

      postRequest(formData);
    }
  };

  const handleFileSelect = (event: any) => {
    const selectedFiles: File[] = Array.from(event.target.files);
    const updatedFiles: (File | string)[] = [...files, ...selectedFiles];
    console.log('stalo se 1');
    setFiles(updatedFiles);
    event.target.value = '';
  };

  const removePreview = (index: number) => {
    console.log('stalo se 2');
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <form className={style['main']} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={style['form-1']}>
        <label className={style['label']} htmlFor='nadpis'>
          Nadpis:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.nazev?.message}
        </p>
        <br />
        <input
          className={style['input']}
          id='nadpis'
          type='text'
          placeholder='Aa'
          {...register('nazev', {
            required: {
              value: true,
              message: 'Nadpis je povinný',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='popis'>
          Popis:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.popis?.message}
        </p>
        <br />
        <textarea
          className={style['textarea']}
          id='popis'
          placeholder='Aa'
          {...register('popis', {
            required: {
              value: true,
              message: 'Popis je povinný',
            },
          })}
        />
        <br />

        <label className={style['label']} htmlFor='images'>
          Fotky:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.images?.message}
        </p>
        <br />
        <input
          type='file'
          id='images'
          accept='image/jpg, image/jpeg, image/png, image/heic,'
          multiple
          className={style['input']}
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
              setFiles(newArray);
            }}
            className={style['preview-container']}>
            {files.map((file, index) => (
              <div key={index} className={style['preview']}>
                {typeof file == 'string' ?
                  <img src={file} className={style['preview-image']} />
                : <img src={URL.createObjectURL(file)} alt={file.name} className={style['preview-image']} />}
                <button type='button' className={style.removeBtn} onClick={() => removePreview(index)}>
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
          <p className={style['error-message']} style={{ color: 'red' }}>
            {errors.cenaSelect?.message}
          </p>
        )}
        {!showAdditionalField && (
          <>
            <br />
          </>
        )}
        <select
          id='cenaSelect'
          {...register('cenaSelect', {
            validate: (value) => value !== 'Vyberte' || 'Vyberte možnost',
          })}
          onChange={selectChange}>
          <option value='Vyberte'>Vyberte...</option>
          <option value='Za odvoz'>Za odvoz</option>
          <option value='Číslo v Kč'>Číslo v Kč:</option>
        </select>
        <br />

        {showAdditionalField && (
          <>
            <p className={style['error-message']} style={{ color: 'red' }}>
              {errors.cenaNum?.message}
            </p>
            <br />
            <input
              className={style['input']}
              id='cenaNum'
              type='number'
              {...register('cenaNum', {
                required: {
                  value: true,
                  message: 'Cena je povinná',
                },
              })}
            />
          </>
        )}
      </div>
      <h2>Osobní údaje:</h2>
      <div className={style['form-2']}>
        <label className={style['label']} htmlFor='prodejce'>
          Jméno:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.prodejce?.message}
        </p>
        <br />
        <input
          className={style['input']}
          id='prodejce'
          type='text'
          placeholder='Aa'
          {...register('prodejce', {
            required: {
              value: true,
              message: 'Jméno je povinné',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='telefon'>
          Telefon:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.telefon?.message}
        </p>
        <br />
        <input
          className={style['input']}
          id='telefon'
          type='tel'
          placeholder='Aa'
          {...register('telefon', {
            required: {
              value: true,
              message: 'Telefon je povinný',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='lokalita'>
          Lokalita:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.lokalita?.message}
        </p>
        <br />
        <input
          className={style['input']}
          id='lokalita'
          type='text'
          placeholder='Aa'
          {...register('lokalita', {
            required: {
              value: true,
              message: 'Lokalita je povinná',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='psc'>
          Psč:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.psc?.message}
        </p>
        <br />
        <input
          className={style['input']}
          id='psc'
          type='text'
          placeholder='Aa'
          {...register('psc', {
            required: {
              value: true,
              message: 'Psč je povinné',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='email'>
          E-mail:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message']} style={{ color: 'red' }}>
          {errors.email?.message}
        </p>
        <br />
        <input
          className={style['input']}
          id='email'
          type='email'
          placeholder='Aa'
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
              message: 'Špatný formát E-mailu',
            },
            required: {
              value: true,
              message: 'E-mail je povinný',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='heslo'>
          Heslo:<span style={{ color: 'red' }}>*</span>
        </label>
        <p className={style['error-message-password']} style={{ color: 'red' }}>
          {errors.heslo?.message}
        </p>
        <br />
        {errors.heslo?.message ===
          'Heslo musí obsahovat alespoň jedno malé písmeno, jedno velké písmeno, jedno číslo, jeden speciální znak a musí mít minimálně 8 znaků' && (
          <br />
        )}
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
                message: 'Heslo je povinné',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Heslo musí obsahovat alespoň jedno malé písmeno, jedno velké písmeno, jedno číslo, jeden speciální znak a musí mít minimálně 8 znaků',
              },
            })}
          />
        </div>
      </div>
      <input type='submit' />
      {status === 'error' ?
        <p>error</p>
      : ''}
    </form>
  );
};

export default EditInzeratForm;
