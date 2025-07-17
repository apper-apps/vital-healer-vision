import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const practiceTypes = [
    "Functional Medicine Doctors",
    "Naturopathic Practitioners",
    "Chiropractors",
    "Physical Therapists",
    "Yoga Studio Owners",
    "Pilates Instructors",
    "HRT Clinic Directors",
    "IV Therapy Providers"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % practiceTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-surface via-white to-surface overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
              AI-Powered Marketing for Wellness
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="block">Conversational AI</span>
              <span className="block">Marketing for</span>
              <motion.span
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="gradient-text block"
              >
                {practiceTypes[currentText]}
              </motion.span>
            </h1>

            <p className="text-xl text-neutral-600 mb-8 max-w-2xl">
              Transform your wellness practice with AI assistants that engage patients 24/7, 
              manage appointments, and drive growth through intelligent conversations and SEO optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                as={Link}
                to="/contact"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Get Free Demo
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                as={Link}
                to="/case-studies"
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                View Case Studies
                <ApperIcon name="BarChart3" className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold gradient-text">40%</div>
                <div className="text-sm text-neutral-600">Fewer Front Desk Calls</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold gradient-text">25%</div>
                <div className="text-sm text-neutral-600">More Appointments</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-neutral-600">Patient Support</div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
              {/* Demo Header */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ApperIcon name="Bot" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant Demo</h3>
                    <p className="text-sm opacity-90">Live on your website</p>
                  </div>
                </div>
              </div>

              {/* Demo Messages */}
              <div className="p-6 space-y-4 h-80 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface text-neutral-800 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">
                      Hi! I'm Dr. Sarah's AI assistant. I can help you schedule appointments, 
                      answer questions about our services, or provide directions to our clinic. 
                      How can I help you today?
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="flex justify-end"
                >
                  <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">I'd like to schedule a consultation</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface text-neutral-800 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">
                      Perfect! I have availability this week. Are you a new patient, 
                      and what type of consultation are you interested in?
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4 }}
                  className="flex justify-start"
                >
                  <div className="bg-accent/10 border border-accent/20 text-accent p-3 rounded-lg max-w-xs">
                    <div className="flex items-center text-sm">
                      <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                      Available times found
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Demo Input */}
              <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-400">
                    Type your message...
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <ApperIcon name="Send" className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-accent text-white p-3 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="MessageSquare" className="w-5 h-5" />
                <span className="text-sm font-medium">Live 24/7</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white border border-neutral-200 p-3 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-neutral-700">Auto Booking</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;