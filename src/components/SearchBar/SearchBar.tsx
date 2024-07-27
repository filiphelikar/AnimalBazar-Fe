import { useState } from 'react';
import style from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

type Props = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  url: string;
};

const SearchBar: React.FC<Props> = ({ setState, url }) => {
  const [input, setInput] = useState<string>('');
  return (
    <div className={style['container']}>
      <input type='text' onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setState(url + input)}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
