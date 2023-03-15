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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* add index keyword to Home, because it has 
          the same path as Layout, so itś necessary to do it
          to render the component instead of using path="/" */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />

          <Route path="host" element={<HostLayout />}>
            {/* same thing as above here in Dashboard */}
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
