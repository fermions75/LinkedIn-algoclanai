"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-gray-600 hover:text-blue-600"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 pb-4 space-y-4 bg-white shadow-md">
          <Link
            href="#features"
            className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            Pricing
          </Link>
          <div className="px-4 space-y-2">
            <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}