import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import CaseStudyCard from "@/components/molecules/CaseStudyCard";
import caseStudiesService from "@/services/api/caseStudiesService";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCaseStudies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await caseStudiesService.getAll();
      setCaseStudies(data);
    } catch (err) {
      setError("Failed to load case studies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCaseStudies();
  }, []);

  if (loading) {
    return <Loading type="page" />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error message={error} onRetry={loadCaseStudies} />
      </div>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty
          title="No Case Studies Available"
          description="Our case studies are currently being updated."
          icon="FileText"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-surface to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Real Results from Real
              <span className="gradient-text block mt-2">Wellness Practices</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover how wellness practitioners across different specialties are using our AI solutions 
              to increase patient engagement, reduce administrative burden, and grow their practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.Id}
                caseStudy={caseStudy}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Aggregate Results Across All Practices
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These are the combined results from all wellness practices using our AI solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold gradient-text mb-2">40%</div>
              <div className="text-neutral-600">Average Reduction in Front Desk Calls</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold gradient-text mb-2">25%</div>
              <div className="text-neutral-600">Average Increase in Appointments</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold gradient-text mb-2">60 Days</div>
              <div className="text-neutral-600">Average ROI Payback Period</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold gradient-text mb-2">90%</div>
              <div className="text-neutral-600">Patient Satisfaction with AI Support</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;