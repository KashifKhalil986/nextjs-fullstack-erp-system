"use client";

import Image from "next/image";

export default function About() {
  const points = [
    {
      title: "Industry-leading technology",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="#216AE9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      title: "24/7 customer support",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="#216AE9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      title: "Customizable solutions",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="#216AE9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="w-full bg-white py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: Image ── */}
          <div className="relative">
            {/* Decorative border offset */}
            <div className="absolute -bottom-4 -left-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-2xl border-2 border-[#DDE3FD] -z-10" />

            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#DDE3FD]">
              <Image
                src="/assets/about-us.png"
                alt="About Alpha Built — warehouse inventory management"
                width={680}
                height={500}
                className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-700"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 right-6 bg-white rounded-xl shadow-lg border border-[#DDE3FD] px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#DDE3FD] flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="#216AE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#5a6a8a]">Trusted Partner</p>
                <p className="text-sm font-bold text-[#020F2E]">Since 2020</p>
              </div>
            </div>
          </div>

          {/* ── Right: Text Content ── */}
          <div className="space-y-6">
            {/* Label */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--navy)]">
              About Us
            </p>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--blue-dark)] leading-tight">
              Our Trusted Inventory{" "}
              <span className="text-[var(--blue-dark)]">
                Management Partner
              </span>
            </h2>

            {/* Body */}
            <p className="text-base text-[#5a6a8a] leading-relaxed">
              With years of experience in inventory management solutions, we
              help businesses optimize their operations, reduce costs, and
              improve efficiency through our comprehensive suite of services.
            </p>

            {/* Feature points */}
            <ul className="space-y-4 pt-2">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#DDE3FD] border border-[#A9B9FB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {point.icon}
                  </div>
                  <span className="text-base font-semibold text-[#020F2E] pt-1.5">
                    {point.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
