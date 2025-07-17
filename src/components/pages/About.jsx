import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const About = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former healthcare technology executive with 15+ years building patient engagement solutions.",
      image: "/api/placeholder/300/300",
      linkedin: "#"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Chief Medical Advisor",
      bio: "Practicing functional medicine physician and wellness practice consultant.",
      image: "/api/placeholder/300/300",
      linkedin: "#"
    },
    {
      name: "Emily Thompson",
      role: "Head of AI Development",
      bio: "AI researcher specializing in conversational systems for healthcare applications.",
      image: "/api/placeholder/300/300",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: "Heart",
      title: "Wellness-First Approach",
      description: "Every solution is designed with the unique needs of wellness practitioners in mind."
    },
    {
      icon: "Shield",
      title: "Privacy & Security",
      description: "HIPAA compliance and data security are built into everything we create."
    },
    {
      icon: "Users",
      title: "Human-Centered AI",
      description: "Our AI enhances human connections, never replaces the healing relationship."
    },
    {
      icon: "TrendingUp",
      title: "Measurable Results",
      description: "We focus on delivering clear ROI and practice growth for our clients."
    }
  ];

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
              Transforming Wellness Through
              <span className="gradient-text block mt-2">Intelligent Conversation</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We're on a mission to help wellness practitioners build stronger patient relationships 
              and grow their practices through the power of conversational AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              
              <div className="space-y-6 text-lg text-neutral-700">
                <p>
                  StrictlyHeal was founded in 2023 when our team recognized a critical gap in the wellness industry: 
                  while artificial intelligence was transforming many sectors, wellness practitioners were being 
                  left behind with generic solutions that didn't understand their unique needs.
                </p>
                
                <p>
                  After working with hundreds of functional medicine doctors, naturopaths, chiropractors, 
                  and wellness studios, we discovered that these practices shared common challenges: 
                  overwhelming patient inquiries, missed appointment opportunities, and the need to 
                  maintain personal connections while scaling their impact.
                </p>
                
                <p>
                  That's when we created the first AI marketing platform designed exclusively for wellness practices—
                  combining the efficiency of automation with the warmth and trust that healing relationships require.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                    <div className="text-sm text-neutral-600">Wellness Practices Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">2M+</div>
                    <div className="text-sm text-neutral-600">Patient Interactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">40%</div>
                    <div className="text-sm text-neutral-600">Avg. Practice Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                    <div className="text-sm text-neutral-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These principles guide everything we do and every solution we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={value.icon} className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Wellness practitioners, AI experts, and technology leaders working together 
              to transform patient engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="User" className="w-12 h-12 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                
                <p className="text-neutral-600 mb-6">
                  {member.bio}
                </p>
                
                <a
                  href={member.linkedin}
                  className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                >
                  <ApperIcon name="Linkedin" className="w-5 h-5 mr-2" />
                  Connect
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Join Our Mission?
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Whether you're a wellness practitioner ready to transform your practice 
              or a talented professional wanting to join our team, we'd love to hear from you.
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
                variant="ghost"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                <ApperIcon name="Users" className="w-5 h-5 mr-2" />
                Join Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;