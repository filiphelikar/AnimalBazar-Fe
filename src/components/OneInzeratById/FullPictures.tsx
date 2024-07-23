import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImCross } from "react-icons/im";
import style from "./FullPictures.module.css";

/* images={images}
        img={img}
        setImg={setImg}
        nextPrevImg={nextPrevImg}
        isHide={isHide}
        setIsHide={setIsHide} */

interface Props {
  images: string[];
  img: number;
  nextPrevImg: (str: "next" | "prev") => void;
  isHide: boolean;
  setIsHide: (bo: boolean) => void;
  nazev: string;
}

const FullPictures = ({
  images,
  img,
  nextPrevImg,
  isHide,
  setIsHide,
  nazev,
}: Props) => {
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
    </>
  );
};

export default FullPictures;
