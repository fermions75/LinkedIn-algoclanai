import * as React from 'react'
import Link from 'next/link';
import { UserMenu } from '../user-menu';
import { Button } from '../ui/button';
import { auth } from '@/auth'
import Image from 'next/image'
import { ClientHeader } from './ClientHeader';

async function UserOrLogin() {
  const session = await auth()
  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/solo-builderhub-logo.png" alt="Solo Builder Hub" width={32} height={32} />
        <span className="text-2xl font-bold text-gray-800 hidden sm:inline-block">Solo Builder Hub</span>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
          Features
        </Link>
        <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
          Pricing
        </Link>
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <div className="space-x-2">
            <Button variant="outline" asChild className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <React.Suspense fallback={<div className="flex-1" />}>
            <UserOrLogin />
          </React.Suspense>
          <ClientHeader />
        </div>
      </div>
    </header>
  );
}