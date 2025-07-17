import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const IndustryCard = ({ industry, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-neutral-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center mr-4">
            <ApperIcon name="Heart" className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary transition-colors">
            {industry.name}
          </h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">Common Challenges:</h4>
            <ul className="space-y-1">
              {industry.challenges?.slice(0, 2).map((challenge, idx) => (
                <li key={idx} className="text-sm text-neutral-600 flex items-start">
                  <ApperIcon name="AlertCircle" className="w-3 h-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">Our Solutions:</h4>
            <ul className="space-y-1">
              {industry.solutions?.slice(0, 2).map((solution, idx) => (
                <li key={idx} className="text-sm text-neutral-600 flex items-start">
                  <ApperIcon name="CheckCircle" className="w-3 h-3 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Link
          to={`/industries/${industry.id}`}
          className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors group"
        >
          View Solutions
          <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default IndustryCard;