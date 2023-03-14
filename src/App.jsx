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
        {/* Layout doesn't need a path */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />

          <Route path="/host" element={<HostLayout />}>
            <Route path="/host" element={<Dashboard />} />
            <Route path="/host/income" element={<Income />} />
            <Route path="/host/reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
