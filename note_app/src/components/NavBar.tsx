import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-neutral-950 rounded-3xl shadow-lg sticky top-5 mx-5 z-50">
      {/* Logo */}
      <h1 className="font-montserrat text-2xl font-bold text-neutral-50 transition duration-200 hover:text-orange-600">
        <Link href="/">Note App</Link>
      </h1>

      {/* Menu */}
      <ul className="flex items-center gap-8 text-lg font-semibold">
        <li className="text-neutral-50 transition-colors duration-200 hover:text-orange-600">
          <Link href="/">Home</Link>
        </li>
        <li className="text-neutral-50 transition-colors duration-200 hover:text-orange-600">
          <Link href="/notes">Notes</Link>
        </li>
        <li className="text-neutral-50 transition-colors duration-200 hover:text-orange-600">
          <Link href="/notes/new">New Note</Link>
        </li>
      </ul>
    </nav>
  );
}
