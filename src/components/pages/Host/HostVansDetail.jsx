import React, { Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";
import "../../../styles/HostVansDetail.css";

// the loader must be declared outside of the function that returns the component.
export async function loader({ params, request }) {
  // the idea with the requireAuth function was to create a protected route, but for some reason it's not working :/
  const hostVanPromise = getHostVans(params.id);
  await requireAuth(request);
  return defer({ hostVan: hostVanPromise });
}

export default function HostVansDetail() {
  const hostVanPromise = useLoaderData();

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
    <Suspense fallback={<h3>Loading host van...</h3>}>
      <Await resolve={hostVanPromise.hostVan}>
        {(currentVan) => {
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
        }}
      </Await>
    </Suspense>
  );
}
