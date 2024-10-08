import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Zap, Users, UserCircle } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Comments',
    description: 'Generate contextual and engaging comments for LinkedIn posts using advanced AI.',
    image: '/images/feature-1.webp',
    icon: Zap,
  },
  {
    title: 'User Monitoring',
    description: 'Track and monitor LinkedIn users to stay updated on their latest posts and activities.',
    image: '/images/feature-2.webp',
    icon: Users,
  },
  {
    title: 'Persona Creation',
    description: 'Create custom personas to tailor your comment style and tone for different audiences.',
    image: '/images/feature-3.webp',
    icon: UserCircle,
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Key Features</h2>
        <p className="text-xl text-center mb-12 text-gray-600">Discover the powerful tools that set us apart</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48">
              <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white rounded-full p-2">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}