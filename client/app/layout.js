import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Comment Generator - Boost Your LinkedIn Engagement",
  description:
    "Generate AI-powered comments for LinkedIn and monitor user activity with our powerful web extension.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <GoogleAnalytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}