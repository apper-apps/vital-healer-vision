import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import industriesService from "@/services/api/industriesService";
import caseStudiesService from "@/services/api/caseStudiesService";

const IndustryDetail = () => {
  const { industryId } = useParams();
  const [industry, setIndustry] = useState(null);
  const [relatedCaseStudy, setRelatedCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIndustry = async () => {
    try {
      setLoading(true);
      setError("");
      const industryData = await industriesService.getById(industryId);
      setIndustry(industryData);
      
      if (industryData.caseStudyId) {
        try {
          const caseStudyData = await caseStudiesService.getById(industryData.caseStudyId);
          setRelatedCaseStudy(caseStudyData);
        } catch (caseStudyError) {
          // Case study not found, continue without it
        }
      }
    } catch (err) {
      setError("Industry not found or failed to load.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIndustry();
  }, [industryId]);

  if (loading) {
    return <Loading type="page" />;
  }

  if (error || !industry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error 
          message={error || "Industry not found"} 
          onRetry={loadIndustry} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-surface to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Heart" className="w-10 h-10 text-accent" />
</div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              AI Digital Marketing for {industry.name}
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Specialized conversational AI marketing designed specifically for {industry.name.toLowerCase()}, 
              addressing your unique challenges and practice needs.
            </p>

            <Button
              as={Link}
              to="/contact"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Get Custom Solution
              <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                Common Challenges
              </h2>
              
              <div className="space-y-6">
                {industry.challenges?.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="AlertCircle" className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-lg text-neutral-700">{challenge}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                Our AI Digital Marketing
              </h2>
              
              <div className="space-y-6">
                {industry.solutions?.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="CheckCircle" className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg text-neutral-700">{solution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      {relatedCaseStudy && (
        <section className="py-20 bg-gradient-to-br from-surface to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Success Story
</h2>
              <p className="text-xl text-neutral-600">
                See how {relatedCaseStudy.practiceName} transformed their practice with our AI digital marketing
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-green-500 rounded-lg flex items-center justify-center mr-4">
                  <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800">{relatedCaseStudy.practiceName}</h3>
                  <p className="text-neutral-600">{relatedCaseStudy.practiceType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {Object.entries(relatedCaseStudy.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-surface rounded-lg">
                    <div className="text-3xl font-bold gradient-text mb-2">{value}</div>
                    <div className="text-sm text-neutral-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                ))}
              </div>
              
              <blockquote className="text-lg text-neutral-700 italic border-l-4 border-accent pl-6 mb-6">
                "{relatedCaseStudy.testimonial}"
              </blockquote>
              
              <div className="text-center">
                <Button
                  as={Link}
                  to="/case-studies"
                  variant="accent"
                >
                  View All Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your {industry.name}?
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Join other {industry.name.toLowerCase()} who are already using AI to engage patients 
              and grow their practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-neutral-50"
              >
                <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
              
              <Button
                as={Link}
                to="/services"
                variant="ghost"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                View All Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;