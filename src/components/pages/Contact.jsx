import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ContactForm from "@/components/molecules/ContactForm";

const Contact = () => {
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
              Get Your Free
              <span className="gradient-text block mt-2">AI Demo Today</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              See exactly how conversational AI can transform your wellness practice. 
              Schedule a personalized 15-minute demo tailored to your specific needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  What to Expect
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        15-Minute Consultation
                      </h3>
                      <p className="text-neutral-600">
                        We'll discuss your practice goals and current challenges with patient engagement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Monitor" className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        Live AI Demo
                      </h3>
                      <p className="text-neutral-600">
                        See our AI assistant in action, customized for your type of wellness practice.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Target" className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        Custom Strategy
                      </h3>
                      <p className="text-neutral-600">
                        Get a personalized roadmap for implementing AI in your practice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Why Wellness Practitioners Choose Us
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Shield" className="w-5 h-5 text-primary" />
                    <span className="text-neutral-700">HIPAA Compliant & Secure</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Zap" className="w-5 h-5 text-accent" />
                    <span className="text-neutral-700">Quick 48-Hour Setup</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Heart" className="w-5 h-5 text-secondary" />
                    <span className="text-neutral-700">Wellness-Focused Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Headphones" className="w-5 h-5 text-primary" />
                    <span className="text-neutral-700">24/7 Support Team</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-6 bg-white border border-neutral-200 rounded-xl">
                <ApperIcon name="Clock" className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h4 className="font-semibold text-neutral-900 mb-2">
                  Response Time: Under 24 Hours
                </h4>
                <p className="text-sm text-neutral-600">
                  We'll contact you within 24 hours to schedule your demo at a time that works for you.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;