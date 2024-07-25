import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { PiCatDuotone } from "react-icons/pi";

interface Props {
  druhy: string[];
}

const Navbar = ({ druhy }: Props) => {
  return (
    <nav className={style["nav"]}>
      <Link className={style["logo"]} to="/">
        <PiCatDuotone />
      </Link>
      {druhy.map((druh: string) => {
        return (
          <Link to={`/inzeraty/${druh}`} className={style["link-container"]}>
            <p>{druh}</p>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
