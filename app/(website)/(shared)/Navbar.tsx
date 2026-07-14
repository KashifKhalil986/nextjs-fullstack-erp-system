"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.scrollY < 50) {
        setActiveSection("home");
        return;
      }

      const sections = ["home", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 120;

      let matched = false;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.getElementById(id);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "Home", href: "home" },
    { label: "About Us", href: "about" },
    { label: "Services", href: "services" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[#e8ecf4] bg-white/95 shadow-lg shadow-black/[0.04] backdrop-blur-md"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 xl:px-0">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0 cursor-pointer"
          >
            <Image
              src="/assets/dark_logo.png"
              alt="Alpha Built"
              width={460}
              height={80}
              className="h-14 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href
                    ? "text-[var(--blue-dark)]"
                    : "text-slate-500 hover:text-[var(--blue-dark)]"
                }`}
              >
                {link.label}

                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[var(--blue-dark)]" />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center lg:flex">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="size-sm inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-3.5 py-2 text-sm  text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:bg-[#041f52] active:scale-[0.97]"
            >
              Contact Us
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#216AE9] transition-colors hover:bg-[#f0f4ff] lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#e8ecf4] px-6 py-5">
          <Image
            src="/assets/dark_logo.png"
            alt="Alpha Built"
            width={140}
            height={36}
            className="h-9 w-auto object-contain"
          />

          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#216AE9] transition-colors hover:bg-[#f0f4ff]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                activeSection === link.href
                  ? "bg-[var(--blue-dark)]/10 font-semibold text-[var(--blue-dark)]"
                  : "text-slate-500 hover:bg-[var(--blue-dark)]/5 hover:text-[var(--blue-dark)]"
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-4 border-t border-[#e8ecf4] pt-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#041f52]"
            >
              Contact Us
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
