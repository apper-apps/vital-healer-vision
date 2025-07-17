import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Services from "@/components/pages/Services";
import ServiceDetail from "@/components/pages/ServiceDetail";
import Industries from "@/components/pages/Industries";
import IndustryDetail from "@/components/pages/IndustryDetail";
import CaseStudies from "@/components/pages/CaseStudies";
import Contact from "@/components/pages/Contact";
import Resources from "@/components/pages/Resources";
import About from "@/components/pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:industryId" element={<IndustryDetail />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="contact" element={<Contact />} />
          <Route path="resources" element={<Resources />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;