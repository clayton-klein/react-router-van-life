import React from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import "../../../styles/HostVansDetail.css";

export default function HostVansDetail() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans));
  }, []);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

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
            <i className={`van-type ${currentVan.type}`}>
              {currentVan.type}
            </i>
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
