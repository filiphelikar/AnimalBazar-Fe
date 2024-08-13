import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import style from './FullPictures.module.css';
interface Props {
  images: string[];
  img: number;
  nextPrevImg: (str: 'next' | 'prev') => void;
  isHide: boolean;
  setIsHide: (bo: boolean) => void;
  nazev: string;
}

const FullPictures = ({ images, img, nextPrevImg, isHide, setIsHide, nazev }: Props) => {
  return (
    <>
      {!isHide ?
        <>
          <div className={style['full-img']}>
            <button className={style['button-prev']} onClick={() => nextPrevImg('prev')}>
              <IoIosArrowBack />
            </button>
            <div className={style['img-container']}>
              <img width='500px' src={images[img]} alt={nazev} />
            </div>
            <button className={style['button-next']} onClick={() => nextPrevImg('next')}>
              <IoIosArrowForward />
            </button>
            <button onClick={() => setIsHide(!isHide)} className={style['cross']}>
              <ImCross />
            </button>
          </div>
          <div onClick={() => setIsHide(!isHide)} className={style['background-full-img']}></div>
        </>
      : ''}
    </>
  );
};

export default FullPictures;
