import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-neutral-950 antialiased">
        {/* Navbar */}
        <NavBar />

        {/* Hero Section */}


        {/* Main content grows to push footer down */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
