import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "../../../styles/VanDetail.css";

export default function VanDetail() {
  const [van, setVan] = useState(null);
  const params = useParams();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    fetch(`/api/vans/${params.id}`) // get data from mirage.js server
      .then((resp) => resp.json())
      .then((data) => setVan(data.vans))
      .catch((err) => console.error(err));
  }, [params.id]);

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
      {van ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
