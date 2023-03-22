import "./server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/pages/About";
import Dashboard from "./components/pages/Host/Dashboard";
import Home from "./components/pages/Home";
import HostLayout from "./components/pages/Host/HostLayout";
import Income from "./components/pages/Host/Income";
import Layout from "./components/Layout";
import Reviews from "./components/pages/Host/Reviews";
import VanDetail from "./components/pages/Vans/VanDetail";
import Vans from "./components/pages/Vans/Vans";
import HostVans from "./components/pages/Host/HostVans";
import HostVansDetails from "./components/pages/Host/HostVansDetail";
import HostVanInfo from "./components/pages/Host/HostVanInfo";
import HostVanPhotos from "./components/pages/Host/HostVanPhotos";
import HostVanPricing from "./components/pages/Host/HostVanPricing";
import NotFound from "./components/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* add index keyword to the Home component bellow because it has the same path as Layout, so it's necessary to do it to render the component instead of just using path="/" */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
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
      </Routes>
    </BrowserRouter>
  );
}
