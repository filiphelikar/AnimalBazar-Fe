import { useState } from "react";

type Props = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  url: string;
};

const SearchBar: React.FC<Props> = ({ setState, url }) => {
  const [input, setInput] = useState<string>("");
  return (
    <>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setState(url + input)}>Vyhledat</button>
    </>
  );
};

export default SearchBar;
