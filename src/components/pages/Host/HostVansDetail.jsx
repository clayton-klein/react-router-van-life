import React from "react";
import { useParams, Link } from "react-router-dom";
import "../../../styles/HostVanDetail.css";

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
  
  return (
    <section>
      <Link
        to=".." // to use this (go back one level)
        relative="path" // we have to specify this, otherwise it will
        // go one level on the layout hierarchy
        className="back-button"
      >
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
