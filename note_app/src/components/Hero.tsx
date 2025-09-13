import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-5 text-center">
      {/* Heading */}
      <h1 className="bg-gradient-to-r from-neutral-50 via-orange-600 to-neutral-50 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg md:text-7xl">
        Capture Your Ideas Instantly
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-xl bg-gradient-to-r from-neutral-50 via-orange-600 to-neutral-50 bg-clip-text text-lg font-semibold text-transparent md:text-xl">
        Organize your thoughts, manage your notes, and stay productive with
        ease.
      </p>

      {/* Call-to-Action Button */}
      <Link
        href="/notes/new"
        className="mt-8 rounded-full bg-gradient-to-r from-orange-600 via-neutral-50 to-orange-600 px-8 py-4 text-lg font-bold text-neutral-950 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      >
        Start Taking Notes
      </Link>
    </div>
  );
}
