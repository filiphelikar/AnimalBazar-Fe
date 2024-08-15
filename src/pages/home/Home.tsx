import style from './Home.module.css';
import { Link } from 'react-router-dom';
import SearchWithResult from '../../components/Search/SearchWithResult';

interface Props {
  druhy: string[];
}

const Home = ({ druhy }: Props) => {
  return (
    <>
      <div className={style['container']}>
        {druhy.map((druh) => {
          return (
            <Link key={druh} to={`/inzeraty/${druh}`}>
              <p>{druh}</p>
            </Link>
          );
        })}
      </div>
      <SearchWithResult />
    </>
  );
};

export default Home;
