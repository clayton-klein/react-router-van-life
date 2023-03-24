import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/Header.css";
import avatarIcon from "../images/avatar-icon.png";

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "link-active" : "")}
        >
          Host
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "link-active" : "")}
        >
          About
        </NavLink>

        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "link-active" : "")}
        >
          Vans
        </NavLink>

        <Link to="login" className="login-link">
          <img src={avatarIcon} className="login-icon" />
        </Link>
      </nav>
    </header>
  );
}
