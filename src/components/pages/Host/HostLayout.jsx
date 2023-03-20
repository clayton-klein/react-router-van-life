import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../../styles/HostLayout.css";

export default function HostLayout() {
  // style object to inline style the links
  const activeLink = {
    color: "#161616",
    fontWeight: "bold",
    marginBottom: "5px",
    paddingBottom: "5px",
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "5px",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="." // we can use dot instead of "/host" to say "this
                 // current route where the HostLayout is being
                 // rendered", since we are already at "/host".
          end // it's necessary, otherwise Dashboard link would always be active and styled as such.
          style={({ isActive }) => (isActive ? activeLink : null)} // MUST use null instead of an empty string " " in this case, because an style object is being used, otherwise it won't work.
        >
          Dashboard
        </NavLink>

        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeLink : null)} // MUST use null instead of an empty string " " in this case, because an style object is being used, otherwise it won't work.
        >
          Income
        </NavLink>

        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeLink : null)} // MUST use null instead of an empty string " " in this case, because an style object is being used, otherwise it won't work.
        >
          Vans
        </NavLink>

        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeLink : null)} // MUST use null instead of an empty string " " in this case, because an style object is being used, otherwise it won't work.
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
