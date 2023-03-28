import React, { Suspense } from "react";
import { Link, Await, defer, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api";
import "../../../styles/HostVans.css";
import { requireAuth } from "../../../utils";

// the loader must be declared outside of the function that returns the component.
export async function loader({ request }) {
  // the idea with the requireAuth function was to create a protected route, but for some reason it's not working :/
  await requireAuth(request);

  const hostVansPromise = getHostVans();
  return defer({ vans: hostVansPromise });
};

export default function HostVans() {
  const hostVansData = useLoaderData();

  return (
    // see Vans page comments for more information about defer, Suspense and Await
    <Suspense fallback={<h3>Loading host vans...</h3>}>
      <Await resolve={hostVansData.vans}>
        {(vans) => {
          const hostVansEls = vans.map((van) => (
            <Link
              to={van.id} // the path is relative and the server already returns a string.
              key={van.id}
              className="host-van-link-wrapper"
            >
              <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                  <h3>{van.name}</h3>
                  <p>${van.price}/day</p>
                </div>
              </div>
            </Link>
          ));

          return (
            <section>
              <h1 className="host-vans-title">Your listed vans</h1>
              <div className="host-vans-list">
                <section>{hostVansEls}</section>
              </div>
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}
