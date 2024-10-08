// components/landing/Footer.jsx
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Solobuilderhub</h3>
            <p className="mb-4">Boost your LinkedIn engagement with AI-powered comments.</p>
            <div className="flex items-center space-x-2">
              <Mail size={18} />
              <a href="mailto:solobuilderhub@gmail.com" className="hover:underline">
                solobuilderhub@gmail.com
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              {/* <li><Link href="/terms">Terms of Service</Link></li> */}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="mb-4">&copy; 2024 Solobuilderhub. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Solobuilderhub: Your AI-powered LinkedIn engagement booster. Enhance your professional network with intelligent, personalized comments. Grow your connections and influence effortlessly.
          </p>
        </div>
      </div>
    </footer>
  )
}