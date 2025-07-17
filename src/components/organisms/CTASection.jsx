import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block mt-2">Wellness Practice?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join hundreds of wellness practitioners who are already using AI to engage patients, 
            streamline operations, and grow their practices. Get started with a free demo today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              as={Link}
              to="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-neutral-50 hover:scale-105"
            >
              <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
              Schedule Free Demo
            </Button>
            
            <div className="flex items-center text-white/90">
              <ApperIcon name="Clock" className="w-5 h-5 mr-2" />
              <span>15-minute consultation</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center text-white/90"
            >
              <ApperIcon name="Shield" className="w-6 h-6 mr-3" />
              <span>HIPAA Compliant</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center text-white/90"
            >
              <ApperIcon name="Zap" className="w-6 h-6 mr-3" />
              <span>48-Hour Setup</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center text-white/90"
            >
              <ApperIcon name="Headphones" className="w-6 h-6 mr-3" />
              <span>24/7 Support</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;