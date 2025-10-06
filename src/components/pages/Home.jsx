import React, { useState, useEffect } from "react";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import HeroSection from "@/components/organisms/HeroSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import IndustriesSection from "@/components/organisms/IndustriesSection";
import CaseStudiesSection from "@/components/organisms/CaseStudiesSection";
import ROICalculator from "@/components/organisms/ROICalculator";
import CTASection from "@/components/organisms/CTASection";
import servicesService from "@/services/api/servicesService";
import industriesService from "@/services/api/industriesService";
import caseStudiesService from "@/services/api/caseStudiesService";

const Home = () => {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [servicesData, industriesData, caseStudiesData] = await Promise.all([
        servicesService.getAll(),
        industriesService.getAll(),
        caseStudiesService.getAll()
      ]);
      
      setServices(servicesData);
      setIndustries(industriesData);
      setCaseStudies(caseStudiesData);
    } catch (err) {
      setError("Failed to load page content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    console.info('apper_info: test');
  }, []);

  if (loading) {
    return <Loading type="page" />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error message={error} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
<ServicesSection services={services} />
      <IndustriesSection industries={industries} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <ROICalculator />
      <CTASection />
    </div>
  );
};

export default Home;