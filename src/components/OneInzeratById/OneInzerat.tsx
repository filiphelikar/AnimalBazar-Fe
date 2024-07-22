import { useState } from "react";
import { Inzerat } from "../../assets/interfaces";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImCross } from "react-icons/im";
import style from "./OneInzerat.module.css";

const OneInzerat = ({
  nazev,
  popis,
  cena,
  images,
  lokalita,
  psc,
  telefon,
  email,
  prodejce,
}: Inzerat) => {
  const [img, setImg] = useState<number>(0);
  const [isHide, setIsHide] = useState<boolean>(true);

  const nextPrevImg = (str: "next" | "prev") => {
    switch (str) {
      case "next":
        if (img >= images.length - 1) {
          setImg(0);
        } else {
          setImg(img + 1);
        }
        break;
      case "prev":
        if (img <= 0) {
          setImg(images.length - 1);
        } else {
          setImg(img - 1);
        }
        break;
    }
  };

  return (
    <>
      {!isHide ? (
        <>
          <div className={style["full-img"]}>
            <button
              className={style["button-prev"]}
              onClick={() => nextPrevImg("prev")}
            >
              <IoIosArrowBack />
            </button>
            <img width="500px" src={images[img]} alt={nazev} />
            <button
              className={style["button-next"]}
              onClick={() => nextPrevImg("next")}
            >
              <IoIosArrowForward />
            </button>
            <button
              onClick={() => setIsHide(!isHide)}
              className={style["cross"]}
            >
              <ImCross />
            </button>
          </div>
          <div
            onClick={() => setIsHide(!isHide)}
            className={style["background-full-img"]}
          ></div>
        </>
      ) : (
        ""
      )}
      <div className={style["main"]}>
        <h2>{nazev}</h2>
        <div className={style["img-container"]}>
          <button
            className={style["button-prev"]}
            onClick={() => nextPrevImg("prev")}
          >
            <IoIosArrowBack />
          </button>
          <img
            onClick={() => setIsHide(!isHide)}
            width="200px"
            src={images[img]}
            alt={nazev}
          />{" "}
          <br />
          <button
            className={style["button-next"]}
            onClick={() => nextPrevImg("next")}
          >
            <IoIosArrowForward />
          </button>
        </div>
        {images.map((_, index) => {
          return img == index ? (
            <button
              className={style["button-activ"]}
              onClick={() => setImg(index)}
            >
              <FaCircle />
            </button>
          ) : (
            <button className={style["button"]} onClick={() => setImg(index)}>
              <FaCircle />
            </button>
          );
        })}
        <p className={style["popis"]}>{popis}</p>
        <section className={style["bottom-section"]}>
          <div className={style["contact"]}>
            <p className={style["price"]}>
              Cena: <b>{cena == "Za odvoz" ? cena : cena + " Kč"}</b>
            </p>
            <span>Jméno: </span>
            <span>{prodejce}</span> <br />
            <span>Telefon: </span>
            <a href={`tel:${telefon}`}>{telefon}</a> <br />
            <span>Email: </span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className={style["location"]}>
            <span>{lokalita}</span> <br />
            <span>{psc}</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default OneInzerat;
