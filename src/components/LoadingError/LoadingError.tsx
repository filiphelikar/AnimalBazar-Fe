import style from "./LoadingError.module.css";

interface Props {
  status: string;
}

const LoadingError = ({ status }: Props) => {
  return (
    <>
      {status === "loading" ? (
        <p className={style["loading"]}>Loading...</p>
      ) : status === "error" ? (
        <p className={style["error"]}>somthing went wrong</p>
      ) : (
        ""
      )}
    </>
  );
};

export default LoadingError;
