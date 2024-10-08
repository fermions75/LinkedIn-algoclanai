import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Boost Your LinkedIn Engagement with{" "}
            <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl mb-6 text-gray-600">
            Generate intelligent comments and monitor user activity
            effortlessly.
          </p>
          <div className="space-x-4">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a href="/auth/signup" className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://chromewebstore.google.com/detail/solobuilderhub/afiiebkndlkhnpbekkheibhfjfnbcnem"
              >
                Get Extension
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <Image
              src="/images/hero-image.webp"
              alt="AI Comment Generator"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-800">
                AI-powered comments
              </p>
              <p className="text-xs text-gray-600">Boost engagement by 300%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
