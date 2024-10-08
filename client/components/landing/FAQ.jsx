"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: "Is this extension safe to use with my LinkedIn account?", answer: "Yes, our extension is fully compliant with LinkedIn's terms of service and uses secure authentication methods." },
  { question: "How does the AI generate comments?", answer: "Our AI analyzes the content of the post and generates contextually relevant comments based on your chosen persona." },
  { question: "Can I use this for other social media platforms?", answer: "Currently, we focus on LinkedIn, but we plan to expand to other platforms in the future." },
  { question: "What's included in the free plan?", answer: "The free plan includes 30 AI-generated comments and the ability to monitor up to 3 LinkedIn users." },
  { question: "How do I create a persona for comment generation?", answer: "In your dashboard, you can create custom personas by defining characteristics, tone, and expertise levels." },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Frequently Asked Questions</h2>
        <p className="text-xl text-center mb-12 text-gray-600">Got questions? We've got answers.</p>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  {activeIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white px-4 pb-4 rounded-b-lg shadow-md"
                  >
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}