"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: "John Doe", role: "Marketing Manager", content: "This extension has revolutionized my LinkedIn engagement strategy!", avatar: "/images/avatar1.jpg" },
  { name: "Jane Smith", role: "Freelance Writer", content: "The AI-generated comments are incredibly natural and save me hours each week.", avatar: "/images/avatar2.jpg" },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">What Our Users Say</h2>
        <p className="text-xl text-center mb-12 text-gray-600">Hear from professionals who've transformed their LinkedIn engagement</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex-grow">
                <Quote className="absolute top-4 right-4 h-12 w-12 text-blue-100" />
                <p className="text-gray-700 mb-6 relative z-10">"{testimonial.content}"</p>
                <div className="flex items-center mt-auto">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={64} height={64} className="rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}