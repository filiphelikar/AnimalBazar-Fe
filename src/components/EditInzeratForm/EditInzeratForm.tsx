import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './EditInzeratForm.module.css';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Inzerat } from '../../assets/interfaces';
import { ReactSortable } from 'react-sortablejs';
import usePut from '../../utils/usePut';

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
  _id: string;
}

type Props = Inzerat;

const EditInzeratForm = ({ _id, nazev, popis, cena, prodejce, telefon, lokalita, psc, email, images }: Props) => {
  const [showStatus, setShowStatus] = useState(false);
  const [showAdditionalField, setShowAdditionalField] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [files, setFiles] = useState<(string | File)[]>([...images]);
  const { data, status, putRequest } = usePut<Inzerat>('http://localhost:3000/api/edit/inzerat');
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (data) navigate(`/inzerat/${data._id}`);
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

  useEffect(() => {
    if (status === 'špatné heslo' && !errors.heslo?.message) {
      setShowStatus(true);
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

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
            maxLength: {
              value: 60,
              message: 'maximální povolená delka Nadpisu je 60 znaků',
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
            maxLength: {
              value: 600,
              message: 'maximální povolená delka Popisu je 600 znaků',
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
        <label className={style['button-file']} htmlFor='images'>
          Nahrajte fotky
        </label>
        <input
          type='file'
          id='images'
          accept='image/jpg, image/jpeg, image/png, image/heic, image/webp,'
          multiple
          className={style['input']}
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
              setFiles(newArray as (string | File)[]);
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
                maxLength: {
                  value: 7,
                  message: 'maximální povolená delka Ceny je 7 číslic',
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
            maxLength: {
              value: 30,
              message: 'maximální povolená delka Jména je 30 znaků',
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
            maxLength: {
              value: 16,
              message: 'maximální povolená delka Tel. čísla je 16 znaků',
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
            maxLength: {
              value: 40,
              message: 'maximální povolená delka Lokality je 40 znaků',
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
          type='number'
          placeholder='Aa'
          {...register('psc', {
            required: {
              value: true,
              message: 'Psč je povinné',
            },
            maxLength: {
              value: 10,
              message: 'maximální povolená delka Psč je 10 číslic',
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
            maxLength: {
              value: 50,
              message: 'maximální povolená delka E-mailu je 50 znaků',
            },
          })}
        />
        <br />
        <label className={style['label']} htmlFor='heslo'>
          Heslo:<span style={{ color: 'red' }}>*</span>
        </label>

        {windowWidth < 620 ?
          errors.heslo?.message !==
            'Heslo musí obsahovat alespoň jedno malé písmeno, jedno velké písmeno, jedno číslo, jeden speciální znak a musí mít minimálně 8 znaků' && (
            <p className={style['error-message-password']} style={{ color: 'red' }}>
              {status == 'špatné heslo' && !errors.heslo?.message ?
                showStatus ?
                  status
                : ''
              : errors.heslo?.message}
            </p>
          )
        : <p className={style['error-message-password']} style={{ color: 'red' }}>
            {status == 'špatné heslo' && !errors.heslo?.message ?
              showStatus ?
                status
              : ''
            : errors.heslo?.message}
          </p>
        }
        <br />
        {windowWidth > 620 &&
          errors.heslo?.message ===
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
              maxLength: {
                value: 50,
                message: 'maximální povolená delka Hesla je 50 znaků',
              },
            })}
          />
        </div>
        {windowWidth <= 620 &&
          errors.heslo?.message ===
            'Heslo musí obsahovat alespoň jedno malé písmeno, jedno velké písmeno, jedno číslo, jeden speciální znak a musí mít minimálně 8 znaků' && (
            <p className={style['error-message-password']} style={{ color: 'red', position: 'relative' }}>
              {status == 'špatné heslo' && !errors.heslo?.message ?
                showStatus ?
                  status
                : ''
              : errors.heslo?.message}
            </p>
          )}
      </div>
      <input className={style['button']} type='submit' />
    </form>
  );
};

export default EditInzeratForm;
