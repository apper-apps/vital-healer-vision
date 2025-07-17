import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/molecules/ServiceCard";
import Button from "@/components/atoms/Button";

const ServicesSection = ({ services }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Complete AI Marketing Solutions for
            <span className="gradient-text block mt-2">Wellness Practices</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Everything you need to transform patient engagement, automate scheduling, 
            and grow your practice with intelligent conversation technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.Id}
              service={service}
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
            to="/services"
            variant="primary"
            size="lg"
          >
            Explore All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;