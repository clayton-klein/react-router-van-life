import React from "react";
import { Outlet } from "react-router-dom";
import HostVanDetail from "./HostVansDetail";

export default function HostVansDetailLayout() {
  return (
    <div>
      <HostVanDetail />
      <Outlet />
    </div>
  );
}
