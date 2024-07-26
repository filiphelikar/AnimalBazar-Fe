import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./CreateInzeratForm.module.css";

type FormValues = {
  nadpis: string;
  popis: string;
  cenaSelect: "Za odvoz" | "Vyberte" | "Číslo v Kč";
  cenaNum: number;
  prodejce: string;
  telefon: string;
  email: string;
  lokalita: string;
  psc: string;
};

interface Props {
  id: string | undefined;
}

const CreateInzeratForm = ({ id }: Props) => {
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  //const [message, setMessage] = useState<any>({message: "", class: "", display: 0})

  const form = useForm<FormValues>({
    defaultValues: {
      nadpis: "",
      popis: "",
      cenaSelect: "Vyberte",
      prodejce: "",
      telefon: "",
      email: "",
      lokalita: "",
      psc: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const selectChange = (e: any) => {
    if (e.target.value === "Číslo v Kč:") {
      setShowAdditionalField(true);
    } else {
      setShowAdditionalField(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={style["form-1"]}>
        <label htmlFor="nadpis">
          Nadpis:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.nadpis?.message}</p>
        <input
          id="nadpis"
          type="text"
          placeholder="Aa"
          {...register("nadpis", {
            required: {
              value: true,
              message: "Nadpis je povinný",
            },
          })}
        />
        <br />
        <label htmlFor="popis">
          Popis:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.popis?.message}</p>
        <textarea
          id="popis"
          placeholder="Aa"
          {...register("popis", {
            required: {
              value: true,
              message: "Popis je povinný",
            },
          })}
        />
        <br />

        {!showAdditionalField && (
          <p style={{ color: "red" }}>{errors.cenaSelect?.message}</p>
        )}

        <label htmlFor="cenaSelect">
          Cena:<span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="cenaSelect"
          {...register("cenaSelect", {
            validate: (value) => value !== "Vyberte" || "Vyberte možnost",
          })}
          onChange={selectChange}
        >
          <option value="Vyberte">Vyberte...</option>
          <option value="Za odvoz">Za odvoz</option>
          <option value="Číslo v Kč:">Číslo v Kč:</option>
        </select>

        {showAdditionalField && (
          <>
            <p style={{ color: "red" }}>{errors.cenaNum?.message}</p>
            <input
              id="cenaNum"
              type="number"
              {...register("cenaNum", {
                required: {
                  value: true,
                  message: "Cena je povinná",
                },
              })}
            />
          </>
        )}
      </div>
      <h2>Osobní údaje:</h2>
      <div className={style["form-2"]}>
        <label htmlFor="prodejce">
          Celé jméno:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.prodejce?.message}</p>
        <input
          id="prodejce"
          type="text"
          placeholder="Aa"
          {...register("prodejce", {
            required: {
              value: true,
              message: "Jméno je povinné",
            },
          })}
        />
        <br />
        <label htmlFor="telefon">
          Telefon:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.telefon?.message}</p>
        <input
          id="telefon"
          type="text"
          placeholder="Aa"
          {...register("telefon", {
            required: {
              value: true,
              message: "Telefon je povinný",
            },
          })}
        />
        <br />
        <label htmlFor="email">
          E-mail:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <input
          id="email"
          type="email"
          placeholder="Aa"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
              message: "Špatný formát E-mailu",
            },
            required: {
              value: true,
              message: "E-mail je povinný",
            },
          })}
        />
        <br />
        <label htmlFor="lokalita">
          Lokalita:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.lokalita?.message}</p>
        <input
          id="lokalita"
          type="text"
          placeholder="Aa"
          {...register("lokalita", {
            required: {
              value: true,
              message: "Lokalita je povinná",
            },
          })}
        />
        <br />
        <label htmlFor="psc">
          Psč:<span style={{ color: "red" }}>*</span>
        </label>
        <p style={{ color: "red" }}>{errors.psc?.message}</p>
        <input
          id="psc"
          type="text"
          placeholder="Aa"
          {...register("psc", {
            required: {
              value: true,
              message: "Psč je povinné",
            },
          })}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default CreateInzeratForm;
