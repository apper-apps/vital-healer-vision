import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const CaseStudyCard = ({ caseStudy, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-neutral-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-green-500 rounded-lg flex items-center justify-center mr-4">
            <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-800">{caseStudy.practiceName}</h3>
            <p className="text-sm text-neutral-600">{caseStudy.practiceType}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(caseStudy.metrics).map(([key, value]) => (
            <div key={key} className="text-center p-3 bg-surface rounded-lg">
              <div className="text-2xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-xs text-neutral-600 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
            </div>
          ))}
        </div>
        
        <blockquote className="text-sm text-neutral-600 italic border-l-4 border-accent pl-4 mb-4">
          "{caseStudy.testimonial}"
        </blockquote>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-accent">
            <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1" />
            Verified Results
          </div>
          <button className="text-primary hover:text-secondary transition-colors font-medium text-sm">
            View Full Case Study
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;