"use client";

import React, { useEffect, useState, useRef } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const HappyClientsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ProductsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const AccuracyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const HoursIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      label: "Happy Clients",
      value: 420,
      suffix: "+",
      icon: <HappyClientsIcon />,
    },
    {
      label: "Products Managed",
      value: 18,
      suffix: "M+",
      icon: <ProductsIcon />,
    },
    {
      label: "Inventory Accuracy",
      value: 99,
      suffix: ".9%",
      icon: <AccuracyIcon />,
    },
    {
      label: "Hours Saved Monthly",
      value: 2400,
      suffix: "+",
      icon: <HoursIcon />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1449A6] py-14"
    >
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              triggerCount={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  triggerCount,
  delay,
}: {
  stat: StatItem;
  triggerCount: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggerCount) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const end = stat.value;
      const timer = setInterval(() => {
        start += Math.ceil((end - start) / 10);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [triggerCount, stat.value, delay]);

  return (
    <div className="flex flex-col items-center text-center gap-3 py-2">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-1">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="text-3xl lg:text-4xl font-extrabold text-white leading-none">
        {count.toLocaleString()}
        <span className="text-[#A9B9FB]">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-[#A9B9FB] leading-snug max-w-[120px]">
        {stat.label}
      </p>
    </div>
  );
}
