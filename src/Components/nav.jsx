import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="Connect_btn">
        <ConnectButton />
      </div>
      <div className="Header">
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={menuOpen ? "open" : " "}>
          <Link to="/" className="nav__logo">
            Summer
          </Link>
          <Link to="/" className="nav__docs">
            Docs
          </Link>
          <Link to="/" className="nav__Community">
            Community
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Nav;
