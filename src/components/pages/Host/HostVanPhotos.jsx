import React from "react";
import { useOutletContext } from "react-router-dom";
import "../../../styles/HostVanPhotos.css";

export default function HostVanPhotos() {
  const { currentVan } = useOutletContext();

  return (
  <img src={currentVan.imageUrl} className="host-van-detail-image" />
  );
}
