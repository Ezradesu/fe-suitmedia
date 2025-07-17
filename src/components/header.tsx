"use client";

import { useState, useEffect } from "react";
import { AlignJustify } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/site-logo.webp";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
          setIsTransparent(false);
        } else {
          setIsVisible(true);
          setIsTransparent(true);
        }
      } else {
        setIsVisible(true);
        setIsTransparent(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  const navlinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "work" },
    { href: "/about", label: "about" },
    { href: "/service", label: "Service" },
    { href: "/ideas", label: "Ideas" },
    { href: "/career", label: "Career" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full transition-all duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isTransparent
          ? "bg-gray-50/70 backdrop-blur-md shadow-lg"
          : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className=""
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navlinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-orange-600 hover:text-orange-500 transition-colors duration-200 ${
                  pathname === link.href
                    ? "underline underline-offset-12 decoration-4"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
            >
              <AlignJustify className="text-3xl text-orange-600" />
            </button>
          </div>
          <div
            className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            } ${
              isTransparent ? "bg-gray-50/95 backdrop-blur-md" : "bg-gray-50"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navlinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "bg-gray-300 text-orange-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
