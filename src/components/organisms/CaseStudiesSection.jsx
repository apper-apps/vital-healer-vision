import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CaseStudyCard from "@/components/molecules/CaseStudyCard";
import Button from "@/components/atoms/Button";

const CaseStudiesSection = ({ caseStudies }) => {
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
            Real Results from Real
            <span className="gradient-text block mt-2">Wellness Practices</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            See how wellness practitioners are using our AI solutions to increase patient engagement, 
            reduce administrative burden, and grow their practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.slice(0, 3).map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.Id}
              caseStudy={caseStudy}
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
            to="/case-studies"
            variant="accent"
            size="lg"
          >
            View All Case Studies
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;