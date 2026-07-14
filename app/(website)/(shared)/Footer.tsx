"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Pricing", id: "home" },
    { label: "Contact", id: "contact" },
  ];

  const services = [
    { label: "Receiving Inventory", id: "services" },
    { label: "Quality Control", id: "services" },
    { label: "Order Processing", id: "services" },
    { label: "Customer Support", id: "services" },
    { label: "Inventory Management", id: "services" },
  ];

  const company = [
    { label: "About Us", id: "about" },
    { label: "Careers", id: "home" },
    { label: "Blog", id: "home" },
    { label: "Privacy Policy", id: "home" },
    { label: "Terms of Service", id: "home" },
  ];

  return (
    <footer className="w-full bg-[#082B67] text-white relative overflow-hidden">

      {/* Subtle top wave decoration */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#216AE9] via-[#6E91F9] to-[#216AE9]" /> */}

      <div className="max-w-7xl mx-auto px-5 xl:px-0 pt-14 pb-8">

        {/* ── Main 4-column grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Col 1: Brand */}
          <div className="space-y-5 lg:col-span-1">
            <button onClick={scrollToTop} className="cursor-pointer block">
              <Image
                src="/assets/light_logo.png"
                alt="Alpha Built"
                width={150}
                height={38}
                className="h-10 w-auto object-contain"
              />
            </button>
            <p className="text-sm text-[#A9B9FB] leading-relaxed max-w-[220px]">
              Smart inventory management solutions to streamline deliveries and
              drive business growth.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#A9B9FB] hover:bg-[#216AE9] hover:border-[#216AE9] hover:text-white transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#A9B9FB] hover:bg-[#216AE9] hover:border-[#216AE9] hover:text-white transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#A9B9FB] hover:bg-[#216AE9] hover:border-[#216AE9] hover:text-white transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleScroll(link.id)}
                    className="text-sm text-[#A9B9FB] hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((svc, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleScroll(svc.id)}
                    className="text-sm text-[#A9B9FB] hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer block"
                  >
                    {svc.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#6E91F9] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-sm text-[#A9B9FB]">(813) 708-7885</span>
              </li>

              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#6E91F9] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="text-sm text-[#A9B9FB]">info@alphabuiltconsultants.com</span>
              </li>

              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#6E91F9] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm text-[#A9B9FB] leading-relaxed">
                  Industrial Road, Street No. 1,<br />Plot 103-104 A, Hayatabad, Peshawar
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <p className="text-xs text-[#6E91F9]">
            © 2025 Alpha Built. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Scroll to top button ── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[var(--navy)] hover:bg-[#041f52] text-white shadow-lg shadow-blue-950/20 flex items-center justify-center transition-all duration-300 z-50 cursor-pointer ${showScroll
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </footer>
  );
}
