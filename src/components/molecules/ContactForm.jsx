import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import contactService from "@/services/api/contactService";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import Checkbox from "@/components/atoms/Checkbox";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    practiceName: "",
    practiceType: "",
    contactName: "",
    email: "",
    phone: "",
    servicesInterested: [],
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const practiceTypes = [
    { value: "functional-medicine", label: "Functional Medicine" },
    { value: "naturopathic", label: "Naturopathic Doctor" },
    { value: "chiropractic", label: "Chiropractic" },
    { value: "physical-therapy", label: "Physical Therapy" },
    { value: "yoga-studio", label: "Yoga Studio" },
    { value: "pilates-studio", label: "Pilates Studio" },
    { value: "hrt-clinic", label: "HRT Clinic" },
    { value: "iv-therapy", label: "IV Therapy" },
    { value: "other", label: "Other Wellness Business" }
  ];

  const services = [
    { id: "ai-assistants", label: "AI Assistants / Conversational Websites" },
    { id: "ad-management", label: "Ad Management" },
    { id: "conversational-seo", label: "Conversational SEO" },
    { id: "all-services", label: "All Services" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.practiceName.trim()) newErrors.practiceName = "Practice name is required";
    if (!formData.practiceType) newErrors.practiceType = "Practice type is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (formData.servicesInterested.length === 0) newErrors.servicesInterested = "Please select at least one service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);
    try {
      await contactService.create(formData);
      toast.success("Thank you! We'll be in touch within 24 hours to schedule your demo.");
      setFormData({
        practiceName: "",
        practiceType: "",
        contactName: "",
        email: "",
        phone: "",
        servicesInterested: [],
        message: ""
      });
    } catch (error) {
      toast.error("There was an error submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleServiceChange = (serviceId, checked) => {
    if (serviceId === "all-services") {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          servicesInterested: services.filter(s => s.id !== "all-services").map(s => s.id)
        }));
      } else {
        setFormData(prev => ({ ...prev, servicesInterested: [] }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        servicesInterested: checked
          ? [...prev.servicesInterested, serviceId]
          : prev.servicesInterested.filter(id => id !== serviceId)
      }));
    }
    
    if (errors.servicesInterested) {
      setErrors(prev => ({ ...prev, servicesInterested: "" }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Practice Name"
          value={formData.practiceName}
          onChange={(e) => handleInputChange("practiceName", e.target.value)}
          error={errors.practiceName}
          placeholder="Your practice name"
        />
        
        <Select
          label="Practice Type"
          value={formData.practiceType}
          onChange={(e) => handleInputChange("practiceType", e.target.value)}
          error={errors.practiceType}
          options={practiceTypes}
          placeholder="Select your practice type"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Contact Name"
          value={formData.contactName}
          onChange={(e) => handleInputChange("contactName", e.target.value)}
          error={errors.contactName}
          placeholder="Your full name"
        />
        
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
          placeholder="your@email.com"
        />
      </div>

      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        error={errors.phone}
        placeholder="(555) 123-4567"
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-700">
          Services Interested In
        </label>
        {errors.servicesInterested && (
          <p className="text-sm text-red-600">{errors.servicesInterested}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service) => (
            <Checkbox
              key={service.id}
              label={service.label}
              checked={
                service.id === "all-services"
                  ? formData.servicesInterested.length === services.length - 1
                  : formData.servicesInterested.includes(service.id)
              }
              onChange={(e) => handleServiceChange(service.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      <Textarea
        label="Additional Message (Optional)"
        value={formData.message}
        onChange={(e) => handleInputChange("message", e.target.value)}
        placeholder="Tell us about your specific needs or questions..."
        rows={4}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        Get My Free Demo
      </Button>

      <p className="text-sm text-neutral-600 text-center">
        We'll respond within 24 hours to schedule your personalized demo
      </p>
    </motion.form>
  );
};

export default ContactForm;