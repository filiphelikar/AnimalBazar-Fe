import { useState } from 'react';
import style from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

type Props = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  url: string;
};

const SearchBar: React.FC<Props> = ({ setState, url }) => {
  const [input, setInput] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(url + input);
    setInput('');
  };

  return (
    <form noValidate onSubmit={onSubmit} className={style['container']}>
      <input type='text' onChange={(e) => setInput(e.target.value)} value={input} />
      <button type='submit'>
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
