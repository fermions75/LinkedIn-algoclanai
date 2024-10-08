"use client"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { motion } from 'framer-motion'
import { Globe , Link, MessageSquare, Activity } from 'lucide-react'

const steps = [
  { title: "Install Extension", description: "Add our Chrome extension to your browser.", icon: Globe},
  { title: "Connect LinkedIn", description: "Link your LinkedIn account securely.", icon: Link },
  { title: "Generate Comments", description: "Use AI to create engaging comments on posts.", icon: MessageSquare },
  { title: "Monitor Activity", description: "Track user activity and new posts easily.", icon: Activity }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">How It Works</h2>
        <p className="text-xl text-center mb-12 text-gray-600">Get started with AI Commenter in four easy steps</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 shadow-md">
                      {index + 1}
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <step.icon className="w-16 h-16 text-blue-600 mb-4" />
                    <p className="text-center text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}