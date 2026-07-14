"use client";

import React from "react";

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: "Receiving Inventory",
      description:
        "Efficiently manage incoming stock with streamlined processes for inspection and organization.",
      features: [
        "Container Unloading",
        "Product Categorization",
        "Initial Quality Check",
      ],
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
          <rect x="9" y="11" width="14" height="10" rx="2" />
          <path d="M16 11V9a2 2 0 0 0-2-2" />
        </svg>
      ),
    },
    {
      title: "Inspection & Quality Control",
      description:
        "Ensure quality standards are met through rigorous inspection processes.",
      features: [
        "Quality Standards Adherence",
        "Defect Detection",
        "Product Testing",
      ],
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 11h6M11 8v6" />
        </svg>
      ),
    },
    {
      title: "Storing Inventory",
      description:
        "Organize and manage storage efficiently for quick retrieval and easy access.",
      features: [
        "Shelf Organization",
        "Inventory Categorization",
        "Optimal Space Utilization",
      ],
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
          <path d="M12 3v6" />
        </svg>
      ),
    },
    {
      title: "Order Processing",
      description:
        "Streamline order fulfillment for timely and accurate deliveries and dispatches.",
      features: [
        "Order Verification",
        "Shipping Label Generation",
        "Real-time Order Tracking",
      ],
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="2" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      ),
    },
    {
      title: "Customer Support",
      description:
        "Enhance customer satisfaction with responsive and effective support interactions.",
      features: ["Phone Support", "Email Correspondence", "Live Chat Support"],
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: "Inventory Management",
      description:
        "Keep track of stock levels and prevent shortages or overstocking at all times.",
      features: [
        "Stock Level Tracking",
        "Automated Reordering",
        "Inventory Audits",
      ],
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 20h18" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="w-full bg-[#f7f9ff] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        {/* Section header */}
        <div className="text-center mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--navy)]">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--blue-dark)]">
            Comprehensive Solutions for Every Need
          </h2>
          <div className="h-1 w-14 bg-[#216AE9] rounded-full mx-auto mt-3" />
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-[#DDE3FD] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#DDE3FD] border border-[#A9B9FB] flex items-center justify-center text-[#216AE9] mb-5 group-hover:bg-[#216AE9] group-hover:text-white group-hover:border-[#216AE9] transition-colors duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#020F2E] mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#5a6a8a] leading-relaxed mb-5 flex-1">
                {service.description}
              </p>

              {/* Feature bullets */}
              <ul className="space-y-2 pt-4 border-t border-[#DDE3FD]">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-xs font-medium text-[#5a6a8a]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 text-[#216AE9] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
