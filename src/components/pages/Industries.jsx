import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import IndustryCard from "@/components/molecules/IndustryCard";
import industriesService from "@/services/api/industriesService";

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIndustries = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await industriesService.getAll();
      setIndustries(data);
    } catch (err) {
      setError("Failed to load industries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIndustries();
  }, []);

  if (loading) {
    return <Loading type="page" />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error message={error} onRetry={loadIndustries} />
      </div>
    );
  }

  if (industries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty
          title="No Industries Available"
          description="Our industry solutions are currently being updated."
          icon="Building"
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
              Industry-Specific Solutions for
              <span className="gradient-text block mt-2">Wellness Practices</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Tailored AI marketing strategies designed specifically for your type of wellness practice, 
              addressing unique challenges and opportunities in your field.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <IndustryCard
                key={industry.Id}
                industry={industry}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;