import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-neutral-100"
    >
      <div className="p-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <ApperIcon name={service.icon} className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <p className="text-neutral-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        
        <div className="space-y-2 mb-6">
          {service.features?.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-neutral-600">
              <ApperIcon name="Check" className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
        
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors group"
        >
          Learn More
          <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;