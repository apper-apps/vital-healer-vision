import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "AI Assistants", href: "/services/ai-assistants", icon: "Bot" },
        { name: "Ad Management", href: "/services/ad-management", icon: "Target" },
        { name: "Conversational SEO", href: "/services/conversational-seo", icon: "Search" }
      ]
    },
    {
      name: "Industries",
      href: "/industries",
      dropdown: [
        { name: "Functional Medicine", href: "/industries/functional-medicine", icon: "Heart" },
        { name: "Naturopathic Doctors", href: "/industries/naturopathic", icon: "Leaf" },
        { name: "Chiropractic", href: "/industries/chiropractic", icon: "Activity" },
        { name: "Physical Therapy", href: "/industries/physical-therapy", icon: "Zap" },
        { name: "Yoga & Pilates Studios", href: "/industries/studios", icon: "Users" },
        { name: "HRT & IV Therapy", href: "/industries/specialty-clinics", icon: "Droplet" }
      ]
    },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" }
  ];

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Stethoscope" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              StrictlyHeal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="relative"
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                        location.pathname.startsWith(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-neutral-700 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ApperIcon name="ChevronDown" className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-2"
                        >
                          {item.dropdown.map((dropItem) => (
                            <Link
                              key={dropItem.name}
                              to={dropItem.href}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-surface transition-colors"
                            >
                              <ApperIcon
                                name={dropItem.icon}
                                className="w-5 h-5 text-primary"
                              />
                              <span className="text-neutral-700 hover:text-primary">
                                {dropItem.name}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-neutral-700 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button as={Link} to="/contact" variant="primary">
              Get Free Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
          >
            <ApperIcon
              name={isMobileMenuOpen ? "X" : "Menu"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-neutral-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="flex items-center justify-between w-full px-3 py-2 text-left font-medium text-neutral-700 hover:text-primary transition-colors"
                      >
                        {item.name}
                        <ApperIcon
                          name="ChevronDown"
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {item.dropdown.map((dropItem) => (
                              <Link
                                key={dropItem.name}
                                to={dropItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-3 px-3 py-2 text-neutral-600 hover:text-primary transition-colors"
                              >
                                <ApperIcon
                                  name={dropItem.icon}
                                  className="w-4 h-4"
                                />
                                <span>{dropItem.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 font-medium text-neutral-700 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-200">
                <Button
                  as={Link}
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Get Free Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;