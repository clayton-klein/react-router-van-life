import React from "react";
import { Outlet } from "react-router-dom";
import HostVansDetail from "./HostVansDetail";

export default function HostVansDetailLayout() {
  return (
    <div>
      <HostVansDetail />
      <Outlet />
    </div>
  );
}
