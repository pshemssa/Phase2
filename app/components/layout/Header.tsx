"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Edit, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="border-b border-yellow-700/20 sticky top-0 bg-yellow-800 hover:bg-yellow-700 transition z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center font-bold text-yellow-800">
                LY
              </div>
              <div>
                <h1 className="font-serif text-xl tracking-tight text-white group-hover:text-yellow-400 transition">
                  Lumen Yard
                </h1>
                <div className="text-[10px] text-yellow-200 -mt-0.5">
                  STORIES THAT LINGER
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Search className="w-4 h-4 text-yellow-200 mr-2" />
              <input
                type="text"
                placeholder="Search stories..."
                className="bg-transparent border-none outline-none text-sm w-64 text-white placeholder-yellow-200/70"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/write"
                  className="flex items-center text-white hover:text-yellow-400 transition"
                >
                  <Edit className="w-5 h-5 mr-1" />
                  <span>Write</span>
                </Link>
                <button className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                    U
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthenticated(true)}
                  className="text-white hover:text-yellow-400 transition font-medium"
                >
                  Sign In
                </button>
                <Link
                  href="/signup"
                  className="bg-white text-yellow-800 px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-50 shadow-sm transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:text-yellow-400 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-yellow-800">
          <nav className="px-4 py-4 space-y-3">
            <Link
              href="/write"
              className="block text-white hover:text-yellow-400 transition font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Write
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  href="/signin"
                  className="block text-white hover:text-yellow-400 transition font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full py-2 px-4 bg-white text-yellow-800 rounded-full text-sm font-bold text-center hover:bg-yellow-50 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}