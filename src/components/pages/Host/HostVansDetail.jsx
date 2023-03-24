import React from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { getHostVans } from "../../../api";
import "../../../styles/HostVansDetail.css";

// the loader must be declared outside of the function that returns the component.
export function loader({ params }) {
  return getHostVans(params.id);
}

export default function HostVansDetail() {
  // const { id } = useParams();
  // const [currentVan, setCurrentVan] = React.useState(null);
  const currentVan = useLoaderData();

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
    <section>
      <Link
        to=".." // to use this (go back one level)...
        relative="path" // we have to specify this, otherwise will go one level on the layout hierarchy
        className="back-button"
      >
        &larr; <span>Back</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type ${currentVan.type}`}>{currentVan.type}</i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeLink : null)}
          >
            Details
          </NavLink>

          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeLink : null)}
          >
            Pricing
          </NavLink>

          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeLink : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
}
