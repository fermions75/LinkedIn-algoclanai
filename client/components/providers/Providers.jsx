"use client";

import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/components/providers/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <TanstackProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </TanstackProvider>
    </SessionProvider>
  );
};

export default Providers;