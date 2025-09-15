import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-neutral-950 antialiased">
        <NavBar />

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
