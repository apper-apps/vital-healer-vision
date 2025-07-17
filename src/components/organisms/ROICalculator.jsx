import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ROICalculator = () => {
  const [patientVolume, setPatientVolume] = useState(1000);
  const [conversionRate, setConversionRate] = useState(25);
  const [costSavings, setCostSavings] = useState(40);
  const [calculations, setCalculations] = useState({
    annualSavings: 0,
    roiPercentage: 0,
    paybackPeriod: 0
  });

  // Calculate ROI metrics
  useEffect(() => {
    const monthlyPatients = patientVolume;
    const convertedPatients = (monthlyPatients * conversionRate) / 100;
    const savingsPerPatient = (costSavings / 100) * 150; // Assuming average cost per patient interaction
    const monthlySavings = convertedPatients * savingsPerPatient;
    const annualSavings = monthlySavings * 12;
    
    const implementationCost = 25000; // Estimated implementation cost
    const roiPercentage = ((annualSavings - implementationCost) / implementationCost) * 100;
    const paybackPeriod = implementationCost / monthlySavings;

    setCalculations({
      annualSavings: Math.round(annualSavings),
      roiPercentage: Math.round(roiPercentage),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10
    });
  }, [patientVolume, conversionRate, costSavings]);

  const SliderInput = ({ label, value, onChange, min, max, step = 1, suffix = "" }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-700">{label}</label>
        <span className="text-sm font-semibold text-primary">
          {value}{suffix}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2C5F8D, #6B9BD1);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2C5F8D, #6B9BD1);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </div>
    </div>
  );

  const MetricCard = ({ icon, title, value, color = "text-primary" }) => (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-lg border border-neutral-200 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ApperIcon name={icon} className={`w-6 h-6 ${color}`} />
        </div>
        <h3 className="text-sm font-medium text-neutral-600">{title}</h3>
      </div>
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-800 mb-4">
            Calculate Your{" "}
            <span className="gradient-text">ROI</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover the potential return on investment with StrictlyHeal's AI-powered healthcare solutions.
            Adjust the parameters below to see customized projections.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Controls */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl border border-neutral-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800">ROI Calculator</h3>
              </div>

              <div className="space-y-8">
                <SliderInput
                  label="Monthly Patient Volume"
                  value={patientVolume}
                  onChange={setPatientVolume}
                  min={100}
                  max={10000}
                  step={100}
                />

                <SliderInput
                  label="AI Tool Conversion Rate"
                  value={conversionRate}
                  onChange={setConversionRate}
                  min={5}
                  max={95}
                  suffix="%"
                />

                <SliderInput
                  label="Estimated Cost Savings"
                  value={costSavings}
                  onChange={setCostSavings}
                  min={10}
                  max={90}
                  suffix="%"
                />
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Info" className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Calculation Assumptions</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Based on average healthcare operational costs and AI implementation efficiency gains.
                  Results are estimates and may vary based on specific practice requirements.
                </p>
              </div>
            </motion.div>

            {/* Results Display */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <ApperIcon name="TrendingUp" className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Your ROI Projection</h3>
                </div>
                <p className="text-primary-100 mb-6">
                  Based on your current parameters, here's what you can expect:
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-100">Monthly Patients Using AI:</span>
                    <span className="text-xl font-bold">
                      {Math.round((patientVolume * conversionRate) / 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-100">Cost Savings Per Patient:</span>
                    <span className="text-xl font-bold">
                      ${Math.round((costSavings / 100) * 150)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <MetricCard
                  icon="DollarSign"
                  title="Annual Savings"
                  value={`$${calculations.annualSavings.toLocaleString()}`}
                  color="text-accent"
                />
                <MetricCard
                  icon="Percent"
                  title="ROI Percentage"
                  value={`${calculations.roiPercentage}%`}
                  color={calculations.roiPercentage > 0 ? "text-accent" : "text-red-500"}
                />
              </div>

              <MetricCard
                icon="Clock"
                title="Payback Period"
                value={`${calculations.paybackPeriod} months`}
                color="text-primary"
              />

              <motion.div 
                className="bg-accent/10 p-6 rounded-xl border border-accent/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <ApperIcon name="CheckCircle" className="w-6 h-6 text-accent" />
                  <h4 className="text-lg font-semibold text-neutral-800">Ready to Get Started?</h4>
                </div>
                <p className="text-neutral-600 mb-4">
                  These projections show the potential impact of implementing StrictlyHeal's AI solutions in your practice.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-accent to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name="ArrowRight" className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;