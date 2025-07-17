import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import IndustryCard from "@/components/molecules/IndustryCard";
import Button from "@/components/atoms/Button";

const IndustriesSection = ({ industries }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Specialized Solutions for Every
            <span className="gradient-text block mt-2">Wellness Practice</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Tailored AI marketing strategies designed specifically for your type of wellness practice, 
            with industry-specific features and proven results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {industries.slice(0, 6).map((industry, index) => (
            <IndustryCard
              key={industry.Id}
              industry={industry}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            as={Link}
            to="/industries"
            variant="secondary"
            size="lg"
          >
            View All Industries
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;