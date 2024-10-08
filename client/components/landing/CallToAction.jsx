"use client"
import { Button } from "../ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-10"
        initial={{ backgroundPosition: '0 0' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Boost Your LinkedIn Engagement?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Start generating AI-powered comments and monitoring user activity today. Join thousands of professionals who are already leveraging our tool.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-300" asChild>
              <Link href="/auth/signup" className="flex items-center">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}