import { FaCircle } from "react-icons/fa";
import { useState } from "react";
import style from "./Pictures.module.css";
import FullPictures from "./FullPictures";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Props {
  images: string[];
  nazev: string;
}

const Pictures = ({ images, nazev }: Props) => {
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
      <FullPictures
        images={images}
        img={img}
        nextPrevImg={nextPrevImg}
        isHide={isHide}
        setIsHide={setIsHide}
        nazev={nazev}
      />
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
        />
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
    </>
  );
};

export default Pictures;
