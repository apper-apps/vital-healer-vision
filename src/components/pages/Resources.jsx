import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "The Complete Guide to AI for Wellness Practices",
      description: "Everything you need to know about implementing conversational AI in your practice.",
      category: "Guide",
      readTime: "15 min read",
      icon: "BookOpen"
    },
    {
      id: 2,
      title: "5 Ways AI Can Reduce Patient No-Shows",
      description: "Proven strategies for using AI assistants to improve appointment attendance.",
      category: "Best Practices",
      readTime: "8 min read",
      icon: "Calendar"
    },
    {
      id: 3,
      title: "HIPAA Compliance for AI in Healthcare",
      description: "Understanding privacy requirements when implementing AI in wellness practices.",
      category: "Compliance",
      readTime: "12 min read",
      icon: "Shield"
    },
    {
      id: 4,
      title: "ROI Calculator: AI Marketing for Wellness",
      description: "Calculate the potential return on investment for AI marketing in your practice.",
      category: "Tool",
      readTime: "5 min use",
      icon: "Calculator"
    },
    {
      id: 5,
      title: "Patient Engagement Trends in 2024",
      description: "Latest research on how patients prefer to interact with wellness practices.",
      category: "Research",
      readTime: "10 min read",
      icon: "TrendingUp"
    },
    {
      id: 6,
      title: "Setting Up Your First AI Assistant",
      description: "Step-by-step guide to launching your practice's AI assistant in 48 hours.",
      category: "Tutorial",
      readTime: "20 min read",
      icon: "Settings"
    }
  ];

  const categories = ["All", "Guide", "Best Practices", "Compliance", "Tool", "Research", "Tutorial"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredResources = selectedCategory === "All" 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

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
              Resources & Insights for
              <span className="gradient-text block mt-2">Wellness Practices</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Guides, tools, and insights to help you successfully implement AI marketing 
              and grow your wellness practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-neutral-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={resource.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {resource.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 flex items-center">
                      <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
                      {resource.readTime}
                    </span>
                    <button className="text-primary hover:text-secondary transition-colors font-medium text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated with AI Marketing Insights
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Get weekly tips, case studies, and industry insights delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-neutral-50"
              >
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-white/80 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;