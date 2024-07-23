import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { PiCatDuotone } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className={style["nav"]}>
      <Link className={style["logo"]} to="/">
        <PiCatDuotone />
      </Link>
      <Link to="/kocky" className={style["link-container"]}>
        <p>Kocky</p>
      </Link>
      <Link to="/pes" className={style["link-container"]}>
        <p>Pes</p>
      </Link>
    </nav>
  );
};

export default Navbar;
