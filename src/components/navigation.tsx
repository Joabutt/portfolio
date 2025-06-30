"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Code, Trophy, User, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "HOME", icon: User },
    { href: "/projects", label: "PROJECTS", icon: Code },
    { href: "/achievements", label: "ACHIEVEMENTS", icon: Trophy },
    { href: "/photos", label: "PHOTOS", icon: Camera },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b-4 border-black z-50 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1 sm:gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon.svg"
            alt="Custom icon"
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
            loading="eager"
            width={56}
            height={56}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="text-2xl sm:text-3xl font-black">Joab Lee</div>
        </Link>

        <div className="hidden md:flex gap-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 border-2 border-black font-black text-sm transition-all duration-300 ease-out ${
                pathname === href
                  ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              }`}
            >
              <Icon className="w-4 h-4 inline mr-2" />
              {label}
            </Link>
          ))}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-200"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-black overflow-hidden transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } origin-top`}
      >
        <div className="flex flex-col gap-2 p-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`w-full px-4 py-3 border-2 border-black font-black text-sm transition-all duration-300 ease-out ${
                pathname === href
                  ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon className="w-4 h-4 inline mr-2" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
