import { Link, useParams } from 'react-router-dom';
import style from './EditDeleteInzerat.module.css';

const EditInzerat = () => {
  const { id } = useParams();
  return (
    <div className={style['main']}>
      <h2>Vyberte:</h2>
      <div className={style['container']}>
        <Link to={`/smazat/${id}`}>Smazat</Link>
        <Link to={`/upravit/${id}`}>Upravit</Link>
      </div>
    </div>
  );
};

export default EditInzerat;
