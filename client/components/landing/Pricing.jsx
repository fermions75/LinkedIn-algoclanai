"use client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      { text: '30 AI-generated comments', included: true },
      { text: 'Monitor 3 LinkedIn users', included: true },
      { text: '12 free LinkedIn scraping calls', included: true },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start for Free',
    href: '/auth/signup'
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: 'per month',
    features: [
      { text: 'Unlimited AI-generated comments', included: true },
      { text: 'Monitor 5 LinkedIn users', included: true },
      { text: 'Unlimited LinkedIn scraping calls', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Upgrade to Pro',
    href: '/auth/signup?plan=pro'
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Choose Your Plan</h2>
        <p className="text-xl text-center mb-12 text-gray-600">Select the perfect plan for your LinkedIn engagement needs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 mr-2 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 mr-2 text-red-500" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg py-6" 
                    variant={plan.name === 'Pro' ? 'default' : 'outline'}
                    asChild
                  >
                    <a href={plan.href}>{plan.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}