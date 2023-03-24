import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Vans, { loader as vansLoader } from "./components/pages/Vans/Vans"; //importing loader and changind name
import VanDetail, {
  loader as vanDetailLoader,
} from "./components/pages/Vans/VanDetail"; //importing loader and changind name
import Dashboard from "./components/pages/Host/Dashboard";
import Income from "./components/pages/Host/Income";
import Reviews from "./components/pages/Host/Reviews";
import HostVans, {
  loader as hostVansLoader,
} from "./components/pages/Host/HostVans"; //importing loader and changind name
import HostVansDetails, {
  loader as hostVansDetailLoader,
} from "./components/pages/Host/HostVansDetail"; //importing loader and changind name
import HostVanInfo from "./components/pages/Host/HostVanInfo";
import HostVanPricing from "./components/pages/Host/HostVanPricing";
import HostVanPhotos from "./components/pages/Host/HostVanPhotos";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Layout from "./components/Layout";
import HostLayout from "./components/pages/Host/HostLayout";
import Error from "./components/Error";

import "./server";

// The "router" (or whatever you wanna call it), must be created outside of the return of the App component so we can use Loaders and Actions from the data API, this is the modern way of doing it currently (react-router v6.8).
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* add index keyword to the Home component bellow because it has the same path as Layout, so it's necessary to do it to render the component instead of just using path="/" */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />

      <Route
        path="vans"
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader} // inserting loader into the route
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader} // inserting loader into the route
      />

      <Route path="host" element={<HostLayout />}>
        {/* same thing as above here in Dashboard */}
        <Route
          index
          element={<Dashboard />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => {
            return null;
          }}
        />
        {/* the paths bellow are not the same as above, 
                because the parent route is "host" and not "/" */}
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader} // inserting loader into the route
        />
        <Route
          path="vans/:id"
          element={<HostVansDetails />}
          loader={hostVansDetailLoader} // inserting loader into the route
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="photos"
            element={
              <HostVanPhotos
                loader={async () => {
                  return null;
                }}
              />
            }
          />
          <Route
            path="pricing"
            element={
              <HostVanPricing
                loader={async () => {
                  return null;
                }}
              />
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />; // the prop must be called "router", but not the value.
}
