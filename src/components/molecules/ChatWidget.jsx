import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      message: "Hi! I'm your AI assistant. I can help you learn about our conversational AI solutions for wellness practices. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");

  const sampleResponses = {
    "pricing": "Our pricing starts at $299/month for basic AI assistant features. This includes 24/7 patient support, appointment scheduling, and basic FAQ handling. Would you like to see a detailed pricing breakdown?",
    "features": "Our AI assistants can handle appointment scheduling, answer common patient questions, collect intake forms, send appointment reminders, and even help with basic health education. Which feature interests you most?",
    "demo": "I'd love to show you a demo! Our AI can integrate with your existing practice management system and start engaging patients within 48 hours. Shall I connect you with our demo specialist?",
    "ROI": "Most practices see a 40% reduction in front desk calls and 25% increase in appointment bookings within the first month. Our ROI calculator shows practices typically pay for themselves within 60 days.",
    "integration": "We integrate with most major practice management systems including SimplePractice, TherapyNotes, MINDBODY, and more. Setup typically takes less than 2 hours with our technical team.",
    "default": "That's a great question! Our AI solutions are specifically designed for wellness practices. Would you like to schedule a 15-minute demo to see how we can help grow your practice?"
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", message: input };
    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for demo purposes
    const lowercaseInput = input.toLowerCase();
    let response = sampleResponses.default;

    if (lowercaseInput.includes("price") || lowercaseInput.includes("cost")) {
      response = sampleResponses.pricing;
    } else if (lowercaseInput.includes("feature") || lowercaseInput.includes("what can")) {
      response = sampleResponses.features;
    } else if (lowercaseInput.includes("demo") || lowercaseInput.includes("show me")) {
      response = sampleResponses.demo;
    } else if (lowercaseInput.includes("roi") || lowercaseInput.includes("return")) {
      response = sampleResponses.ROI;
    } else if (lowercaseInput.includes("integrate") || lowercaseInput.includes("connect")) {
      response = sampleResponses.integration;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", message: response }]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: isOpen ? "0 0 0 0 rgba(44, 95, 141, 0)" : "0 0 0 10px rgba(44, 95, 141, 0.1)"
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="MessageCircle" className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-neutral-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <ApperIcon name="Bot" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant Demo</h3>
                <p className="text-xs opacity-90">Experience our conversational AI</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-primary text-white"
                        : "bg-surface text-neutral-800"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neutral-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about our AI solutions..."
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <ApperIcon name="Send" className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Try asking: "What features do you offer?" or "Show me pricing"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;