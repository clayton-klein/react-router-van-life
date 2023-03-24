import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Vans, { loader as vansLoader } from "./components/pages/Vans/Vans"; //importing loader and changind name
import Dashboard from "./components/pages/Host/Dashboard";
import Income from "./components/pages/Host/Income";
import Reviews from "./components/pages/Host/Reviews";
import HostVans from "./components/pages/Host/HostVans";
import HostVansDetails from "./components/pages/Host/HostVansDetail";
import HostVanInfo from "./components/pages/Host/HostVanInfo";
import HostVanPricing from "./components/pages/Host/HostVanPricing";
import HostVanPhotos from "./components/pages/Host/HostVanPhotos";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Layout from "./components/Layout";
import HostLayout from "./components/pages/Host/HostLayout";
import VanDetail from "./components/pages/Vans/VanDetail";
import Error from "./components/Error";

import "./server";

// "router" (or whatever you wanna call it), must be created outside of the return of the App component so we can use Loaders and Actions from the data API, this is the modern way of doing it currently (react-router v6.8).
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
        loader={vansLoader} // inserting loader here
      />
      <Route path="vans/:id" element={<VanDetail />} />

      <Route path="host" element={<HostLayout />}>
        {/* same thing as above here in Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        {/* the paths bellow are not the same as above, 
                because the parent route is "host" and not "/" */}
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVansDetails />}>
          <Route index element={<HostVanInfo />} />
          <Route path="photos" element={<HostVanPhotos />} />
          <Route path="pricing" element={<HostVanPricing />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
