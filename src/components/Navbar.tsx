import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={style["nav"]}>
      {/* TODO logo to="/" */}
      <div className={style["link-container"]}>
        <Link to="/">Uvod</Link>
      </div>
      <div className={style["link-container"]}>
        <Link to="/kocky">Kocky</Link>
      </div>
      <div className={style["link-container"]}>
        <Link to="/pes">Pes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
