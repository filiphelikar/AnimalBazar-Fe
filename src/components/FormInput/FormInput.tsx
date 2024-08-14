import { FormValues } from '../../assets/interfaces';
import style from './FormInput.module.css';

const FormInput = ({
  label,
  id,
  register,
  errors,
  validation,
  type = 'text',
  placeholder = 'Aa',
  longestMessage = 'Aa',
}: {
  label: string;
  id: keyof FormValues;
  register: any;
  errors: any;
  validation: object;
  type?: string;
  placeholder?: string;
  longestMessage?: string;
}) => (
  <>
    <label htmlFor={id}>
      {label}
      <span style={{ color: 'red' }}>*</span>
    </label>
    <br />
    <div className={style['container']}>
      {errors && (
        <div className={style['error-message']}>
          <p>{errors.message}</p>
        </div>
      )}
      <div className={style['place-holder']}>
        <p>{longestMessage}</p>
      </div>
    </div>
    {type == 'textarea' ?
      <textarea id={id} placeholder={placeholder} className={style[type]} {...register(id, validation)} />
    : <input type={type} id={id} placeholder={placeholder} className={style[type]} {...register(id, validation)} />}
    <br />
    <br />
  </>
);

export default FormInput;
