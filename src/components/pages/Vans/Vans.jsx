import React from "react";
import {
  Link,
  Await,
  useSearchParams,
  useLoaderData,
  defer,
} from "react-router-dom";
import { getVans } from "../../../api.js";
import "../../../styles/Vans.css";

// the loader must be declared outside of the function that returns the component.
export function loader() {
  let vansPromise = getVans(); // a fetch function from de api.js file
  return defer({ vans: vansPromise });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  const vansDataPromise = useLoaderData(); // here we receive the data that come back from the loader
  const typeFilter = searchParams.get("type"); // this gets the query from the URL.

  function addSelectedClassToBtn(btnType) {
    const btns = document.querySelectorAll("button");
    btns.forEach((btn) =>
      btn.classList.contains(btnType)
        ? btn.classList.add("selected")
        : btn.classList.remove("selected")
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      {/* Await MUST be wrapped inside Suspense (a React component, not a react-router thing), otherwise the page would return an error "A component suspended while responding to a synchronous input" */}
      <React.Suspense fallback={<h3>Loading vans...</h3>}>
      {/* the Await component needs a resolve prop with the data inside the promise object that is returned from the loader (since it was deffered) */}
        <Await resolve={vansDataPromise.vans}>
          {/* Await expets children that can either be React elements or a function. */}

          {(vans) => {
            let vansElements = vans
              .filter((van) =>
                typeFilter ? van.type.toLowerCase() === typeFilter : van
              )
              .map((van) => (
                <div className="van-tile" key={van.id}>
                  {/* the path (to) of the Link bellow is relative and the server already returns a string and state is passed so it can be used in the VanDetail page's Link */}
                  <Link
                    to={van.id}
                    state={{ search: `?${searchParams.toString()}` }}
                  >
                    <img src={van.imageUrl} />
                    <div className="van-info">
                      <h3>{van.name}</h3>
                      <p>
                        ${van.price}
                        <span>/day</span>
                      </p>
                    </div>
                    <i className={`van-type ${van.type}`}>{van.type}</i>
                  </Link>
                </div>
              ));

            return (
              <>
                <nav className="van-list-filter-buttons">
                  {addSelectedClassToBtn(typeFilter)}
                  <button
                    // there are different ways of passing values into the setSearchParams, see more on https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams (useSearchParams use the URL API of the browser behind under the hood).
                    onClick={() => setSearchParams({ type: "simple" })}
                    className="van-type simple"
                  >
                    Simple
                  </button>

                  <button
                    onClick={() => setSearchParams({ type: "rugged" })}
                    className="van-type rugged"
                  >
                    Rugged
                  </button>

                  <button
                    onClick={() => setSearchParams({ type: "luxury" })}
                    className="van-type luxury"
                  >
                    Luxury
                  </button>

                  {typeFilter && (
                    <button
                      onClick={() => setSearchParams({})}
                      className="van-type clear-filters"
                    >
                      Clear Filter
                    </button>
                  )}
                </nav>

                <div className="van-list">{vansElements}</div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}
