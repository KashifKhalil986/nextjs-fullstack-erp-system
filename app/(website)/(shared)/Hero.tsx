"use client";
import {
  ArrowRight,
  BarChart3,
  Box,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
  {
    icon: Users,
    value: "420+",
    label: "Happy Clients",
  },
  {
    icon: Box,
    value: "18M+",
    label: "Products Managed",
  },
  {
    icon: BarChart3,
    value: "99.9%",
    label: "Inventory Accuracy",
  },
  {
    icon: Clock3,
    value: "2,400+",
    label: "Hours Saved Monthly",
  },
];

const features = [
  "Real-time inventory tracking",
  "Automated reporting system",
  "Advanced analytics dashboard",
];

export default function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#071b3a]">
      {/* Navbar */}

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-[720px] overflow-hidden lg:min-h-[760px]"
      >
        {/* Background Image */}

        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/bg-image.png')",
            backgroundSize: "100% auto",
            backgroundPosition: "center bottom 40%",
          }}
        />
        {/* Desktop Overlay */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(246,248,251,0.98)_0%,rgba(246,248,251,0.96)_28%,rgba(246,248,251,0.76)_47%,rgba(246,248,251,0.28)_66%,rgba(246,248,251,0.04)_100%)] lg:block" />
        {/* Mobile/Tablet Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,248,251,0.98)_0%,rgba(246,248,251,0.92)_45%,rgba(246,248,251,0.76)_100%)] lg:hidden" />
        {/* Soft bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f6f8fb] to-transparent" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:min-h-[760px] lg:px-0">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfe2ff] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--primary)] shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              AI Powered Inventory Solution
            </div>

            <h1 className="max-w-2xl text-3xl sm:text-4xl font-extrabold font-black leading-[1.02] tracking-[-0.04em] text-[#071b3a] sm:text-6xl lg:text-6xl">
              Smarter Inventory.
              <span className="block text-[var(--blue-dark)]">
                Stronger Business.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Streamline your operations, reduce costs, and gain real-time
              visibility across your entire inventory with one powerful
              dashboard.
            </p>

            <div className="mt-8 grid gap-3">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f1ff] text-[#0756c8] ring-1 ring-[#cfe2ff]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>

                  <span className="text-sm font-bold text-slate-700 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-[var(--navy)] p-5 text-white shadow-xl shadow-blue-950/20 hover:bg-[#041f52]"
                onClick={() => handleScroll("contact")}
              >
                Get Started
                <ArrowRight className="ml-0.5 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative z-10  px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--navy)] shadow-[0_26px_70px_rgba(3,18,53,0.28)]">
          <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center px-6 py-9 text-center"
                >
                  <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="text-3xl font-black tracking-tight text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-blue-100">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-24" />
    </main>
  );
}
