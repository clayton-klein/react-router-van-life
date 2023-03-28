import { Suspense } from "react";
import {
  Link,
  Await,
  defer,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import { getVans } from "../../../api";
import "../../../styles/VanDetail.css";

// the loader must be declared outside of the function that returns the component.
export function loader({ params }) {
  const vanInfoPromise = getVans(params.id);
  return defer({ van: vanInfoPromise }); // a fetch function from de api.js file
}

export default function VanDetail() {
  const location = useLocation();
  const vanInfoPromise = useLoaderData(); // here we receive the data that come back from the loader

  return (
    <Suspense fallback={<h3>Loading van...</h3>}>
      <Await resolve={vanInfoPromise.van}>
        {(van) => {
          return (
            <div className="van-detail-container">
              <Link
                to={location.state ? `..${location.state.search}` : ".."} // to use this '..' (go back one level)...
                relative="path" // we have to specify prop, otherwise it will go one level on the layout hierarchy ('/').
                className="back-button"
              >
                &larr;{" "}
                <span>
                  {location.state.search !== "?"
                    ? `Back to ${location.state.search.slice(6)}`
                    : "Back"}
                </span>
              </Link>
              {/* van starts as null   */}
              <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price">
                  <span>${van.price}</span>/day
                </p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
